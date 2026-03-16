/**
 * Hybrid Scenario Generator
 * 70% targeted educational hands, 30% natural random hands.
 * Weighted toward concepts the player struggles with.
 */
import type { Card, Rank, Suit, Scenario, PracticeProgress, HandAnalysis } from './types';
import { COURSE_RULESET } from './types';
import { shuffle, cardValue } from './cards';
import { evaluateHand } from './handEvaluator';
import { evaluate, getConceptCategory } from './basicStrategy';

const SUITS: Suit[] = ['♠', '♥', '♦', '♣'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function randomSuit(): Suit {
  return SUITS[Math.floor(Math.random() * 4)];
}

function randomCard(): Card {
  return { rank: RANKS[Math.floor(Math.random() * 13)], suit: randomSuit() };
}

function makeCard(rank: Rank): Card {
  return { rank, suit: randomSuit() };
}

// ============================================
// EDUCATIONAL SCENARIOS — common decision spots
// ============================================

interface EducationalSpot {
  playerRanks: [Rank, Rank];
  dealerRanks: Rank[];
  weight: number;
  conceptCategory: string;
}

/** High-value learning spots from Mikki's teachings. */
const EDUCATIONAL_SPOTS: EducationalSpot[] = [
  // Hard 16 vs high cards (hit) — most common mistake
  { playerRanks: ['10', '6'], dealerRanks: ['7', '8', '9', '10', 'A'], weight: 3, conceptCategory: 'hard-16' },
  // Hard 16 vs low cards (stand)
  { playerRanks: ['10', '6'], dealerRanks: ['4', '5', '6'], weight: 2, conceptCategory: 'hard-16' },
  // Hard 12 vs 2,3 (hit) — common mistake
  { playerRanks: ['10', '2'], dealerRanks: ['2', '3'], weight: 3, conceptCategory: 'hard-12' },
  // Hard 12 vs 4,5,6 (stand)
  { playerRanks: ['10', '2'], dealerRanks: ['4', '5', '6'], weight: 2, conceptCategory: 'hard-12' },
  // 11 vs anything (double) — premium spot
  { playerRanks: ['7', '4'], dealerRanks: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'], weight: 2, conceptCategory: 'hard-11' },
  { playerRanks: ['6', '5'], dealerRanks: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'], weight: 2, conceptCategory: 'hard-11' },
  // 10 vs 4-6 (double)
  { playerRanks: ['5', '5'], dealerRanks: ['4', '5', '6'], weight: 2, conceptCategory: 'hard-10' },
  { playerRanks: ['6', '4'], dealerRanks: ['4', '5', '6', '7', '8', '9'], weight: 2, conceptCategory: 'hard-10' },
  // 9 vs 3-6 (double)
  { playerRanks: ['5', '4'], dealerRanks: ['3', '4', '5', '6'], weight: 2, conceptCategory: 'hard-9' },
  // Soft 18 (A,7) vs 9,10 (hit) — Mikki's key lesson
  { playerRanks: ['A', '7'], dealerRanks: ['9', '10'], weight: 4, conceptCategory: 'soft-18' },
  // Soft 18 (A,7) vs 4,5,6 (double)
  { playerRanks: ['A', '7'], dealerRanks: ['4', '5', '6'], weight: 3, conceptCategory: 'soft-18' },
  // Soft 17 (A,6) vs 3-6 (double)
  { playerRanks: ['A', '6'], dealerRanks: ['3', '4', '5', '6'], weight: 2, conceptCategory: 'soft-17' },
  // A,8 (soft 19) — always stand
  { playerRanks: ['A', '8'], dealerRanks: ['4', '5', '6'], weight: 2, conceptCategory: 'soft-19' },
  // Pair 8s vs 10 (Mikki says hit, not split)
  { playerRanks: ['8', '8'], dealerRanks: ['10'], weight: 4, conceptCategory: 'pair-8s' },
  // Pair 8s vs other (split)
  { playerRanks: ['8', '8'], dealerRanks: ['2', '3', '4', '5', '6', '7', '9', 'A'], weight: 2, conceptCategory: 'pair-8s' },
  // Pair Aces — always split
  { playerRanks: ['A', 'A'], dealerRanks: ['2', '5', '8', '10', 'A'], weight: 2, conceptCategory: 'pair-As' },
  // Pair 9s vs 7 (stand) — tricky spot
  { playerRanks: ['9', '9'], dealerRanks: ['7'], weight: 3, conceptCategory: 'pair-9s' },
  // Pair 9s vs 2-6 (split)
  { playerRanks: ['9', '9'], dealerRanks: ['2', '3', '4', '5', '6'], weight: 2, conceptCategory: 'pair-9s' },
];

/** Generate a targeted educational scenario. */
function generateEducational(progress: PracticeProgress | null): Scenario {
  // Weight spots by player weakness
  const weighted: { spot: EducationalSpot; dealerRank: Rank; w: number }[] = [];

  for (const spot of EDUCATIONAL_SPOTS) {
    for (const dr of spot.dealerRanks) {
      let w = spot.weight;

      // Increase weight for weak concepts
      if (progress) {
        const stats = progress.accuracyByConcept[spot.conceptCategory];
        if (stats && stats.attempts >= 3) {
          const accuracy = stats.correct / stats.attempts;
          if (accuracy < 0.5) w *= 3;
          else if (accuracy < 0.7) w *= 2;
          else if (accuracy > 0.9 && stats.attempts > 10) w *= 0.3;
        }
        // Boost recently missed concepts
        const recentMiss = progress.recentMistakes.find(
          (m) => m.conceptKey.startsWith(spot.conceptCategory)
        );
        if (recentMiss) w *= 1.5;
      }

      weighted.push({ spot, dealerRank: dr as Rank, w });
    }
  }

  // Weighted random selection
  const totalWeight = weighted.reduce((sum, x) => sum + x.w, 0);
  let roll = Math.random() * totalWeight;
  let selected = weighted[0];
  for (const item of weighted) {
    roll -= item.w;
    if (roll <= 0) {
      selected = item;
      break;
    }
  }

  const playerCards: [Card, Card] = [
    makeCard(selected.spot.playerRanks[0]),
    makeCard(selected.spot.playerRanks[1]),
  ];
  const dealerUpcard = makeCard(selected.dealerRank);
  const analysis = evaluateHand(playerCards);
  const decision = evaluate(playerCards, dealerUpcard, analysis);

  return { playerCards, dealerUpcard, analysis, decision };
}

/** Generate a fully random (natural-feeling) scenario. */
function generateRandom(): Scenario {
  // Random 2 player cards + 1 dealer upcard, avoid trivial hands (bust, 21, etc.)
  let playerCards: [Card, Card];
  let analysis: HandAnalysis;
  let attempts = 0;

  do {
    playerCards = [randomCard(), randomCard()];
    analysis = evaluateHand(playerCards);
    attempts++;
  } while (
    // Re-roll trivial hands (naturals, very low totals)
    (analysis.total === 21 || analysis.total <= 4) && attempts < 20
  );

  const dealerUpcard = randomCard();
  const decision = evaluate(playerCards, dealerUpcard, analysis);

  return { playerCards, dealerUpcard, analysis, decision };
}

/** Generate the next scenario: 70% educational, 30% random. */
export function nextScenario(progress: PracticeProgress | null): Scenario {
  if (Math.random() < 0.7) {
    return generateEducational(progress);
  }
  return generateRandom();
}

/** Generate a batch of scenarios (for preloading). */
export function generateBatch(count: number, progress: PracticeProgress | null): Scenario[] {
  return Array.from({ length: count }, () => nextScenario(progress));
}
