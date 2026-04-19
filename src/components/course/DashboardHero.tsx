/**
 * DashboardHero — the first thing a logged-in Masterclass buyer sees.
 *
 * Built as a direct response to the post-paywall audit finding that the dashboard
 * had "no welcome, no Continue where you left off, no progress, no onboarding".
 * Now shows either:
 *   - First-time state: warm welcome + "Start Module 1" CTA
 *   - Returning state: "Continue where you left off" resume card + progress ring
 *
 * This block sits ABOVE the module grid; locked upsells have been demoted to below.
 */

import { useMemo } from 'react';
import { useCourseProgress } from '../../hooks/useCourseProgress';
import { courseManifest } from '../../config/course/manifest';

interface Props {
  displayName?: string | null;
  tierLabel?: string | null;
}

function ProgressRing({ percent }: { percent: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, percent)) / 100) * circumference;
  return (
    <div className="relative w-20 h-20 flex-shrink-0" aria-hidden="true">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="6"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="rgb(var(--accent-gold))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-primary tabular-nums">
          {Math.round(percent)}%
        </span>
      </div>
    </div>
  );
}

export default function DashboardHero({ displayName, tierLabel }: Props) {
  const { progress, getCompletionPercentage } = useCourseProgress();

  // All lessons across all modules (for progress math)
  const totalLessons = useMemo(
    () => courseManifest.modules.reduce((sum, m) => sum + m.lessons.length, 0),
    [],
  );

  const completionPct = getCompletionPercentage(totalLessons);
  const completedCount = new Set(progress.completedLessons).size;
  const hasStarted = completedCount > 0 || !!progress.currentLessonSlug;

  // Resolve resume target: prefer explicit currentLessonSlug, else first incomplete lesson.
  const resumeTarget = useMemo(() => {
    if (progress.currentModuleSlug && progress.currentLessonSlug) {
      const mod = courseManifest.modules.find((m) => m.slug === progress.currentModuleSlug);
      const lesson = mod?.lessons.find((l) => l.slug === progress.currentLessonSlug);
      if (mod && lesson) {
        return {
          mod,
          lesson,
          href: `/masterclass/course/${mod.slug}/${lesson.slug}`,
          label: 'Continue where you left off',
        };
      }
    }
    // Fall back to first incomplete lesson in module order.
    // lessonId format matches LessonPage.tsx: `${moduleSlug}/${lessonSlug}`.
    for (const m of courseManifest.modules) {
      for (const l of m.lessons) {
        if (!progress.completedLessons.includes(`${m.slug}/${l.slug}`)) {
          return {
            mod: m,
            lesson: l,
            href: `/masterclass/course/${m.slug}/${l.slug}`,
            label: hasStarted ? 'Next up' : 'Start here',
          };
        }
      }
    }
    // Everything complete
    const lastMod = courseManifest.modules[courseManifest.modules.length - 1];
    const lastLesson = lastMod?.lessons[lastMod.lessons.length - 1];
    return lastMod && lastLesson
      ? {
          mod: lastMod,
          lesson: lastLesson,
          href: `/masterclass/course/${lastMod.slug}/${lastLesson.slug}`,
          label: 'Review your last lesson',
        }
      : null;
  }, [progress.currentModuleSlug, progress.currentLessonSlug, progress.completedLessons, hasStarted]);

  const greeting = displayName ? `Welcome back, ${displayName.split(' ')[0]}` : 'Welcome to the Masterclass';

  return (
    <section className="mb-10 md:mb-14" aria-labelledby="dashboard-hero-heading">
      <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-widest text-tertiary">
        <span>Your dashboard</span>
        {tierLabel && (
          <>
            <span className="opacity-40">·</span>
            <span className="accent-gold font-semibold">{tierLabel}</span>
          </>
        )}
      </div>

      <h1 id="dashboard-hero-heading" className="display-h1 article-heading-wide mb-4">
        {greeting}<span className="accent-red">.</span>
      </h1>

      {hasStarted ? (
        <p className="text-secondary mb-6 max-w-2xl">
          You've completed {completedCount} of {totalLessons} lessons. Keep the streak going —
          pick up right where you left off.
        </p>
      ) : (
        <p className="text-secondary mb-6 max-w-2xl">
          10 modules, {totalLessons} lessons, interactive scenarios. Take it at your own pace.
          Module 1 is the foundation everything else builds on — start there.
        </p>
      )}

      {resumeTarget && (
        <a
          href={resumeTarget.href}
          className="stake-card block mt-6 group no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(var(--accent-gold))] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:rgb(var(--bg-page))]"
          aria-label={`${resumeTarget.label}: ${resumeTarget.lesson.title}`}
        >
          <div className="flex items-center gap-5 flex-wrap sm:flex-nowrap">
            <ProgressRing percent={completionPct} />
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-widest text-tertiary mb-1">
                {resumeTarget.label}
              </p>
              <p className="display-h3 mb-1 truncate">
                {resumeTarget.lesson.title}
              </p>
              <p className="text-secondary text-sm">
                Module {resumeTarget.mod.number} · {resumeTarget.mod.title} ·{' '}
                <span className="text-tertiary">
                  {resumeTarget.lesson.estimatedMinutes} min read
                </span>
              </p>
            </div>
            <span
              className="inline-flex items-center gap-2 bg-accent-red text-white px-5 py-3 rounded-full text-sm font-semibold whitespace-nowrap group-hover:brightness-110 transition"
              aria-hidden="true"
            >
              {hasStarted ? 'Resume' : 'Start'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </a>
      )}
    </section>
  );
}
