/**
 * Course Manifest
 * Lightweight registry of all modules and lessons (no content, just metadata)
 */

export interface ModuleMeta {
  number: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  badgeId: string;
  isFreePreview?: boolean;
  lessons: LessonMeta[];
  hasQuiz: boolean;
  scenarios?: string[];
}

export interface LessonMeta {
  slug: string;
  title: string;
  estimatedMinutes: number;
}

/**
 * v3 sequence (post dual-model review, Apr 2026):
 *   1. Mindset               — emotional foundation
 *   2. Session Discipline     — stop-loss BEFORE strategy (promoted from old M10)
 *   3. Casino Psychology      — environment awareness before tactics
 *   4. Blackjack Mastery      — the game the buyer came for (kept early per reviewers)
 *   5. Casino Negotiation     — Mikki-native edge #1
 *   6. Discount System        — Mikki-native edge #2 (loss rebates)
 *   7. Pai Gow                — low-variance counterpoint
 *   8. Side Bets              — tactical add-on
 *   9. UTH Group Play         — advanced
 *  10. Comps & Perks          — operational close (rewrite pass planned)
 *
 * Slugs are PRESERVED from v1 so deep links, purchases, and progress keep
 * working; only `number` + list order change.
 *
 * Free tier upgraded: M1 Mindset + M2 Session Discipline (was M1 only).
 * Reviewer rationale: M2 lives at the top of the shame-reducing funnel.
 */
export const courseManifest = {
  id: 'mikki-masterclass',
  title: 'The Mikki Mase Masterclass',
  subtitle: 'Manage sessions. Negotiate with casinos. Leave with the edge.',
  description: '10 modules. 32 lessons. Interactive drills and calculators. Mikki Mase\'s field manual for session discipline, casino negotiation, and the discount system behind $32M in winnings.',
  estimatedHours: 8,
  modules: [
    {
      number: 1,
      slug: 'mindset-disclaimer',
      title: 'Mindset & Disclaimer',
      description: 'The foundation every player needs before touching a chip.',
      icon: '🎯',
      badgeId: 'foundation-set',
      isFreePreview: true,
      hasQuiz: true,
      lessons: [
        { slug: 'the-gamblers-code', title: "The Gambler's Code", estimatedMinutes: 8 },
        { slug: 'why-most-players-lose', title: 'Why Most Players Lose', estimatedMinutes: 10 },
      ],
    },
    {
      number: 2,
      slug: 'session-discipline',
      title: 'Session Discipline & Bankroll Management',
      description: 'Stop the bleeding. Stop-loss, win limits, and the 30-minute rule — before any strategy.',
      icon: '⏱️',
      badgeId: 'discipline-master',
      isFreePreview: true,
      hasQuiz: true,
      scenarios: ['session-timer'],
      lessons: [
        { slug: 'win-loss-limits', title: 'Win/Loss Limits', estimatedMinutes: 8 },
        { slug: 'the-30-45-minute-rule', title: 'The 30-45 Minute Rule', estimatedMinutes: 7 },
        { slug: 'play-big-and-fast', title: 'Play Big and Fast', estimatedMinutes: 8 },
        { slug: 'kelly-and-risk-of-ruin', title: 'Kelly, Variance & Risk of Ruin', estimatedMinutes: 12 },
      ],
    },
    {
      number: 3,
      slug: 'casino-psychology',
      title: 'Casino Psychology',
      description: 'How casinos are engineered to extract your money — and how to fight back.',
      icon: '🧠',
      badgeId: 'mind-reader',
      hasQuiz: true,
      lessons: [
        { slug: 'how-casinos-manipulate-you', title: 'How Casinos Manipulate You', estimatedMinutes: 10 },
        { slug: 'the-rewards-trap', title: 'The Rewards Trap', estimatedMinutes: 8 },
        { slug: 'playing-dumb', title: 'Playing Dumb', estimatedMinutes: 7 },
      ],
    },
    {
      number: 4,
      slug: 'blackjack-mastery',
      title: 'Blackjack Mastery',
      description: 'From table selection to advanced strategy — everything you need to win at blackjack.',
      icon: '🃏',
      badgeId: 'card-sharp',
      hasQuiz: true,
      scenarios: ['blackjack-hands', 'blackjack-ranking'],
      lessons: [
        { slug: 'blackjack-types-ranked', title: 'Blackjack Types Ranked', estimatedMinutes: 10 },
        { slug: 'basic-strategy-decoded', title: 'Basic Strategy Decoded', estimatedMinutes: 15 },
        { slug: 'soft-hands-and-splitting', title: 'Soft Hands & Splitting', estimatedMinutes: 12 },
        { slug: 'high-limit-vs-low-limit', title: 'High Limit vs Low Limit', estimatedMinutes: 8 },
        { slug: 'avoiding-continuous-shuffle', title: 'Avoiding Continuous Shuffle Machines', estimatedMinutes: 6 },
        { slug: 'property-rule-matrix', title: 'The Property Rule Matrix', estimatedMinutes: 12 },
      ],
    },
    {
      number: 5,
      slug: 'casino-negotiation',
      title: 'Casino Negotiation & Hosts',
      description: 'How to talk to hosts, leverage competitors, and get everything you want.',
      icon: '🎩',
      badgeId: 'smooth-operator',
      hasQuiz: true,
      scenarios: ['negotiation-sim'],
      lessons: [
        { slug: 'finding-a-casino-host', title: 'Finding a Casino Host', estimatedMinutes: 8 },
        { slug: 'what-to-say', title: 'What to Say (and What to Lie About)', estimatedMinutes: 12 },
        { slug: 'leveraging-competing-casinos', title: 'Leveraging Competing Casinos', estimatedMinutes: 10 },
      ],
    },
    {
      number: 6,
      slug: 'discount-system',
      title: 'The Discount System',
      description: 'Turn losses into profit — the loss rebate playbook.',
      icon: '💰',
      badgeId: 'discount-master',
      hasQuiz: true,
      lessons: [
        { slug: 'understanding-loss-rebates', title: 'Understanding Loss Rebates', estimatedMinutes: 12 },
        { slug: 'multi-casino-discount-strategy', title: 'Multi-Casino Discount Strategy', estimatedMinutes: 10 },
      ],
    },
    {
      number: 7,
      slug: 'pai-gow',
      title: 'Pai Gow Poker Strategy',
      description: 'The game where breaking even is winning — master the bonus strategy.',
      icon: '🀄',
      badgeId: 'pai-gow-pro',
      hasQuiz: true,
      lessons: [
        { slug: 'face-up-pai-gow-fundamentals', title: 'Face-Up Pai Gow Fundamentals', estimatedMinutes: 10 },
        { slug: 'bonus-betting-with-7-cards', title: 'Bonus Betting with 7 Cards', estimatedMinutes: 12 },
        { slug: 'break-even-strategy', title: 'The Break-Even Strategy', estimatedMinutes: 8 },
      ],
    },
    {
      number: 8,
      slug: 'side-bets',
      title: 'Side Bets That Actually Work',
      description: 'The one side bet worth playing — and every trap to avoid.',
      icon: '💎',
      badgeId: 'side-bet-scholar',
      hasQuiz: true,
      lessons: [
        { slug: 'the-21-plus-3-side-bet', title: 'The 21+3 Side Bet', estimatedMinutes: 10 },
        { slug: 'side-bets-to-avoid', title: 'Side Bets to Avoid', estimatedMinutes: 8 },
      ],
    },
    {
      number: 9,
      slug: 'uth-group-play',
      title: 'Ultimate Texas Hold\'em Group Strategy',
      description: 'Pool your information, crush the house — the 5-player edge.',
      icon: '🤝',
      badgeId: 'team-player',
      hasQuiz: true,
      lessons: [
        { slug: 'the-group-play-concept', title: 'The Group Play Concept', estimatedMinutes: 10 },
        { slug: 'card-sharing-and-outs', title: 'Card Sharing & Calculating Outs', estimatedMinutes: 12 },
        { slug: 'executing-the-strategy', title: 'Executing the Strategy', estimatedMinutes: 8 },
      ],
    },
    {
      number: 10,
      slug: 'comps-perks',
      title: 'Comps & Perks Maximization',
      description: 'Never pay for anything at a casino again.',
      icon: '👑',
      badgeId: 'comp-king',
      hasQuiz: true,
      lessons: [
        { slug: 'comp-slips-vs-room-charges', title: 'Comp Slips vs Room Charges', estimatedMinutes: 10 },
        { slug: 'front-money-vs-credit-lines', title: 'Front Money vs Credit Lines', estimatedMinutes: 8 },
        { slug: 'maximizing-every-dollar', title: 'Maximizing Every Dollar', estimatedMinutes: 8 },
        { slug: 'taxes-on-winnings', title: 'Taxes on Gambling Winnings', estimatedMinutes: 10 },
      ],
    },
  ] satisfies ModuleMeta[],
} as const;

export type ModuleSlug = (typeof courseManifest.modules)[number]['slug'];

export function getModuleBySlug(slug: string): ModuleMeta | undefined {
  return courseManifest.modules.find((m) => m.slug === slug);
}

export function getLessonBySlug(moduleSlug: string, lessonSlug: string) {
  const mod = getModuleBySlug(moduleSlug);
  if (!mod) return undefined;
  return mod.lessons.find((l) => l.slug === lessonSlug);
}

export function getNextLesson(moduleSlug: string, lessonSlug: string) {
  const mod = getModuleBySlug(moduleSlug);
  if (!mod) return undefined;

  // Special pages → first lesson of next module or quiz
  if (lessonSlug === 'practice' || lessonSlug === 'assessment') {
    const modIdx = courseManifest.modules.findIndex((m) => m.slug === moduleSlug);
    if (modIdx < courseManifest.modules.length - 1) {
      const nextMod = courseManifest.modules[modIdx + 1];
      const first = nextMod.lessons[0];
      return first ? { moduleSlug: nextMod.slug, lessonSlug: first.slug, isQuiz: false } : undefined;
    }
    return undefined;
  }

  // Quiz → first lesson of next module
  if (lessonSlug === 'quiz') {
    const modIdx = courseManifest.modules.findIndex((m) => m.slug === moduleSlug);
    if (modIdx < courseManifest.modules.length - 1) {
      const nextMod = courseManifest.modules[modIdx + 1];
      const first = nextMod.lessons[0];
      return first ? { moduleSlug: nextMod.slug, lessonSlug: first.slug, isQuiz: false } : undefined;
    }
    return undefined;
  }

  const idx = mod.lessons.findIndex((l) => l.slug === lessonSlug);
  if (idx === -1) return undefined;

  // Next lesson in same module
  if (idx < mod.lessons.length - 1) {
    return { moduleSlug, lessonSlug: mod.lessons[idx + 1].slug, isQuiz: false };
  }

  // Quiz after last lesson
  if (mod.hasQuiz) {
    return { moduleSlug, lessonSlug: 'quiz', isQuiz: true };
  }

  // Next module
  const modIdx = courseManifest.modules.findIndex((m) => m.slug === moduleSlug);
  if (modIdx < courseManifest.modules.length - 1) {
    const nextMod = courseManifest.modules[modIdx + 1];
    const first = nextMod.lessons[0];
    return first ? { moduleSlug: nextMod.slug, lessonSlug: first.slug, isQuiz: false } : undefined;
  }

  return undefined;
}

export function getPrevLesson(moduleSlug: string, lessonSlug: string) {
  const mod = getModuleBySlug(moduleSlug);
  if (!mod) return undefined;

  // Special pages → last lesson of same module
  if (lessonSlug === 'practice' || lessonSlug === 'assessment') {
    const last = mod.lessons[mod.lessons.length - 1];
    return last ? { moduleSlug, lessonSlug: last.slug } : undefined;
  }

  // Quiz → last lesson of same module
  if (lessonSlug === 'quiz') {
    const last = mod.lessons[mod.lessons.length - 1];
    return last ? { moduleSlug, lessonSlug: last.slug } : undefined;
  }

  const idx = mod.lessons.findIndex((l) => l.slug === lessonSlug);

  if (idx > 0) {
    return { moduleSlug, lessonSlug: mod.lessons[idx - 1].slug };
  }

  // Previous module's last lesson
  const modIdx = courseManifest.modules.findIndex((m) => m.slug === moduleSlug);
  if (modIdx > 0) {
    const prevMod = courseManifest.modules[modIdx - 1];
    const last = prevMod.lessons[prevMod.lessons.length - 1];
    return last ? { moduleSlug: prevMod.slug, lessonSlug: last.slug } : undefined;
  }

  return undefined;
}

export function getTotalLessons(): number {
  return courseManifest.modules.reduce((sum, m) => sum + m.lessons.length, 0);
}
