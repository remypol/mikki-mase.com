import { useState, useEffect, useCallback, useRef } from 'react';
import EmailCapture from './EmailCapture';

/**
 * ExitIntentEmailCapture
 * React replacement for ExitIntentBar.astro
 * Desktop-only exit-intent bar with email capture form
 * Fixed position below header, slide-down animation, once per session
 */
export default function ExitIntentEmailCapture() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [successAutoHide, setSuccessAutoHide] = useState(false);
  const triggered = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Monitor for success state to auto-hide after 5s
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkSuccess = () => {
      if (sessionStorage.getItem('emailSubmitted') === 'true' && visible && !successAutoHide) {
        setSuccessAutoHide(true);
        timerRef.current = setTimeout(() => {
          setVisible(false);
        }, 5000);
      }
    };

    // Poll for success (the EmailCapture sets sessionStorage on success)
    const interval = setInterval(checkSuccess, 500);

    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, successAutoHide]);

  // Exit intent detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Don't show if already submitted email
    if (sessionStorage.getItem('emailSubmitted') === 'true') return;

    // Don't show if already seen this session
    if (sessionStorage.getItem('exitIntentShown') === 'true') return;

    // Desktop only
    if (window.innerWidth < 768) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 50 && !triggered.current) {
        triggered.current = true;
        setVisible(true);
        sessionStorage.setItem('exitIntentShown', 'true');
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    // 3-second delay before listening
    const delayTimer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(delayTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    // Allow transition to complete before removing
    setTimeout(() => setVisible(false), 400);
  }, []);

  // Don't render on server or if never triggered
  if (typeof window === 'undefined') return null;
  if (!visible && !dismissed) return null;

  const isShowing = visible && !dismissed;

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        left: 0,
        right: 0,
        zIndex: 40,
        background: 'linear-gradient(135deg, rgba(139, 0, 21, 0.95), rgba(0, 0, 0, 0.95))',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(218, 165, 32, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        transform: isShowing ? 'translateY(0)' : 'translateY(-100%)',
        opacity: isShowing ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: isShowing ? 'all' as const : 'none' as const,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <EmailCapture variant="exit-intent" source="exit-intent" />

        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: '36px',
            height: '36px',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
