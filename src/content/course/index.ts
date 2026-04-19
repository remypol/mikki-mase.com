/**
 * Course Content Index
 * Exports all module content for static path generation.
 * Import lesson content lazily in Astro pages via getStaticPaths().
 */

import type { Lesson, Quiz } from '../../config/course/types';

// Module 1: Mindset & Disclaimer
import { lesson1 as mod1Lesson1 } from './mindset-disclaimer/lesson-1';
import { lesson2 as mod1Lesson2 } from './mindset-disclaimer/lesson-2';
import { quiz as mod1Quiz } from './mindset-disclaimer/quiz';

// Module 2: Casino Psychology
import { lesson1 as mod2Lesson1 } from './casino-psychology/lesson-1';
import { lesson2 as mod2Lesson2 } from './casino-psychology/lesson-2';
import { lesson3 as mod2Lesson3 } from './casino-psychology/lesson-3';
import { quiz as mod2Quiz } from './casino-psychology/quiz';

// Module 3: Blackjack Mastery
import { lesson1 as mod3Lesson1 } from './blackjack-mastery/lesson-1';
import { lesson2 as mod3Lesson2 } from './blackjack-mastery/lesson-2';
import { lesson3 as mod3Lesson3 } from './blackjack-mastery/lesson-3';
import { lesson4 as mod3Lesson4 } from './blackjack-mastery/lesson-4';
import { lesson5 as mod3Lesson5 } from './blackjack-mastery/lesson-5';
import { lesson6 as mod3Lesson6 } from './blackjack-mastery/lesson-6';
import { quiz as mod3Quiz } from './blackjack-mastery/quiz';

// Module 4: Side Bets That Actually Work
import { lesson1 as mod4Lesson1 } from './side-bets/lesson-1';
import { lesson2 as mod4Lesson2 } from './side-bets/lesson-2';
import { quiz as mod4Quiz } from './side-bets/quiz';

// Module 5: Pai Gow Poker Strategy
import { lesson1 as mod5Lesson1 } from './pai-gow/lesson-1';
import { lesson2 as mod5Lesson2 } from './pai-gow/lesson-2';
import { lesson3 as mod5Lesson3 } from './pai-gow/lesson-3';
import { quiz as mod5Quiz } from './pai-gow/quiz';

// Module 6: Ultimate Texas Hold'em Group Strategy
import { lesson1 as mod6Lesson1 } from './uth-group-play/lesson-1';
import { lesson2 as mod6Lesson2 } from './uth-group-play/lesson-2';
import { lesson3 as mod6Lesson3 } from './uth-group-play/lesson-3';
import { quiz as mod6Quiz } from './uth-group-play/quiz';

// Module 7: Casino Negotiation & Hosts
import { lesson1 as mod7Lesson1 } from './casino-negotiation/lesson-1';
import { lesson2 as mod7Lesson2 } from './casino-negotiation/lesson-2';
import { lesson3 as mod7Lesson3 } from './casino-negotiation/lesson-3';
import { quiz as mod7Quiz } from './casino-negotiation/quiz';

// Module 8: The Discount System
import { lesson1 as mod8Lesson1 } from './discount-system/lesson-1';
import { lesson2 as mod8Lesson2 } from './discount-system/lesson-2';
import { quiz as mod8Quiz } from './discount-system/quiz';

// Module 9: Comps & Perks Maximization
import { lesson1 as mod9Lesson1 } from './comps-perks/lesson-1';
import { lesson2 as mod9Lesson2 } from './comps-perks/lesson-2';
import { lesson3 as mod9Lesson3 } from './comps-perks/lesson-3';
import { lesson4 as mod9Lesson4 } from './comps-perks/lesson-4';
import { quiz as mod9Quiz } from './comps-perks/quiz';

// Module 10: Session Discipline & Bankroll Management
import { lesson1 as mod10Lesson1 } from './session-discipline/lesson-1';
import { lesson2 as mod10Lesson2 } from './session-discipline/lesson-2';
import { lesson3 as mod10Lesson3 } from './session-discipline/lesson-3';
import { lesson4 as mod10Lesson4 } from './session-discipline/lesson-4';
import { quiz as mod10Quiz } from './session-discipline/quiz';

// ============================================
// CONTENT MAP
// Keys MUST match the manifest lesson slugs exactly
// ============================================

export interface ModuleContent {
  lessons: Record<string, Lesson>;
  quiz: Quiz;
}

export const courseContent: Record<string, ModuleContent> = {
  'mindset-disclaimer': {
    lessons: {
      'the-gamblers-code': mod1Lesson1,
      'why-most-players-lose': mod1Lesson2,
    },
    quiz: mod1Quiz,
  },
  'casino-psychology': {
    lessons: {
      'how-casinos-manipulate-you': mod2Lesson1,
      'the-rewards-trap': mod2Lesson2,
      'playing-dumb': mod2Lesson3,
    },
    quiz: mod2Quiz,
  },
  'blackjack-mastery': {
    lessons: {
      'blackjack-types-ranked': mod3Lesson1,
      'basic-strategy-decoded': mod3Lesson2,
      'soft-hands-and-splitting': mod3Lesson3,
      'high-limit-vs-low-limit': mod3Lesson4,
      'avoiding-continuous-shuffle': mod3Lesson5,
      'property-rule-matrix': mod3Lesson6,
    },
    quiz: mod3Quiz,
  },
  'side-bets': {
    lessons: {
      'the-21-plus-3-side-bet': mod4Lesson1,
      'side-bets-to-avoid': mod4Lesson2,
    },
    quiz: mod4Quiz,
  },
  'pai-gow': {
    lessons: {
      'face-up-pai-gow-fundamentals': mod5Lesson1,
      'bonus-betting-with-7-cards': mod5Lesson2,
      'break-even-strategy': mod5Lesson3,
    },
    quiz: mod5Quiz,
  },
  'uth-group-play': {
    lessons: {
      'the-group-play-concept': mod6Lesson1,
      'card-sharing-and-outs': mod6Lesson2,
      'executing-the-strategy': mod6Lesson3,
    },
    quiz: mod6Quiz,
  },
  'casino-negotiation': {
    lessons: {
      'finding-a-casino-host': mod7Lesson1,
      'what-to-say': mod7Lesson2,
      'leveraging-competing-casinos': mod7Lesson3,
    },
    quiz: mod7Quiz,
  },
  'discount-system': {
    lessons: {
      'understanding-loss-rebates': mod8Lesson1,
      'multi-casino-discount-strategy': mod8Lesson2,
    },
    quiz: mod8Quiz,
  },
  'comps-perks': {
    lessons: {
      'comp-slips-vs-room-charges': mod9Lesson1,
      'front-money-vs-credit-lines': mod9Lesson2,
      'maximizing-every-dollar': mod9Lesson3,
      'taxes-on-winnings': mod9Lesson4,
    },
    quiz: mod9Quiz,
  },
  'session-discipline': {
    lessons: {
      'win-loss-limits': mod10Lesson1,
      'the-30-45-minute-rule': mod10Lesson2,
      'play-big-and-fast': mod10Lesson3,
      'kelly-and-risk-of-ruin': mod10Lesson4,
    },
    quiz: mod10Quiz,
  },
};

export function getLessonContent(moduleSlug: string, lessonSlug: string): Lesson | undefined {
  return courseContent[moduleSlug]?.lessons[lessonSlug];
}

export function getQuizContent(moduleSlug: string): Quiz | undefined {
  return courseContent[moduleSlug]?.quiz;
}
