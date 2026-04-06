/**
 * Stripe Webhook Handler
 * Handles checkout.session.completed, refunds, and disputes
 *
 * Security:
 * - Atomic idempotency via INSERT ON CONFLICT (no race conditions)
 * - Payment status verification before granting access
 * - Top-level error handling with proper Stripe retry semantics
 * - Refund/dispute distinction for audit trail
 */

// Must be server-rendered (not prerendered)
export const prerender = false;

import type { APIRoute } from 'astro';
import type Stripe from 'stripe';
import { getStripeServer } from '../../../lib/stripe';
import { getServiceClient } from '../../../lib/supabase';
import { getProductById } from '../../../config/shop/products';
import { generateDownloadToken, getDownloadUrl } from '../../../lib/downloads';
import { sendPurchaseConfirmation, sendMasterclassWelcome } from '../../../lib/resend';
import { sendPaymentNotification, sendRefundNotification } from '../../../lib/telegram';

const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

export const POST: APIRoute = async ({ request }) => {
  // Validate webhook secret is configured
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return new Response('Webhook not configured', { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = await getStripeServer();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response('Webhook signature verification failed', { status: 400 });
  }

  // Atomic idempotency: INSERT first, skip if duplicate (unique constraint on event_id)
  const supabase = getServiceClient();
  const { error: eventInsertError } = await supabase
    .from('stripe_events')
    .insert({ event_id: event.id, event_type: event.type });

  if (eventInsertError) {
    if (eventInsertError.code === '23505') {
      // Unique constraint violation = already processed
      console.log(`Event ${event.id} already processed, skipping`);
      return new Response('OK (duplicate)', { status: 200 });
    }
    // Actual DB error — return 500 so Stripe retries
    console.error('Failed to record event:', eventInsertError);
    return new Response('Failed to record event', { status: 500 });
  }

  // Process event — wrapped in try/catch for proper retry behavior
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session expired:', session.id);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        await handleRefund(charge);
        break;
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute;
        await handleDispute(dispute);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error(`Webhook processing error for event ${event.id}:`, err);
    // Delete event record so Stripe retry can reprocess (prevents stuck events)
    await supabase.from('stripe_events').delete().eq('event_id', event.id);
    return new Response('Webhook processing failed', { status: 500 });
  }
};

// ============================================
// CHECKOUT COMPLETE
// ============================================

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const { productId, productKey, fulfillmentType, userId, userEmail, isGuestCheckout } = session.metadata || {};

  if (!productId) {
    console.error('No productId in session metadata');
    return;
  }

  // Verify payment was actually completed (defense in depth)
  if (session.mode === 'payment' && session.payment_status !== 'paid') {
    console.warn(`Ignoring unpaid session ${session.id} (status: ${session.payment_status})`);
    return;
  }

  // ============================================
  // MASTERCLASS PURCHASE (authenticated + guest)
  // ============================================

  if (productKey === 'masterclass') {
    const supabase = getServiceClient();
    let resolvedUserId = userId;
    let isGuest = isGuestCheckout === 'true';
    let magicLoginLink: string | undefined;
    const customerEmail = userEmail || session.customer_details?.email;

    // ---- GUEST CHECKOUT: auto-create or find user ----
    if (!resolvedUserId && customerEmail) {
      isGuest = true;
      console.log(`Guest checkout for ${customerEmail} — resolving user...`);

      // Check if a Supabase user already exists with this email
      const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1,
      });

      // listUsers doesn't filter by email, so we need to search manually
      // Use a more targeted approach: try to create and handle "already exists" error
      let existingUser: any = null;

      // Try fetching by email using the admin API
      try {
        const { data: userList } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
        if (userList?.users) {
          existingUser = userList.users.find((u: any) => u.email === customerEmail);
        }
      } catch (e) {
        console.warn('Could not list users, will try creating:', e);
      }

      if (existingUser) {
        // User already exists — use their ID
        resolvedUserId = existingUser.id;
        console.log(`Found existing user ${resolvedUserId} for ${customerEmail}`);
      } else {
        // Create new guest user (email auto-confirmed, no password needed)
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
          email: customerEmail,
          email_confirm: true,
          user_metadata: {
            guest_account: true,
            full_name: session.customer_details?.name || '',
          },
        });

        if (createError) {
          // Handle "user already registered" race condition
          if (createError.message?.includes('already been registered') || createError.message?.includes('already exists')) {
            // Retry fetching
            try {
              const { data: retryList } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
              existingUser = retryList?.users?.find((u: any) => u.email === customerEmail);
              if (existingUser) {
                resolvedUserId = existingUser.id;
                console.log(`Found existing user on retry: ${resolvedUserId}`);
              }
            } catch (e) {
              throw new Error(`Guest user creation failed and retry lookup failed: ${createError.message}`);
            }
          }

          if (!resolvedUserId) {
            throw new Error(`Failed to create guest user: ${createError.message}`);
          }
        } else if (newUser?.user) {
          resolvedUserId = newUser.user.id;
          console.log(`Created guest user ${resolvedUserId} for ${customerEmail}`);

          // The handle_new_user() trigger should create the profile automatically.
          // But just in case, ensure profile exists (upsert)
          await supabase.from('profiles').upsert({
            id: resolvedUserId,
            email: customerEmail,
            full_name: session.customer_details?.name || '',
          }, { onConflict: 'id' });
        }
      }

      // Generate magic link for guest user (so they can log in with one click)
      if (resolvedUserId && customerEmail) {
        try {
          const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
            type: 'magiclink',
            email: customerEmail,
            options: {
              redirectTo: 'https://www.mikki-mase.com/masterclass/course',
            },
          });

          if (linkError) {
            console.warn('Failed to generate magic link:', linkError.message);
          } else if (linkData?.properties?.action_link) {
            magicLoginLink = linkData.properties.action_link;
            console.log(`Magic link generated for ${customerEmail}`);
          }
        } catch (e) {
          console.warn('Magic link generation error:', e);
        }
      }
    }

    // ---- Bail if we still don't have a user ID ----
    if (!resolvedUserId) {
      console.error('Could not resolve user ID for masterclass purchase:', session.id);
      throw new Error('No user ID resolved for masterclass purchase');
    }

    // ---- Insert purchase record ----
    const { error: purchaseError } = await supabase.from('purchases').insert({
      user_id: resolvedUserId,
      stripe_session_id: session.id,
      stripe_payment_intent_id: typeof session.payment_intent === 'string'
        ? session.payment_intent
        : (session.payment_intent as any)?.id || null,
      product_key: 'masterclass',
      amount_cents: session.amount_total ?? 4700, // ?? not || (preserve $0 promo codes)
      status: 'completed',
    });

    if (purchaseError) {
      if (purchaseError.code === '23505') {
        console.log('Purchase already recorded for session:', session.id);
      } else {
        // Non-duplicate error — throw to trigger 500 and Stripe retry
        throw new Error(`Failed to insert purchase: ${purchaseError.message}`);
      }
    } else {
      console.log(`Masterclass purchase recorded for user ${resolvedUserId}${isGuest ? ' (guest)' : ''}`);
    }

    // ---- Link Stripe customer ID to profile (non-critical) ----
    if (session.customer) {
      const customerId = typeof session.customer === 'string'
        ? session.customer
        : (session.customer as any).id;

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', resolvedUserId)
        .is('stripe_customer_id', null);

      if (profileError) {
        console.warn('Failed to link Stripe customer to profile:', profileError.message);
      }
    }

    // ---- Send welcome email (non-critical) ----
    if (customerEmail) {
      try {
        const cheatsheetToken = generateDownloadToken('mmc-cheatsheet-bundle', customerEmail, session.id);
        const ebookToken = generateDownloadToken('beat-the-casino', customerEmail, session.id);

        await sendMasterclassWelcome({
          customerEmail,
          customerName: session.customer_details?.name || undefined,
          courseUrl: magicLoginLink || 'https://www.mikki-mase.com/masterclass/course',
          cheatsheetDownloadUrl: getDownloadUrl(cheatsheetToken),
          ebookDownloadUrl: getDownloadUrl(ebookToken),
          magicLink: magicLoginLink,
          isGuest,
        });
        console.log(`Masterclass welcome email sent to ${customerEmail}${isGuest ? ' (guest, with magic link)' : ''}`);
      } catch (emailErr) {
        // Email failure is non-critical — don't fail the whole webhook
        console.error('Failed to send masterclass welcome email:', emailErr);
      }

      // Telegram notification (non-critical)
      await sendPaymentNotification({
        customerEmail,
        customerName: session.customer_details?.name || undefined,
        productName: `Mikki Mase Masterclass${isGuest ? ' (Guest Checkout)' : ''}`,
        amountCents: session.amount_total ?? 4700,
        currency: session.currency || 'usd',
        stripeSessionId: session.id,
      });
    }

    return;
  }

  // ============================================
  // LEGACY SHOP PRODUCT FULFILLMENT
  // ============================================

  const product = getProductById(productId);
  if (!product) {
    console.error(`Product not found: ${productId}`);
    return;
  }

  const customerEmail = session.customer_details?.email;
  if (!customerEmail) {
    console.error('No customer email in session');
    return;
  }

  console.log(`Processing order for ${customerEmail}: ${product.name}`);

  // Telegram notification for shop products (non-critical)
  await sendPaymentNotification({
    customerEmail,
    customerName: session.customer_details?.name || undefined,
    productName: product.name,
    amountCents: session.amount_total ?? 0,
    currency: session.currency || 'usd',
    stripeSessionId: session.id,
  });

  switch (fulfillmentType) {
    case 'digital': {
      const token = generateDownloadToken(productId, customerEmail, session.id);
      const downloadUrl = getDownloadUrl(token);

      try {
        await sendPurchaseConfirmation({
          customerEmail,
          productName: product.name,
          orderNumber: session.id.slice(-8).toUpperCase(),
          downloadLink: downloadUrl,
        });
        console.log(`Email sent to ${customerEmail}`);
      } catch (error) {
        console.error('Failed to send email:', error);
      }
      break;
    }

    case 'physical': {
      console.log('Physical product order received');
      break;
    }

    case 'hybrid': {
      const token = generateDownloadToken(productId, customerEmail, session.id);
      const downloadUrl = getDownloadUrl(token);

      try {
        await sendPurchaseConfirmation({
          customerEmail,
          productName: product.name,
          orderNumber: session.id.slice(-8).toUpperCase(),
          downloadLink: downloadUrl,
        });
      } catch (error) {
        console.error('Failed to send hybrid email:', error);
      }
      break;
    }
  }
}

// ============================================
// PAYMENT INTENT SUCCEEDED (Custom Payment Element flow)
// ============================================

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const { userId, userEmail, productKey, isGuestCheckout } = paymentIntent.metadata || {};

  // Handle all masterclass tier purchases from the custom payment element flow
  const masterclassTiers = ['masterclass', 'inner-circle-yearly', 'lifetime-vip'];
  if (!productKey || !masterclassTiers.includes(productKey)) return;

  const supabase = getServiceClient();
  let resolvedUserId = userId;
  let isGuest = isGuestCheckout === 'true';
  let magicLoginLink: string | undefined;
  const customerEmail = userEmail || paymentIntent.receipt_email;

  // ---- GUEST CHECKOUT: auto-create or find user ----
  if (!resolvedUserId && customerEmail) {
    isGuest = true;
    console.log(`Guest PaymentIntent for ${customerEmail} — resolving user...`);

    let existingUser: any = null;
    try {
      const { data: userList } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (userList?.users) {
        existingUser = userList.users.find((u: any) => u.email === customerEmail);
      }
    } catch (e) {
      console.warn('Could not list users, will try creating:', e);
    }

    if (existingUser) {
      resolvedUserId = existingUser.id;
      console.log(`Found existing user ${resolvedUserId} for ${customerEmail}`);
    } else {
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: customerEmail,
        email_confirm: true,
        user_metadata: { guest_account: true },
      });

      if (createError) {
        if (createError.message?.includes('already been registered') || createError.message?.includes('already exists')) {
          try {
            const { data: retryList } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
            existingUser = retryList?.users?.find((u: any) => u.email === customerEmail);
            if (existingUser) resolvedUserId = existingUser.id;
          } catch (e) {
            throw new Error(`Guest user creation failed: ${createError.message}`);
          }
        }
        if (!resolvedUserId) throw new Error(`Failed to create guest user: ${createError.message}`);
      } else if (newUser?.user) {
        resolvedUserId = newUser.user.id;
        console.log(`Created guest user ${resolvedUserId} for ${customerEmail}`);
        await supabase.from('profiles').upsert({
          id: resolvedUserId,
          email: customerEmail,
          full_name: '',
        }, { onConflict: 'id' });
      }
    }

    // Generate magic link
    if (resolvedUserId && customerEmail) {
      try {
        const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
          type: 'magiclink',
          email: customerEmail,
          options: { redirectTo: 'https://www.mikki-mase.com/masterclass/course' },
        });
        if (!linkError && linkData?.properties?.action_link) {
          magicLoginLink = linkData.properties.action_link;
        }
      } catch (e) {
        console.warn('Magic link generation error:', e);
      }
    }
  }

  if (!resolvedUserId) {
    // Not a masterclass payment we can handle
    return;
  }

  // Check if purchase was already recorded
  const { data: existing } = await supabase
    .from('purchases')
    .select('id')
    .eq('stripe_payment_intent_id', paymentIntent.id)
    .eq('status', 'completed')
    .limit(1)
    .single();

  if (existing) {
    console.log('Purchase already recorded for PaymentIntent:', paymentIntent.id);
    return;
  }

  // Insert purchase record
  const { error: purchaseError } = await supabase.from('purchases').insert({
    user_id: resolvedUserId,
    stripe_session_id: `pi_${paymentIntent.id}`,
    stripe_payment_intent_id: paymentIntent.id,
    product_key: productKey,
    amount_cents: paymentIntent.amount ?? 6700,
    status: 'completed',
  });

  if (purchaseError) {
    if (purchaseError.code === '23505') {
      console.log('Purchase already recorded for PI:', paymentIntent.id);
    } else {
      throw new Error(`Failed to insert purchase: ${purchaseError.message}`);
    }
  } else {
    console.log(`Masterclass purchase recorded via PaymentIntent for user ${resolvedUserId}${isGuest ? ' (guest)' : ''}`);
  }

  // Link Stripe customer ID to profile (non-critical)
  if (paymentIntent.customer) {
    const customerId = typeof paymentIntent.customer === 'string'
      ? paymentIntent.customer
      : (paymentIntent.customer as any).id;

    await supabase
      .from('profiles')
      .update({ stripe_customer_id: customerId })
      .eq('id', resolvedUserId)
      .is('stripe_customer_id', null);
  }

  // Send welcome email (non-critical)
  if (customerEmail) {
    try {
      const cheatsheetToken = generateDownloadToken('mmc-cheatsheet-bundle', customerEmail, paymentIntent.id);
      const ebookToken = generateDownloadToken('beat-the-casino', customerEmail, paymentIntent.id);

      await sendMasterclassWelcome({
        customerEmail,
        courseUrl: magicLoginLink || 'https://www.mikki-mase.com/masterclass/course',
        cheatsheetDownloadUrl: getDownloadUrl(cheatsheetToken),
        ebookDownloadUrl: getDownloadUrl(ebookToken),
        magicLink: magicLoginLink,
        isGuest,
      });
      console.log(`Masterclass welcome email sent to ${customerEmail}${isGuest ? ' (guest)' : ''}`);
    } catch (emailErr) {
      console.error('Failed to send masterclass welcome email:', emailErr);
    }

    // Telegram notification (non-critical)
    const tierLabels: Record<string, string> = {
      masterclass: 'Masterclass',
      'inner-circle-yearly': 'Inner Circle Annual',
      'lifetime-vip': 'Lifetime VIP',
    };
    await sendPaymentNotification({
      customerEmail,
      productName: `Mikki Mase ${tierLabels[productKey] || 'Masterclass'}${isGuest ? ' (Guest)' : ''}`,
      amountCents: paymentIntent.amount ?? 6700,
      currency: paymentIntent.currency || 'usd',
      stripeSessionId: paymentIntent.id,
    });
  }
}

// ============================================
// REFUND HANDLER
// ============================================

async function handleRefund(charge: Stripe.Charge) {
  console.log('Processing refund for charge:', charge.id);

  // Only revoke access on full refund
  if (!charge.refunded) {
    console.log('Partial refund detected, keeping access active:', charge.id);
    return;
  }

  const supabase = getServiceClient();

  const paymentIntentId = typeof charge.payment_intent === 'string'
    ? charge.payment_intent
    : (charge.payment_intent as any)?.id;

  if (!paymentIntentId) {
    console.log('No payment_intent on charge, skipping refund processing');
    return;
  }

  const { data: purchase, error } = await supabase
    .from('purchases')
    .update({ status: 'refunded' })
    .eq('stripe_payment_intent_id', paymentIntentId)
    .eq('status', 'completed')
    .select('id, user_id, product_key')
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No matching purchase found — expected for non-masterclass charges
      console.log('No matching purchase found for refund:', paymentIntentId);
      return;
    }
    // Real DB error — throw to trigger retry
    throw new Error(`Refund DB error: ${error.message}`);
  }

  console.log(`Purchase ${purchase.id} marked as refunded (user: ${purchase.user_id}, product: ${purchase.product_key})`);

  // Telegram refund notification (non-critical)
  await sendRefundNotification({
    type: 'refund',
    userId: purchase.user_id,
    productKey: purchase.product_key,
    purchaseId: purchase.id,
  });
}

// ============================================
// DISPUTE HANDLER
// ============================================

async function handleDispute(dispute: Stripe.Dispute) {
  console.log('Processing dispute:', dispute.id);

  const supabase = getServiceClient();

  const paymentIntentId = typeof dispute.payment_intent === 'string'
    ? dispute.payment_intent
    : (dispute.payment_intent as any)?.id;

  if (!paymentIntentId) {
    console.log('No payment_intent on dispute, skipping');
    return;
  }

  // Disputes always revoke access (charged back)
  const { data: purchase, error } = await supabase
    .from('purchases')
    .update({ status: 'refunded' })
    .eq('stripe_payment_intent_id', paymentIntentId)
    .eq('status', 'completed')
    .select('id, user_id, product_key')
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No matching purchase found — expected for non-masterclass charges
      console.log('No matching purchase found for dispute:', paymentIntentId);
      return;
    }
    // Real DB error — throw to trigger retry
    throw new Error(`Dispute DB error: ${error.message}`);
  }

  console.log(`Purchase ${purchase.id} revoked due to dispute (user: ${purchase.user_id})`);

  // Telegram dispute notification (non-critical)
  await sendRefundNotification({
    type: 'dispute',
    userId: purchase.user_id,
    productKey: purchase.product_key,
    purchaseId: purchase.id,
  });
}
