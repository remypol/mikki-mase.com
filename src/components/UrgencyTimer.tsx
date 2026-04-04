/**
 * UrgencyTimer — Evergreen countdown per visitor
 *
 * Sets a cookie on first visit with a deadline 24h from now.
 * Returning visitors see the same deadline (consistent).
 * When expired, resets to a new 24h window automatically.
 */

import { useState, useEffect, useRef } from 'react';

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

function getOrCreateDeadline(): number {
  const existing = getCookie(COOKIE_NAME);
  if (existing) {
    const ts = parseInt(existing, 10);
    if (!isNaN(ts) && ts > Date.now()) return ts;
  }
  // Expired or no cookie — set a fresh 24h deadline
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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const deadlineRef = useRef<number>(0);

  useEffect(() => {
    deadlineRef.current = getOrCreateDeadline();
    setRemaining(deadlineRef.current - Date.now());

    intervalRef.current = setInterval(() => {
      const diff = deadlineRef.current - Date.now();
      if (diff <= 0) {
        // Reset to a new 24h cycle
        deadlineRef.current = getOrCreateDeadline();
        setRemaining(deadlineRef.current - Date.now());
      } else {
        setRemaining(diff);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // SSR / loading — render placeholder to avoid layout shift
  if (remaining === null) {
    return (
      <div
        className="rounded-xl p-4 flex items-center justify-center gap-3"
        style={{
          background: 'rgba(207, 181, 59, 0.08)',
          border: '1px solid rgba(207, 181, 59, 0.25)',
          minHeight: '68px',
        }}
      />
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
        style={{ color: 'var(--color-gold)' }}
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
        <p className="text-xs font-medium" style={{ color: 'var(--color-gray-500)' }}>
          This price expires in
        </p>
        <p
          className="text-lg font-black tracking-wider tabular-nums"
          style={{ color: 'var(--color-gold)' }}
        >
          {formatTime(remaining)}
        </p>
      </div>
    </div>
  );
}
