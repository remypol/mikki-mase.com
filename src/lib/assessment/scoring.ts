/**
 * Assessment scoring — weighted scoring with confidence gap calculation.
 */
import type { AssessmentResponse, AssessmentResult, StationResult, SkillBand, StationId } from './types';
import { RESULT_BANDS, STATION_WEIGHTS, LEAK_MAP, MODULE_RECOMMENDATIONS } from './resultBands';

/** Calculate station-level results. */
function calculateStationResults(responses: AssessmentResponse[]): StationResult[] {
  const grouped = new Map<StationId, AssessmentResponse[]>();

  for (const r of responses) {
    const existing = grouped.get(r.stationId) ?? [];
    existing.push(r);
    grouped.set(r.stationId, existing);
  }

  const results: StationResult[] = [];
  for (const [stationId, stationResponses] of grouped) {
    const correct = stationResponses.filter((r) => r.correct).length;
    const total = stationResponses.length;
    results.push({
      stationId,
      score: correct,
      total,
      accuracy: total > 0 ? correct / total : 0,
    });
  }

  return results;
}

/** Calculate the confidence gap — how overconfident the user is. */
function calculateConfidenceGap(responses: AssessmentResponse[]): number {
  const withConfidence = responses.filter((r) => r.confidence != null);
  if (withConfidence.length === 0) return 0;

  let overconfidenceSum = 0;
  for (const r of withConfidence) {
    const expectedAccuracy = (r.confidence! / 3); // 1=0.33, 2=0.67, 3=1.0
    const actual = r.correct ? 1 : 0;
    overconfidenceSum += expectedAccuracy - actual;
  }

  return overconfidenceSum / withConfidence.length;
}

/** Determine which skill areas are leaking. */
function identifyLeaks(stationResults: StationResult[]): string[] {
  const leaks: string[] = [];

  for (const sr of stationResults) {
    if (sr.accuracy < 0.6) {
      const stationLeaks = LEAK_MAP[sr.stationId];
      if (stationLeaks) leaks.push(...stationLeaks);
    }
  }

  return leaks;
}

/** Map leaks to recommended modules. */
function getRecommendedModules(leaks: string[]): string[] {
  const modules = new Set<string>();

  for (const leak of leaks) {
    const recs = MODULE_RECOMMENDATIONS[leak];
    if (recs) recs.forEach((m) => modules.add(m));
  }

  return Array.from(modules);
}

/** Determine skill band from weighted score. */
function determineBand(weightedScore: number, confidenceGap: number): SkillBand {
  // Only penalize overconfidence (positive gap), not underconfidence
  const adjustedScore = weightedScore - (Math.max(0, confidenceGap) * 0.1);

  for (const band of RESULT_BANDS) {
    if (adjustedScore >= band.minScore) {
      return band.id;
    }
  }

  return 'casual';
}

/** Calculate the full assessment result. */
export function calculateAssessmentResult(
  responses: AssessmentResponse[],
  totalTimeMs: number,
): AssessmentResult {
  const stationResults = calculateStationResults(responses);

  // Raw score (unweighted accuracy)
  const totalCorrect = responses.filter((r) => r.correct).length;
  const rawScore = responses.length > 0 ? totalCorrect / responses.length : 0;

  // Weighted score — include ALL stations (even those with 0 responses)
  let weightedSum = 0;
  let weightTotal = 0;
  const stationResultMap = new Map(stationResults.map((sr) => [sr.stationId, sr]));
  for (const [stationId, weight] of Object.entries(STATION_WEIGHTS) as [StationId, number][]) {
    const sr = stationResultMap.get(stationId);
    weightedSum += (sr?.accuracy ?? 0) * weight;
    weightTotal += weight;
  }
  const weightedScore = weightTotal > 0 ? weightedSum / weightTotal : 0;

  const confidenceGap = calculateConfidenceGap(responses);
  const skillBand = determineBand(weightedScore, confidenceGap);
  const leaks = identifyLeaks(stationResults);
  const recommendedModules = getRecommendedModules(leaks);

  return {
    rawScore,
    weightedScore,
    confidenceGap,
    skillBand,
    leaks,
    stationResults,
    recommendedModules,
    totalTimeMs,
  };
}
