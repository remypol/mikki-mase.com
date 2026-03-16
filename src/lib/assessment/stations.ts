/**
 * Assessment station content — questions/items for each station.
 */
import type { Rank, Card } from '../blackjack/types';

// ============================================
// STATION 1: BLACKJACK BLITZ
// ============================================

export interface BlitzHand {
  id: string;
  playerRanks: [Rank, Rank];
  dealerRank: Rank;
  correctAction: 'hit' | 'stand' | 'double' | 'split';
  difficulty: 'easy' | 'medium' | 'hard';
}

/** 7 hands covering common leak spots. Ordered: 2 easy, 3 medium, 2 hard. */
export const BLITZ_HANDS: BlitzHand[] = [
  // Easy — warm up
  { id: 'blitz-1', playerRanks: ['A', 'A'], dealerRank: '8', correctAction: 'split', difficulty: 'easy' },
  { id: 'blitz-2', playerRanks: ['6', '5'], dealerRank: '6', correctAction: 'double', difficulty: 'easy' },
  // Medium — common spots
  { id: 'blitz-3', playerRanks: ['10', '2'], dealerRank: '3', correctAction: 'hit', difficulty: 'medium' },
  { id: 'blitz-4', playerRanks: ['A', '7'], dealerRank: '9', correctAction: 'hit', difficulty: 'medium' },
  { id: 'blitz-5', playerRanks: ['9', '9'], dealerRank: '7', correctAction: 'stand', difficulty: 'medium' },
  // Hard — Mikki's signature spots
  { id: 'blitz-6', playerRanks: ['8', '8'], dealerRank: '10', correctAction: 'hit', difficulty: 'hard' },
  { id: 'blitz-7', playerRanks: ['10', '6'], dealerRank: '10', correctAction: 'hit', difficulty: 'hard' },
];

// ============================================
// STATION 2: BANKROLL RADAR
// ============================================

export interface BankrollItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export const BANKROLL_ITEMS: BankrollItem[] = [
  {
    id: 'br-1',
    question: 'You\'re up $2,000 after 30 minutes at a blackjack table. What\'s the best move?',
    options: [
      'Keep playing — you\'re on a hot streak',
      'Double your bet to maximize the run',
      'Lock in the win and leave the table',
      'Switch to a different game',
    ],
    correctIndex: 2,
  },
  {
    id: 'br-2',
    question: 'How long should a typical high-level blackjack session last?',
    options: [
      '2-3 hours for maximum comps',
      '30-45 minutes, then reassess',
      'Until you\'re up at least 20%',
      'As long as you\'re winning',
    ],
    correctIndex: 1,
  },
  {
    id: 'br-3',
    question: 'You\'ve lost 3 sessions in a row. What\'s the disciplined response?',
    options: [
      'Increase bet size to recover losses faster',
      'Take a break and review your decisions for errors',
      'Switch to slots for a change of pace',
      'Chase the losses at a higher limit table',
    ],
    correctIndex: 1,
  },
  {
    id: 'br-4',
    question: 'What percentage of your bankroll should a single session bet represent?',
    options: [
      '25-50% — go big or go home',
      '10-15% — moderate risk',
      '1-5% — preserve capital for multiple sessions',
      'It doesn\'t matter if you have an edge',
    ],
    correctIndex: 2,
  },
];

// ============================================
// STATION 3: MYTH BUSTER
// ============================================

export interface MythItem {
  id: string;
  statement: string;
  isMyth: boolean; // true = it's a myth (wrong), false = it's fact (correct)
  explanation: string;
}

export const MYTH_ITEMS: MythItem[] = [
  {
    id: 'myth-1',
    statement: 'Taking insurance is a smart bet when you have a strong hand.',
    isMyth: true,
    explanation: 'Insurance is always a sucker bet. The math never works in your favor regardless of your hand.',
  },
  {
    id: 'myth-2',
    statement: 'Card counting is illegal in casinos.',
    isMyth: true,
    explanation: 'Card counting is not illegal — it\'s just mental math. Casinos can ask you to leave, but you won\'t be arrested.',
  },
  {
    id: 'myth-3',
    statement: 'The dealer is "due" for a bust after winning several hands in a row.',
    isMyth: true,
    explanation: 'Each hand is independent. Past results don\'t affect future outcomes — this is the gambler\'s fallacy.',
  },
  {
    id: 'myth-4',
    statement: 'Side bets generally have a higher house edge than the main bet.',
    isMyth: false,
    explanation: 'Correct — most side bets carry 2-10x the house edge of the main game. The 21+3 bet is one rare exception with reasonable odds.',
  },
  {
    id: 'myth-5',
    statement: 'Continuous shuffle machines are worse for players than shoe games.',
    isMyth: false,
    explanation: 'Correct — CSMs eliminate deck penetration and make any form of advantage play impossible. Always avoid them.',
  },
  {
    id: 'myth-6',
    statement: 'The Martingale system (doubling bets after losses) works long-term.',
    isMyth: true,
    explanation: 'The Martingale guarantees massive losses on an inevitable losing streak. Table limits and bankroll limits make it mathematically guaranteed to fail.',
  },
];

// ============================================
// STATION 4: HOST EDGE
// ============================================

export interface HostItem {
  id: string;
  scenario: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const HOST_ITEMS: HostItem[] = [
  {
    id: 'host-1',
    scenario: 'A casino host asks: "How much do you typically play per hand?"',
    options: [
      'Tell them your exact betting range honestly',
      'Inflate your typical bet size to get better comps',
      'Say you\'re just starting out and play small',
      'Redirect and ask about their comp program instead',
    ],
    correctIndex: 1,
    explanation: 'Mikki\'s approach: always inflate your perceived action. Hosts rate you based on what they believe you play, and overestimating gets you better deals.',
  },
  {
    id: 'host-2',
    scenario: 'You want a loss rebate (discount). What\'s the best leverage?',
    options: [
      'Threaten to leave the casino',
      'Mention competing offers from other casinos',
      'Ask nicely and hope for the best',
      'Show them your losses and appeal to sympathy',
    ],
    correctIndex: 1,
    explanation: 'Competition is your strongest leverage. When a host knows another casino is offering better terms, they\'re motivated to match or beat the deal.',
  },
  {
    id: 'host-3',
    scenario: 'You\'ve been playing at a casino for 3 hours. When is the best time to negotiate comp upgrades?',
    options: [
      'Before you start playing — set expectations early',
      'After a big winning session — they\'ll want to keep you',
      'After a losing session — they owe you something',
      'Never ask — let the host offer first',
    ],
    correctIndex: 2,
    explanation: 'After a loss is when the casino has the most incentive to keep you around. This is your highest leverage moment for negotiating better comps, rebates, and perks.',
  },
];

// ============================================
// EXPORTS
// ============================================

export const STATION_ORDER = ['blackjack-blitz', 'bankroll-radar', 'myth-buster', 'host-edge'] as const;

export const STATION_META = {
  'blackjack-blitz': {
    title: 'Blackjack Blitz',
    subtitle: '7 hands. Make the right call.',
    icon: '🃏',
    itemCount: BLITZ_HANDS.length,
  },
  'bankroll-radar': {
    title: 'Bankroll Radar',
    subtitle: 'Can you spot the discipline?',
    icon: '💰',
    itemCount: BANKROLL_ITEMS.length,
  },
  'myth-buster': {
    title: 'Myth Buster',
    subtitle: 'Fact or fiction? Rapid fire.',
    icon: '🔥',
    itemCount: MYTH_ITEMS.length,
  },
  'host-edge': {
    title: 'Host Edge',
    subtitle: 'Can you negotiate like Mikki?',
    icon: '🤝',
    itemCount: HOST_ITEMS.length,
  },
} as const;
