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
  const { productId, productKey, fulfillmentType, userId, userEmail } = session.metadata || {};

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
  // MASTERCLASS PURCHASE
  // ============================================

  if (productKey === 'masterclass' && userId) {
    const supabase = getServiceClient();

    // Insert purchase record (unique constraint on stripe_session_id prevents duplicates)
    const { error: purchaseError } = await supabase.from('purchases').insert({
      user_id: userId,
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
      console.log(`Masterclass purchase recorded for user ${userId}`);
    }

    // Link Stripe customer ID to profile (non-critical, don't throw on failure)
    if (session.customer) {
      const customerId = typeof session.customer === 'string'
        ? session.customer
        : (session.customer as any).id;

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId)
        .is('stripe_customer_id', null);

      if (profileError) {
        console.warn('Failed to link Stripe customer to profile:', profileError.message);
      }
    }

    // Send welcome email (non-critical, don't throw on failure)
    const customerEmail = userEmail || session.customer_details?.email;
    if (customerEmail) {
      try {
        const cheatsheetToken = generateDownloadToken('mmc-cheatsheet-bundle', customerEmail, session.id);
        const ebookToken = generateDownloadToken('beat-the-casino', customerEmail, session.id);

        await sendMasterclassWelcome({
          customerEmail,
          customerName: session.customer_details?.name || undefined,
          courseUrl: 'https://www.mikki-mase.com/masterclass/course',
          cheatsheetDownloadUrl: getDownloadUrl(cheatsheetToken),
          ebookDownloadUrl: getDownloadUrl(ebookToken),
        });
        console.log(`Masterclass welcome email sent to ${customerEmail}`);
      } catch (emailErr) {
        // Email failure is non-critical — don't fail the whole webhook
        console.error('Failed to send masterclass welcome email:', emailErr);
      }

      // Telegram notification (non-critical)
      await sendPaymentNotification({
        customerEmail,
        customerName: session.customer_details?.name || undefined,
        productName: 'Mikki Mase Masterclass',
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
  const { userId, userEmail, productKey } = paymentIntent.metadata || {};

  // Only handle masterclass purchases from the custom payment element flow
  if (productKey !== 'masterclass' || !userId) {
    // Not a masterclass payment or handled by checkout.session.completed
    return;
  }

  const supabase = getServiceClient();

  // Check if purchase was already recorded (by checkout.session.completed or duplicate)
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
    user_id: userId,
    stripe_session_id: `pi_${paymentIntent.id}`, // Use PI id as session ref
    stripe_payment_intent_id: paymentIntent.id,
    product_key: 'masterclass',
    amount_cents: paymentIntent.amount ?? 4700,
    status: 'completed',
  });

  if (purchaseError) {
    if (purchaseError.code === '23505') {
      console.log('Purchase already recorded for PI:', paymentIntent.id);
    } else {
      throw new Error(`Failed to insert purchase: ${purchaseError.message}`);
    }
  } else {
    console.log(`Masterclass purchase recorded via PaymentIntent for user ${userId}`);
  }

  // Link Stripe customer ID to profile (non-critical)
  if (paymentIntent.customer) {
    const customerId = typeof paymentIntent.customer === 'string'
      ? paymentIntent.customer
      : (paymentIntent.customer as any).id;

    await supabase
      .from('profiles')
      .update({ stripe_customer_id: customerId })
      .eq('id', userId)
      .is('stripe_customer_id', null);
  }

  // Send welcome email (non-critical)
  const customerEmail = userEmail || paymentIntent.receipt_email;
  if (customerEmail) {
    try {
      const cheatsheetToken = generateDownloadToken('mmc-cheatsheet-bundle', customerEmail, paymentIntent.id);
      const ebookToken = generateDownloadToken('beat-the-casino', customerEmail, paymentIntent.id);

      await sendMasterclassWelcome({
        customerEmail,
        courseUrl: 'https://www.mikki-mase.com/masterclass/course',
        cheatsheetDownloadUrl: getDownloadUrl(cheatsheetToken),
        ebookDownloadUrl: getDownloadUrl(ebookToken),
      });
      console.log(`Masterclass welcome email sent to ${customerEmail}`);
    } catch (emailErr) {
      console.error('Failed to send masterclass welcome email:', emailErr);
    }

    // Telegram notification (non-critical)
    await sendPaymentNotification({
      customerEmail,
      productName: 'Mikki Mase Masterclass',
      amountCents: paymentIntent.amount ?? 4700,
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
