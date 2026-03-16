interface Props {
  prevHref: string | null;
  nextHref: string | null;
  onMarkComplete: () => void;
  isComplete: boolean;
}

// ============================================
// ICONS
// ============================================

function ArrowLeftIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function LessonControls({ prevHref, nextHref, onMarkComplete, isComplete }: Props) {
  return (
    <div
      className="
        sticky bottom-0 z-40
        border-t backdrop-blur-xl
        px-4 sm:px-6 lg:px-8 py-3
        pb-[max(0.75rem,env(safe-area-inset-bottom))]
      "
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
        {/* Previous */}
        {prevHref ? (
          <a
            href={prevHref}
            className="
              flex items-center gap-2 min-h-[44px] px-4 rounded-lg
              text-sm font-medium text-[#BEBEBE]
              border transition-all duration-200
              hover:bg-white/5 hover:text-white
              active:scale-[0.98]
            "
            style={{ borderColor: '#3A3A3A' }}
          >
            <ArrowLeftIcon />
            <span className="hidden sm:inline">Previous</span>
          </a>
        ) : (
          <div />
        )}

        {/* Primary CTA */}
        {!isComplete ? (
          <button
            onClick={() => {
              onMarkComplete();
              if (nextHref) {
                setTimeout(() => { window.location.href = nextHref; }, 300);
              }
            }}
            className="
              flex items-center gap-2 min-h-[44px] px-6 rounded-lg
              text-sm font-bold text-white
              transition-all duration-200
              hover:brightness-110 active:scale-[0.98]
            "
            style={{ backgroundColor: '#A8001E' }}
          >
            <CheckIcon />
            <span>
              Mark Complete
              {nextHref && <span className="hidden sm:inline"> & Continue</span>}
            </span>
          </button>
        ) : nextHref ? (
          <a
            href={nextHref}
            className="
              flex items-center gap-2 min-h-[44px] px-6 rounded-lg
              text-sm font-bold text-white
              transition-all duration-200
              hover:brightness-110 active:scale-[0.98]
            "
            style={{ backgroundColor: '#A8001E' }}
          >
            <span>Next Lesson</span>
            <ArrowRightIcon />
          </a>
        ) : (
          <span
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: '#CFB53B' }}
          >
            <CheckIcon />
            All done!
          </span>
        )}

        {/* Next */}
        {nextHref ? (
          <a
            href={nextHref}
            className="
              flex items-center gap-2 min-h-[44px] px-4 rounded-lg
              text-sm font-medium text-[#BEBEBE]
              border transition-all duration-200
              hover:bg-white/5 hover:text-white
              active:scale-[0.98]
            "
            style={{ borderColor: '#3A3A3A' }}
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRightIcon />
          </a>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
