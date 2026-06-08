/**
 * Update the most recent guest PaymentIntent with a receipt email.
 *
 * The custom Payment Element collects the guest's email AFTER the
 * PaymentIntent is created. This endpoint attaches that email to the
 * PaymentIntent's `receipt_email` server-side so the Stripe webhook can
 * deliver downloads even if the client-side `confirmParams.receipt_email`
 * is dropped. Purely additive infra — safe for both the legacy masterclass
 * flow and the new all-PDF funnel.
 *
 * Identity: we read the PaymentIntent id the client just created. The client
 * passes it back explicitly (it already holds the client_secret). We never
 * trust the email for pricing — only for receipt/fulfillment delivery.
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { getStripeServer } from '../../../lib/stripe';

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  // CSRF: verify origin (same policy as create-intent)
  const origin = request.headers.get('origin');
  const siteUrl = import.meta.env.SITE_URL || 'https://www.mikki-mase.com';
  const allowedOrigins = new Set([
    new URL(siteUrl).origin,
    'https://www.mikki-mase.com',
    'https://mikki-mase.com',
    ...(import.meta.env.DEV ? ['http://localhost:4321', 'http://localhost:3000'] : []),
  ]);
  if (!origin || !allowedOrigins.has(origin)) {
    return new Response(JSON.stringify({ error: 'Invalid or missing origin' }), { status: 403, headers });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers });
  }

  const { email, clientSecret, paymentIntentId } = body || {};
  if (!email || typeof email !== 'string' || !validateEmail(email.trim())) {
    return new Response(JSON.stringify({ error: 'Valid email required' }), { status: 400, headers });
  }

  // Derive the PaymentIntent id. Prefer an explicit id; otherwise parse it out
  // of the client_secret (format: pi_XXX_secret_YYY).
  let piId: string | undefined = typeof paymentIntentId === 'string' ? paymentIntentId : undefined;
  if (!piId && typeof clientSecret === 'string' && clientSecret.startsWith('pi_')) {
    piId = clientSecret.split('_secret_')[0];
  }
  if (!piId) {
    // Nothing to update — non-fatal. The client-side receipt_email still applies.
    return new Response(JSON.stringify({ ok: false, reason: 'no payment intent id' }), { status: 200, headers });
  }

  try {
    const stripe = await getStripeServer();
    await stripe.paymentIntents.update(piId, {
      receipt_email: email.trim(),
      metadata: { userEmail: email.trim().toLowerCase() },
    });
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err: any) {
    console.error('update-intent-email failed:', err?.message || err);
    // Non-fatal — webhook can still fall back to client-supplied receipt_email.
    return new Response(JSON.stringify({ ok: false }), { status: 200, headers });
  }
};
