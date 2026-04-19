/**
 * CasinoIqCard — dashboard surface for the Casino IQ Assessment result.
 *
 * Per V3 redesign soft-wiring: NEVER gates progression. Just shows the
 * last score + band + deep-link to retake. When no prior result exists it
 * collapses to a single CTA row pointing at the free-preview assessment.
 *
 * Reads the same localStorage key the assessment itself writes to
 * (mikki:assessment:v1) so no network call is needed on dashboard load.
 */

import { useEffect, useState } from 'react';

interface StoredResult {
  rawScore: number;
  weightedScore: number;
  skillBand: string;
  stationResults: unknown[];
}

interface Stored {
  version: number;
  completedAt: string;
  result: StoredResult;
}

const STORAGE_KEY = 'mikki:assessment:v1';
const ASSESSMENT_HREF = '/masterclass/course/mindset-disclaimer/assessment';

function daysAgo(iso: string): string {
  try {
    const d = new Date(iso).getTime();
    if (!d) return '';
    const diff = Date.now() - d;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    return months === 1 ? 'a month ago' : `${months} months ago`;
  } catch {
    return '';
  }
}

export default function CasinoIqCard() {
  const [stored, setStored] = useState<Stored | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Stored = JSON.parse(raw);
        if (parsed && parsed.version === 1 && parsed.result) {
          setStored(parsed);
        }
      }
    } catch {
      // noop — silent fallback to CTA variant
    }
    setHydrated(true);
  }, []);

  // Pre-hydration: render the neutral CTA shell (no layout shift either way).
  if (!hydrated || !stored) {
    return (
      <a
        href={ASSESSMENT_HREF}
        className="block rounded-xl border p-5 mb-6 transition-all duration-200 hover:border-[#CFB53B]/50 hover:bg-white/[0.02] group"
        style={{ backgroundColor: '#141414', borderColor: '#2D2D2D' }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#CFB53B' }}>
              Casino IQ Assessment
            </p>
            <p className="text-sm text-white font-semibold">
              Take the 4-station diagnostic to see your skill band
            </p>
            <p className="text-xs mt-1" style={{ color: '#9A9A9A' }}>
              ~6 minutes · Used as your baseline. Retake after any module to measure progress.
            </p>
          </div>
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap group-hover:bg-[#CFB53B] group-hover:text-black transition-colors"
            style={{ color: '#CFB53B', border: '1px solid rgba(207,181,59,0.4)' }}
          >
            Start
          </span>
        </div>
      </a>
    );
  }

  const { result, completedAt } = stored;
  const score = Math.round(result.weightedScore);
  const band = result.skillBand;

  return (
    <a
      href={ASSESSMENT_HREF}
      className="block rounded-xl border p-5 mb-6 transition-all duration-200 hover:border-[#CFB53B]/50 hover:bg-white/[0.02] group"
      style={{ backgroundColor: '#141414', borderColor: '#2D2D2D' }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#CFB53B' }}>
            Casino IQ · Last baseline
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-black text-white">{score}</span>
            <span className="text-sm font-semibold" style={{ color: '#CFB53B' }}>{band}</span>
          </div>
          <p className="text-xs mt-1" style={{ color: '#9A9A9A' }}>
            Scored {daysAgo(completedAt)} · Retake after finishing a module to see the delta.
          </p>
        </div>
        <span
          className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap group-hover:bg-[#CFB53B] group-hover:text-black transition-colors"
          style={{ color: '#CFB53B', border: '1px solid rgba(207,181,59,0.4)' }}
        >
          Retake
        </span>
      </div>
    </a>
  );
}
