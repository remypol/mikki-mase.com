/**
 * CustomMasterclassCheckout — Stripe Payment Element with full dark branding
 *
 * Uses PaymentIntent + Payment Element for complete UI control.
 * Dark theme matching the site's #0A0A0A / #111 / #CFB53B palette.
 */

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// Dark theme appearance matching the site
const appearance = {
  theme: 'night' as const,
  variables: {
    colorPrimary: '#CFB53B',
    colorBackground: '#111111',
    colorText: '#FFFFFF',
    colorTextSecondary: '#9A9A9A',
    colorDanger: '#A8001E',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    borderRadius: '12px',
    spacingUnit: '4px',
    fontSizeBase: '15px',
    colorTextPlaceholder: '#6B6B6B',
  },
  rules: {
    '.Input': {
      backgroundColor: '#1A1A1A',
      border: '1px solid #2D2D2D',
      color: '#FFFFFF',
      padding: '12px 16px',
    },
    '.Input:focus': {
      border: '1px solid #CFB53B',
      boxShadow: '0 0 0 1px #CFB53B',
    },
    '.Label': {
      color: '#BEBEBE',
      fontSize: '13px',
      fontWeight: '500',
    },
    '.Tab': {
      backgroundColor: '#1A1A1A',
      border: '1px solid #2D2D2D',
      color: '#BEBEBE',
    },
    '.Tab--selected': {
      backgroundColor: '#2D2D2D',
      border: '1px solid #CFB53B',
      color: '#FFFFFF',
    },
    '.Tab:hover': {
      backgroundColor: '#222222',
      color: '#FFFFFF',
    },
    '.TabIcon--selected': {
      fill: '#CFB53B',
    },
    '.Block': {
      backgroundColor: '#111111',
      border: '1px solid #2D2D2D',
    },
  },
};

/** Inner form component — must be inside <Elements> */
function CheckoutForm({ returnUrl }: { returnUrl: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setError(null);
    setLoading(true);

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

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    // This will only reach here if there's an error (success = redirect)
    if (submitError) {
      if (submitError.type === 'card_error' || submitError.type === 'validation_error') {
        setError(submitError.message || 'Payment failed.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          layout: {
            type: 'tabs',
            defaultCollapsed: false,
          },
        }}
      />

      {error && (
        <div
          className="mt-4 rounded-lg px-4 py-3 text-sm"
          style={{
            color: '#ff6b6b',
            backgroundColor: 'rgba(168, 0, 30, 0.1)',
            border: '1px solid rgba(168, 0, 30, 0.3)',
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full mt-6 font-bold text-white min-h-[52px] rounded-xl px-8 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
        style={{ backgroundColor: '#A8001E' }}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          'Pay $47 →'
        )}
      </button>

      <p className="text-center text-xs mt-3" style={{ color: '#6B6B6B' }}>
        Secure payment powered by Stripe · 7-day money-back guarantee
      </p>
    </form>
  );
}

/** Main component — handles PaymentIntent creation and Elements setup */
export default function CustomMasterclassCheckout() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmbeddedMode, setIsEmbeddedMode] = useState(false);

  const returnUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/checkout/success`
    : 'https://mikki-mase.com/checkout/success';

  useEffect(() => {
    // Try PaymentIntent first (for logged-in users), fall back to checkout session (guest-compatible)
    fetch('/api/checkout/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productKey: 'masterclass' }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          // 401 = not logged in → use guest-compatible checkout session instead
          if (res.status === 401) {
            return fetch('/api/checkout/create', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ productKey: 'masterclass', embedded: true }),
            }).then(async (res2) => {
              const data2 = await res2.json();
              if (!res2.ok) {
                if (res2.status === 409 && data2.redirect) {
                  window.location.href = data2.redirect;
                  return;
                }
                throw new Error(data2.error || 'Failed to initialize payment');
              }
              // Switch to embedded checkout mode
              setClientSecret(data2.clientSecret);
              setIsEmbeddedMode(true);
            });
          }
          if (res.status === 409 && data.redirect) {
            window.location.href = data.redirect;
            return;
          }
          throw new Error(data.error || 'Failed to initialize payment');
        }
        setClientSecret(data.clientSecret);

        // Notify
        fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'checkout_start', detail: 'custom payment element' }),
        }).catch(() => {});
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-white/20 border-t-[#CFB53B] rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: '#111', border: '1px solid #2D2D2D' }}
      >
        <p className="text-white font-semibold mb-2">Unable to load payment form</p>
        <p className="text-sm mb-4" style={{ color: '#9A9A9A' }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="font-bold text-white min-h-[44px] rounded-xl px-6 hover:brightness-110"
          style={{ backgroundColor: '#A8001E' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!clientSecret) return null;

  // Guest checkout: use Stripe Embedded Checkout (collects email, shows all payment methods)
  if (isEmbeddedMode) {
    return (
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    );
  }

  // Authenticated checkout: use custom Payment Element
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance,
      }}
    >
      <CheckoutForm returnUrl={returnUrl} />
    </Elements>
  );
}
