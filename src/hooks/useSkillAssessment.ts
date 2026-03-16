/**
 * useSkillAssessment — reducer for the 4-station assessment flow.
 */
import { useReducer, useCallback, useEffect } from 'react';
import type { AssessmentResponse, AssessmentResult, StationId } from '../lib/assessment/types';
import { createDefaultAssessmentProgress } from '../lib/assessment/types';
import { calculateAssessmentResult } from '../lib/assessment/scoring';
import { STATION_ORDER, STATION_META, BLITZ_HANDS, BANKROLL_ITEMS, MYTH_ITEMS, HOST_ITEMS } from '../lib/assessment/stations';

const STORAGE_KEY = 'mikki:assessment:v1';

// ============================================
// STATE
// ============================================

export type AssessmentPhase = 'intro' | 'station' | 'between-stations' | 'results';

export interface AssessmentState {
  phase: AssessmentPhase;
  currentStationIndex: number;
  currentItemIndex: number;
  responses: AssessmentResponse[];
  result: AssessmentResult | null;
  startedAt: number | null;
  previousResult: AssessmentResult | null;
}

// ============================================
// ACTIONS
// ============================================

type AssessmentAction =
  | { type: 'START' }
  | { type: 'ANSWER'; response: AssessmentResponse }
  | { type: 'NEXT_STATION' }
  | { type: 'FINISH' }
  | { type: 'RESTART' }
  | { type: 'LOAD_PREVIOUS'; result: AssessmentResult };

// ============================================
// HELPERS
// ============================================

function getStationItemCount(stationId: StationId): number {
  return STATION_META[stationId].itemCount;
}

// ============================================
// REDUCER
// ============================================

function reducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        phase: 'station',
        currentStationIndex: 0,
        currentItemIndex: 0,
        responses: [],
        result: null,
        startedAt: Date.now(),
      };

    case 'ANSWER': {
      const newResponses = [...state.responses, action.response];
      const stationId = STATION_ORDER[state.currentStationIndex];
      const itemCount = getStationItemCount(stationId);
      const nextItemIndex = state.currentItemIndex + 1;

      // More items in this station?
      if (nextItemIndex < itemCount) {
        return {
          ...state,
          currentItemIndex: nextItemIndex,
          responses: newResponses,
        };
      }

      // Station complete — more stations?
      if (state.currentStationIndex < STATION_ORDER.length - 1) {
        return {
          ...state,
          phase: 'between-stations',
          responses: newResponses,
        };
      }

      // All stations done — calculate results
      const totalTimeMs = Date.now() - (state.startedAt ?? Date.now());
      const result = calculateAssessmentResult(newResponses, totalTimeMs);

      return {
        ...state,
        phase: 'results',
        responses: newResponses,
        result,
      };
    }

    case 'NEXT_STATION': {
      const nextIdx = state.currentStationIndex + 1;
      if (nextIdx >= STATION_ORDER.length) return state; // bounds guard
      return {
        ...state,
        phase: 'station',
        currentStationIndex: nextIdx,
        currentItemIndex: 0,
      };
    }

    case 'FINISH': {
      const totalTimeMs = Date.now() - (state.startedAt ?? Date.now());
      const result = calculateAssessmentResult(state.responses, totalTimeMs);
      return { ...state, phase: 'results', result };
    }

    case 'RESTART':
      return {
        ...state,
        phase: 'intro',
        currentStationIndex: 0,
        currentItemIndex: 0,
        responses: [],
        result: null,
        startedAt: null,
      };

    case 'LOAD_PREVIOUS':
      return { ...state, previousResult: action.result };

    default:
      return state;
  }
}

// ============================================
// PERSISTENCE
// ============================================

function loadPreviousResult(): AssessmentResult | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== 1) return null;
    const r = parsed.result;
    // Validate expected shape
    if (
      !r ||
      typeof r.rawScore !== 'number' ||
      typeof r.weightedScore !== 'number' ||
      typeof r.skillBand !== 'string' ||
      !Array.isArray(r.stationResults)
    ) {
      return null;
    }
    return r;
  } catch {
    return null;
  }
}

function saveResult(result: AssessmentResult): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 1,
      completedAt: new Date().toISOString(),
      result,
    }));
  } catch {
    // Silent fail
  }
}

// ============================================
// HOOK
// ============================================

const initialState: AssessmentState = {
  phase: 'intro',
  currentStationIndex: 0,
  currentItemIndex: 0,
  responses: [],
  result: null,
  startedAt: null,
  previousResult: null,
};

export function useSkillAssessment() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load previous result on mount
  useEffect(() => {
    const prev = loadPreviousResult();
    if (prev) dispatch({ type: 'LOAD_PREVIOUS', result: prev });
  }, []);

  // Save result when assessment finishes
  useEffect(() => {
    if (state.phase === 'results' && state.result) {
      saveResult(state.result);
    }
  }, [state.phase, state.result]);

  const start = useCallback(() => dispatch({ type: 'START' }), []);
  const answer = useCallback((response: AssessmentResponse) => dispatch({ type: 'ANSWER', response }), []);
  const nextStation = useCallback(() => dispatch({ type: 'NEXT_STATION' }), []);
  const restart = useCallback(() => dispatch({ type: 'RESTART' }), []);

  const currentStation = STATION_ORDER[state.currentStationIndex] as StationId | undefined;

  return {
    state,
    currentStation,
    start,
    answer,
    nextStation,
    restart,
  };
}
