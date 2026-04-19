/**
 * Course Type Definitions
 * The Mikki Mase Masterclass
 */

// ============================================
// COURSE STRUCTURE
// ============================================

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  modules: CourseModule[];
  totalLessons: number;
  estimatedHours: number;
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  slug: string;
  lessons: Lesson[];
  quiz: Quiz;
  scenarios?: Scenario[];
  badgeId: string;
  isFreePreview?: boolean;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  content: string;
  keyTakeaways: string[];
  proTip?: string;
  estimatedMinutes: number;

  // v2 template additions (all optional — backwards compatible with v1 lessons):

  /** Single-sentence thesis rendered under the H1 as subtitle. */
  subtitle?: string;

  /** "By the end you'll know…" — 3-5 checkmark bullets above the body. */
  promise?: string[];

  /** Optional interactive drill id — references a widget mapped in
   *  `src/components/course/LessonDrill.tsx`. Example: `'basic-strategy'`. */
  drillId?: string;

  /** Optional visual slot id — references a static visual (chart/table/diagram)
   *  rendered via `LessonVisual.tsx`. Example: `'basic-strategy-chart'`.
   *  Rendered ABOVE the lesson body so the visual precedes the prose. */
  visualSlotId?: string;

  /** "This week, try this at a table" — one-sentence prompt rendered at
   *  lesson end, feeds into the user's field-note journal. */
  fieldNote?: string;

  /** Difficulty tag shown next to read time. */
  difficulty?: 'foundation' | 'intermediate' | 'advanced';
}

// ============================================
// QUIZ
// ============================================

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'scenario';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;

  /** Optional back-reference to the lesson section that teaches the answer.
   *  Populated on-demand so existing questions remain valid — when set, the
   *  QuizResult "review these" list surfaces a deep-link. Format: lesson slug
   *  inside the same module (e.g. `'basic-strategy-decoded'`). */
  sourceLessonSlug?: string;
}

// ============================================
// INTERACTIVE SCENARIOS
// ============================================

export type ScenarioType = 'blackjack-hand' | 'negotiation' | 'drag-rank' | 'session-timer';

export interface Scenario {
  id: string;
  type: ScenarioType;
  title: string;
  description: string;
}

export interface BlackjackHand {
  id: string;
  playerCards: [string, string];
  dealerUpcard: string;
  correctAction: 'hit' | 'stand' | 'double' | 'split';
  explanation: string;
}

export interface NegotiationNode {
  id: string;
  speaker: 'host' | 'player';
  text: string;
  options?: NegotiationOption[];
  isEnd?: boolean;
  score?: number;
}

export interface NegotiationOption {
  text: string;
  nextNodeId: string;
  isOptimal: boolean;
}

export interface DragRankItem {
  id: string;
  label: string;
  correctPosition: number;
}

// ============================================
// GAMIFICATION
// ============================================

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  moduleNumber?: number;
}

// ============================================
// PROGRESS (localStorage + future Supabase)
// ============================================

export interface CourseProgress {
  purchased: boolean;
  currentModuleSlug: string;
  currentLessonSlug: string;
  completedLessons: string[];
  quizScores: Record<string, number>;
  scenariosCompleted: string[];
  badges: string[];
  points: number;
  weeklyActivity: string[];
  startedAt: string;
  lastActiveAt: string;
}

export function createDefaultProgress(): CourseProgress {
  return {
    purchased: false, // Server middleware handles purchase gating
    currentModuleSlug: 'mindset-disclaimer',
    currentLessonSlug: 'the-gamblers-code',
    completedLessons: [],
    quizScores: {},
    scenariosCompleted: [],
    badges: [],
    points: 0,
    weeklyActivity: [],
    startedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  };
}
