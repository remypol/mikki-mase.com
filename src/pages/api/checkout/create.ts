/**
 * Checkout Create Endpoint
 * Creates a Stripe Checkout Session for product purchases
 */

import type { APIRoute } from 'astro';
import { getStripeServer } from '../../../lib/stripe';
import { getProductById } from '../../../config/shop/products';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { productId, variantId, quantity = 1 } = body;

    // Validate product exists
    const product = getProductById(productId);
    if (!product) {
      return new Response(
        JSON.stringify({ error: 'Product not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Determine price ID
    let priceId = product.stripePriceId;
    if (variantId && product.variants) {
      const variant = product.variants.find(v => v.id === variantId);
      if (variant) {
        priceId = variant.stripePriceId;
      }
    }

    const stripe = await getStripeServer();
    const siteUrl = import.meta.env.SITE_URL || 'https://mikki-mase.com';

    // Build session configuration
    const sessionConfig: any = {
      mode: 'payment',
      payment_method_types: ['card'],
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
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Checkout error:', error);

    return new Response(
      JSON.stringify({ error: 'Failed to create checkout session' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
