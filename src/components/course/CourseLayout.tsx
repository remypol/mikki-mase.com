import { useState, useEffect, type ReactNode } from 'react';
import { getTotalLessons } from '../../config/course/manifest';
import { useCourseProgress } from '../../hooks/useCourseProgress';
import ProgressBar from './ProgressBar';
import CourseNav from './CourseNav';
import CourseGate from './CourseGate';

interface Props {
  children: ReactNode;
  currentModuleSlug: string;
  currentLessonSlug: string;
}

// ============================================
// ICONS
// ============================================

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function CourseLayout({ children, currentModuleSlug, currentLessonSlug }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { progress, setCurrentPosition, getCompletionPercentage } = useCourseProgress();

  // Update current position in progress
  useEffect(() => {
    setCurrentPosition(currentModuleSlug, currentLessonSlug);
  }, [currentModuleSlug, currentLessonSlug, setCurrentPosition]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const totalLessons = getTotalLessons();
  const completionPercentage = getCompletionPercentage(totalLessons);

  return (
    <CourseGate>
      <div className="min-h-screen bg-black text-white">
        {/* Top progress bar */}
        <ProgressBar percentage={completionPercentage} />

        {/* Mobile header */}
        <div
          className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-14 border-b backdrop-blur-lg"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            borderColor: '#3A3A3A',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 min-h-[44px] min-w-[44px] justify-center text-white"
            aria-label="Open course navigation"
          >
            <MenuIcon />
          </button>

          <a
            href="/masterclass/course"
            className="text-xs font-bold uppercase tracking-widest truncate px-4"
            style={{ color: '#CFB53B' }}
          >
            Masterclass
          </a>

          {/* Completion badge */}
          <span
            className="text-xs font-bold min-w-[44px] text-right"
            style={{ color: '#9A9A9A' }}
          >
            {completionPercentage}%
          </span>
        </div>

        <div className="flex">
          {/* ====================================
              SIDEBAR — Desktop (always visible)
              ==================================== */}
          <aside
            className="hidden lg:block w-80 flex-shrink-0 border-r sticky top-0 h-screen overflow-y-auto overscroll-contain"
            style={{
              backgroundColor: '#0A0A0A',
              borderColor: '#3A3A3A',
            }}
          >
            <CourseNav
              currentModuleSlug={currentModuleSlug}
              currentLessonSlug={currentLessonSlug}
              completedLessons={progress.completedLessons}
              quizScores={progress.quizScores}
            />
          </aside>

          {/* ====================================
              SIDEBAR — Mobile drawer
              ==================================== */}
          {/* Backdrop */}
          <div
            className={`
              lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm
              transition-opacity duration-300
              ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <aside
            className={`
              lg:hidden fixed top-0 left-0 z-50 w-80 max-w-[85vw] h-full
              border-r overflow-y-auto overscroll-contain
              transition-transform duration-300 ease-out
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
            style={{
              backgroundColor: '#0A0A0A',
              borderColor: '#3A3A3A',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Course navigation"
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-5 h-14 border-b" style={{ borderColor: '#3A3A3A' }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#CFB53B' }}>
                Navigation
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-center min-h-[44px] min-w-[44px] text-[#BEBEBE] hover:text-white transition-colors"
                aria-label="Close navigation"
              >
                <CloseIcon />
              </button>
            </div>

            <CourseNav
              currentModuleSlug={currentModuleSlug}
              currentLessonSlug={currentLessonSlug}
              completedLessons={progress.completedLessons}
              quizScores={progress.quizScores}
              onNavigate={() => setSidebarOpen(false)}
            />
          </aside>

          {/* ====================================
              MAIN CONTENT
              ==================================== */}
          <main className="flex-1 min-w-0 lg:h-screen lg:overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </CourseGate>
  );
}
