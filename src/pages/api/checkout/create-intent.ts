/**
 * Create PaymentIntent for custom Payment Element checkout
 * Used by CustomMasterclassCheckout for fully branded dark-theme payment form.
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { getStripeServer } from '../../../lib/stripe';
import { getServerClient, getServiceClient } from '../../../lib/supabase';

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

    const { productKey } = body;

    if (productKey !== 'masterclass') {
      return new Response(
        JSON.stringify({ error: 'This endpoint only supports masterclass checkout' }),
        { status: 400, headers }
      );
    }

    // Flat $27 pricing
    const amount = 2700;

    // Auth is OPTIONAL — supports both logged-in and guest checkout
    const supabase = getServerClient(cookies, request);
    const { data: { user } } = await supabase.auth.getUser();

    const serviceClient = getServiceClient();

    // If logged in, check for existing purchase
    if (user) {
      const { data: existingPurchase, error: purchaseLookupError } = await serviceClient
        .from('purchases')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_key', 'masterclass')
        .eq('status', 'completed')
        .limit(1)
        .single();

      if (purchaseLookupError && purchaseLookupError.code !== 'PGRST116') {
        console.error('Purchase lookup failed:', purchaseLookupError);
        return new Response(
          JSON.stringify({ error: 'Unable to verify purchase status' }),
          { status: 503, headers }
        );
      }

      if (existingPurchase) {
        return new Response(
          JSON.stringify({ error: 'Already purchased', redirect: '/masterclass/course' }),
          { status: 409, headers }
        );
      }
    }

    const stripe = await getStripeServer();

    // Build metadata
    const metadata: Record<string, string> = {
      productKey: 'masterclass',
      productId: 'masterclass',
      fulfillmentType: 'digital',
    };

    if (user) {
      metadata.userId = user.id;
      metadata.userEmail = user.email || '';
    } else {
      metadata.isGuestCheckout = 'true';
    }


    // PaymentIntent config — auto-detect enabled payment methods
    // Apple Pay & Google Pay work automatically via card
    // Disable Link in Stripe Dashboard: dashboard.stripe.com/settings/payment_methods
    const piConfig: Record<string, any> = {
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata,
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

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        isGuest: !user,
        amount: amount / 100,
      }),
      { status: 200, headers }
    );

  } catch (error: any) {
    console.error('PaymentIntent error:', error?.message || error);

    return new Response(
      JSON.stringify({
        error: 'Failed to create payment',
        detail: error?.message || 'Unknown error',
      }),
      { status: 500, headers }
    );
  }
};
