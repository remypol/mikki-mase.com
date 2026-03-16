/**
 * Result bands, station weights, leak maps, and module recommendations.
 */
import type { SkillBand, StationId } from './types';

export interface ResultBand {
  id: SkillBand;
  minScore: number;
  title: string;
  subtitle: string;
  description: string;
}

/** Bands ordered high-to-low for matching. */
export const RESULT_BANDS: ResultBand[] = [
  {
    id: 'elite',
    minScore: 0.85,
    title: 'Rare Table Awareness',
    subtitle: 'Top tier instincts',
    description: 'You have unusually strong casino instincts. The course still adds value in comp strategy, discount systems, and advanced table behavior that most sharp players never learn.',
  },
  {
    id: 'sharp-but-incomplete',
    minScore: 0.65,
    title: 'Sharp but Incomplete',
    subtitle: 'Better than average, not masterclass-ready',
    description: 'You know more than most players, but you have specific blind spots that cost real money over time. The masterclass fills exactly these gaps.',
  },
  {
    id: 'leaky',
    minScore: 0.4,
    title: 'Confident but Leaky',
    subtitle: 'The most common profile',
    description: 'You make correct decisions sometimes, but you\'re leaving significant value on the table. These leaks compound every session — the masterclass shows you exactly where and how to plug them.',
  },
  {
    id: 'casual',
    minScore: 0,
    title: 'Casual Instincts',
    subtitle: 'You know the vibe, not the math',
    description: 'Your decisions are based on gut feel rather than strategy. That\'s where most players start. The masterclass gives you the exact framework that turned Mikki from a regular player into someone who beat 100+ casinos.',
  },
];

/** Station weights for the weighted score. Blackjack weighs most. */
export const STATION_WEIGHTS: Record<StationId, number> = {
  'blackjack-blitz': 3,
  'bankroll-radar': 2,
  'myth-buster': 1.5,
  'host-edge': 1.5,
};

/** What each station reveals when you score low. */
export const LEAK_MAP: Record<StationId, string[]> = {
  'blackjack-blitz': ['hand-decisions', 'basic-strategy'],
  'bankroll-radar': ['bankroll-management', 'session-discipline'],
  'myth-buster': ['casino-psychology', 'common-traps'],
  'host-edge': ['negotiation', 'comp-strategy'],
};

/** Map leak categories to course modules. */
export const MODULE_RECOMMENDATIONS: Record<string, string[]> = {
  'hand-decisions': ['blackjack-mastery', 'side-bets'],
  'basic-strategy': ['blackjack-mastery'],
  'bankroll-management': ['session-discipline'],
  'session-discipline': ['session-discipline'],
  'casino-psychology': ['casino-psychology', 'mindset-disclaimer'],
  'common-traps': ['casino-psychology', 'side-bets'],
  'negotiation': ['casino-negotiation'],
  'comp-strategy': ['comps-perks', 'discount-system'],
};

/** Get the result band for a given skill band ID. */
export function getBand(id: SkillBand): ResultBand {
  return RESULT_BANDS.find((b) => b.id === id) ?? RESULT_BANDS[RESULT_BANDS.length - 1];
}
