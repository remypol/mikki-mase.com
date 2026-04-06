/**
 * CustomMasterclassCheckout — Stripe Payment Element with full dark branding
 *
 * Uses PaymentIntent + Payment Element for complete UI control.
 * Dark theme matching the site's #0A0A0A / #111 / #CFB53B palette.
 * Works for both authenticated users and guests (guests get an email field).
 */

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
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
function CheckoutForm({ returnUrl, isGuest, price, tier }: { returnUrl: string; isGuest: boolean; price: number; tier: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    // Validate email for guests
    if (isGuest) {
      if (!email.trim()) {
        setEmailError('Email is required');
        return;
      }
      if (!validateEmail(email.trim())) {
        setEmailError('Please enter a valid email address');
        return;
      }
      setEmailError(null);
    }

    setError(null);
    setLoading(true);

    // GA4 tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'begin_checkout',
        ecommerce: {
          currency: 'USD',
          value: price,
          items: [{ item_id: tier, item_name: `Mikki Mase - ${tier}`, price, quantity: 1 }],
        },
      });
    }

    // Update PaymentIntent with guest email before confirming
    if (isGuest && email.trim()) {
      try {
        await fetch('/api/checkout/update-intent-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() }),
        });
      } catch {
        // Non-critical — webhook will use customer_details.email from Stripe
      }
    }

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
          ...(isGuest && email.trim() ? { receipt_email: email.trim() } : {}),
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
    } catch (err: any) {
      setError(err?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Email field for guest checkout */}
      {isGuest && (
        <div className="mb-5">
          <label
            htmlFor="guest-email"
            style={{ color: '#BEBEBE', fontSize: '13px', fontWeight: 500 }}
            className="block mb-1.5"
          >
            Email
          </label>
          <input
            id="guest-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(null); }}
            placeholder="you@example.com"
            required
            className="w-full rounded-xl px-4 py-3 text-white outline-none transition-colors"
            style={{
              backgroundColor: '#1A1A1A',
              border: emailError ? '1px solid #A8001E' : '1px solid #2D2D2D',
              fontSize: '15px',
            }}
            onFocus={(e) => (e.target.style.border = '1px solid #CFB53B')}
            onBlur={(e) => (e.target.style.border = emailError ? '1px solid #A8001E' : '1px solid #2D2D2D')}
          />
          {emailError && (
            <p className="text-xs mt-1" style={{ color: '#A8001E' }}>{emailError}</p>
          )}
          <p className="text-xs mt-1.5" style={{ color: '#6B6B6B' }}>
            We'll send your course access to this email
          </p>
        </div>
      )}

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
        className="w-full mt-6 font-bold text-black min-h-[52px] rounded-xl px-8 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
        style={{ backgroundColor: '#CFB53B', color: '#000000' }}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          `Pay $${price}`
        )}
      </button>

      <p className="text-center text-xs mt-3" style={{ color: '#6B6B6B' }}>
        Secure payment powered by Stripe
      </p>
      <p className="text-center text-xs mt-1.5" style={{ color: '#9A9A9A' }}>
        7-day money-back guarantee · No questions asked · Cancel anytime
      </p>
    </form>
  );
}

/** Main component — always branded, works for guests and authenticated users */
export default function CustomMasterclassCheckout() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [price, setPrice] = useState(67);
  const [tier, setTier] = useState('masterclass');

  const returnUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/checkout/success`
    : 'https://mikki-mase.com/checkout/success';

  useEffect(() => {
    // Read tier from URL query param (set by pricing section links)
    const params = new URLSearchParams(window.location.search);
    const tier = params.get('tier') || 'masterclass';

    // Server determines price — client sends tier selection only
    fetch('/api/checkout/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productKey: 'masterclass', tier }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 409 && data.redirect) {
            window.location.href = data.redirect;
            return;
          }
          throw new Error(data.error || 'Failed to initialize payment');
        }
        setClientSecret(data.clientSecret);
        setIsGuest(data.isGuest || false);
        if (data.amount) setPrice(data.amount);
        if (data.tier) setTier(data.tier);

        // Notify
        fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'checkout_start', detail: `${data.isGuest ? 'guest' : 'auth'} $${data.amount}` }),
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
          style={{ backgroundColor: '#CFB53B', color: '#000000' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!clientSecret) return null;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance,
      }}
    >
      <CheckoutForm returnUrl={returnUrl} isGuest={isGuest} price={price} tier={tier} />
    </Elements>
  );
}
