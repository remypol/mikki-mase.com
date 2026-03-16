import { useState, useCallback, useRef, useEffect } from 'react';
import type { BlackjackHand } from '../../../config/course/types';

const CARD_SUITS: Record<string, string> = {
  h: '♥', d: '♦', c: '♣', s: '♠',
};

const CARD_VALUES: Record<string, string> = {
  'A': 'A', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6',
  '7': '7', '8': '8', '9': '9', 'T': '10', 'J': 'J', 'Q': 'Q', 'K': 'K',
};

function parseCard(card: string): { value: string; suit: string; color: string } {
  const value = card.slice(0, -1);
  const suitKey = card.slice(-1).toLowerCase();
  const suit = CARD_SUITS[suitKey] || suitKey;
  const color = suitKey === 'h' || suitKey === 'd' ? '#A8001E' : '#FFFFFF';
  return { value: CARD_VALUES[value] || value, suit, color };
}

function Card({ card, faceDown = false }: { card: string; faceDown?: boolean }) {
  if (faceDown) {
    return (
      <div
        className="w-20 h-28 rounded-xl flex items-center justify-center border-2"
        style={{ backgroundColor: '#1A1A1A', borderColor: '#CFB53B' }}
      >
        <span className="text-2xl" style={{ color: '#CFB53B' }}>?</span>
      </div>
    );
  }
  const { value, suit, color } = parseCard(card);
  return (
    <div
      className="w-20 h-28 rounded-xl flex flex-col items-center justify-center border-2 bg-white shadow-lg"
      style={{ borderColor: '#E8E8E8' }}
    >
      <span className="text-2xl font-black" style={{ color }}>{value}</span>
      <span className="text-xl" style={{ color }}>{suit}</span>
    </div>
  );
}

// Default hands based on Mikki's transcript strategies
const DEFAULT_HANDS: BlackjackHand[] = [
  {
    id: 'bj-1',
    playerCards: ['7h', '4d'],
    dealerUpcard: '6s',
    correctAction: 'double',
    explanation: 'You have 11 vs dealer 6 — the optimal double. This is the #1 best double down in blackjack according to Mikki.',
  },
  {
    id: 'bj-2',
    playerCards: ['8c', '8s'],
    dealerUpcard: 'Td',
    correctAction: 'hit',
    explanation: 'Mikki disagrees with "always split 8s." You have 16 (one losing hand). Splitting gives you two 18s (two losing hands that cost double). Just hit it.',
  },
  {
    id: 'bj-3',
    playerCards: ['Th', '6d'],
    dealerUpcard: '7c',
    correctAction: 'hit',
    explanation: '"If you have 16 and dealer shows 7 or above, hit your 16. Go down swinging." — Mikki. Standing on 16 vs 7+ is the wrong play.',
  },
  {
    id: 'bj-4',
    playerCards: ['Ah', 'As'],
    dealerUpcard: 'Tc',
    correctAction: 'split',
    explanation: 'Always split aces. Period. "You have two chances to get a 10. You\'re guaranteed to break even, basically." It doesn\'t matter what the dealer shows.',
  },
  {
    id: 'bj-5',
    playerCards: ['5h', '5d'],
    dealerUpcard: '4s',
    correctAction: 'double',
    explanation: 'You have 10 vs dealer 4 — this is in the core double range (9/10/11 vs dealer 4/5/6). Double down for maximum profit.',
  },
  {
    id: 'bj-6',
    playerCards: ['Ah', '7c'],
    dealerUpcard: '5d',
    correctAction: 'double',
    explanation: 'Soft 18 (A7) vs dealer 5. According to Mikki: "If dealer has 6, 5, or 4, you\'re going to double." This is an aggressive but correct play.',
  },
  {
    id: 'bj-7',
    playerCards: ['Ah', '7s'],
    dealerUpcard: '9h',
    correctAction: 'hit',
    explanation: 'Soft 18 (A7) vs dealer 9. Mikki says: "If the dealer has a 9 or 10, you\'re going to hit." 18 is a long-term loser (you need 18.55+).',
  },
  {
    id: 'bj-8',
    playerCards: ['6d', '5h'],
    dealerUpcard: '5c',
    correctAction: 'double',
    explanation: 'Player 11 vs dealer 5 — the second most optimal double down. "You always want to double down no matter what on an 11." — Mikki.',
  },
  {
    id: 'bj-9',
    playerCards: ['Th', '6s'],
    dealerUpcard: '4d',
    correctAction: 'stand',
    explanation: 'You have 16 vs dealer 4. When the dealer shows a weak card (4/5/6), standing is correct — let the dealer bust. The hit rule only applies vs 7+.',
  },
  {
    id: 'bj-10',
    playerCards: ['Ah', '8d'],
    dealerUpcard: '6s',
    correctAction: 'stand',
    explanation: '"Ace8 is a 19, you\'re going to stand 10 out of 10 times." — Mikki. Soft 19 is a long-term winner. Never mess with a 19 or 20.',
  },
];

interface Props {
  hands?: BlackjackHand[];
  onComplete?: (score: number, total: number) => void;
}

export default function BlackjackScenario({ hands = DEFAULT_HANDS, onComplete }: Props) {
  const [currentHand, setCurrentHand] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (hands.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-white text-2xl font-bold mb-2">No hands available</h3>
        <p className="text-sm" style={{ color: '#9A9A9A' }}>This exercise is being updated.</p>
      </div>
    );
  }

  const hand = hands[currentHand];

  const handleAction = useCallback((action: string) => {
    if (selectedAction) return;
    setSelectedAction(action);
    const isCorrect = action === hand.correctAction;
    if (isCorrect) setCorrectCount((prev) => prev + 1);

    timerRef.current = setTimeout(() => {
      if (currentHand < hands.length - 1) {
        setCurrentHand((prev) => prev + 1);
        setSelectedAction(null);
      } else {
        setIsFinished(true);
        const finalScore = isCorrect ? correctCount + 1 : correctCount;
        onComplete?.(finalScore, hands.length);
      }
    }, 2500);
  }, [selectedAction, hand, currentHand, hands.length, correctCount, onComplete]);

  const handleRestart = () => {
    setCurrentHand(0);
    setCorrectCount(0);
    setSelectedAction(null);
    setIsFinished(false);
  };

  if (isFinished) {
    const score = Math.round((correctCount / hands.length) * 100);
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">{score >= 80 ? '🃏' : '💪'}</div>
        <div className="text-5xl font-black mb-4" style={{ color: score >= 80 ? '#CFB53B' : '#A8001E' }}>
          {correctCount}/{hands.length}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {score >= 80 ? 'Sharp Player!' : 'Keep Practicing'}
        </h3>
        <p className="mb-6" style={{ color: '#BEBEBE' }}>
          {score >= 80
            ? 'You\'re making the right calls. Mikki would approve.'
            : 'Review the blackjack lessons and try again.'}
        </p>
        <button
          onClick={handleRestart}
          className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 min-h-[44px]"
          style={{ backgroundColor: '#CFB53B', color: '#000000' }}
        >
          Play Again
        </button>
      </div>
    );
  }

  const actions = [
    { key: 'hit', label: 'Hit', desc: 'Take another card' },
    { key: 'stand', label: 'Stand', desc: 'Keep your hand' },
    { key: 'double', label: 'Double Down', desc: 'Double bet, one card' },
    { key: 'split', label: 'Split', desc: 'Split into two hands' },
  ];

  const isCorrect = selectedAction === hand.correctAction;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#CFB53B' }}>
          Hand {currentHand + 1} of {hands.length}
        </span>
        <span className="text-sm font-bold" style={{ color: '#059669' }}>
          {correctCount} correct
        </span>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 mb-8">
        {hands.map((_, idx) => (
          <div
            key={idx}
            className="h-1.5 flex-1 rounded-full"
            style={{
              backgroundColor:
                idx < currentHand ? '#CFB53B'
                : idx === currentHand ? '#FFFFFF'
                : '#3A3A3A',
            }}
          />
        ))}
      </div>

      {/* Table */}
      <div
        className="rounded-2xl p-8 mb-6"
        style={{ backgroundColor: '#0A3A1A', border: '2px solid #1A5A2A' }}
      >
        {/* Dealer */}
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9A9A9A' }}>
            Dealer Shows
          </span>
          <div className="flex justify-center gap-3 mt-3">
            <Card card={hand.dealerUpcard} />
            <Card card="" faceDown />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed mb-8" style={{ borderColor: '#2D5A3D' }} />

        {/* Player */}
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9A9A9A' }}>
            Your Hand
          </span>
          <div className="flex justify-center gap-3 mt-3">
            {hand.playerCards.map((card, idx) => (
              <Card key={idx} card={card} />
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {actions.map((action) => {
          let bg = '#2D2D2D';
          let border = '#3A3A3A';
          let color = '#FFFFFF';

          if (selectedAction) {
            if (action.key === hand.correctAction) {
              bg = 'rgba(5, 150, 105, 0.15)';
              border = '#059669';
              color = '#059669';
            } else if (action.key === selectedAction) {
              bg = 'rgba(168, 0, 30, 0.15)';
              border = '#A8001E';
              color = '#A8001E';
            } else {
              bg = '#1A1A1A';
              border = '#2D2D2D';
              color = '#6B6B6B';
            }
          }

          return (
            <button
              key={action.key}
              onClick={() => handleAction(action.key)}
              disabled={!!selectedAction}
              className="p-4 rounded-xl border-2 transition-all duration-200 text-left min-h-[44px]"
              style={{ backgroundColor: bg, borderColor: border, color }}
            >
              <div className="font-bold text-lg">{action.label}</div>
              <div className="text-xs opacity-70">{action.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {selectedAction && (
        <div
          className="p-5 rounded-xl border animate-fadeIn"
          style={{
            borderColor: isCorrect ? '#059669' : '#A8001E',
            backgroundColor: isCorrect ? 'rgba(5, 150, 105, 0.08)' : 'rgba(168, 0, 30, 0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{isCorrect ? '✓' : '✗'}</span>
            <span className="font-bold text-white">
              {isCorrect ? 'Correct!' : `The right play: ${hand.correctAction.charAt(0).toUpperCase() + hand.correctAction.slice(1)}`}
            </span>
          </div>
          <p className="text-sm" style={{ color: '#D4D4D4' }}>
            {hand.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
