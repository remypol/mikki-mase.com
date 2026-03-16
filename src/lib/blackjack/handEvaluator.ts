/**
 * Hand evaluation: totals, soft/hard, pair detection.
 */
import type { Card, HandAnalysis, HandKind } from './types';
import { cardValue } from './cards';

/** Evaluate a hand of cards. */
export function evaluateHand(cards: Card[]): HandAnalysis {
  let total = 0;
  let aces = 0;

  for (const c of cards) {
    const val = cardValue(c);
    total += val;
    if (c.rank === 'A') aces++;
  }

  // Downgrade aces from 11 to 1 while busting
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  const isSoft = aces > 0 && total <= 21;
  const isPair = cards.length === 2 && cards[0].rank === cards[1].rank;

  let kind: HandKind;
  if (isPair) {
    kind = 'pair';
  } else if (isSoft) {
    kind = 'soft';
  } else {
    kind = 'hard';
  }

  return {
    total,
    isSoft,
    isPair,
    kind,
    canSplit: isPair,
    canDouble: cards.length === 2,
  };
}

/** Dealer upcard numeric value (for strategy lookup). */
export function dealerValue(card: Card): number {
  return cardValue(card);
}

/** Human-readable hand description. */
export function handLabel(cards: Card[], analysis: HandAnalysis): string {
  if (analysis.isPair) {
    return `Pair of ${cards[0].rank}s`;
  }
  if (analysis.isSoft) {
    return `Soft ${analysis.total}`;
  }
  return `Hard ${analysis.total}`;
}
