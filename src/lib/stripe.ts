/**
 * Stripe Client
 * Payment processing for mikki-mase.com shop
 *
 * Setup:
 * 1. npm install stripe @stripe/stripe-js
 * 2. Add environment variables (see below)
 * 3. Create products/prices in Stripe Dashboard
 * 4. Update stripePriceId/stripeProductId in products.ts
 *
 * Environment variables required:
 * - STRIPE_SECRET_KEY: Server-side secret key
 * - STRIPE_PUBLISHABLE_KEY: Client-side publishable key
 * - STRIPE_WEBHOOK_SECRET: Webhook signing secret
 */

import type { CheckoutSession, CheckoutResult } from '../config/shop/types';

// ============================================
// CONFIGURATION
// ============================================

const STRIPE_SECRET_KEY = import.meta.env.STRIPE_SECRET_KEY;
const STRIPE_PUBLISHABLE_KEY = import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY;
const SITE_URL = import.meta.env.SITE_URL || 'https://mikki-mase.com';

// ============================================
// SERVER-SIDE CLIENT
// ============================================

let stripeServer: any = null;

/**
 * Get server-side Stripe instance
 * Lazy initialization to avoid import errors during build
 */
export async function getStripeServer() {
  if (!stripeServer) {
    // Dynamic import to prevent build-time errors
    const Stripe = (await import('stripe')).default;
    stripeServer = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
    });
  }
  return stripeServer;
}

// ============================================
// CLIENT-SIDE LOADER
// ============================================

let stripePromise: Promise<any> | null = null;

/**
 * Get client-side Stripe instance
 * Use this in React components for Stripe.js
 */
export function getStripeClient() {
  if (!stripePromise) {
    // Dynamic import for client-side
    stripePromise = import('@stripe/stripe-js').then(({ loadStripe }) =>
      loadStripe(STRIPE_PUBLISHABLE_KEY)
    );
  }
  return stripePromise;
}

// ============================================
// CHECKOUT SESSION
// ============================================

/**
 * Create a Stripe Checkout session
 * Called from API endpoint: /api/checkout/create
 */
export async function createCheckoutSession(
  session: CheckoutSession
): Promise<CheckoutResult> {
  try {
    const stripe = await getStripeServer();

    // Import product to get Stripe price ID
    const { getProductById } = await import('../config/shop/products');
    const product = getProductById(session.productId);

    if (!product) {
      return {
        success: false,
        error: 'Product not found',
      };
    }

    // Determine price ID (variant or main product)
    let priceId = product.stripePriceId;
    if (session.variantId && product.variants) {
      const variant = product.variants.find((v) => v.id === session.variantId);
      if (variant) {
        priceId = variant.stripePriceId;
      }
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: session.quantity || 1,
        },
      ],
      success_url: `${SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/checkout/cancel`,
      customer_email: session.customerEmail,
      metadata: {
        productId: product.id,
        variantId: session.variantId || '',
        ...session.metadata,
      },
      // Allow promotion codes
      allow_promotion_codes: true,
      // Collect billing address for fraud prevention
      billing_address_collection: 'auto',
    });

    return {
      success: true,
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    };
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================
// WEBHOOK VERIFICATION
// ============================================

/**
 * Verify Stripe webhook signature
 * Called from API endpoint: /api/webhook/stripe
 */
export async function verifyWebhookSignature(
  payload: string,
  signature: string
): Promise<any> {
  const stripe = await getStripeServer();
  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

// ============================================
// RETRIEVE SESSION
// ============================================

/**
 * Retrieve checkout session details
 * Used on success page to show order confirmation
 */
export async function retrieveCheckoutSession(sessionId: string) {
  const stripe = await getStripeServer();

  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer'],
  });
}

// ============================================
// PLACEHOLDER EXPORTS
// ============================================

// These will be implemented when Stripe is configured
export const isStripeConfigured = (): boolean => {
  return Boolean(STRIPE_SECRET_KEY && STRIPE_PUBLISHABLE_KEY);
};
