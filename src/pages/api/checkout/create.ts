/**
 * Checkout Create Endpoint
 * Creates a Stripe Checkout Session for product purchases
 *
 * For masterclass: requires auth, derives userId from session
 * For shop products: works without auth (legacy flow)
 */

// Must be server-rendered (not prerendered)
export const prerender = false;

import type { APIRoute } from 'astro';
import { getStripeServer } from '../../../lib/stripe';
import { getServerClient, getServiceClient } from '../../../lib/supabase';
import { getProductById, productKeyToPriceId } from '../../../config/shop/products';

export const POST: APIRoute = async ({ request, cookies }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    // CSRF: verify origin (allow both www and non-www)
    const origin = request.headers.get('origin');
    const siteUrl = import.meta.env.SITE_URL || 'https://www.mikki-mase.com';
    const allowedOrigins = new Set([
      new URL(siteUrl).origin,
      'https://www.mikki-mase.com',
      'https://mikki-mase.com',
      ...(import.meta.env.DEV ? ['http://localhost:4321', 'http://localhost:3000'] : []),
    ]);

    if (!origin || !allowedOrigins.has(origin)) {
      console.warn('CSRF origin rejected:', origin, '| Allowed:', [...allowedOrigins]);
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

    const { productId, productKey, variantId, embedded } = body;
    const quantity = Math.max(1, Math.min(10, Math.floor(Number(body.quantity) || 1)));

    // ============================================
    // MASTERCLASS CHECKOUT (auth-gated)
    // ============================================

    if (productKey === 'masterclass') {
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

        // PGRST116 = no rows found (expected when not purchased)
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

      // Derive price server-side (never trust client-sent price)
      const priceId = productKeyToPriceId['masterclass'];
      if (!priceId || priceId.includes('placeholder')) {
        return new Response(
          JSON.stringify({ error: 'Masterclass product not configured in Stripe' }),
          { status: 500, headers }
        );
      }

      const stripe = await getStripeServer();

      // Build metadata — include userId only if authenticated
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

      const sessionConfig: Record<string, any> = {
        mode: 'payment' as const,
        // No payment_method_types — let Stripe auto-select based on customer location
        // (shows Card, Apple Pay, Google Pay, PayPal, Klarna, etc.)
        line_items: [{ price: priceId, quantity: 1 }],
        metadata,
        allow_promotion_codes: true,
      };

      if (user) {
        sessionConfig.client_reference_id = user.id;
      }

      // Embedded mode: render checkout on our site (no redirect to Stripe)
      if (embedded) {
        sessionConfig.ui_mode = 'embedded';
        sessionConfig.return_url = `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
      } else {
        sessionConfig.success_url = `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
        sessionConfig.cancel_url = `${siteUrl}/masterclass`;
      }

      // Link to existing Stripe customer if logged in
      if (user) {
        let stripeCustomerId: string | undefined;
        const { data: profile, error: profileError } = await serviceClient
          .from('profiles')
          .select('stripe_customer_id')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Profile lookup failed:', profileError);
        }

        if (profile?.stripe_customer_id) {
          stripeCustomerId = profile.stripe_customer_id;
        }

        if (stripeCustomerId) {
          sessionConfig.customer = stripeCustomerId;
        } else {
          sessionConfig.customer_email = user.email;
          sessionConfig.customer_creation = 'always';
        }
      } else {
        // Guest checkout — Stripe will collect email in the form
        sessionConfig.customer_creation = 'always';
      }

      const session = await stripe.checkout.sessions.create(sessionConfig);

      // Embedded mode returns clientSecret; hosted mode returns URL
      if (embedded) {
        return new Response(
          JSON.stringify({ clientSecret: session.client_secret }),
          { status: 200, headers }
        );
      }

      return new Response(
        JSON.stringify({ url: session.url, sessionId: session.id }),
        { status: 200, headers }
      );
    }

    // ============================================
    // STANDARD SHOP CHECKOUT (existing flow)
    // ============================================

    // Validate product exists
    const product = getProductById(productId);
    if (!product) {
      return new Response(
        JSON.stringify({ error: 'Product not found' }),
        { status: 404, headers }
      );
    }

    // Determine price ID
    let priceId = product.stripePriceId;
    if (variantId) {
      if (!product.variants) {
        return new Response(
          JSON.stringify({ error: 'Product has no variants' }),
          { status: 400, headers }
        );
      }
      const variant = product.variants.find(v => v.id === variantId);
      if (!variant) {
        return new Response(
          JSON.stringify({ error: 'Variant not found' }),
          { status: 400, headers }
        );
      }
      priceId = variant.stripePriceId;
    }

    const stripe = await getStripeServer();

    // Build session configuration
    const sessionConfig: any = {
      mode: 'payment',
      // No payment_method_types — let Stripe auto-select based on customer location
      line_items: [
        {
          price: priceId,
          quantity,
        },
      ],
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/${product.slug}`,
      metadata: {
        productId: product.id,
        variantId: variantId || '',
        fulfillmentType: product.fulfillment,
      },
      // Collect customer email
      customer_creation: 'always',
      // Allow promotion codes
      allow_promotion_codes: true,
      // Billing address collection
      billing_address_collection: 'auto',
    };

    // Physical products need shipping
    if (product.fulfillment === 'physical' || product.fulfillment === 'hybrid') {
      sessionConfig.shipping_address_collection = {
        allowed_countries: [
          'US', 'CA', 'GB', 'AU', 'NL', 'DE', 'FR', 'ES', 'IT', 'BE'
        ],
      };
    }

    // Create session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      { status: 200, headers }
    );

  } catch (error: any) {
    console.error('Checkout error:', error?.message || error);

    return new Response(
      JSON.stringify({
        error: 'Failed to create checkout session',
        detail: error?.message || 'Unknown error',
      }),
      { status: 500, headers }
    );
  }
};
