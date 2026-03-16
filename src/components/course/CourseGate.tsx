import { useState, useEffect, type ReactNode } from 'react';
import { createDefaultProgress } from '../../config/course/types';

interface Props {
  children: ReactNode;
}

const STORAGE_KEY = 'mikki_course_progress';
const PROGRESS_EVENT = 'course-progress-update';

function LockIcon() {
  return (
    <svg className="w-16 h-16 mx-auto mb-6" style={{ color: '#CFB53B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

export default function CourseGate({ children }: Props) {
  const [purchased, setPurchased] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const progress = JSON.parse(stored);
        setPurchased(progress.purchased === true);
      } else {
        // Default to true for local dev (matches DEFAULT_PROGRESS)
        setPurchased(true);
      }
    } catch {
      // If localStorage fails, default to purchased for dev
      setPurchased(true);
    }
  }, []);

  // Loading state — show nothing to avoid flash
  if (purchased === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#CFB53B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Purchased — render course content
  if (purchased) {
    return <>{children}</>;
  }

  // Not purchased — locked overlay
  return (
    <div className="relative min-h-screen bg-black">
      {/* Blurred background hint */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="opacity-10 blur-sm pointer-events-none select-none" aria-hidden="true">
          {children}
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Lock CTA */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div
          className="max-w-md w-full text-center rounded-2xl p-10 border"
          style={{
            backgroundColor: '#1A1A1A',
            borderColor: '#3A3A3A',
          }}
        >
          <LockIcon />

          <h2 className="text-white text-2xl md:text-3xl font-black mb-3">
            Unlock the Masterclass
          </h2>

          <p className="text-[#BEBEBE] text-sm leading-relaxed mb-2">
            This lesson is part of <span style={{ color: '#CFB53B' }}>The Mikki Mase Masterclass</span> — 10 modules, 30+ lessons, interactive scenarios, and quizzes.
          </p>

          <p className="text-[#9A9A9A] text-xs mb-8">
            One-time purchase. Lifetime access. No subscriptions.
          </p>

          <a
            href="/shop/masterclass"
            className="inline-flex items-center justify-center w-full font-bold text-white min-h-[52px] rounded-xl px-8 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            style={{ backgroundColor: '#A8001E' }}
          >
            GET FULL ACCESS
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <p className="text-[#9A9A9A] text-xs mt-4">
            Already purchased?{' '}
            <button
              onClick={() => {
                try {
                  const defaults = createDefaultProgress();
                  const stored = localStorage.getItem(STORAGE_KEY);
                  const existing = stored ? JSON.parse(stored) : {};
                  const merged = { ...defaults, ...existing, purchased: true };
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
                  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
                  setPurchased(true);
                } catch {
                  setPurchased(true);
                }
              }}
              className="underline transition-colors hover:text-white"
              style={{ color: '#CFB53B' }}
            >
              Restore access
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
