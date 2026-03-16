/**
 * Card utilities: deck creation, shuffle, dealing, display helpers.
 */
import type { Card, Rank, Suit } from './types';

const SUITS: Suit[] = ['♠', '♥', '♦', '♣'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

/** Create a single standard 52-card deck. */
export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

/** Create a multi-deck shoe (e.g. 6 decks = 312 cards). */
export function createShoe(decks: number): Card[] {
  const shoe: Card[] = [];
  for (let i = 0; i < decks; i++) {
    shoe.push(...createDeck());
  }
  return shoe;
}

/** Fisher-Yates shuffle (in-place). */
export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Numeric value of a card (Ace = 11 or 1, face cards = 10). */
export function cardValue(card: Card): number {
  if (card.rank === 'A') return 11;
  if (['J', 'Q', 'K'].includes(card.rank)) return 10;
  return parseInt(card.rank, 10);
}

/** Is this a red suit? */
export function isRed(card: Card): boolean {
  return card.suit === '♥' || card.suit === '♦';
}

/** Short label for display (e.g. "A♠", "10♥"). */
export function cardLabel(card: Card): string {
  return `${card.rank}${card.suit}`;
}

/** Parse a legacy short code (e.g. "7h", "Td", "As") into a Card. */
export function parseShortCode(code: string): Card {
  const suitMap: Record<string, Suit> = { h: '♥', d: '♦', c: '♣', s: '♠' };
  const rankMap: Record<string, Rank> = {
    A: 'A', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6',
    '7': '7', '8': '8', '9': '9', T: '10', J: 'J', Q: 'Q', K: 'K',
  };
  const rankKey = code.slice(0, -1);
  const suitKey = code.slice(-1).toLowerCase();
  return {
    rank: rankMap[rankKey] ?? 'A',
    suit: suitMap[suitKey] ?? '♠',
  };
}

/** Create a specific card from rank and suit. */
export function card(rank: Rank, suit: Suit): Card {
  return { rank, suit };
}
