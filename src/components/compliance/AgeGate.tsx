/**
 * AgeGate — Modal overlay requiring 18+ verification on first visit
 * Saves consent to localStorage so it only shows once
 */
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'age_verified';

export default function AgeGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== 'true') {
        setShow(true);
      }
    } catch {
      setShow(true);
    }
  }, []);

  function handleConfirm() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {}
    setShow(false);
  }

  function handleDeny() {
    window.location.href = 'https://www.google.com';
  }

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 text-center"
        style={{
          background: '#111',
          border: '1px solid #2D2D2D',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Warning icon */}
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: 'rgba(207, 181, 59, 0.1)', border: '2px solid rgba(207, 181, 59, 0.3)' }}
        >
          <svg
            className="h-8 w-8"
            style={{ color: '#CFB53B' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h2 className="mb-3 text-2xl font-black text-white">Age Verification</h2>

        <p className="mb-8 text-sm leading-relaxed text-gray-400">
          You must be <span className="font-bold text-white">18 years or older</span> to access
          this site. This website contains gambling-related educational content.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={handleConfirm}
            className="flex-1 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all hover:brightness-110"
            style={{ background: '#16A34A' }}
          >
            I am 18+
          </button>
          <button
            onClick={handleDeny}
            className="flex-1 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all hover:brightness-110"
            style={{ background: '#333', border: '1px solid #444' }}
          >
            I am under 18
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-600">
          By entering, you confirm you meet the legal age requirement in your jurisdiction.
        </p>
      </div>
    </div>
  );
}
