/**
 * SkillAssessment — Interactive "Casino IQ Assessment" with 4 stations.
 * Conversion-focused diagnostic tool for Module 1 free preview.
 */
import { useState, useRef } from 'react';
import { useSkillAssessment } from '../../hooks/useSkillAssessment';
import type { AssessmentResponse, StationId } from '../../lib/assessment/types';
import { STATION_ORDER, STATION_META, BLITZ_HANDS, BANKROLL_ITEMS, MYTH_ITEMS, HOST_ITEMS } from '../../lib/assessment/stations';
import type { BlitzHand, BankrollItem, MythItem, HostItem } from '../../lib/assessment/stations';
import { getBand } from '../../lib/assessment/resultBands';
import type { Card, Rank, Suit } from '../../lib/blackjack/types';
import { isRed } from '../../lib/blackjack/cards';
import { evaluateHand, handLabel } from '../../lib/blackjack/handEvaluator';

// ============================================
// SHARED UI
// ============================================

function ProgressDots({ total, current, stationIndex }: { total: number; current: number; stationIndex: number }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {STATION_ORDER.map((_, si) => (
        <div key={si} className="flex gap-1 flex-1">
          {si === stationIndex ? (
            // Active station — show item dots
            Array.from({ length: total }, (_, i) => (
              <div
                key={i}
                className="h-1.5 flex-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i < current ? '#CFB53B' : i === current ? '#FFFFFF' : '#3A3A3A',
                }}
              />
            ))
          ) : (
            <div
              className="h-1.5 flex-1 rounded-full"
              style={{ backgroundColor: si < stationIndex ? '#CFB53B' : '#3A3A3A' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function StationHeader({ stationId }: { stationId: StationId }) {
  const meta = STATION_META[stationId];
  return (
    <div className="text-center mb-6">
      <span className="text-3xl mb-2 block">{meta.icon}</span>
      <h3 className="text-xl font-black text-white">{meta.title}</h3>
      <p className="text-sm mt-1" style={{ color: '#9A9A9A' }}>{meta.subtitle}</p>
    </div>
  );
}

// ============================================
// MINI CARD (for blackjack blitz)
// ============================================

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

const RANDOM_SUITS: Suit[] = ['♠', '♥', '♦', '♣'];
function rSuit(): Suit { return RANDOM_SUITS[Math.floor(Math.random() * 4)]; }

// ============================================
// STATION 1: BLACKJACK BLITZ
// ============================================

function StationBlackjack({
  hand, onAnswer, itemIndex,
}: { hand: BlitzHand; onAnswer: (response: AssessmentResponse) => void; itemIndex: number }) {
  const startTime = useRef(Date.now());
  const [selected, setSelected] = useState<string | null>(null);
  const suitRef = useRef({ p1: rSuit(), p2: rSuit(), d: rSuit() });

  const handleSelect = (action: string) => {
    if (selected) return;
    setSelected(action);
    const isCorrect = action === hand.correctAction;
    // No feedback — just flash and move on
    setTimeout(() => {
      onAnswer({
        stationId: 'blackjack-blitz',
        itemId: hand.id,
        answer: action,
        correct: isCorrect,
        responseTimeMs: Date.now() - startTime.current,
      });
      setSelected(null);
      startTime.current = Date.now();
      suitRef.current = { p1: rSuit(), p2: rSuit(), d: rSuit() };
    }, 400);
  };

  const actions = ['hit', 'stand', 'double', 'split'];

  return (
    <div>
      {/* Table */}
      <div
        className="rounded-2xl p-6 mb-5"
        style={{ background: 'linear-gradient(135deg, #0A3A1A, #0D4A22)', border: '2px solid #1A5A2A' }}
      >
        {/* Dealer */}
        <div className="text-center mb-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Dealer
          </span>
          <div className="flex justify-center gap-2 mt-2">
            <MiniCard rank={hand.dealerRank} suit={suitRef.current.d} />
            <div className="w-14 h-20 rounded-lg flex items-center justify-center border-2 flex-shrink-0"
              style={{ backgroundColor: '#1A1A1A', borderColor: '#CFB53B' }}>
              <span style={{ color: '#CFB53B' }}>?</span>
            </div>
          </div>
        </div>
        <div className="border-t border-dashed mb-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        {/* Player */}
        <div className="text-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Your Hand
          </span>
          <div className="flex justify-center gap-2 mt-2">
            <MiniCard rank={hand.playerRanks[0]} suit={suitRef.current.p1} />
            <MiniCard rank={hand.playerRanks[1]} suit={suitRef.current.p2} />
          </div>
        </div>
      </div>

      {/* Action grid */}
      <div className="grid grid-cols-4 gap-2">
        {actions.map((a) => (
          <button
            key={a}
            onClick={() => handleSelect(a)}
            disabled={!!selected}
            className="min-h-[48px] rounded-xl font-bold text-sm border-2 transition-all duration-200 capitalize"
            style={{
              backgroundColor: selected === a ? (a === hand.correctAction ? 'rgba(5,150,105,0.2)' : 'rgba(168,0,30,0.2)') : '#2D2D2D',
              borderColor: selected === a ? (a === hand.correctAction ? '#059669' : '#A8001E') : '#4A4A4A',
              color: selected ? '#6B6B6B' : '#FFFFFF',
            }}
          >
            {a === 'double' ? 'Dbl' : a}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// STATION 2: BANKROLL RADAR
// ============================================

function StationBankroll({
  item, onAnswer,
}: { item: BankrollItem; onAnswer: (response: AssessmentResponse) => void }) {
  const startTime = useRef(Date.now());
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(() => {
      onAnswer({
        stationId: 'bankroll-radar',
        itemId: item.id,
        answer: String(idx),
        correct: idx === item.correctIndex,
        responseTimeMs: Date.now() - startTime.current,
      });
      setSelected(null);
      startTime.current = Date.now();
    }, 300);
  };

  return (
    <div>
      <p className="text-white font-semibold mb-4">{item.question}</p>
      <div className="space-y-2">
        {item.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            disabled={selected !== null}
            className="w-full text-left p-4 rounded-xl border transition-all duration-200 min-h-[48px]"
            style={{
              backgroundColor: selected === idx ? '#2D2D2D' : '#1A1A1A',
              borderColor: selected === idx ? '#CFB53B' : '#3A3A3A',
              color: '#D4D4D4',
            }}
          >
            <span className="text-sm">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// STATION 3: MYTH BUSTER
// ============================================

function StationMythBuster({
  item, onAnswer,
}: { item: MythItem; onAnswer: (response: AssessmentResponse) => void }) {
  const startTime = useRef(Date.now());
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (answer: 'myth' | 'fact') => {
    if (selected) return;
    setSelected(answer);
    const isCorrect = (answer === 'myth') === item.isMyth;
    setTimeout(() => {
      onAnswer({
        stationId: 'myth-buster',
        itemId: item.id,
        answer,
        correct: isCorrect,
        responseTimeMs: Date.now() - startTime.current,
      });
      setSelected(null);
      startTime.current = Date.now();
    }, 300);
  };

  return (
    <div>
      <div
        className="rounded-xl p-5 mb-5 border"
        style={{ backgroundColor: '#1A1A1A', borderColor: '#3A3A3A' }}
      >
        <p className="text-white font-semibold text-center">"{item.statement}"</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleSelect('myth')}
          disabled={!!selected}
          className="min-h-[56px] rounded-xl font-bold text-base border-2 transition-all duration-200"
          style={{
            backgroundColor: selected === 'myth' ? 'rgba(168,0,30,0.15)' : '#2D2D2D',
            borderColor: selected === 'myth' ? '#A8001E' : '#4A4A4A',
            color: '#FFFFFF',
          }}
        >
          Myth
        </button>
        <button
          onClick={() => handleSelect('fact')}
          disabled={!!selected}
          className="min-h-[56px] rounded-xl font-bold text-base border-2 transition-all duration-200"
          style={{
            backgroundColor: selected === 'fact' ? 'rgba(5,150,105,0.15)' : '#2D2D2D',
            borderColor: selected === 'fact' ? '#059669' : '#4A4A4A',
            color: '#FFFFFF',
          }}
        >
          Fact
        </button>
      </div>
    </div>
  );
}

// ============================================
// STATION 4: HOST EDGE
// ============================================

function StationHostEdge({
  item, onAnswer,
}: { item: HostItem; onAnswer: (response: AssessmentResponse) => void }) {
  const startTime = useRef(Date.now());
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(() => {
      onAnswer({
        stationId: 'host-edge',
        itemId: item.id,
        answer: String(idx),
        correct: idx === item.correctIndex,
        responseTimeMs: Date.now() - startTime.current,
      });
      setSelected(null);
      startTime.current = Date.now();
    }, 300);
  };

  return (
    <div>
      <div
        className="rounded-xl p-5 mb-5 border"
        style={{ backgroundColor: '#1A1A1A', borderColor: '#3A3A3A' }}
      >
        <p className="text-white font-semibold">{item.scenario}</p>
      </div>
      <div className="space-y-2">
        {item.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            disabled={selected !== null}
            className="w-full text-left p-4 rounded-xl border transition-all duration-200 min-h-[48px]"
            style={{
              backgroundColor: selected === idx ? '#2D2D2D' : '#1A1A1A',
              borderColor: selected === idx ? '#CFB53B' : '#3A3A3A',
              color: '#D4D4D4',
            }}
          >
            <span className="text-sm">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// BETWEEN STATIONS
// ============================================

function BetweenStations({ nextStationId, onContinue }: { nextStationId: StationId; onContinue: () => void }) {
  const meta = STATION_META[nextStationId];
  return (
    <div className="text-center py-8">
      <span className="text-4xl mb-4 block">{meta.icon}</span>
      <h3 className="text-xl font-black text-white mb-2">Next: {meta.title}</h3>
      <p className="text-sm mb-6" style={{ color: '#9A9A9A' }}>{meta.subtitle}</p>
      <button
        onClick={onContinue}
        className="px-8 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
        style={{ backgroundColor: '#A8001E' }}
      >
        Continue
      </button>
    </div>
  );
}

// ============================================
// INTRO SCREEN
// ============================================

function IntroScreen({ onStart, previousBand }: { onStart: () => void; previousBand?: string }) {
  return (
    <div className="text-center py-8 max-w-lg mx-auto">
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#CFB53B' }}>
        Free Assessment
      </span>
      <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-3">
        Casino IQ Assessment
      </h2>
      <p className="text-sm mb-2" style={{ color: '#BEBEBE' }}>
        4 stations. 20 questions. ~4 minutes.
      </p>
      <p className="text-sm mb-8" style={{ color: '#9A9A9A' }}>
        Benchmarked against disciplined, winning-standard decision making.
        Find out where you're leaving money on the table.
      </p>

      {previousBand && (
        <div
          className="rounded-xl p-4 mb-6 border"
          style={{ backgroundColor: '#1A1A1A', borderColor: '#3A3A3A' }}
        >
          <span className="text-xs" style={{ color: '#9A9A9A' }}>
            Your previous result: <span className="font-semibold" style={{ color: '#CFB53B' }}>{previousBand}</span>
          </span>
        </div>
      )}

      <div className="space-y-3 mb-8 text-left">
        {STATION_ORDER.map((sid) => {
          const meta = STATION_META[sid];
          return (
            <div key={sid} className="flex items-center gap-3 px-4 py-3 rounded-lg" style={{ backgroundColor: '#1A1A1A' }}>
              <span className="text-xl">{meta.icon}</span>
              <div>
                <div className="text-sm font-semibold text-white">{meta.title}</div>
                <div className="text-xs" style={{ color: '#9A9A9A' }}>{meta.itemCount} questions</div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onStart}
        className="px-10 py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
        style={{ backgroundColor: '#A8001E' }}
      >
        Start Assessment
      </button>
    </div>
  );
}

// ============================================
// RESULTS SCREEN
// ============================================

function ResultsScreen({
  result, onRetake,
}: { result: NonNullable<ReturnType<typeof useSkillAssessment>['state']['result']>; onRetake: () => void }) {
  const band = getBand(result.skillBand);
  const percentage = Math.round(result.weightedScore * 100);
  const minutes = Math.round(result.totalTimeMs / 60000);

  return (
    <div className="max-w-lg mx-auto py-8">
      {/* Score badge */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4"
          style={{
            backgroundColor: result.skillBand === 'elite' ? 'rgba(207,181,59,0.15)' :
              result.skillBand === 'sharp-but-incomplete' ? 'rgba(5,150,105,0.15)' :
              result.skillBand === 'leaky' ? 'rgba(207,181,59,0.1)' : 'rgba(168,0,30,0.1)',
            border: `3px solid ${
              result.skillBand === 'elite' ? '#CFB53B' :
              result.skillBand === 'sharp-but-incomplete' ? '#059669' :
              result.skillBand === 'leaky' ? '#CFB53B' : '#A8001E'
            }`,
          }}
        >
          <span className="text-3xl font-black" style={{
            color: result.skillBand === 'elite' ? '#CFB53B' :
              result.skillBand === 'sharp-but-incomplete' ? '#059669' :
              result.skillBand === 'leaky' ? '#CFB53B' : '#A8001E',
          }}>
            {percentage}%
          </span>
        </div>
        <h2 className="text-2xl font-black text-white mb-1">{band.title}</h2>
        <p className="text-sm" style={{ color: '#9A9A9A' }}>{band.subtitle}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-center mb-8" style={{ color: '#BEBEBE' }}>
        {band.description}
      </p>

      {/* Station breakdown */}
      <div
        className="rounded-xl p-5 mb-6 border"
        style={{ backgroundColor: '#1A1A1A', borderColor: '#3A3A3A' }}
      >
        <h3 className="text-sm font-bold text-white mb-4">Station Breakdown</h3>
        <div className="space-y-3">
          {result.stationResults.map((sr) => {
            const meta = STATION_META[sr.stationId];
            const pct = Math.round(sr.accuracy * 100);
            return (
              <div key={sr.stationId} className="flex items-center gap-3">
                <span className="text-lg">{meta.icon}</span>
                <span className="text-sm flex-1 text-white">{meta.title}</span>
                <span className="text-sm font-bold" style={{
                  color: pct >= 80 ? '#059669' : pct >= 50 ? '#CFB53B' : '#A8001E',
                }}>
                  {sr.score}/{sr.total}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaks */}
      {result.leaks.length > 0 && (
        <div
          className="rounded-xl p-5 mb-6 border-l-4"
          style={{ backgroundColor: 'rgba(168,0,30,0.06)', borderColor: '#A8001E' }}
        >
          <h3 className="text-sm font-bold text-white mb-3">
            You're leaking value in {result.leaks.length} area{result.leaks.length > 1 ? 's' : ''}:
          </h3>
          <ul className="space-y-2">
            {result.leaks.map((leak) => (
              <li key={leak} className="flex items-center gap-2 text-sm" style={{ color: '#D4D4D4' }}>
                <span style={{ color: '#A8001E' }}>•</span>
                {leak.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended modules */}
      {result.recommendedModules.length > 0 && (
        <div
          className="rounded-xl p-5 mb-8 border"
          style={{ backgroundColor: '#1A1A1A', borderColor: '#3A3A3A' }}
        >
          <h3 className="text-sm font-bold mb-3" style={{ color: '#CFB53B' }}>Recommended Modules</h3>
          <div className="space-y-2">
            {result.recommendedModules.map((mod) => (
              <div key={mod} className="flex items-center gap-2 text-sm" style={{ color: '#BEBEBE' }}>
                <span style={{ color: '#CFB53B' }}>→</span>
                {mod.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center space-y-3">
        <a
          href="/masterclass"
          className="block w-full py-4 rounded-xl font-bold text-lg text-white text-center transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          style={{ backgroundColor: '#A8001E' }}
        >
          Fix These Leaks — Get the Masterclass
        </a>
        <button
          onClick={onRetake}
          className="text-sm font-medium transition-colors"
          style={{ color: '#9A9A9A' }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#FFFFFF')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#9A9A9A')}
        >
          Retake Assessment
        </button>
      </div>

      {/* Time */}
      <div className="text-center mt-6">
        <span className="text-xs" style={{ color: '#6B6B6B' }}>
          Completed in {minutes} minute{minutes !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}

// ============================================
// STATION ROUTER
// ============================================

function StationContent({
  stationId, itemIndex, onAnswer,
}: {
  stationId: StationId;
  itemIndex: number;
  onAnswer: (response: AssessmentResponse) => void;
}) {
  switch (stationId) {
    case 'blackjack-blitz':
      return <StationBlackjack hand={BLITZ_HANDS[itemIndex]} onAnswer={onAnswer} itemIndex={itemIndex} />;
    case 'bankroll-radar':
      return <StationBankroll item={BANKROLL_ITEMS[itemIndex]} onAnswer={onAnswer} />;
    case 'myth-buster':
      return <StationMythBuster item={MYTH_ITEMS[itemIndex]} onAnswer={onAnswer} />;
    case 'host-edge':
      return <StationHostEdge item={HOST_ITEMS[itemIndex]} onAnswer={onAnswer} />;
    default:
      return null;
  }
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function SkillAssessment() {
  const { state, currentStation, start, answer, nextStation, restart } = useSkillAssessment();

  if (state.phase === 'intro') {
    const previousBandLabel = state.previousResult
      ? getBand(state.previousResult.skillBand).title
      : undefined;
    return <IntroScreen onStart={start} previousBand={previousBandLabel} />;
  }

  if (state.phase === 'results' && state.result) {
    return <ResultsScreen result={state.result} onRetake={restart} />;
  }

  if (state.phase === 'between-stations') {
    const nextStationId = STATION_ORDER[state.currentStationIndex + 1];
    return <BetweenStations nextStationId={nextStationId} onContinue={nextStation} />;
  }

  if (state.phase === 'station' && currentStation) {
    const meta = STATION_META[currentStation];
    return (
      <div className="max-w-lg mx-auto">
        <ProgressDots
          total={meta.itemCount}
          current={state.currentItemIndex}
          stationIndex={state.currentStationIndex}
        />
        <StationHeader stationId={currentStation} />
        <StationContent
          key={`${currentStation}-${state.currentItemIndex}`}
          stationId={currentStation}
          itemIndex={state.currentItemIndex}
          onAnswer={answer}
        />
      </div>
    );
  }

  return null;
}
