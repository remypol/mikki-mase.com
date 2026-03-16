import { useState, useEffect, useCallback } from 'react';
import type { CourseProgress } from '../config/course/types';
import { createDefaultProgress } from '../config/course/types';
import { isModuleComplete, QUIZ_PASSING_SCORE } from '../lib/courseEngine';
import { courseManifest } from '../config/course/manifest';

const STORAGE_KEY = 'mikki_course_progress';
const PROGRESS_EVENT = 'course-progress-update';

function loadProgress(): CourseProgress {
  const defaults = createDefaultProgress();
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return {
      ...defaults,
      ...parsed,
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      quizScores: parsed.quizScores && typeof parsed.quizScores === 'object' ? parsed.quizScores : {},
      scenariosCompleted: Array.isArray(parsed.scenariosCompleted) ? parsed.scenariosCompleted : [],
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
      weeklyActivity: Array.isArray(parsed.weeklyActivity) ? parsed.weeklyActivity : [],
      points: typeof parsed.points === 'number' ? parsed.points : 0,
    };
  } catch {
    return defaults;
  }
}

function saveProgress(progress: CourseProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    // Notify other React islands in the same tab
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
  } catch {
    // localStorage full or unavailable
  }
}

export function useCourseProgress() {
  // Lazy init from localStorage to avoid hydration flicker (#10)
  const [progress, setProgress] = useState<CourseProgress>(loadProgress);

  // Sync from other React islands (same tab) + other browser tabs
  useEffect(() => {
    const reload = () => setProgress(loadProgress());
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) reload();
    };
    window.addEventListener(PROGRESS_EVENT, reload);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, reload);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Immutable state updater — no direct mutation (#4)
  const update = useCallback((updater: (prev: CourseProgress) => CourseProgress) => {
    setProgress((prev) => {
      const computed = updater(prev);
      if (computed === prev) return prev;
      const next = { ...computed, lastActiveAt: new Date().toISOString() };
      saveProgress(next);
      return next;
    });
  }, []);

  // Auto-check module badges after state changes (#2)
  const checkAndAwardBadges = useCallback((next: CourseProgress): CourseProgress => {
    let badges = next.badges;
    for (const mod of courseManifest.modules) {
      if (isModuleComplete(mod.slug, next.completedLessons, next.quizScores)) {
        if (!badges.includes(mod.badgeId)) {
          badges = [...badges, mod.badgeId];
        }
      }
    }
    const allComplete = courseManifest.modules.every((mod) =>
      isModuleComplete(mod.slug, next.completedLessons, next.quizScores),
    );
    if (allComplete && !badges.includes('masterclass-graduate')) {
      badges = [...badges, 'masterclass-graduate'];
    }
    return badges !== next.badges ? { ...next, badges } : next;
  }, []);

  const markLessonComplete = useCallback((lessonId: string) => {
    update((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const next = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        points: prev.points + 10,
      };
      return checkAndAwardBadges(next);
    });
  }, [update, checkAndAwardBadges]);

  const saveQuizScore = useCallback((quizId: string, score: number) => {
    update((prev) => {
      const prevBest = prev.quizScores[quizId] ?? 0;
      // Fix #5: first pass = first time reaching passing threshold
      const isFirstPass = prevBest < QUIZ_PASSING_SCORE && score >= QUIZ_PASSING_SCORE;
      const isPerfect = score === 100 && prevBest < 100;
      let bonusPoints = 0;
      if (isFirstPass) bonusPoints += 50;
      if (isPerfect) bonusPoints += 25;
      const next = {
        ...prev,
        quizScores: { ...prev.quizScores, [quizId]: Math.max(prevBest, score) },
        points: prev.points + bonusPoints,
        badges: isPerfect && !prev.badges.includes('perfect-score')
          ? [...prev.badges, 'perfect-score']
          : prev.badges,
      };
      return checkAndAwardBadges(next);
    });
  }, [update, checkAndAwardBadges]);

  const completeScenario = useCallback((scenarioId: string) => {
    update((prev) => {
      if (prev.scenariosCompleted.includes(scenarioId)) return prev;
      return {
        ...prev,
        scenariosCompleted: [...prev.scenariosCompleted, scenarioId],
        points: prev.points + 25,
      };
    });
  }, [update]);

  const awardBadge = useCallback((badgeId: string) => {
    update((prev) => {
      if (prev.badges.includes(badgeId)) return prev;
      return { ...prev, badges: [...prev.badges, badgeId] };
    });
  }, [update]);

  const setCurrentPosition = useCallback((moduleSlug: string, lessonSlug: string) => {
    update((prev) => {
      if (prev.currentModuleSlug === moduleSlug && prev.currentLessonSlug === lessonSlug) return prev;
      return { ...prev, currentModuleSlug: moduleSlug, currentLessonSlug: lessonSlug };
    });
  }, [update]);

  const isLessonComplete = useCallback((lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  }, [progress.completedLessons]);

  const getQuizScore = useCallback((quizId: string) => {
    return progress.quizScores[quizId] ?? null;
  }, [progress.quizScores]);

  const getCompletionPercentage = useCallback((totalLessons: number) => {
    if (totalLessons === 0) return 0;
    const unique = new Set(progress.completedLessons).size;
    return Math.min(100, Math.round((unique / totalLessons) * 100));
  }, [progress.completedLessons]);

  return {
    progress,
    markLessonComplete,
    saveQuizScore,
    completeScenario,
    awardBadge,
    setCurrentPosition,
    isLessonComplete,
    getQuizScore,
    getCompletionPercentage,
  };
}
