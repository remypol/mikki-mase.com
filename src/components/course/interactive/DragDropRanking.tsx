import { useState, useCallback } from 'react';
import type { DragRankItem } from '../../../config/course/types';

const DEFAULT_ITEMS: DragRankItem[] = [
  { id: 'continuous', label: 'Continuous Shuffle Machine', correctPosition: 0 },
  { id: 'eight-deck', label: '8-Deck Blackjack', correctPosition: 1 },
  { id: 'single-deck', label: 'Single Deck Blackjack', correctPosition: 2 },
  { id: 'six-deck', label: '6-Deck (Shoe) Blackjack', correctPosition: 3 },
  { id: 'double-deck', label: 'Double Deck Blackjack', correctPosition: 4 },
];

interface Props {
  items?: DragRankItem[];
  title?: string;
  description?: string;
  onComplete?: (isCorrect: boolean) => void;
}

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function DragDropRanking({
  items = DEFAULT_ITEMS,
  title = 'Rank the Blackjack Types',
  description = 'Drag or tap to rank from WORST (top) to BEST (bottom) for the player.',
  onComplete,
}: Props) {
  const [order, setOrder] = useState<DragRankItem[]>(() => fisherYatesShuffle(items));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Touch/click: tap to select, tap target to swap
  const handleTap = useCallback((index: number) => {
    if (submitted) return;
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      setOrder((prev) => {
        const next = [...prev];
        [next[selectedIndex], next[index]] = [next[index], next[selectedIndex]];
        return next;
      });
      setSelectedIndex(null);
    }
  }, [selectedIndex, submitted]);

  // Desktop drag
  const handleDragStart = (index: number) => {
    if (submitted) return;
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    setOrder((prev) => {
      const next = [...prev];
      const [dragged] = next.splice(dragIndex, 1);
      next.splice(index, 0, dragged);
      return next;
    });
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  const handleSubmit = () => {
    if (order.length === 0) return;
    const correct = order.every((item, idx) => item.correctPosition === idx);
    setIsCorrect(correct);
    setSubmitted(true);
    onComplete?.(correct);
  };

  const handleReset = () => {
    setOrder(fisherYatesShuffle(items));
    setSelectedIndex(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm" style={{ color: '#9A9A9A' }}>{description}</p>
      </div>

      {/* Labels */}
      <div className="flex justify-between mb-3 px-2">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#A8001E' }}>
          Worst
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#059669' }}>
          Best
        </span>
      </div>

      {/* Ranking items */}
      <div className="space-y-2 mb-6">
        {order.map((item, idx) => {
          let borderColor = '#3A3A3A';
          let bgColor = '#2D2D2D';

          if (submitted) {
            const isRightPosition = item.correctPosition === idx;
            borderColor = isRightPosition ? '#059669' : '#A8001E';
            bgColor = isRightPosition ? 'rgba(5, 150, 105, 0.1)' : 'rgba(168, 0, 30, 0.1)';
          } else if (selectedIndex === idx) {
            borderColor = '#CFB53B';
            bgColor = 'rgba(207, 181, 59, 0.1)';
          } else if (dragIndex === idx) {
            borderColor = '#CFB53B';
          }

          return (
            <div
              key={item.id}
              draggable={!submitted}
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              onClick={() => handleTap(idx)}
              className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none min-h-[44px]"
              style={{ borderColor, backgroundColor: bgColor }}
            >
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  backgroundColor: submitted
                    ? item.correctPosition === idx ? '#059669' : '#A8001E'
                    : '#3A3A3A',
                  color: '#FFFFFF',
                }}
              >
                {idx + 1}
              </span>
              <span className="font-medium text-white flex-1">{item.label}</span>
              {!submitted && (
                <span style={{ color: '#6B6B6B' }} className="text-lg">⋮⋮</span>
              )}
              {submitted && (
                <span className="text-lg">
                  {item.correctPosition === idx ? '✓' : '✗'}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit / Result */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 min-h-[44px]"
          style={{ backgroundColor: '#CFB53B', color: '#000000' }}
        >
          Check My Ranking
        </button>
      ) : (
        <div>
          <div
            className="p-4 rounded-xl border mb-4"
            style={{
              borderColor: isCorrect ? '#059669' : '#A8001E',
              backgroundColor: isCorrect ? 'rgba(5, 150, 105, 0.08)' : 'rgba(168, 0, 30, 0.08)',
            }}
          >
            <p className="font-bold text-white mb-1">
              {isCorrect ? '🎯 Perfect ranking!' : 'Not quite right'}
            </p>
            <p className="text-sm" style={{ color: '#D4D4D4' }}>
              Correct order (worst to best): Continuous Shuffle → 8-Deck → Single Deck → 6-Deck Shoe → Double Deck.
              "If double deck was better for the casino, they would make every table double deck." — Mikki
            </p>
          </div>
          <button
            onClick={handleReset}
            className="w-full py-4 rounded-xl font-bold text-lg border-2 transition-all duration-200 min-h-[44px]"
            style={{ borderColor: '#CFB53B', color: '#CFB53B', backgroundColor: 'transparent' }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
