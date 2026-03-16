/**
 * Skill Assessment Types
 */

export type StationId = 'blackjack-blitz' | 'bankroll-radar' | 'myth-buster' | 'host-edge';

export type SkillBand = 'casual' | 'leaky' | 'sharp-but-incomplete' | 'elite';

export interface AssessmentResponse {
  stationId: StationId;
  itemId: string;
  answer: string;
  correct: boolean;
  responseTimeMs: number;
  confidence?: 1 | 2 | 3;
}

export interface StationResult {
  stationId: StationId;
  score: number;
  total: number;
  accuracy: number;
}

export interface AssessmentResult {
  rawScore: number;
  weightedScore: number;
  confidenceGap: number;
  skillBand: SkillBand;
  leaks: string[];
  stationResults: StationResult[];
  recommendedModules: string[];
  totalTimeMs: number;
}

export interface AssessmentProgress {
  version: 1;
  completedAt: string | null;
  result: AssessmentResult | null;
  responses: AssessmentResponse[];
}

export function createDefaultAssessmentProgress(): AssessmentProgress {
  return {
    version: 1,
    completedAt: null,
    result: null,
    responses: [],
  };
}
