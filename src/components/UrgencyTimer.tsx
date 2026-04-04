/**
 * UrgencyTimer — Evergreen countdown per visitor
 *
 * Sets a cookie on first visit with a deadline 24h from now.
 * Returning visitors see the same deadline (consistent).
 * When expired, shows "Offer expired" with original price.
 */

import { useState, useEffect } from 'react';

const COOKIE_NAME = 'promo_deadline';
const HOURS = 24;

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

function getDeadline(): number {
  const existing = getCookie(COOKIE_NAME);
  if (existing) {
    const ts = parseInt(existing, 10);
    if (!isNaN(ts)) return ts;
  }
  const deadline = Date.now() + HOURS * 60 * 60 * 1000;
  setCookie(COOKIE_NAME, String(deadline), HOURS * 60 * 60);
  return deadline;
}

function formatTime(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function UrgencyTimer() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const deadline = getDeadline();
    setRemaining(deadline - Date.now());

    const interval = setInterval(() => {
      const diff = deadline - Date.now();
      setRemaining(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // SSR / loading state
  if (remaining === null) return null;

  if (remaining <= 0) {
    return (
      <div
        className="rounded-xl p-4 text-center"
        style={{
          background: 'rgba(168, 0, 30, 0.1)',
          border: '1px solid rgba(168, 0, 30, 0.3)',
        }}
      >
        <p className="text-sm font-semibold" style={{ color: '#ff6b6b' }}>
          This discount has expired
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl p-4 flex items-center justify-center gap-3"
      style={{
        background: 'rgba(207, 181, 59, 0.08)',
        border: '1px solid rgba(207, 181, 59, 0.25)',
      }}
    >
      <svg
        className="w-5 h-5 flex-shrink-0"
        style={{ color: '#CFB53B' }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="text-center">
        <p className="text-xs font-medium" style={{ color: '#9A9A9A' }}>
          This price expires in
        </p>
        <p
          className="text-lg font-black tracking-wider tabular-nums"
          style={{ color: '#CFB53B' }}
        >
          {formatTime(remaining)}
        </p>
      </div>
    </div>
  );
}
