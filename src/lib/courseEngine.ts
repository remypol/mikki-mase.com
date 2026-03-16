/**
 * Course Engine - Pure functions for XP, badges, completion logic
 */

import { courseManifest } from '../config/course/manifest';
import type { CourseProgress } from '../config/course/types';

export const QUIZ_PASSING_SCORE = 80;

export function calculateModuleCompletion(
  moduleSlug: string,
  completedLessons: string[],
  quizScores: Record<string, number>,
): { lessonsComplete: number; totalLessons: number; quizPassed: boolean; percentage: number } {
  const mod = courseManifest.modules.find((m) => m.slug === moduleSlug);
  if (!mod) return { lessonsComplete: 0, totalLessons: 0, quizPassed: false, percentage: 0 };

  const lessonIds = mod.lessons.map((l) => `${moduleSlug}/${l.slug}`);
  const lessonsComplete = lessonIds.filter((id) => completedLessons.includes(id)).length;
  const totalLessons = mod.lessons.length;
  const quizScore = quizScores[moduleSlug] ?? 0;
  const quizPassed = quizScore >= QUIZ_PASSING_SCORE;

  const totalItems = totalLessons + (mod.hasQuiz ? 1 : 0);
  const completedItems = lessonsComplete + (quizPassed ? 1 : 0);
  const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return { lessonsComplete, totalLessons, quizPassed, percentage };
}

export function isModuleComplete(
  moduleSlug: string,
  completedLessons: string[],
  quizScores: Record<string, number>,
): boolean {
  const result = calculateModuleCompletion(moduleSlug, completedLessons, quizScores);
  return result.lessonsComplete === result.totalLessons && result.quizPassed;
}

export function getEarnedBadges(progress: CourseProgress): string[] {
  const earned: string[] = [...progress.badges];

  for (const mod of courseManifest.modules) {
    if (isModuleComplete(mod.slug, progress.completedLessons, progress.quizScores)) {
      if (!earned.includes(mod.badgeId)) {
        earned.push(mod.badgeId);
      }
    }
  }

  // Masterclass graduate
  const allModulesComplete = courseManifest.modules.every((mod) =>
    isModuleComplete(mod.slug, progress.completedLessons, progress.quizScores),
  );
  if (allModulesComplete && !earned.includes('masterclass-graduate')) {
    earned.push('masterclass-graduate');
  }

  return earned;
}

export function getOverallProgress(progress: CourseProgress): number {
  const totalLessons = courseManifest.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  if (totalLessons === 0) return 0;
  const unique = new Set(progress.completedLessons).size;
  return Math.min(100, Math.round((unique / totalLessons) * 100));
}
