import type { Badge } from './types';

export const badges: Badge[] = [
  {
    id: 'foundation-set',
    name: 'Foundation Set',
    description: 'Completed the Mindset & Disclaimer module',
    icon: '🎯',
    moduleNumber: 1,
  },
  {
    id: 'mind-reader',
    name: 'Mind Reader',
    description: 'Mastered Casino Psychology',
    icon: '🧠',
    moduleNumber: 2,
  },
  {
    id: 'card-sharp',
    name: 'Card Sharp',
    description: 'Conquered Blackjack Mastery',
    icon: '🃏',
    moduleNumber: 3,
  },
  {
    id: 'side-bet-scholar',
    name: 'Side Bet Scholar',
    description: 'Learned which side bets actually work',
    icon: '💎',
    moduleNumber: 4,
  },
  {
    id: 'pai-gow-pro',
    name: 'Pai Gow Pro',
    description: 'Mastered Pai Gow Poker strategy',
    icon: '🀄',
    moduleNumber: 5,
  },
  {
    id: 'team-player',
    name: 'Team Player',
    description: 'Learned UTH group play strategy',
    icon: '🤝',
    moduleNumber: 6,
  },
  {
    id: 'smooth-operator',
    name: 'Smooth Operator',
    description: 'Mastered casino host negotiation',
    icon: '🎩',
    moduleNumber: 7,
  },
  {
    id: 'discount-master',
    name: 'Discount Master',
    description: 'Understood the discount system',
    icon: '💰',
    moduleNumber: 8,
  },
  {
    id: 'comp-king',
    name: 'Comp King',
    description: 'Maximized comps and perks',
    icon: '👑',
    moduleNumber: 9,
  },
  {
    id: 'discipline-master',
    name: 'Discipline Master',
    description: 'Mastered session discipline',
    icon: '⏱️',
    moduleNumber: 10,
  },
  {
    id: 'masterclass-graduate',
    name: 'Masterclass Graduate',
    description: 'Completed all 10 modules',
    icon: '🏆',
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Scored 100% on any quiz',
    icon: '⭐',
  },
  {
    id: 'consistency-master',
    name: 'Consistency Master',
    description: 'Active 3+ days in a week',
    icon: '🔥',
  },
  // Tier-based badges
  {
    id: 'founding-member',
    name: 'Founding Member',
    description: 'Lifetime VIP — Early supporter of the Mikki Mase Masterclass',
    icon: '👑',
  },
  {
    id: 'inner-circle-member',
    name: 'Inner Circle',
    description: 'Inner Circle member — Access to exclusive strategy content',
    icon: '🔮',
  },
];

export function getBadgeById(id: string): Badge | undefined {
  return badges.find((b) => b.id === id);
}

export function getBadgeForModule(moduleNumber: number): Badge | undefined {
  return badges.find((b) => b.moduleNumber === moduleNumber);
}
