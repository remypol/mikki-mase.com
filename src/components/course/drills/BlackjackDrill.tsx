/**
 * BlackjackDrill — standalone basic-strategy trainer.
 *
 * Extracted from the Casino IQ Assessment's Station 1 ("Blackjack Blitz")
 * mechanic. In the assessment that drill is a 7-hand sequence wired to a
 * scoring band. Here it's an infinite-replay practice mode for use inside
 * Module 4 "Basic Strategy Decoded" and elsewhere: randomises hands, shows
 * correct-answer feedback + short EV rationale per pick, streak tracking,
 * and aggregate accuracy across a session.
 *
 * Design-review caveat:
 *   Gemini 3.1 Pro + GPT 5.4 flagged "gating on drill scores" as an anti-pattern
 *   for a consumer course. This component therefore NEVER gates lesson progression.
 *   It persists a lightweight streak/accuracy summary (localStorage only for now;
 *   Supabase sync can be added later through useCourseProgress), and surfaces it
 *   as motivation, never as blocker.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { BLITZ_HANDS } from '../../../lib/assessment/stations';
import type { BlitzHand } from '../../../lib/assessment/stations';
import type { Rank, Suit } from '../../../lib/blackjack/types';

type Action = 'hit' | 'stand' | 'double' | 'split';
const ACTIONS: Action[] = ['hit', 'stand', 'double', 'split'];
const ACTION_LABEL: Record<Action, string> = {
  hit: 'Hit',
  stand: 'Stand',
  double: 'Double',
  split: 'Split',
};
const RANDOM_SUITS: Suit[] = ['♠', '♥', '♦', '♣'];
const rSuit = (): Suit => RANDOM_SUITS[Math.floor(Math.random() * 4)];

// Rationale strings keyed by hand — one-line "why this play" for post-answer
// teaching. Intentionally short; full pedagogy lives in the lesson body.
const HAND_RATIONALE: Record<string, string> = {
  'pair-aces-vs-8': 'Always split Aces — two shots at 21 beats one stuck hand.',
  'pair-6s-vs-6': 'Split 6s vs a dealer bust card (2–6). Your 12 is losing; two 6-starts give you outs.',
  'hard-12-vs-3': 'Hit hard 12 vs dealer 2 or 3. Dealer is not weak enough to stand on your stiff.',
  'soft-18-vs-9': 'Hit soft 18 vs 9/10/A. Staying with 18 loses more often than you think against strong dealers.',
  'pair-9s-vs-7': 'Stand on 9s vs dealer 7 — 18 beats the dealer\'s likely 17.',
  'pair-8s-vs-10': 'Always split 8s — 16 is the worst hand in blackjack, two 8-starts are better.',
  'soft-17-vs-6': 'Double soft 17 vs dealer 5 or 6. You get a free card on dealer\'s weakest up-card.',
};

interface DrillStats {
  total: number;
  correct: number;
  streak: number;
  bestStreak: number;
  missedByHand: Record<string, number>;
}

const LS_KEY = 'mikki_blackjack_drill_stats';

function loadStats(): DrillStats {
  if (typeof window === 'undefined') {
    return { total: 0, correct: 0, streak: 0, bestStreak: 0, missedByHand: {} };
  }
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { total: 0, correct: 0, streak: 0, bestStreak: 0, missedByHand: {} };
    const parsed = JSON.parse(raw);
    return {
      total: parsed.total ?? 0,
      correct: parsed.correct ?? 0,
      streak: parsed.streak ?? 0,
      bestStreak: parsed.bestStreak ?? 0,
      missedByHand: parsed.missedByHand ?? {},
    };
  } catch {
    return { total: 0, correct: 0, streak: 0, bestStreak: 0, missedByHand: {} };
  }
}

function saveStats(stats: DrillStats) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(stats));
  } catch { /* ignore quota errors */ }
}

function pickHand(avoidId?: string): BlitzHand {
  if (BLITZ_HANDS.length === 0) return BLITZ_HANDS[0];
  const pool = avoidId ? BLITZ_HANDS.filter((h) => h.id !== avoidId) : BLITZ_HANDS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function MiniCard({ rank, suit }: { rank: Rank; suit: Suit }) {
  const color = suit === '♥' || suit === '♦' ? '#A8001E' : '#1A1A1A';
  return (
    <div
      className="w-14 h-20 rounded-lg flex flex-col items-center justify-center bg-white border flex-shrink-0"
      style={{ borderColor: '#E0E0E0' }}
    >
      <span className="text-lg font-black" style={{ color }}>{rank}</span>
      <span className="text-sm" style={{ color }}>{suit}</span>
    </div>
  );
}

export default function BlackjackDrill() {
  const [hand, setHand] = useState<BlitzHand>(() => pickHand());
  const suitsRef = useRef({ p1: rSuit(), p2: rSuit(), d: rSuit() });
  const [picked, setPicked] = useState<Action | null>(null);
  const [stats, setStats] = useState<DrillStats>(() => loadStats());

  // Persist on every stats change.
  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  const accuracy = useMemo(
    () => (stats.total === 0 ? 0 : Math.round((stats.correct / stats.total) * 100)),
    [stats],
  );

  const isAnswered = picked !== null;
  const correctAction = hand.correctAction as Action;

  function pick(action: Action) {
    if (isAnswered) return;
    setPicked(action);
    const isCorrect = action === correctAction;
    setStats((prev) => {
      const nextStreak = isCorrect ? prev.streak + 1 : 0;
      return {
        total: prev.total + 1,
        correct: prev.correct + (isCorrect ? 1 : 0),
        streak: nextStreak,
        bestStreak: Math.max(prev.bestStreak, nextStreak),
        missedByHand: isCorrect
          ? prev.missedByHand
          : { ...prev.missedByHand, [hand.id]: (prev.missedByHand[hand.id] ?? 0) + 1 },
      };
    });
  }

  function nextHand() {
    setHand(pickHand(hand.id));
    suitsRef.current = { p1: rSuit(), p2: rSuit(), d: rSuit() };
    setPicked(null);
  }

  function reset() {
    if (!confirm('Reset your drill stats? This clears streak + accuracy history.')) return;
    const fresh: DrillStats = { total: 0, correct: 0, streak: 0, bestStreak: 0, missedByHand: {} };
    setStats(fresh);
  }

  const rationale = HAND_RATIONALE[hand.id] ?? 'Basic strategy says so — revisit the chart if this surprised you.';

  return (
    <div className="stake-card" aria-labelledby="drill-title">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-tertiary font-semibold mb-1">
            The drill
          </p>
          <h3 id="drill-title" className="display-h3">Basic strategy trainer</h3>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-center">
            <p className="text-tertiary text-[10px] uppercase tracking-wider">Streak</p>
            <p className="accent-gold text-lg font-bold tabular-nums">{stats.streak}</p>
          </div>
          <div className="text-center">
            <p className="text-tertiary text-[10px] uppercase tracking-wider">Accuracy</p>
            <p className="text-primary text-lg font-bold tabular-nums">{accuracy}%</p>
          </div>
          <div className="text-center">
            <p className="text-tertiary text-[10px] uppercase tracking-wider">Best</p>
            <p className="text-secondary text-lg font-bold tabular-nums">{stats.bestStreak}</p>
          </div>
        </div>
      </div>

      {/* Table felt */}
      <div
        className="rounded-2xl p-6 mb-5"
        style={{ background: 'linear-gradient(135deg, #0A3A1A, #0D4A22)', border: '2px solid #1A5A2A' }}
      >
        <div className="text-center mb-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Dealer shows
          </span>
          <div className="flex justify-center gap-2 mt-2">
            <MiniCard rank={hand.dealerRank as Rank} suit={suitsRef.current.d} />
            <div
              className="w-14 h-20 rounded-lg flex items-center justify-center border-2 flex-shrink-0"
              style={{ backgroundColor: '#1A1A1A', borderColor: '#CFB53B' }}
            >
              <span style={{ color: '#CFB53B' }}>?</span>
            </div>
          </div>
        </div>
        <div className="border-t border-dashed mb-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }} />
        <div className="text-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Your hand
          </span>
          <div className="flex justify-center gap-2 mt-2">
            <MiniCard rank={hand.playerRanks[0] as Rank} suit={suitsRef.current.p1} />
            <MiniCard rank={hand.playerRanks[1] as Rank} suit={suitsRef.current.p2} />
          </div>
        </div>
      </div>

      {/* Action grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {ACTIONS.map((a) => {
          const isCorrect = a === correctAction;
          const isPicked = picked === a;
          const bg = !isAnswered
            ? '#2D2D2D'
            : isPicked
              ? (isCorrect ? 'rgba(27,107,63,0.25)' : 'rgba(196,30,58,0.25)')
              : isCorrect
                ? 'rgba(27,107,63,0.15)'
                : '#2D2D2D';
          const border = !isAnswered
            ? '#4A4A4A'
            : isPicked
              ? (isCorrect ? '#1B6B3F' : '#C41E3A')
              : isCorrect
                ? '#1B6B3F'
                : '#4A4A4A';
          return (
            <button
              key={a}
              onClick={() => pick(a)}
              disabled={isAnswered}
              className="min-h-[48px] rounded-xl font-bold text-sm border-2 transition-all duration-150"
              style={{ backgroundColor: bg, borderColor: border, color: '#FFFFFF' }}
              aria-pressed={isPicked}
            >
              {ACTION_LABEL[a]}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div
          className="rounded-xl p-4 mb-4 border"
          style={{
            borderColor: picked === correctAction ? 'rgba(27,107,63,0.4)' : 'rgba(196,30,58,0.4)',
            background: picked === correctAction ? 'rgba(27,107,63,0.08)' : 'rgba(196,30,58,0.08)',
          }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: picked === correctAction ? '#6EE7A8' : '#F87171' }}>
            {picked === correctAction ? 'Correct.' : `Wrong — the right play is ${ACTION_LABEL[correctAction]}.`}
          </p>
          <p className="text-secondary text-sm">{rationale}</p>
        </div>
      )}

      {/* Next / reset */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={nextHand}
          className="flex-1 min-w-[140px] min-h-[48px] rounded-xl font-semibold text-white bg-accent-red hover:brightness-110 transition"
        >
          {isAnswered ? 'Next hand →' : 'Skip hand'}
        </button>
        <button
          onClick={reset}
          className="min-h-[48px] px-4 rounded-xl text-sm text-tertiary border border-subtle hover:text-primary hover:bg-white/5 transition"
          aria-label="Reset drill stats"
        >
          Reset stats
        </button>
      </div>

      <p className="text-tertiary text-xs mt-4">
        Not a score gate — purely practice. {stats.total > 0 && `${stats.total} hands drilled.`}
      </p>
    </div>
  );
}
