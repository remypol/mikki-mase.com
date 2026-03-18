/**
 * EmbeddedMasterclassCheckout — Renders Stripe Embedded Checkout
 *
 * Tries embedded checkout first. If it fails, automatically falls back
 * to hosted Stripe checkout (redirect) so the user can always pay.
 */

import { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function EmbeddedMasterclassCheckout() {
  const [error, setError] = useState<string | null>(null);
  const [fallbackLoading, setFallbackLoading] = useState(false);

  /** Fallback: redirect to hosted Stripe checkout */
  async function fallbackToHostedCheckout() {
    setFallbackLoading(true);
    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productKey: 'masterclass' }), // no embedded flag
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/auth/login?next=/checkout/masterclass&checkout=true';
          return;
        }
        throw new Error(data.error || 'Checkout failed');
      }

      if (data.url) {
        // GA4 tracking
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'begin_checkout',
            ecommerce: {
              currency: 'USD',
              value: 47,
              items: [{ item_id: 'masterclass', item_name: 'The Mikki Mase Masterclass', price: 47, quantity: 1 }],
            },
          });
        }
        await new Promise((r) => setTimeout(r, 100));
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setFallbackLoading(false);
    }
  }

  const fetchClientSecret = useCallback(async () => {
    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productKey: 'masterclass', embedded: true }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/auth/login?next=/checkout/masterclass&checkout=true';
          throw new Error('Authentication required');
        }
        if (res.status === 409 && data.redirect) {
          window.location.href = data.redirect;
          throw new Error('Already purchased');
        }
        // Embedded failed — try hosted checkout as fallback
        console.warn('Embedded checkout failed, falling back to hosted:', data.error);
        fallbackToHostedCheckout();
        throw new Error(data.error || 'Falling back to hosted checkout');
      }

      // GA4 begin_checkout event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'begin_checkout',
          ecommerce: {
            currency: 'USD',
            value: 47,
            items: [{
              item_id: 'masterclass',
              item_name: 'The Mikki Mase Masterclass',
              price: 47,
              quantity: 1,
            }],
          },
        });
      }

      // Notify (non-critical)
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'checkout_start', detail: 'embedded masterclass' }),
      }).catch(() => {});

      return data.clientSecret;
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      throw err;
    }
  }, []);

  if (error) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: '#111', border: '1px solid #2D2D2D' }}
      >
        <div
          className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(168, 0, 30, 0.15)' }}
        >
          <svg className="w-6 h-6" style={{ color: '#A8001E' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-white font-semibold mb-2">Loading secure checkout...</p>
        <p className="text-sm mb-4" style={{ color: '#9A9A9A' }}>
          Redirecting you to our payment page...
        </p>
        <button
          onClick={fallbackToHostedCheckout}
          disabled={fallbackLoading}
          className="inline-flex items-center justify-center font-bold text-white min-h-[44px] rounded-xl px-6 transition-all hover:brightness-110 disabled:opacity-50"
          style={{ backgroundColor: '#A8001E' }}
        >
          {fallbackLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Redirecting...
            </>
          ) : (
            'Continue to Payment →'
          )}
        </button>
      </div>
    );
  }

  return (
    <div id="checkout-container">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
