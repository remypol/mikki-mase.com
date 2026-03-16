/**
 * PracticeMode — Interactive blackjack practice trainer.
 * Renders a premium-feel table with dealing animations,
 * action buttons, coaching tips, and session stats.
 */
import { useEffect, useRef } from 'react';
import { useBlackjackPractice } from '../../hooks/useBlackjackPractice';
import type { Card, Action, Scenario } from '../../lib/blackjack/types';
import { cardLabel, isRed } from '../../lib/blackjack/cards';
import { handLabel } from '../../lib/blackjack/handEvaluator';
import { getExplanation } from '../../lib/blackjack/explanations';

// ============================================
// CARD COMPONENT
// ============================================

function PlayingCard({ card, faceDown = false, delay = 0 }: { card: Card; faceDown?: boolean; delay?: number }) {
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const rotation = useRef((Math.random() - 0.5) * 3);

  const style: React.CSSProperties = reducedMotion.current
    ? {}
    : {
        animation: `dealIn 0.3s ease-out ${delay}ms both`,
        transform: `rotate(${rotation.current}deg)`,
      };

  if (faceDown) {
    return (
      <div
        className="w-[72px] h-[100px] sm:w-20 sm:h-28 rounded-xl flex items-center justify-center border-2 flex-shrink-0"
        style={{ backgroundColor: '#1A1A1A', borderColor: '#CFB53B', ...style }}
      >
        <div
          className="w-10 h-14 rounded-md"
          style={{
            background: 'repeating-linear-gradient(45deg, #CFB53B22, #CFB53B22 4px, transparent 4px, transparent 8px)',
            border: '1px solid #CFB53B44',
          }}
        />
      </div>
    );
  }

  const color = isRed(card) ? '#A8001E' : '#1A1A1A';

  return (
    <div
      className="w-[72px] h-[100px] sm:w-20 sm:h-28 rounded-xl flex flex-col items-center justify-center border bg-white shadow-lg flex-shrink-0"
      style={{ borderColor: '#E0E0E0', ...style }}
    >
      <span className="text-xl sm:text-2xl font-black leading-none" style={{ color }}>{card.rank}</span>
      <span className="text-lg sm:text-xl leading-none mt-0.5" style={{ color }}>{card.suit}</span>
    </div>
  );
}

// ============================================
// TABLE FELT
// ============================================

function TableFelt({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6 sm:p-8 mb-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A3A1A 0%, #0D4A22 50%, #0A3A1A 100%)',
        border: '2px solid #1A5A2A',
        boxShadow: 'inset 0 2px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />
      {children}
    </div>
  );
}

// ============================================
// SESSION STATS BAR
// ============================================

function SessionStats({
  hands, correct, streak, bestStreak,
}: { hands: number; correct: number; streak: number; bestStreak: number }) {
  const accuracy = hands > 0 ? Math.round((correct / hands) * 100) : 0;

  return (
    <div className="flex items-center gap-4 sm:gap-6 mb-6 text-xs sm:text-sm">
      <div>
        <span style={{ color: '#9A9A9A' }}>Hands </span>
        <span className="font-bold text-white">{hands}</span>
      </div>
      <div>
        <span style={{ color: '#9A9A9A' }}>Accuracy </span>
        <span className="font-bold" style={{ color: accuracy >= 80 ? '#059669' : accuracy >= 60 ? '#CFB53B' : '#A8001E' }}>
          {accuracy}%
        </span>
      </div>
      <div>
        <span style={{ color: '#9A9A9A' }}>Streak </span>
        <span className="font-bold" style={{ color: '#CFB53B' }}>{streak}</span>
      </div>
      {bestStreak > 0 && (
        <div className="ml-auto">
          <span style={{ color: '#9A9A9A' }}>Best </span>
          <span className="font-bold" style={{ color: '#CFB53B' }}>{bestStreak}</span>
        </div>
      )}
    </div>
  );
}

// ============================================
// STREAK METER
// ============================================

function StreakMeter({ streak }: { streak: number }) {
  if (streak < 2) return null;
  const dots = Math.min(streak, 10);
  return (
    <div className="flex items-center gap-1 mb-4 justify-center">
      {Array.from({ length: dots }, (_, i) => (
        <div
          key={i}
          className="w-2.5 h-2.5 rounded-full"
          style={{
            backgroundColor: '#CFB53B',
            opacity: 0.4 + (i / dots) * 0.6,
            animation: `pulse 1.5s ease-in-out ${i * 0.1}s infinite`,
          }}
        />
      ))}
      {streak > 10 && (
        <span className="text-xs font-bold ml-1" style={{ color: '#CFB53B' }}>+{streak - 10}</span>
      )}
    </div>
  );
}

// ============================================
// ACTION BAR
// ============================================

const ACTIONS: { key: Action; label: string; shortLabel: string }[] = [
  { key: 'hit', label: 'Hit', shortLabel: 'HIT' },
  { key: 'stand', label: 'Stand', shortLabel: 'STAND' },
  { key: 'double', label: 'Double Down', shortLabel: 'DBL' },
  { key: 'split', label: 'Split', shortLabel: 'SPLIT' },
];

function ActionBar({
  onAction,
  disabled,
  canSplit,
  canDouble,
}: {
  onAction: (action: Action) => void;
  disabled: boolean;
  canSplit: boolean;
  canDouble: boolean;
}) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3" role="group" aria-label="Blackjack actions">
      {ACTIONS.map((a) => {
        const isDisabled = disabled || (a.key === 'split' && !canSplit) || (a.key === 'double' && !canDouble);
        return (
          <button
            key={a.key}
            onClick={() => onAction(a.key)}
            disabled={isDisabled}
            className="min-h-[48px] sm:min-h-[52px] rounded-xl font-bold text-sm sm:text-base transition-all duration-200 border-2"
            style={{
              backgroundColor: isDisabled ? '#1A1A1A' : '#2D2D2D',
              borderColor: isDisabled ? '#2D2D2D' : '#4A4A4A',
              color: isDisabled ? '#4A4A4A' : '#FFFFFF',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => {
              if (!isDisabled) {
                (e.target as HTMLElement).style.borderColor = '#CFB53B';
                (e.target as HTMLElement).style.backgroundColor = '#3A3A3A';
              }
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = isDisabled ? '#2D2D2D' : '#4A4A4A';
              (e.target as HTMLElement).style.backgroundColor = isDisabled ? '#1A1A1A' : '#2D2D2D';
            }}
          >
            <span className="hidden sm:inline">{a.label}</span>
            <span className="sm:hidden">{a.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================
// TIP PANEL
// ============================================

function TipPanel({
  scenario, chosenAction, isCorrect,
}: { scenario: Scenario; chosenAction: Action; isCorrect: boolean }) {
  const explanation = getExplanation(
    scenario.decision.optimalAction,
    scenario.playerCards,
    scenario.dealerUpcard,
    scenario.analysis,
  );

  const borderColor = isCorrect ? '#059669' : '#A8001E';
  const bgColor = isCorrect ? 'rgba(5, 150, 105, 0.08)' : 'rgba(168, 0, 30, 0.08)';

  return (
    <div
      className="mt-6 p-5 rounded-xl border"
      style={{ borderColor, backgroundColor: bgColor }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
          style={{
            backgroundColor: isCorrect ? 'rgba(5, 150, 105, 0.2)' : 'rgba(168, 0, 30, 0.2)',
            color: borderColor,
          }}
        >
          {isCorrect ? '✓' : '✗'}
        </span>
        <span className="font-bold text-white">
          {isCorrect ? 'Correct!' : `Correct play: ${scenario.decision.optimalAction.charAt(0).toUpperCase() + scenario.decision.optimalAction.slice(1)}`}
        </span>
      </div>

      {/* 3-layer explanation */}
      <div className="space-y-2 text-sm" style={{ color: '#D4D4D4' }}>
        <p className="font-semibold text-white">{explanation.move}</p>
        <p>{explanation.why}</p>
        <p className="italic text-xs" style={{ color: '#9A9A9A' }}>{explanation.pattern}</p>
      </div>
    </div>
  );
}

// ============================================
// KEYFRAME STYLES (hoisted to avoid recreating every render)
// ============================================

const KEYFRAME_STYLES = `
  @keyframes dealIn {
    from { opacity: 0; transform: translateY(-30px) scale(0.8); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

// ============================================
// MAIN COMPONENT
// ============================================

export default function PracticeMode() {
  const { state, startRound, finishDeal, chooseAction, nextHand, resetSession } = useBlackjackPractice();
  const dealTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Auto-transition from dealing to awaitingAction
  useEffect(() => {
    if (state.phase === 'dealing') {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const delay = reducedMotion ? 0 : 600; // 3 cards × 200ms stagger
      dealTimerRef.current = setTimeout(finishDeal, delay);
      return () => clearTimeout(dealTimerRef.current);
    }
  }, [state.phase, finishDeal]);

  // Idle screen — start
  if (state.phase === 'idle') {
    return (
      <div className="max-w-2xl mx-auto text-center py-8">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#CFB53B' }}>
            Blackjack Mastery
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">Practice Mode</h2>
          <p className="text-sm mt-3" style={{ color: '#9A9A9A' }}>
            Make the right first decision on each hand. The trainer adapts to your weaknesses.
          </p>
        </div>

        {/* Lifetime stats */}
        {state.progress.totalRounds > 0 && (
          <div
            className="rounded-xl p-4 mb-6 border"
            style={{ backgroundColor: '#1A1A1A', borderColor: '#3A3A3A' }}
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-black" style={{ color: '#CFB53B' }}>{state.progress.totalRounds}</div>
                <div className="text-xs" style={{ color: '#9A9A9A' }}>Hands Played</div>
              </div>
              <div>
                <div className="text-2xl font-black" style={{ color: '#CFB53B' }}>{state.progress.bestStreak}</div>
                <div className="text-xs" style={{ color: '#9A9A9A' }}>Best Streak</div>
              </div>
              <div>
                <div className="text-2xl font-black" style={{ color: '#CFB53B' }}>{state.progress.sessionCount}</div>
                <div className="text-xs" style={{ color: '#9A9A9A' }}>Sessions</div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={startRound}
          className="px-10 py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          style={{ backgroundColor: '#A8001E' }}
        >
          Deal First Hand
        </button>
      </div>
    );
  }

  const { scenario, chosenAction, isCorrect, sessionHands, sessionCorrect, progress } = state;
  if (!scenario) return null;

  const showFeedback = state.phase === 'revealingFeedback';
  const canAct = state.phase === 'awaitingAction';

  return (
    <div className="max-w-2xl mx-auto pb-8">
      {/* Session stats */}
      <SessionStats
        hands={sessionHands}
        correct={sessionCorrect}
        streak={progress.currentStreak}
        bestStreak={progress.bestStreak}
      />

      {/* Streak meter */}
      <StreakMeter streak={progress.currentStreak} />

      {/* Table */}
      <TableFelt>
        {/* Dealer */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Dealer Shows
          </span>
          <div className="flex justify-center gap-3 mt-3">
            <PlayingCard card={scenario.dealerUpcard} delay={200} />
            <PlayingCard card={scenario.dealerUpcard} faceDown delay={400} />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed mb-6 sm:mb-8" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Player */}
        <div className="text-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Your Hand — {handLabel(scenario.playerCards, scenario.analysis)}
          </span>
          <div className="flex justify-center gap-3 mt-3">
            <PlayingCard card={scenario.playerCards[0]} delay={0} />
            <PlayingCard card={scenario.playerCards[1]} delay={300} />
          </div>
        </div>
      </TableFelt>

      {/* Actions */}
      <ActionBar
        onAction={chooseAction}
        disabled={!canAct}
        canSplit={scenario.analysis.canSplit}
        canDouble={scenario.analysis.canDouble}
      />

      {/* Feedback */}
      {showFeedback && chosenAction !== null && isCorrect !== null && (
        <>
          <TipPanel scenario={scenario} chosenAction={chosenAction} isCorrect={isCorrect} />

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={resetSession}
              className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              style={{ color: '#9A9A9A' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#FFFFFF')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#9A9A9A')}
            >
              End Session
            </button>
            <button
              onClick={nextHand}
              className="flex items-center gap-2 min-h-[48px] px-8 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              style={{ backgroundColor: '#A8001E' }}
            >
              <span>Next Hand</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </>
      )}

      {/* CSS animation keyframes */}
      <style>{KEYFRAME_STYLES}</style>
    </div>
  );
}
