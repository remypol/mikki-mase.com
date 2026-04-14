/**
 * MasterclassBuyButton — Auth-aware purchase button
 * Checks auth + purchase status, routes appropriately
 *
 * Not logged in → link to login (then redirect to /checkout/masterclass)
 * Logged in, not purchased → link to /checkout/masterclass (embedded Stripe)
 * Already purchased → link to course
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

  // A/B variant is assigned server-side via httpOnly cookie on checkout page load
  // No client-side assignment needed — just link to checkout
  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href="/checkout/playbook"
        onClick={() => fetch('/api/notify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: 'cta_click', detail: `Get Masterclass (${purchaseStatus.authenticated ? 'checkout' : 'guest'})` }) }).catch(() => {})}
        className={`inline-flex items-center justify-center font-bold text-black min-h-[52px] rounded-xl px-8 transition-all hover:brightness-110 active:scale-[0.98] ${className}`}
        style={{ backgroundColor: '#CFB53B' }}
      >
        <span className="sm:hidden">Masterclass — $27</span>
        <span className="hidden sm:inline">Get the Masterclass — $27</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
      {variant !== 'compact' && (
        <span className="text-[#6B6B6B] text-xs">One-time payment. Lifetime access. No account needed.</span>
      )}
    </div>
  );
}
