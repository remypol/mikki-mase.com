/**
 * AccountPanel — Authenticated user's account hub
 *
 * Built as a direct response to post-paywall audit finding #1:
 * no in-product surface existed for logout / subscription / billing / cancel.
 * This is the compliance-critical stub — ships logout + subscription status
 * + invoice-email mailto + cancel-email mailto before polishing UX.
 */

import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface Purchase {
  id: string;
  product_key: string;
  amount_total: number | null;
  currency: string | null;
  status: string | null;
  created_at: string;
}

interface AccountPayload {
  tier: 'masterclass' | 'inner-circle' | 'lifetime-vip' | null;
  tierLabel: string | null;
  purchases: Purchase[];
  email: string | null;
  // Note: subscription-only users will have tier !== null but empty purchases.
}

const SUPPORT_EMAIL = 'support@mikki-mase.com';

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

function fmtAmount(cents: number | null, currency: string | null) {
  if (cents == null) return '—';
  const value = cents / 100;
  const ccy = (currency || 'USD').toUpperCase();
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: ccy,
    minimumFractionDigits: 2,
  }).format(value);
}

export default function AccountPanel() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [data, setData] = useState<AccountPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      // Not logged in — redirect to login
      window.location.href = '/auth/login?next=/account';
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/account/me', { credentials: 'same-origin' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = (await res.json()) as AccountPayload;
        if (!cancelled) {
          setData(payload);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Could not load account');
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 animate-pulse">
        <div className="h-8 w-48 rounded bg-white/10 mb-4" />
        <div className="h-4 w-64 rounded bg-white/5 mb-10" />
        <div className="h-40 rounded-2xl bg-white/5 mb-6" />
        <div className="h-24 rounded-2xl bg-white/5" />
      </div>
    );
  }

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Player';

  const email = data?.email || user?.email || '';
  const tierLabel = data?.tierLabel || 'No active plan';
  const purchases = data?.purchases || [];
  const hasCompletedPurchase = purchases.some((p) => p.status === 'completed');
  // Subscription-only users have a tier but no purchase row — still count as paid.
  const hasAnyPaid = hasCompletedPurchase || !!data?.tier;
  const hasSubscription = !!data?.tier && !hasCompletedPurchase;

  const cancelMailto =
    `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Please cancel my subscription')}` +
    `&body=${encodeURIComponent(
      `Hi,\n\nPlease cancel my subscription.\n\nAccount email: ${email}\n\nThanks.`,
    )}`;

  const invoiceMailto =
    `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Invoice request')}` +
    `&body=${encodeURIComponent(
      `Hi,\n\nPlease send me an invoice for my recent purchase(s).\n\nAccount email: ${email}\n\nThanks.`,
    )}`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <header className="mb-10 md:mb-14">
        <p className="eyebrow mb-3">Account</p>
        <h1 className="display-h1 article-heading-wide mb-4">
          {displayName}<span className="accent-red">.</span>
        </h1>
        <p className="text-secondary text-base md:text-lg">
          {email}
        </p>
      </header>

      {error && (
        <div className="claimed-box mb-8" role="alert">
          <p className="text-primary font-semibold mb-1">Couldn't load your account just now.</p>
          <p className="text-secondary text-sm">
            {error}. If this keeps happening email{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="accent-gold underline">
              {SUPPORT_EMAIL}
            </a>.
          </p>
        </div>
      )}

      {/* Plan */}
      <section className="stake-card mb-6" aria-labelledby="plan-heading">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="text-tertiary text-xs uppercase tracking-widest mb-2">Current plan</p>
            <h2 id="plan-heading" className="display-h3 mb-1">{tierLabel}</h2>
            {hasAnyPaid ? (
              <p className="text-secondary text-sm">
                {hasSubscription
                  ? 'Active subscription · Billed automatically'
                  : 'One-time purchase · Lifetime access'}
              </p>
            ) : (
              <p className="text-secondary text-sm">
                You don't have a paid plan yet.
              </p>
            )}
          </div>
          {!hasAnyPaid && (
            <a
              href="/masterclass"
              className="inline-flex items-center gap-2 bg-accent-red text-white px-5 py-3 rounded-full font-semibold text-sm hover:brightness-110 transition"
            >
              View the Masterclass
            </a>
          )}
        </div>
      </section>

      {/* Purchases / invoices */}
      <section className="stake-card mb-6" aria-labelledby="purchases-heading">
        <h2 id="purchases-heading" className="text-tertiary text-xs uppercase tracking-widest mb-4 font-semibold">Purchases</h2>
        {purchases.length === 0 ? (
          <p className="text-secondary text-sm">No purchases yet.</p>
        ) : (
          <ul className="divide-y" style={{ borderColor: 'rgb(var(--border-subtle))' }}>
            {purchases.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="text-primary font-medium truncate">
                    {p.product_key}
                  </p>
                  <p className="text-tertiary text-xs">
                    {fmtDate(p.created_at)} · {p.status || 'unknown'}
                  </p>
                </div>
                <p className="text-primary text-sm font-semibold tabular-nums whitespace-nowrap">
                  {fmtAmount(p.amount_total, p.currency)}
                </p>
              </li>
            ))}
          </ul>
        )}
        {hasAnyPaid && (
          <p className="text-tertiary text-xs mt-4">
            Need a receipt or invoice?{' '}
            <a href={invoiceMailto} className="accent-gold underline">
              Email {SUPPORT_EMAIL}
            </a>.
          </p>
        )}
      </section>

      {/* Billing / cancel (stub with mailto; replace with Stripe portal later) */}
      <section className="stake-card mb-6" aria-labelledby="billing-heading">
        <h2 id="billing-heading" className="text-tertiary text-xs uppercase tracking-widest mb-4 font-semibold">Billing &amp; cancellation</h2>
        <p className="text-secondary text-sm mb-4">
          To update your payment method or cancel your plan, email{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="accent-gold underline">
            {SUPPORT_EMAIL}
          </a>{' '}
          and we'll confirm within one business day.
        </p>
        <div className="flex gap-3 flex-wrap">
          <a
            href={cancelMailto}
            className="inline-flex items-center gap-2 border border-subtle text-primary px-4 py-2 rounded-full text-sm hover:bg-white/5 transition"
          >
            Request cancellation
          </a>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Update payment method')}`}
            className="inline-flex items-center gap-2 border border-subtle text-primary px-4 py-2 rounded-full text-sm hover:bg-white/5 transition"
          >
            Update card
          </a>
        </div>
      </section>

      {/* Security / sign out */}
      <section className="stake-card" aria-labelledby="session-heading">
        <h2 id="session-heading" className="text-tertiary text-xs uppercase tracking-widest mb-4 font-semibold">Session</h2>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-secondary text-sm">
            Signed in as <span className="text-primary font-medium">{email}</span>
          </p>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-subtle text-primary hover:bg-white/5 transition"
          >
            Sign out
          </button>
        </div>
      </section>

      <p className="text-tertiary text-xs mt-10 text-center">
        Questions? <a href="/support" className="accent-gold underline">Support</a> ·{' '}
        <a href="/terms" className="accent-gold underline">Terms</a> ·{' '}
        <a href="/privacy-policy" className="accent-gold underline">Privacy</a>
      </p>
    </div>
  );
}
