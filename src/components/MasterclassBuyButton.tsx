/**
 * MasterclassBuyButton — Auth-aware purchase button
 * Checks auth + purchase status, routes appropriately
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

interface Props {
  /** Display variant */
  variant?: 'hero' | 'pricing' | 'compact';
  /** Additional CSS classes */
  className?: string;
}

interface PurchaseStatus {
  authenticated: boolean;
  purchased: boolean;
}

export default function MasterclassBuyButton({ variant = 'hero', className = '' }: Props) {
  const { user, loading: authLoading } = useAuth();
  const [purchaseStatus, setPurchaseStatus] = useState<PurchaseStatus | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check purchase status when user is available
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setPurchaseStatus({ authenticated: false, purchased: false });
      return;
    }

    fetch('/api/purchase-status')
      .then((res) => res.json())
      .then((data) => setPurchaseStatus(data))
      .catch(() => setPurchaseStatus({ authenticated: true, purchased: false }));
  }, [user, authLoading]);

  async function handleCheckout() {
    setError(null);
    setCheckoutLoading(true);

    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productKey: 'masterclass' }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      // Notify checkout started
      fetch('/api/notify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: 'checkout_start', email: user?.email || '' }) }).catch(() => {});

      // Redirect to Stripe Checkout
      if (data.url) {
        // GA4 tracking
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'begin_checkout',
            ecommerce: {
              currency: 'USD',
              value: 97,
              items: [{ item_id: 'masterclass', item_name: 'The Mikki Mase Masterclass', price: 97, quantity: 1 }],
            },
          });
        }
        // Short delay for GA4 event to fire
        await new Promise((r) => setTimeout(r, 100));
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setCheckoutLoading(false);
    }
  }

  // Loading state
  if (authLoading || !purchaseStatus) {
    return (
      <div className={`inline-flex items-center justify-center min-h-[52px] rounded-xl px-8 ${className}`} style={{ backgroundColor: '#2D2D2D' }}>
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // Already purchased — go to course
  if (purchaseStatus.purchased) {
    return (
      <a
        href="/masterclass/course"
        className={`inline-flex items-center justify-center font-bold text-black min-h-[52px] rounded-xl px-8 transition-all hover:brightness-110 active:scale-[0.98] ${className}`}
        style={{ backgroundColor: '#CFB53B' }}
      >
        Go to Course
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    );
  }

  // Not logged in — direct to checkout (no account needed)
  if (!purchaseStatus.authenticated) {
    return (
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => {
            fetch('/api/notify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: 'cta_click', detail: 'Get Instant Access (guest)' }) }).catch(() => {});
            handleCheckout();
          }}
          disabled={checkoutLoading}
          className={`inline-flex items-center justify-center font-bold text-white min-h-[52px] rounded-xl px-8 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 ${className}`}
          style={{ backgroundColor: '#A8001E' }}
        >
          {checkoutLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              Get Instant Access — $97
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {variant !== 'compact' && (
          <span className="text-[#6B6B6B] text-xs">One-time payment. Lifetime access.</span>
        )}
      </div>
    );
  }

  // Logged in but not purchased — buy button
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleCheckout}
        disabled={checkoutLoading}
        className={`inline-flex items-center justify-center font-bold text-white min-h-[52px] rounded-xl px-8 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 ${className}`}
        style={{ backgroundColor: '#A8001E' }}
      >
        {checkoutLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            Processing...
          </>
        ) : (
          <>
            Get Instant Access — $97
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {variant !== 'compact' && (
        <span className="text-[#6B6B6B] text-xs">One-time payment. Lifetime access.</span>
      )}
    </div>
  );
}
