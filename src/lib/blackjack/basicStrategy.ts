/**
 * Basic Strategy Lookup — 6-deck, S17, DAS.
 * Returns the optimal first-decision action for any player hand vs dealer upcard.
 *
 * Strategy tables follow standard basic strategy with Mikki's specific adjustments:
 * - 8,8 vs 10: HIT (not split) — Mikki disagrees with "always split 8s"
 * - A,8 vs anything: always STAND
 *
 * Key: H=hit, S=stand, D=double(hit if can't), P=split
 * Columns: dealer 2,3,4,5,6,7,8,9,10,A
 */
import type { Card, Action, HandAnalysis } from './types';
import { cardValue } from './cards';

type StrategyChar = 'H' | 'S' | 'D' | 'P';

// Hard totals 5-17 (rows), dealer 2-A (cols)
// Index 0 = hard 5, index 12 = hard 17
const HARD_TABLE: StrategyChar[][] = [
  // 5:  2  3  4  5  6  7  8  9  T  A
  ['H','H','H','H','H','H','H','H','H','H'],
  // 6
  ['H','H','H','H','H','H','H','H','H','H'],
  // 7
  ['H','H','H','H','H','H','H','H','H','H'],
  // 8
  ['H','H','H','H','H','H','H','H','H','H'],
  // 9
  ['H','D','D','D','D','H','H','H','H','H'],
  // 10
  ['D','D','D','D','D','D','D','D','H','H'],
  // 11
  ['D','D','D','D','D','D','D','D','D','D'],
  // 12
  ['H','H','S','S','S','H','H','H','H','H'],
  // 13
  ['S','S','S','S','S','H','H','H','H','H'],
  // 14
  ['S','S','S','S','S','H','H','H','H','H'],
  // 15
  ['S','S','S','S','S','H','H','H','H','H'],
  // 16
  ['S','S','S','S','S','H','H','H','H','H'],
  // 17+
  ['S','S','S','S','S','S','S','S','S','S'],
];

// Soft totals 13-20 (A,2 through A,9)
// Index 0 = soft 13 (A,2), index 7 = soft 20 (A,9)
const SOFT_TABLE: StrategyChar[][] = [
  // A,2 (13): 2  3  4  5  6  7  8  9  T  A
  ['H','H','H','D','D','H','H','H','H','H'],
  // A,3 (14)
  ['H','H','H','D','D','H','H','H','H','H'],
  // A,4 (15)
  ['H','H','D','D','D','H','H','H','H','H'],
  // A,5 (16)
  ['H','H','D','D','D','H','H','H','H','H'],
  // A,6 (17)
  ['H','D','D','D','D','H','H','H','H','H'],
  // A,7 (18)
  ['D','D','D','D','D','S','S','H','H','H'],
  // A,8 (19) — Mikki: "Ace8 is a 19, stand 10/10 times"
  ['S','S','S','S','S','S','S','S','S','S'],
  // A,9 (20)
  ['S','S','S','S','S','S','S','S','S','S'],
];

// Pairs: 2,2 through A,A
// Index 0 = 2,2, index 9 = A,A
const PAIR_TABLE: StrategyChar[][] = [
  // 2,2: 2  3  4  5  6  7  8  9  T  A
  ['P','P','P','P','P','P','H','H','H','H'],
  // 3,3
  ['P','P','P','P','P','P','H','H','H','H'],
  // 4,4
  ['H','H','H','P','P','H','H','H','H','H'],
  // 5,5 — never split, treat as hard 10
  ['D','D','D','D','D','D','D','D','H','H'],
  // 6,6
  ['P','P','P','P','P','H','H','H','H','H'],
  // 7,7
  ['P','P','P','P','P','P','H','H','H','H'],
  // 8,8 — Mikki's adjustment: HIT vs 10 (not split)
  ['P','P','P','P','P','P','P','P','H','P'],
  // 9,9
  ['P','P','P','P','P','S','P','P','S','S'],
  // 10,10 (T,T / J,J / Q,Q / K,K)
  ['S','S','S','S','S','S','S','S','S','S'],
  // A,A
  ['P','P','P','P','P','P','P','P','P','P'],
];

/** Map dealer upcard value (2-11) to column index (0-9). */
function dealerCol(upcard: Card): number {
  const val = cardValue(upcard);
  if (val === 11) return 9; // Ace
  return val - 2;
}

/** Map a pair rank to row index in PAIR_TABLE. */
function pairRow(rank: string): number {
  const map: Record<string, number> = {
    '2': 0, '3': 1, '4': 2, '5': 3, '6': 4,
    '7': 5, '8': 6, '9': 7, '10': 8, 'J': 8, 'Q': 8, 'K': 8, 'A': 9,
  };
  return map[rank] ?? 0;
}

/** Get the concept key for this hand situation. */
export function getConceptKey(analysis: HandAnalysis, playerCards: Card[], dealerUpcard: Card): string {
  const dv = cardValue(dealerUpcard);
  const dealerLabel = dv === 11 ? 'A' : String(dv);

  if (analysis.isPair) {
    return `pair-${playerCards[0].rank}s-vs-${dealerLabel}`;
  }
  if (analysis.isSoft) {
    return `soft-${analysis.total}-vs-${dealerLabel}`;
  }
  return `hard-${analysis.total}-vs-${dealerLabel}`;
}

/** Get the broader concept category (for grouping stats). */
export function getConceptCategory(analysis: HandAnalysis, playerCards: Card[]): string {
  if (analysis.isPair) {
    return `pair-${playerCards[0].rank}s`;
  }
  if (analysis.isSoft) {
    return `soft-${analysis.total}`;
  }
  // Group hard totals into ranges
  if (analysis.total <= 8) return 'hard-5-8';
  if (analysis.total === 9) return 'hard-9';
  if (analysis.total === 10) return 'hard-10';
  if (analysis.total === 11) return 'hard-11';
  if (analysis.total === 12) return 'hard-12';
  if (analysis.total >= 13 && analysis.total <= 16) return `hard-${analysis.total}`;
  return 'hard-17-plus';
}

/** Look up the optimal action. */
export function getOptimalAction(
  analysis: HandAnalysis,
  playerCards: Card[],
  dealerUpcard: Card,
): Action {
  const col = dealerCol(dealerUpcard);

  // Pairs
  if (analysis.isPair && playerCards.length === 2) {
    const row = pairRow(playerCards[0].rank);
    const char = PAIR_TABLE[row][col];
    // 5,5 never splits — treat as hard 10, which gives D
    if (char === 'P') return 'split';
    return charToAction(char, analysis);
  }

  // Soft totals (A,x where x is 2-9)
  if (analysis.isSoft && analysis.total >= 13 && analysis.total <= 20) {
    const row = analysis.total - 13;
    const char = SOFT_TABLE[row][col];
    return charToAction(char, analysis);
  }

  // Hard totals
  if (analysis.total <= 4) return 'hit';
  if (analysis.total >= 17) return 'stand';

  const row = analysis.total - 5;
  const char = HARD_TABLE[row][col];
  return charToAction(char, analysis);
}

function charToAction(char: StrategyChar, analysis: HandAnalysis): Action {
  switch (char) {
    case 'H': return 'hit';
    case 'S': return 'stand';
    case 'D': return analysis.canDouble ? 'double' : 'hit';
    case 'P': return 'split';
    default: return 'hit';
  }
}

/** Full evaluation: given player cards and dealer upcard, return optimal action + concept key. */
export function evaluate(
  playerCards: Card[],
  dealerUpcard: Card,
  analysis: HandAnalysis,
): { optimalAction: Action; conceptKey: string } {
  const optimalAction = getOptimalAction(analysis, playerCards, dealerUpcard);
  const conceptKey = getConceptKey(analysis, playerCards, dealerUpcard);
  return { optimalAction, conceptKey };
}
