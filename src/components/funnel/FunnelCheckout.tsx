/**
 * FunnelCheckout, Stripe Payment Element for the high-roller all-PDF funnel.
 *
 * Reuses the exact dark + gold appearance and guest-email pattern of
 * CustomMasterclassCheckout, but adds:
 *  - an optional order-bump checkbox that recreates the PaymentIntent with the
 *    `bump` flag so the server charges front + bump in one payment and the
 *    webhook delivers both PDFs.
 *  - a configurable success path (each step of the funnel routes onward).
 *
 * This is a NEW component used only by /funnel/* routes. It does not touch the
 * existing masterclass checkout component.
 */

import { useState, useEffect, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Partner-preview demo mode. When PUBLIC_DEMO_MODE === 'true' (set ONLY on the
// standalone preview deploy, never on production), the Stripe Payment Element is
// replaced by a styled "Complete Order (Preview)" button that simply advances to
// the next funnel step. This lets partners click the full funnel front -> bump ->
// upsells -> downsells -> success with no Stripe call and no payment. Production
// never sets this flag, so the real payment flow is untouched.
const DEMO_MODE = import.meta.env.PUBLIC_DEMO_MODE === 'true';

// Dark + gold appearance, matches the site (#0A0A0A / #111 / #D4AF37 gold).
const appearance = {
  theme: 'night' as const,
  variables: {
    colorPrimary: '#D4AF37',
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
    '.Input:focus': { border: '1px solid #D4AF37', boxShadow: '0 0 0 1px #D4AF37' },
    '.Label': { color: '#BEBEBE', fontSize: '13px', fontWeight: '500' },
    '.Tab': { backgroundColor: '#1A1A1A', border: '1px solid #2D2D2D', color: '#BEBEBE' },
    '.Tab--selected': { backgroundColor: '#2D2D2D', border: '1px solid #D4AF37', color: '#FFFFFF' },
    '.Tab:hover': { backgroundColor: '#222222', color: '#FFFFFF' },
    '.TabIcon--selected': { fill: '#D4AF37' },
    '.Block': { backgroundColor: '#111111', border: '1px solid #2D2D2D' },
  },
};

interface BumpConfig {
  label: string;
  description: string;
  price: number; // dollars
}

interface FunnelCheckoutProps {
  tier: string;
  price: number; // base price in dollars
  successPath: string; // where to send the browser after payment
  bump?: BumpConfig; // optional order bump (front offer only)
  ctaLabel?: string;
}

/**
 * Demo checkout, partner-preview only (DEMO_MODE). Mirrors the real card's
 * look (order bump + email + gold CTA) but takes no payment: the CTA advances
 * to the next funnel step so partners can walk the entire flow safely.
 */
function DemoCheckout({
  price,
  successPath,
  bump,
  ctaLabel,
}: {
  price: number;
  successPath: string;
  bump?: BumpConfig;
  ctaLabel?: string;
}) {
  const [bumpChecked, setBumpChecked] = useState(false);
  const total = price + (bump && bumpChecked ? bump.price : 0);

  function complete(e: React.FormEvent) {
    e.preventDefault();
    if (typeof window !== 'undefined') window.location.href = successPath;
  }

  return (
    <form onSubmit={complete}>
      {/* Order bump (cosmetic, updates the displayed total) */}
      {bump && (
        <label
          htmlFor="funnel-order-bump-demo"
          className="block mb-5 rounded-xl p-4 cursor-pointer transition-colors"
          style={{
            background: bumpChecked ? 'rgba(212, 175, 55, 0.08)' : 'rgba(255,255,255,0.02)',
            border: bumpChecked ? '1px solid rgba(212, 175, 55, 0.5)' : '1px dashed #3A3A3A',
          }}
        >
          <div className="flex items-start gap-3">
            <input
              id="funnel-order-bump-demo"
              type="checkbox"
              checked={bumpChecked}
              onChange={(e) => setBumpChecked(e.target.checked)}
              className="mt-1 h-5 w-5 flex-shrink-0 accent-[#D4AF37]"
            />
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: '#D4AF37' }}>
                YES! Add {bump.label}, just ${bump.price}
              </p>
              <p className="text-xs mt-1" style={{ color: '#BEBEBE' }}>
                {bump.description}
              </p>
            </div>
          </div>
        </label>
      )}

      {/* Email (cosmetic) */}
      <div className="mb-5">
        <label
          htmlFor="funnel-demo-email"
          style={{ color: '#BEBEBE', fontSize: '13px', fontWeight: 500 }}
          className="block mb-1.5"
        >
          Email
        </label>
        <input
          id="funnel-demo-email"
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl px-4 py-3 text-white outline-none transition-colors"
          style={{ backgroundColor: '#1A1A1A', border: '1px solid #2D2D2D', fontSize: '15px' }}
          onFocus={(e) => (e.target.style.border = '1px solid #D4AF37')}
          onBlur={(e) => (e.target.style.border = '1px solid #2D2D2D')}
        />
        <p className="text-xs mt-1.5" style={{ color: '#6B6B6B' }}>
          We'll email your PDF download link to this address
        </p>
      </div>

      {/* Preview notice */}
      <div
        className="mb-4 rounded-lg px-4 py-2.5 text-xs text-center"
        style={{
          color: '#D4AF37',
          backgroundColor: 'rgba(212, 175, 55, 0.08)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
        }}
      >
        Preview mode, no payment is taken. Click to walk through the funnel.
      </div>

      <button
        type="submit"
        className="w-full mt-2 font-bold min-h-[52px] rounded-xl px-8 transition-all hover:brightness-110 active:scale-[0.98]"
        style={{ backgroundColor: '#D4AF37', color: '#000000' }}
      >
        {ctaLabel || `Pay $${total}`}
      </button>

      <p className="text-center text-xs mt-3" style={{ color: '#6B6B6B' }}>
        Secure payment powered by Stripe
      </p>
      <p className="text-center text-xs mt-1.5" style={{ color: '#9A9A9A' }}>
        7-day money-back guarantee · Instant delivery · For educational purposes only
      </p>
    </form>
  );
}

/** Inner form, must render inside <Elements>. */
function CheckoutForm({
  returnUrl,
  isGuest,
  total,
  tier,
  clientSecret,
  ctaLabel,
}: {
  returnUrl: string;
  isGuest: boolean;
  total: number;
  tier: string;
  clientSecret: string | null;
  ctaLabel?: string;
}) {
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

    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'begin_checkout',
        ecommerce: {
          currency: 'USD',
          value: total,
          items: [{ item_id: tier, item_name: `Mikki Mase - ${tier}`, price: total, quantity: 1 }],
        },
      });
    }

    // Attach guest email to the PaymentIntent server-side so the webhook can
    // deliver downloads even if confirmParams.receipt_email is dropped.
    if (isGuest && email.trim()) {
      try {
        await fetch('/api/checkout/update-intent-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), clientSecret }),
        });
      } catch {
        /* non-critical, confirmParams.receipt_email still applies */
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
      {isGuest && (
        <div className="mb-5">
          <label
            htmlFor="funnel-guest-email"
            style={{ color: '#BEBEBE', fontSize: '13px', fontWeight: 500 }}
            className="block mb-1.5"
          >
            Email
          </label>
          <input
            id="funnel-guest-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(null);
            }}
            placeholder="you@example.com"
            required
            className="w-full rounded-xl px-4 py-3 text-white outline-none transition-colors"
            style={{
              backgroundColor: '#1A1A1A',
              border: emailError ? '1px solid #A8001E' : '1px solid #2D2D2D',
              fontSize: '15px',
            }}
            onFocus={(e) => (e.target.style.border = '1px solid #D4AF37')}
            onBlur={(e) => (e.target.style.border = emailError ? '1px solid #A8001E' : '1px solid #2D2D2D')}
          />
          {emailError && (
            <p className="text-xs mt-1" style={{ color: '#A8001E' }}>
              {emailError}
            </p>
          )}
          <p className="text-xs mt-1.5" style={{ color: '#6B6B6B' }}>
            We'll email your PDF download link to this address
          </p>
        </div>
      )}

      <PaymentElement options={{ layout: { type: 'tabs', defaultCollapsed: false } }} />

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
        className="w-full mt-6 font-bold min-h-[52px] rounded-xl px-8 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
        style={{ backgroundColor: '#D4AF37', color: '#000000' }}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          ctaLabel || `Pay $${total}`
        )}
      </button>

      <p className="text-center text-xs mt-3" style={{ color: '#6B6B6B' }}>
        Secure payment powered by Stripe
      </p>
      <p className="text-center text-xs mt-1.5" style={{ color: '#9A9A9A' }}>
        7-day money-back guarantee · Instant delivery · For educational purposes only
      </p>
    </form>
  );
}

// Thin switch: partner-preview gets the no-payment DemoCheckout, production gets
// the real Stripe LiveCheckout. DEMO_MODE is a build-time constant, so each build
// renders exactly one of these (hooks stay unconditional within each component).
export default function FunnelCheckout(props: FunnelCheckoutProps) {
  if (DEMO_MODE) {
    return (
      <DemoCheckout
        price={props.price}
        successPath={props.successPath}
        bump={props.bump}
        ctaLabel={props.ctaLabel}
      />
    );
  }
  return <LiveCheckout {...props} />;
}

function LiveCheckout({ tier, price, successPath, bump, ctaLabel }: FunnelCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [total, setTotal] = useState(price);
  const [bumpChecked, setBumpChecked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const returnUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${successPath}`
      : `https://www.mikki-mase.com${successPath}`;

  const createIntent = useCallback(
    async (withBump: boolean) => {
      const res = await fetch('/api/checkout/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productKey: tier, tier, bump: withBump }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409 && data.redirect) {
          window.location.href = data.redirect;
          return null;
        }
        throw new Error(data.error || 'Failed to initialize payment');
      }
      return data;
    },
    [tier],
  );

  // Initial intent
  useEffect(() => {
    createIntent(false)
      .then((data) => {
        if (!data) return;
        setClientSecret(data.clientSecret);
        setIsGuest(data.isGuest || false);
        if (data.amount) setTotal(data.amount);
        fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'checkout_start', detail: `funnel ${tier} $${data.amount}` }),
        }).catch(() => {});
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toggle the order bump → recreate the PaymentIntent with the new total.
  async function toggleBump(next: boolean) {
    setBumpChecked(next);
    setRefreshing(true);
    setClientSecret(null);
    try {
      const data = await createIntent(next);
      if (data) {
        setClientSecret(data.clientSecret);
        setIsGuest(data.isGuest || false);
        if (data.amount) setTotal(data.amount);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-white/20 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl p-8 text-center" style={{ background: '#111', border: '1px solid #2D2D2D' }}>
        <p className="text-white font-semibold mb-2">Unable to load payment form</p>
        <p className="text-sm mb-4" style={{ color: '#9A9A9A' }}>
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="font-bold min-h-[44px] rounded-xl px-6 hover:brightness-110"
          style={{ backgroundColor: '#D4AF37', color: '#000000' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Order bump */}
      {bump && (
        <label
          htmlFor="funnel-order-bump"
          className="block mb-5 rounded-xl p-4 cursor-pointer transition-colors"
          style={{
            background: bumpChecked ? 'rgba(212, 175, 55, 0.08)' : 'rgba(255,255,255,0.02)',
            border: bumpChecked ? '1px solid rgba(212, 175, 55, 0.5)' : '1px dashed #3A3A3A',
          }}
        >
          <div className="flex items-start gap-3">
            <input
              id="funnel-order-bump"
              type="checkbox"
              checked={bumpChecked}
              disabled={refreshing}
              onChange={(e) => toggleBump(e.target.checked)}
              className="mt-1 h-5 w-5 flex-shrink-0 accent-[#D4AF37]"
            />
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: '#D4AF37' }}>
                YES! Add {bump.label}, just ${bump.price}
              </p>
              <p className="text-xs mt-1" style={{ color: '#BEBEBE' }}>
                {bump.description}
              </p>
            </div>
          </div>
        </label>
      )}

      {clientSecret ? (
        <Elements
          stripe={stripePromise}
          // Re-mount the Elements tree whenever the clientSecret changes
          // (e.g. the bump toggles the total → a new PaymentIntent).
          key={clientSecret}
          options={{ clientSecret, appearance, locale: 'en' }}
        >
          <CheckoutForm
            returnUrl={returnUrl}
            isGuest={isGuest}
            total={total}
            tier={tier}
            clientSecret={clientSecret}
            ctaLabel={ctaLabel}
          />
        </Elements>
      ) : (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-white/20 border-t-[#D4AF37] rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
