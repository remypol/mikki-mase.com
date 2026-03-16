/**
 * LessonPage — Client-side wrapper that wires real progress
 * into LessonContent, LessonControls, and Quiz components.
 * Used by [module]/[lesson].astro via client:load.
 */
import { Component, useCallback, lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import type { Lesson, Quiz as QuizType } from '../../config/course/types';
import { useCourseProgress } from '../../hooks/useCourseProgress';
import LessonContent from './LessonContent';
import LessonControls from './LessonControls';
import Quiz from './quiz/Quiz';

const PracticeMode = lazy(() => import('../blackjack/PracticeMode'));
const SkillAssessment = lazy(() => import('../assessment/SkillAssessment'));

class ErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

interface Props {
  moduleSlug: string;
  lessonSlug: string;
  moduleTitle: string;
  moduleIcon: string;
  isQuiz: boolean;
  isPractice?: boolean;
  isAssessment?: boolean;
  lessonContent: Lesson | null;
  quizContent: QuizType | null;
  prevHref: string | null;
  nextHref: string | null;
}

export default function LessonPage({
  moduleSlug,
  lessonSlug,
  moduleTitle,
  moduleIcon,
  isQuiz,
  isPractice,
  isAssessment,
  lessonContent,
  quizContent,
  prevHref,
  nextHref,
}: Props) {
  const { markLessonComplete, saveQuizScore, isLessonComplete, getQuizScore } = useCourseProgress();

  const lessonId = `${moduleSlug}/${lessonSlug}`;
  const complete = isLessonComplete(lessonId);

  // Badge logic is now handled inside the hook automatically
  const handleMarkComplete = useCallback(() => {
    markLessonComplete(lessonId);
  }, [lessonId, markLessonComplete]);

  const handleQuizComplete = useCallback((score: number) => {
    saveQuizScore(moduleSlug, score);
  }, [moduleSlug, saveQuizScore]);

  const loadingFallback = (
    <div className="text-center py-20">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderColor: '#CFB53B', borderTopColor: 'transparent' }} />
      <span className="text-sm" style={{ color: '#9A9A9A' }}>Loading...</span>
    </div>
  );

  const errorFallback = (
    <div className="text-center py-20">
      <h3 className="text-white text-xl font-bold mb-2">Failed to load</h3>
      <p className="text-sm mb-4" style={{ color: '#9A9A9A' }}>Something went wrong loading this content.</p>
      <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-lg text-sm font-bold" style={{ backgroundColor: '#CFB53B', color: '#000' }}>Reload</button>
    </div>
  );

  // Practice Mode (Module 3: Blackjack Mastery)
  if (isPractice) {
    return (
      <div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <ErrorBoundary fallback={errorFallback}>
            <Suspense fallback={loadingFallback}>
              <PracticeMode />
            </Suspense>
          </ErrorBoundary>
        </div>
        <LessonControls prevHref={prevHref} nextHref={nextHref} onMarkComplete={handleMarkComplete} isComplete={complete} />
      </div>
    );
  }

  // Skill Assessment (Module 1: Free Preview)
  if (isAssessment) {
    return (
      <div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <ErrorBoundary fallback={errorFallback}>
            <Suspense fallback={loadingFallback}>
              <SkillAssessment />
            </Suspense>
          </ErrorBoundary>
        </div>
        <LessonControls prevHref={prevHref} nextHref={nextHref} onMarkComplete={handleMarkComplete} isComplete={complete} />
      </div>
    );
  }

  if (isQuiz && quizContent) {
    return (
      <div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Quiz
            quiz={quizContent}
            moduleTitle={moduleTitle}
            onComplete={handleQuizComplete}
            bestScore={getQuizScore(moduleSlug)}
          />
        </div>
        <LessonControls prevHref={prevHref} nextHref={nextHref} onMarkComplete={handleMarkComplete} isComplete={complete} />
      </div>
    );
  }

  if (lessonContent) {
    return (
      <div>
        <LessonContent
          lesson={lessonContent}
          moduleTitle={moduleTitle}
          moduleIcon={moduleIcon}
          moduleSlug={moduleSlug}
          onComplete={handleMarkComplete}
          isComplete={complete}
        />
        <LessonControls
          prevHref={prevHref}
          nextHref={nextHref}
          onMarkComplete={handleMarkComplete}
          isComplete={complete}
        />
      </div>
    );
  }

  // Fallback — coming soon
  return (
    <div className="flex items-center justify-center min-h-[60vh] text-center px-6">
      <div>
        <span className="text-5xl mb-4 block">&#128679;</span>
        <h2 className="text-2xl font-black text-white mb-2">Coming Soon</h2>
        <p className="text-sm" style={{ color: '#9A9A9A' }}>
          This lesson content is being prepared. Check back soon!
        </p>
        <a
          href="/masterclass/course"
          className="inline-block mt-6 px-6 py-3 rounded-lg font-bold text-sm"
          style={{ backgroundColor: '#CFB53B', color: '#000' }}
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
