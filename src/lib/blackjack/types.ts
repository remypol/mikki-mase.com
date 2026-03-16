/**
 * Blackjack Domain Types
 * Pure TypeScript — no React dependencies.
 */

export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  rank: Rank;
  suit: Suit;
}

export type Action = 'hit' | 'stand' | 'double' | 'split';

export interface RuleSet {
  decks: 6 | 8;
  dealerHitsSoft17: boolean;
  doubleAfterSplit: boolean;
  resplitAces: boolean;
  lateSurrender: boolean;
  blackjackPayout: '3:2' | '6:5';
}

/** Canonical ruleset used throughout the course. */
export const COURSE_RULESET: RuleSet = {
  decks: 6,
  dealerHitsSoft17: false, // S17
  doubleAfterSplit: true,
  resplitAces: false,
  lateSurrender: false,
  blackjackPayout: '3:2',
};

export type HandKind = 'hard' | 'soft' | 'pair';

export interface HandAnalysis {
  total: number;
  isSoft: boolean;
  isPair: boolean;
  kind: HandKind;
  canSplit: boolean;
  canDouble: boolean;
}

export interface StrategyDecision {
  optimalAction: Action;
  conceptKey: string;
}

export interface Scenario {
  playerCards: [Card, Card];
  dealerUpcard: Card;
  analysis: HandAnalysis;
  decision: StrategyDecision;
}

export interface ConceptStats {
  attempts: number;
  correct: number;
  streak: number;
  lastSeenAt: number;
}

export interface PracticeProgress {
  version: 1;
  totalRounds: number;
  bestStreak: number;
  currentStreak: number;
  accuracyByConcept: Record<string, ConceptStats>;
  recentMistakes: Array<{
    conceptKey: string;
    handLabel: string;
    ts: number;
  }>;
  sessionCount: number;
}

export function createDefaultPracticeProgress(): PracticeProgress {
  return {
    version: 1,
    totalRounds: 0,
    bestStreak: 0,
    currentStreak: 0,
    accuracyByConcept: {},
    recentMistakes: [],
    sessionCount: 0,
  };
}
