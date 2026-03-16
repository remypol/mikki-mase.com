import { useState, useEffect, useMemo } from 'react';
import { courseManifest } from '../../config/course/manifest';
import { QUIZ_PASSING_SCORE } from '../../lib/courseEngine';
import ModuleIcon from './ModuleIcon';

interface Props {
  currentModuleSlug: string;
  currentLessonSlug: string;
  completedLessons: string[];
  quizScores: Record<string, number>;
  onNavigate?: () => void;
}

// ============================================
// ICONS (inline SVG)
// ============================================

function CheckIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#CFB53B' }} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
      style={{ color: '#9A9A9A' }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function QuizIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#9A9A9A' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function PracticeIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#CFB53B' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function AssessmentIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#CFB53B' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

// ============================================
// HELPER: build a unique lesson ID for completion tracking
// ============================================

function lessonId(moduleSlug: string, lessonSlug: string) {
  return `${moduleSlug}/${lessonSlug}`;
}

function lessonHref(moduleSlug: string, lessonSlug: string) {
  return `/masterclass/course/${moduleSlug}/${lessonSlug}`;
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function CourseNav({ currentModuleSlug, currentLessonSlug, completedLessons, quizScores, onNavigate }: Props) {
  // Expand the current module by default
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set([currentModuleSlug]));

  // Performance: memoize completed set for O(1) lookups
  const completedSet = useMemo(() => new Set(completedLessons), [completedLessons]);

  // Ensure current module is always expanded when navigation changes
  useEffect(() => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      next.add(currentModuleSlug);
      return next;
    });
  }, [currentModuleSlug]);

  const toggleModule = (slug: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  // Memoized completion map
  const completionMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const mod of courseManifest.modules) {
      map[mod.slug] = mod.lessons.filter((l) => completedSet.has(lessonId(mod.slug, l.slug))).length;
    }
    return map;
  }, [completedSet]);

  return (
    <nav className="py-4 select-none" aria-label="Course navigation">
      {/* Course title */}
      <div className="px-5 mb-6">
        <a
          href="/masterclass/course"
          className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-white"
          style={{ color: '#CFB53B' }}
        >
          Mikki Mase Masterclass
        </a>
      </div>

      {/* Modules list */}
      <ul className="space-y-1">
        {courseManifest.modules.map((mod) => {
          const isExpanded = expandedModules.has(mod.slug);
          const isCurrentModule = mod.slug === currentModuleSlug;
          const completedCount = completionMap[mod.slug] ?? 0;
          const quizScore = quizScores[mod.slug];
          const quizPassed = (quizScore ?? 0) >= QUIZ_PASSING_SCORE;
          const allComplete = completedCount === mod.lessons.length && (!mod.hasQuiz || quizPassed);
          const totalItems = mod.lessons.length + (mod.hasQuiz ? 1 : 0);
          const completedItems = completedCount + (mod.hasQuiz && quizPassed ? 1 : 0);

          return (
            <li key={mod.slug}>
              {/* Module header */}
              <button
                onClick={() => toggleModule(mod.slug)}
                className={`
                  w-full flex items-center gap-3 px-5 py-3 text-left transition-all duration-200
                  hover:bg-white/5
                  ${isCurrentModule ? 'bg-white/[0.03]' : ''}
                `}
                aria-expanded={isExpanded}
                aria-controls={`module-panel-${mod.slug}`}
              >
                {/* Module icon */}
                <ModuleIcon moduleSlug={mod.slug} size={32} />

                {/* Module info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#9A9A9A' }}>
                      Module {mod.number}
                    </span>
                    {allComplete && (
                      <CheckIcon />
                    )}
                    {mod.isFreePreview && (
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: 'rgba(207, 181, 59, 0.15)', color: '#CFB53B' }}
                      >
                        Free
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-sm font-semibold block truncate transition-colors ${
                      isCurrentModule ? 'text-white' : 'text-[#8A8A8A]'
                    }`}
                  >
                    {mod.title}
                  </span>
                </div>

                {/* Expand chevron */}
                <ChevronIcon open={isExpanded} />
              </button>

              {/* Lessons list — accordion */}
              {isExpanded && (
                <ul id={`module-panel-${mod.slug}`} className="pb-2">
                  {mod.lessons.map((lesson, idx) => {
                    const isCurrent = isCurrentModule && lesson.slug === currentLessonSlug;
                    const isComplete = completedSet.has(lessonId(mod.slug, lesson.slug));

                    return (
                      <li key={lesson.slug}>
                        <a
                          href={lessonHref(mod.slug, lesson.slug)}
                          onClick={onNavigate}
                          aria-current={isCurrent ? 'page' : undefined}
                          className={`
                            flex items-center gap-3 pl-14 pr-5 py-2.5 text-sm transition-all duration-200
                            hover:bg-white/5
                            ${isCurrent ? 'bg-white/[0.06]' : ''}
                          `}
                        >
                          {/* Status indicator */}
                          <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                            {isComplete ? (
                              <CheckIcon />
                            ) : isCurrent ? (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#A8001E] animate-pulse" />
                            ) : (
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: '#3A3A3A' }}
                              />
                            )}
                          </span>

                          {/* Lesson title */}
                          <span
                            className={`truncate transition-colors ${
                              isCurrent
                                ? 'text-white font-medium'
                                : isComplete
                                  ? 'font-normal'
                                  : 'text-[#7A7A7A] font-normal'
                            }`}
                            style={isComplete && !isCurrent ? { color: '#CFB53B' } : undefined}
                          >
                            {lesson.title}
                          </span>

                          {/* Duration */}
                          <span className="ml-auto text-[11px] flex-shrink-0" style={{ color: '#9A9A9A' }}>
                            {lesson.estimatedMinutes}m
                          </span>
                        </a>
                      </li>
                    );
                  })}

                  {/* Quiz row */}
                  {mod.hasQuiz && (
                    <li>
                      <a
                        href={`/masterclass/course/${mod.slug}/quiz`}
                        className={`
                          flex items-center gap-3 pl-14 pr-5 py-2.5 text-sm transition-all duration-200
                          hover:bg-white/5
                          ${isCurrentModule && currentLessonSlug === 'quiz' ? 'bg-white/[0.06]' : ''}
                        `}
                      >
                        <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                          {quizScore != null && quizScore >= QUIZ_PASSING_SCORE ? (
                            <CheckIcon />
                          ) : (
                            <QuizIcon />
                          )}
                        </span>

                        <span
                          className={`truncate ${
                            isCurrentModule && currentLessonSlug === 'quiz'
                              ? 'text-white font-medium'
                              : quizScore != null && quizScore >= QUIZ_PASSING_SCORE
                                ? 'font-normal'
                                : 'text-[#7A7A7A] font-normal'
                          }`}
                          style={quizScore != null && quizScore >= QUIZ_PASSING_SCORE ? { color: '#CFB53B' } : undefined}
                        >
                          Knowledge Check
                        </span>

                        {quizScore != null && (
                          <span
                            className="ml-auto text-[11px] font-semibold flex-shrink-0"
                            style={{ color: quizScore >= QUIZ_PASSING_SCORE ? '#CFB53B' : '#A8001E' }}
                          >
                            {quizScore}%
                          </span>
                        )}
                      </a>
                    </li>
                  )}

                  {/* Practice Mode (blackjack-mastery) */}
                  {mod.slug === 'blackjack-mastery' && (
                    <li>
                      <a
                        href={`/masterclass/course/${mod.slug}/practice`}
                        className={`
                          flex items-center gap-3 pl-14 pr-5 py-2.5 text-sm transition-all duration-200
                          hover:bg-white/5
                          ${isCurrentModule && currentLessonSlug === 'practice' ? 'bg-white/[0.06]' : ''}
                        `}
                      >
                        <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                          <PracticeIcon />
                        </span>
                        <span
                          className={`truncate ${
                            isCurrentModule && currentLessonSlug === 'practice'
                              ? 'text-white font-medium'
                              : 'font-normal'
                          }`}
                          style={isCurrentModule && currentLessonSlug === 'practice' ? undefined : { color: '#CFB53B' }}
                        >
                          Practice Mode
                        </span>
                      </a>
                    </li>
                  )}

                  {/* Skill Assessment (mindset-disclaimer) */}
                  {mod.slug === 'mindset-disclaimer' && (
                    <li>
                      <a
                        href={`/masterclass/course/${mod.slug}/assessment`}
                        className={`
                          flex items-center gap-3 pl-14 pr-5 py-2.5 text-sm transition-all duration-200
                          hover:bg-white/5
                          ${isCurrentModule && currentLessonSlug === 'assessment' ? 'bg-white/[0.06]' : ''}
                        `}
                      >
                        <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                          <AssessmentIcon />
                        </span>
                        <span
                          className={`truncate ${
                            isCurrentModule && currentLessonSlug === 'assessment'
                              ? 'text-white font-medium'
                              : 'font-normal'
                          }`}
                          style={isCurrentModule && currentLessonSlug === 'assessment' ? undefined : { color: '#CFB53B' }}
                        >
                          Casino IQ Assessment
                        </span>
                      </a>
                    </li>
                  )}

                  {/* Module progress indicator */}
                  <li className="px-14 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: '#3A3A3A' }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${totalItems > 0 ? (completedItems / totalItems) * 100 : 0}%`,
                            backgroundColor: '#CFB53B',
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-medium" style={{ color: '#9A9A9A' }}>
                        {completedItems}/{totalItems}
                      </span>
                    </div>
                  </li>
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
