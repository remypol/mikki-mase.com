/**
 * WhatsNewCard — shows existing owners that new content shipped.
 *
 * Bumps whenever we ship a content/widget update. Gated by localStorage so
 * the card dismisses permanently per version. The version key ties to the
 * update date — if we ship more content later, bump the key and the card
 * re-appears for everyone.
 *
 * Ships on the dashboard above the module grid — parallel to the Casino IQ
 * card — so returning owners see their free upgrade the moment they land.
 */

import { useEffect, useState } from 'react';

// Bump this string whenever a new update drops to re-surface the card.
const VERSION = '2026-04-19-sprint-5-6';
const STORAGE_KEY = `mikki:whatsnew:seen:${VERSION}`;

interface Update {
  label: string;
  href?: string;
}

const UPDATES: Update[] = [
  { label: 'NEW · Kelly, Variance & Risk of Ruin', href: '/masterclass/course/session-discipline/kelly-and-risk-of-ruin' },
  { label: 'NEW · The Property Rule Matrix', href: '/masterclass/course/blackjack-mastery/property-rule-matrix' },
  { label: 'NEW · Taxes on Gambling Winnings', href: '/masterclass/course/comps-perks/taxes-on-winnings' },
  { label: 'DRILL · Session Timer (at-the-table PWA)', href: '/masterclass/course/session-discipline/the-30-45-minute-rule' },
  { label: 'DRILL · Rebate Calculator', href: '/masterclass/course/discount-system/understanding-loss-rebates' },
  { label: 'UPDATED · Why Most Players Lose, How Casinos Manipulate You, Side Bets to Avoid', href: undefined },
];

export default function WhatsNewCard() {
  const [hydrated, setHydrated] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') setDismissed(true);
    } catch {
      // ignore — show the card
    }
    setHydrated(true);
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    setDismissed(true);
  };

  if (!hydrated || dismissed) return null;

  return (
    <div
      className="rounded-xl border p-5 mb-6 relative"
      style={{
        background: 'linear-gradient(135deg, rgba(207,181,59,0.10), rgba(207,181,59,0.02))',
        borderColor: 'rgba(207,181,59,0.3)',
      }}
    >
      <button
        onClick={handleDismiss}
        aria-label="Dismiss What's New"
        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
        style={{ color: '#BEBEBE' }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#CFB53B' }}>
        What's new · April 2026
      </p>
      <h3 className="text-lg font-bold text-white mb-1">
        You just got a free upgrade
      </h3>
      <p className="text-sm mb-4" style={{ color: '#BEBEBE' }}>
        3 new lessons + 2 new interactive drills + a voice pass across the weakest lessons.
        All included in your Masterclass — no extra charge.
      </p>

      <ul className="space-y-1.5">
        {UPDATES.map((u, i) => (
          <li key={i} className="text-sm flex items-start gap-2">
            <span style={{ color: '#CFB53B' }}>•</span>
            {u.href ? (
              <a
                href={u.href}
                className="underline decoration-dotted underline-offset-4 hover:decoration-solid transition-all"
                style={{ color: '#E8E8E8' }}
              >
                {u.label}
              </a>
            ) : (
              <span style={{ color: '#E8E8E8' }}>{u.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
