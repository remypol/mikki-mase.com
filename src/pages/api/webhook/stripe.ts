/**
 * Stripe Webhook Handler
 * Handles checkout.session.completed and other Stripe events
 */

import type { APIRoute } from 'astro';
import type Stripe from 'stripe';
import { getStripeServer } from '../../../lib/stripe';
import { getProductById } from '../../../config/shop/products';
import { generateDownloadToken, getDownloadUrl } from '../../../lib/downloads';
import { sendPurchaseConfirmation } from '../../../lib/resend';

const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

export const POST: APIRoute = async ({ request }) => {
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

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutComplete(session);
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Checkout session expired:', session.id);
      // Optional: Send abandoned cart email
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', paymentIntent.id);
      // Optional: Send payment failure notification
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response('OK', { status: 200 });
};

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const { productId, fulfillmentType } = session.metadata || {};

  if (!productId) {
    console.error('No productId in session metadata');
    return;
  }

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

  // Handle based on fulfillment type
  switch (fulfillmentType) {
    case 'digital': {
      // Generate download token
      const token = generateDownloadToken(productId, customerEmail, session.id);
      const downloadUrl = getDownloadUrl(token);

      // Send email
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
      // Notify fulfillment service (future implementation)
      // await notifyFulfillment(session);
      console.log('Physical product order received');
      break;
    }

    case 'hybrid': {
      // Both digital download and physical shipping
      const token = generateDownloadToken(productId, customerEmail, session.id);
      const downloadUrl = getDownloadUrl(token);

      await sendPurchaseConfirmation({
        customerEmail,
        productName: product.name,
        orderNumber: session.id.slice(-8).toUpperCase(),
        downloadLink: downloadUrl,
      });
      // await notifyFulfillment(session);
      break;
    }
  }
}
