import type { Lesson } from '../../config/course/types';
import ModuleIcon from './ModuleIcon';
import LessonDrill from './LessonDrill';

interface Props {
  lesson: Lesson;
  moduleTitle: string;
  moduleIcon: string;
  moduleSlug?: string;
  onComplete: () => void;
  isComplete: boolean;
}

// ============================================
// ICONS
// ============================================

function KeyIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#CFB53B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#CFB53B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function LessonContent({ lesson, moduleTitle, moduleIcon, moduleSlug, onComplete, isComplete }: Props) {
  return (
    <article className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-12 xl:px-20 pt-6 pb-20 md:pt-10 md:pb-10">
      {/* Module eyebrow */}
      <div className="mb-6">
        <a
          href="/masterclass/course"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors hover:text-white"
          style={{ color: '#CFB53B' }}
        >
          {moduleSlug ? <ModuleIcon moduleSlug={moduleSlug} size={24} /> : <span aria-hidden="true">{moduleIcon}</span>}
          {moduleTitle}
        </a>
      </div>

      {/* Lesson title — editorial Fraunces display */}
      <h1 className="display-h1 article-heading-wide mb-3">
        {lesson.title}
      </h1>

      {/* Subtitle — optional v2 thesis line */}
      {lesson.subtitle && (
        <p className="text-secondary text-base md:text-lg mb-4 max-w-2xl">
          {lesson.subtitle}
        </p>
      )}

      {/* Meta row */}
      <p className="text-sm mb-8 flex items-center gap-3 flex-wrap" style={{ color: '#9A9A9A' }}>
        <span>{lesson.estimatedMinutes} min read</span>
        {lesson.difficulty && (
          <>
            <span className="opacity-40">·</span>
            <span className="capitalize">{lesson.difficulty}</span>
          </>
        )}
      </p>

      {/* Promise card — "By the end you'll know…" */}
      {lesson.promise && lesson.promise.length > 0 && (
        <div className="stake-card mb-10">
          <p className="text-xs uppercase tracking-widest text-tertiary font-semibold mb-3">
            By the end of this lesson you will
          </p>
          <ul className="space-y-2">
            {lesson.promise.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-secondary">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lesson body */}
      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white prose-headings:font-black
          prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-6
          prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-4
          prose-p:text-[#BEBEBE] prose-p:leading-[1.85] prose-p:mb-6
          prose-strong:text-white prose-strong:font-bold
          prose-a:text-[#CFB53B] prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-[#CFB53B] prose-blockquote:text-[#BEBEBE] prose-blockquote:bg-white/[0.03] prose-blockquote:rounded-r-lg prose-blockquote:py-5 prose-blockquote:pr-5 prose-blockquote:my-8
          prose-ul:text-[#BEBEBE] prose-ul:my-6 prose-ul:space-y-2
          prose-ol:text-[#BEBEBE] prose-ol:my-6 prose-ol:space-y-2
          prose-li:marker:text-[#CFB53B] prose-li:leading-[1.75]
          prose-code:text-[#CFB53B] prose-code:bg-white/[0.05] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-hr:border-[#3A3A3A] prose-hr:my-10
        "
        dangerouslySetInnerHTML={{ __html: lesson.content }}
      />

      {/* Key Takeaways */}
      {lesson.keyTakeaways.length > 0 && (
        <div
          className="mt-12 rounded-xl p-6 md:p-8 border"
          style={{ backgroundColor: '#1A1A1A', borderColor: '#3A3A3A' }}
        >
          <div className="flex items-center gap-3 mb-5">
            <KeyIcon />
            <h3 className="text-lg font-bold text-white">Key Takeaways</h3>
          </div>
          <ul className="space-y-3">
            {lesson.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                  style={{ backgroundColor: 'rgba(207, 181, 59, 0.15)', color: '#CFB53B' }}
                >
                  {idx + 1}
                </span>
                <span className="text-[#BEBEBE] text-sm leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pro Tip */}
      {lesson.proTip && (
        <div
          className="mt-8 rounded-xl p-6 md:p-8 border-l-4 border"
          style={{
            borderLeftColor: '#CFB53B',
            borderColor: '#3A3A3A',
            borderLeftWidth: '4px',
            backgroundColor: 'rgba(207, 181, 59, 0.04)',
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <LightbulbIcon />
            <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#CFB53B' }}>
              Pro Tip
            </h3>
          </div>
          <p className="text-[#BEBEBE] text-sm leading-relaxed">{lesson.proTip}</p>
        </div>
      )}

      {/* Interactive drill — v2 template slot.
          Rendered when lesson.drillId maps to a registered drill. */}
      {lesson.drillId && (
        <div className="mt-10">
          <LessonDrill drillId={lesson.drillId} />
        </div>
      )}

      {/* Field Note — "this week, try this at a table" */}
      {lesson.fieldNote && (
        <div
          className="mt-8 rounded-xl p-6 md:p-8 border"
          style={{
            borderColor: 'rgb(var(--border-subtle))',
            background: 'linear-gradient(135deg, rgba(212, 24, 61, 0.05) 0%, rgba(20, 22, 32, 1) 100%)',
          }}
        >
          <p className="text-xs uppercase tracking-widest font-semibold mb-2 accent-red">
            Field note
          </p>
          <p className="text-secondary text-base leading-relaxed">{lesson.fieldNote}</p>
          <p className="text-tertiary text-xs mt-3">
            Log this in your journal after your next session.
          </p>
        </div>
      )}

      {/* Mark as Complete */}
      <div className="mt-12 mb-4 pt-8 border-t" style={{ borderColor: '#3A3A3A' }}>
        {isComplete ? (
          <div className="flex items-center justify-center gap-3 py-4">
            <span style={{ color: '#CFB53B' }}>
              <CheckCircleIcon />
            </span>
            <span className="text-sm font-semibold" style={{ color: '#CFB53B' }}>
              Lesson Complete
            </span>
          </div>
        ) : (
          <button
            onClick={onComplete}
            className="w-full sm:w-auto flex items-center justify-center gap-2 font-bold text-white min-h-[52px] rounded-xl px-8 mx-auto transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            style={{ backgroundColor: '#A8001E' }}
          >
            <CheckCircleIcon />
            Mark as Complete
          </button>
        )}
      </div>
    </article>
  );
}
