/**
 * useBlackjackPractice — finite state machine reducer for practice mode.
 * Manages dealing, player action, feedback, round completion, and persistence.
 */
import { useReducer, useCallback, useEffect } from 'react';
import type { Scenario, PracticeProgress, Action, ConceptStats } from '../lib/blackjack/types';
import { createDefaultPracticeProgress } from '../lib/blackjack/types';
import { nextScenario } from '../lib/blackjack/scenarioGenerator';
import { getConceptCategory } from '../lib/blackjack/basicStrategy';
import { handLabel } from '../lib/blackjack/handEvaluator';

const STORAGE_KEY = 'mikki:bj-practice:v1';

// ============================================
// STATE
// ============================================

export type PracticePhase =
  | 'idle'
  | 'dealing'
  | 'awaitingAction'
  | 'revealingFeedback'
  | 'roundComplete';

export interface PracticeState {
  phase: PracticePhase;
  scenario: Scenario | null;
  chosenAction: Action | null;
  isCorrect: boolean | null;
  progress: PracticeProgress;
  sessionHands: number;
  sessionCorrect: number;
}

// ============================================
// ACTIONS
// ============================================

type PracticeAction =
  | { type: 'START_ROUND' }
  | { type: 'FINISH_DEAL' }
  | { type: 'CHOOSE_ACTION'; action: Action }
  | { type: 'NEXT_HAND' }
  | { type: 'RESET_SESSION' }
  | { type: 'LOAD_PROGRESS'; progress: PracticeProgress };

// ============================================
// REDUCER
// ============================================

function reducer(state: PracticeState, action: PracticeAction): PracticeState {
  switch (action.type) {
    case 'START_ROUND': {
      const scenario = nextScenario(state.progress);
      return {
        ...state,
        phase: 'dealing',
        scenario,
        chosenAction: null,
        isCorrect: null,
      };
    }

    case 'FINISH_DEAL':
      if (!state.scenario || state.phase !== 'dealing') return state;
      return { ...state, phase: 'awaitingAction' };

    case 'CHOOSE_ACTION': {
      if (!state.scenario || state.phase !== 'awaitingAction') return state;

      const chosen = action.action;
      const optimal = state.scenario.decision.optimalAction;
      const isCorrect = chosen === optimal;

      // Update progress
      const conceptCat = getConceptCategory(
        state.scenario.analysis,
        state.scenario.playerCards,
      );
      const prevStats = state.progress.accuracyByConcept[conceptCat] ?? {
        attempts: 0, correct: 0, streak: 0, lastSeenAt: 0,
      };
      const newStats: ConceptStats = {
        attempts: prevStats.attempts + 1,
        correct: prevStats.correct + (isCorrect ? 1 : 0),
        streak: isCorrect ? prevStats.streak + 1 : 0,
        lastSeenAt: Date.now(),
      };

      const newStreak = isCorrect ? state.progress.currentStreak + 1 : 0;
      const label = handLabel(state.scenario.playerCards, state.scenario.analysis);

      const recentMistakes = isCorrect
        ? state.progress.recentMistakes
        : [
            { conceptKey: state.scenario.decision.conceptKey, handLabel: label, ts: Date.now() },
            ...state.progress.recentMistakes.slice(0, 19), // keep last 20
          ];

      const newProgress: PracticeProgress = {
        ...state.progress,
        totalRounds: state.progress.totalRounds + 1,
        currentStreak: newStreak,
        bestStreak: Math.max(state.progress.bestStreak, newStreak),
        accuracyByConcept: {
          ...state.progress.accuracyByConcept,
          [conceptCat]: newStats,
        },
        recentMistakes,
      };

      return {
        ...state,
        phase: 'revealingFeedback',
        chosenAction: chosen,
        isCorrect,
        progress: newProgress,
        sessionHands: state.sessionHands + 1,
        sessionCorrect: state.sessionCorrect + (isCorrect ? 1 : 0),
      };
    }

    case 'NEXT_HAND': {
      const scenario = nextScenario(state.progress);
      return {
        ...state,
        phase: 'dealing',
        scenario,
        chosenAction: null,
        isCorrect: null,
      };
    }

    case 'RESET_SESSION':
      return {
        ...state,
        phase: 'idle',
        scenario: null,
        chosenAction: null,
        isCorrect: null,
        sessionHands: 0,
        sessionCorrect: 0,
        progress: {
          ...state.progress,
          sessionCount: state.progress.sessionCount + 1,
        },
      };

    case 'LOAD_PROGRESS':
      return { ...state, progress: action.progress };

    default:
      return state;
  }
}

// ============================================
// PERSISTENCE
// ============================================

function loadProgress(): PracticeProgress {
  try {
    if (typeof window === 'undefined') return createDefaultPracticeProgress();
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultPracticeProgress();
    const parsed = JSON.parse(raw);
    if (parsed.version !== 1) return createDefaultPracticeProgress();
    // Validate expected shape to prevent corrupted/tampered data
    if (
      typeof parsed.totalRounds !== 'number' ||
      typeof parsed.currentStreak !== 'number' ||
      typeof parsed.bestStreak !== 'number' ||
      typeof parsed.accuracyByConcept !== 'object' ||
      !Array.isArray(parsed.recentMistakes)
    ) {
      return createDefaultPracticeProgress();
    }
    return parsed;
  } catch {
    return createDefaultPracticeProgress();
  }
}

function saveProgress(progress: PracticeProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Silently fail on storage full
  }
}

// ============================================
// HOOK
// ============================================

const initialState: PracticeState = {
  phase: 'idle',
  scenario: null,
  chosenAction: null,
  isCorrect: null,
  progress: createDefaultPracticeProgress(),
  sessionHands: 0,
  sessionCorrect: 0,
};

export function useBlackjackPractice() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load progress on mount
  useEffect(() => {
    const progress = loadProgress();
    dispatch({ type: 'LOAD_PROGRESS', progress });
  }, []);

  // Persist progress when it changes (debounced on phase transitions)
  useEffect(() => {
    if (state.phase === 'revealingFeedback' || state.phase === 'idle') {
      saveProgress(state.progress);
    }
  }, [state.phase, state.progress]);

  const startRound = useCallback(() => dispatch({ type: 'START_ROUND' }), []);
  const finishDeal = useCallback(() => dispatch({ type: 'FINISH_DEAL' }), []);
  const chooseAction = useCallback((action: Action) => dispatch({ type: 'CHOOSE_ACTION', action }), []);
  const nextHand = useCallback(() => dispatch({ type: 'NEXT_HAND' }), []);
  const resetSession = useCallback(() => dispatch({ type: 'RESET_SESSION' }), []);

  return {
    state,
    startRound,
    finishDeal,
    chooseAction,
    nextHand,
    resetSession,
  };
}
