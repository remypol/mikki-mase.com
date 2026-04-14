/**
 * Create PaymentIntent for custom Payment Element checkout
 * Supports multiple pricing tiers:
 * - masterclass: $67 one-time
 * - inner-circle-yearly: $99.99/yr (handled as one-time, subscription created via webhook)
 * - lifetime-vip: $249 one-time
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { getStripeServer } from '../../../lib/stripe';
import { getServerClient, getServiceClient } from '../../../lib/supabase';

// Tier pricing in cents (server-authoritative — never trust client)
const TIER_PRICING: Record<string, { amount: number; label: string }> = {
  // Legacy (keep for existing customers)
  masterclass: { amount: 6700, label: 'Masterclass' },
  'inner-circle-yearly': { amount: 9999, label: 'Inner Circle Annual' },
  'lifetime-vip': { amount: 24900, label: 'Lifetime VIP' },
  // New funnel
  'session-playbook': { amount: 2700, label: 'Session Playbook' },
  'session-toolkit': { amount: 900, label: 'Session Toolkit' },
  'full-masterclass': { amount: 7900, label: 'Full Masterclass' },
  'inner-circle-monthly-v2': { amount: 2900, label: 'Inner Circle Monthly' },
  'inner-circle-annual-v2': { amount: 24900, label: 'Inner Circle Annual' },
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    // CSRF: verify origin
    const origin = request.headers.get('origin');
    const siteUrl = import.meta.env.SITE_URL || 'https://www.mikki-mase.com';
    const allowedOrigins = new Set([
      new URL(siteUrl).origin,
      'https://www.mikki-mase.com',
      'https://mikki-mase.com',
      ...(import.meta.env.DEV ? ['http://localhost:4321', 'http://localhost:3000'] : []),
    ]);

    if (!origin || !allowedOrigins.has(origin)) {
      return new Response(
        JSON.stringify({ error: 'Invalid or missing origin' }),
        { status: 403, headers }
      );
    }

    // Verify Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Content-Type must be application/json' }),
        { status: 400, headers }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers }
      );
    }

    const { productKey, tier } = body;

    // Resolve which tier to charge
    const resolvedTier = tier || productKey || 'masterclass';

    if (!TIER_PRICING[resolvedTier]) {
      return new Response(
        JSON.stringify({ error: `Unknown tier: ${resolvedTier}` }),
        { status: 400, headers }
      );
    }

    const { amount, label } = TIER_PRICING[resolvedTier];

    // Auth is OPTIONAL — supports both logged-in and guest checkout
    const supabase = getServerClient(cookies, request);
    const { data: { user } } = await supabase.auth.getUser();

    const serviceClient = getServiceClient();

    // If logged in, check for existing purchase or subscription
    if (user) {
      // Check one-time purchase
      const { data: existingPurchase } = await serviceClient
        .from('purchases')
        .select('id, product_key')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .in('product_key', ['masterclass', 'inner-circle-yearly', 'lifetime-vip']);

      if (existingPurchase && existingPurchase.length > 0) {
        // If they already have lifetime VIP, no need to buy anything
        const hasLifetime = existingPurchase.some((p: any) => p.product_key === 'lifetime-vip');
        if (hasLifetime) {
          return new Response(
            JSON.stringify({ error: 'Already purchased', redirect: '/masterclass/course' }),
            { status: 409, headers }
          );
        }

        // If buying same tier, redirect
        const hasSameTier = existingPurchase.some((p: any) => p.product_key === resolvedTier);
        if (hasSameTier) {
          return new Response(
            JSON.stringify({ error: 'Already purchased', redirect: '/masterclass/course' }),
            { status: 409, headers }
          );
        }

        // If they have masterclass and are upgrading, allow it
        // (Inner Circle or Lifetime VIP upgrade)
      }

      // Also check active subscriptions (graceful if table doesn't exist yet)
      try {
        const { data: existingSub } = await serviceClient
          .from('subscriptions')
          .select('id, plan')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle();

        if (existingSub && resolvedTier === 'inner-circle-yearly') {
          return new Response(
            JSON.stringify({ error: 'Active subscription exists', redirect: '/masterclass/course' }),
            { status: 409, headers }
          );
        }
      } catch {
        // subscriptions table might not exist yet — skip check
      }
    }

    const stripe = await getStripeServer();

    // Build metadata
    const metadata: Record<string, string> = {
      productKey: resolvedTier,
      productId: resolvedTier,
      fulfillmentType: 'digital',
      tier: resolvedTier,
    };

    if (user) {
      metadata.userId = user.id;
      metadata.userEmail = user.email || '';
    } else {
      metadata.isGuestCheckout = 'true';
    }

    // PaymentIntent config
    const piConfig: Record<string, any> = {
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata,
      description: `Mikki Mase - ${label}`,
    };

    // Link to Stripe customer if logged in
    if (user) {
      let stripeCustomerId: string | undefined;
      const { data: profile } = await serviceClient
        .from('profiles')
        .select('stripe_customer_id')
        .eq('id', user.id)
        .single();

      if (profile?.stripe_customer_id) {
        stripeCustomerId = profile.stripe_customer_id;
      } else if (user.email) {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: { supabase_user_id: user.id },
        });
        stripeCustomerId = customer.id;

        await serviceClient
          .from('profiles')
          .update({ stripe_customer_id: customer.id })
          .eq('id', user.id);
      }

      if (stripeCustomerId) piConfig.customer = stripeCustomerId;
      if (user.email) piConfig.receipt_email = user.email;
    }

    const paymentIntent = await stripe.paymentIntents.create(piConfig);

    // Track checkout intent for abandoned cart recovery
    const trackEmail = user?.email || null;
    if (trackEmail) {
      try {
        await serviceClient.from('checkout_intents').insert({
          email: trackEmail,
          product_key: resolvedTier,
          tier: resolvedTier,
        });
      } catch { /* non-critical */ }
    }

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        isGuest: !user,
        amount: amount / 100,
        tier: resolvedTier,
      }),
      { status: 200, headers }
    );

  } catch (error: any) {
    console.error('PaymentIntent error:', error?.message || error);

    return new Response(
      JSON.stringify({ error: 'Failed to create payment. Please try again.' }),
      { status: 500, headers }
    );
  }
};
