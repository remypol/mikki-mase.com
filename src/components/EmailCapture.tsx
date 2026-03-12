import { useState, useRef, useCallback, useEffect } from 'react';

// ============================================
// TYPES
// ============================================

interface EmailCaptureProps {
  variant: 'inline' | 'compact' | 'exit-intent';
  source: string;
  headline?: string;
  subheadline?: string;
  buttonText?: string;
  showNameField?: boolean;
  leadMagnet?: string;
}

type FormState = 'default' | 'loading' | 'success' | 'error-validation' | 'error-server';

// ============================================
// HELPERS
// ============================================

function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

// ============================================
// ICONS (inline SVG)
// ============================================

function ArrowIcon() {
  return (
    <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin w-5 h-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

// ============================================
// SUCCESS STATE
// ============================================

function SuccessMessage({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex ${compact ? 'flex-row items-center gap-3' : 'flex-col items-center gap-3 py-4'}`}>
      <CheckIcon />
      <div className={compact ? '' : 'text-center'}>
        <p className="text-white font-bold text-lg">Check your inbox!</p>
        {!compact && (
          <>
            <p className="text-gray-400 text-sm mt-1">Your cheat sheet is on its way.</p>
            <a
              href="/shop"
              className="inline-block mt-3 text-[#CFB53B] hover:text-[#e5cc5a] text-sm font-medium transition-colors"
            >
              Browse the full shop &rarr;
            </a>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// TRUST BADGES
// ============================================

function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-gray-500">
      <span className="flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Secure
      </span>
      <span className="flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        Instant delivery
      </span>
      <span className="flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        3,200+ members
      </span>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function EmailCapture({
  variant = 'inline',
  source,
  headline,
  subheadline,
  buttonText,
  showNameField = false,
  leadMagnet = 'blackjack-cheatsheet',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formState, setFormState] = useState<FormState>('default');
  const [errorMessage, setErrorMessage] = useState('');
  const [debouncing, setDebouncing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Check if already submitted this session
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('emailSubmitted') === 'true') {
      setFormState('success');
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Client-side validation
      if (!isValidEmail(email)) {
        setFormState('error-validation');
        setErrorMessage('Please enter a valid email');
        return;
      }

      // Debounce
      if (debouncing) return;
      setDebouncing(true);
      setTimeout(() => setDebouncing(false), 2000);

      setFormState('loading');
      setErrorMessage('');

      try {
        const utmParams = getUtmParams();

        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim(),
            name: name.trim() || undefined,
            source,
            leadMagnet,
            utmSource: utmParams.utm_source,
            utmMedium: utmParams.utm_medium,
            utmCampaign: utmParams.utm_campaign,
            honeypot,
          }),
        });

        const data = await res.json();

        if (data.success) {
          setFormState('success');
          sessionStorage.setItem('emailSubmitted', 'true');

          // GA4 event
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'generate_lead', {
              event_category: 'engagement',
              event_label: source,
              value: 1,
            });
          }
        } else {
          setFormState('error-server');
          setErrorMessage(data.error || 'Something went wrong. Please try again.');
        }
      } catch {
        setFormState('error-server');
        setErrorMessage('Something went wrong. Please try again.');
      }
    },
    [email, name, honeypot, source, leadMagnet, debouncing]
  );

  // ==========================================
  // INLINE VARIANT
  // ==========================================
  if (variant === 'inline') {
    return (
      <div className="bg-gray-900 border border-[#CFB53B]/30 rounded-2xl p-8 md:p-12">
        {formState === 'success' ? (
          <SuccessMessage />
        ) : (
          <>
            <p className="text-[#CFB53B] text-xs font-bold uppercase tracking-widest mb-3">
              FREE DOWNLOAD
            </p>
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-3">
              {headline || 'Get the Free Blackjack Cheat Sheet'}
            </h3>
            <p className="text-gray-400 mb-6">
              {subheadline || 'Join 3,200+ members. We\'ll send it instantly.'}
            </p>

            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              {/* Honeypot */}
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {showNameField && (
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white min-h-[48px] rounded-lg px-4 mb-3 placeholder:text-gray-500 focus:outline-none focus:border-[#CFB53B]/50 transition-colors"
                />
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formState === 'error-validation') setFormState('default');
                  }}
                  className={`flex-1 bg-gray-800 border text-white min-h-[48px] rounded-lg px-4 placeholder:text-gray-500 focus:outline-none focus:border-[#CFB53B]/50 transition-colors ${
                    formState === 'error-validation' ? 'border-red-500' : 'border-gray-700'
                  } ${formState === 'loading' ? 'opacity-70' : ''}`}
                  disabled={formState === 'loading'}
                  required
                />
                <button
                  type="submit"
                  disabled={formState === 'loading' || debouncing}
                  className="bg-[#A8001E] hover:bg-[#8B0018] text-white font-bold min-h-[48px] rounded-lg px-6 w-full sm:w-auto transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {formState === 'loading' ? (
                    <>
                      <SpinnerIcon />
                      Sending...
                    </>
                  ) : (
                    <>
                      {buttonText || 'SEND ME THE CHEAT SHEET'}
                      <ArrowIcon />
                    </>
                  )}
                </button>
              </div>

              {formState === 'error-validation' && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
              {formState === 'error-server' && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
            </form>

            <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-xs">
              <LockIcon />
              <span>No spam. Unsubscribe anytime.</span>
            </div>

            <TrustBadges />
          </>
        )}
      </div>
    );
  }

  // ==========================================
  // COMPACT VARIANT
  // ==========================================
  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-gray-900 to-gray-900/50 border-l-4 border-[#CFB53B] p-6 rounded-lg">
        {formState === 'success' ? (
          <SuccessMessage compact />
        ) : (
          <>
            <p className="text-[#CFB53B] text-xs font-bold uppercase tracking-widest mb-2">
              {'\u{1F4CB}'} FREE CHEAT SHEET
            </p>
            <p className="text-white font-bold mb-3">
              {headline || 'Get the Blackjack Strategy Card'}
            </p>

            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              {/* Honeypot */}
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formState === 'error-validation') setFormState('default');
                  }}
                  className={`flex-1 bg-gray-800 border text-white min-h-[48px] rounded-lg px-4 placeholder:text-gray-500 focus:outline-none focus:border-[#CFB53B]/50 transition-colors text-sm ${
                    formState === 'error-validation' ? 'border-red-500' : 'border-gray-700'
                  } ${formState === 'loading' ? 'opacity-70' : ''}`}
                  disabled={formState === 'loading'}
                  required
                />
                <button
                  type="submit"
                  disabled={formState === 'loading' || debouncing}
                  className="bg-[#A8001E] hover:bg-[#8B0018] text-white font-bold min-h-[48px] rounded-lg px-5 transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap text-sm"
                >
                  {formState === 'loading' ? (
                    <>
                      <SpinnerIcon />
                      Sending...
                    </>
                  ) : (
                    buttonText || 'SEND IT \u2192'
                  )}
                </button>
              </div>

              {formState === 'error-validation' && (
                <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
              )}
              {formState === 'error-server' && (
                <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
              )}
            </form>
          </>
        )}
      </div>
    );
  }

  // ==========================================
  // EXIT-INTENT VARIANT
  // ==========================================
  if (variant === 'exit-intent') {
    return (
      <div className="flex flex-wrap items-center gap-3">
        {formState === 'success' ? (
          <SuccessMessage compact />
        ) : (
          <>
            <p className="text-white text-sm font-medium whitespace-nowrap">
              {'\u{1F3B0}'} Before you go &mdash; grab the free Blackjack Cheat Sheet
            </p>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="flex items-center gap-2"
            >
              {/* Honeypot */}
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formState === 'error-validation') setFormState('default');
                }}
                className={`w-56 bg-gray-800/80 border text-white min-h-[40px] rounded-lg px-3 placeholder:text-gray-500 focus:outline-none focus:border-[#CFB53B]/50 transition-colors text-sm ${
                  formState === 'error-validation' ? 'border-red-500' : 'border-gray-700'
                } ${formState === 'loading' ? 'opacity-70' : ''}`}
                disabled={formState === 'loading'}
                required
              />
              <button
                type="submit"
                disabled={formState === 'loading' || debouncing}
                className="bg-[#A8001E] hover:bg-[#8B0018] text-white font-bold min-h-[40px] rounded-lg px-4 transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap text-sm"
              >
                {formState === 'loading' ? (
                  <>
                    <SpinnerIcon />
                  </>
                ) : (
                  'GET IT FREE'
                )}
              </button>
            </form>

            {(formState === 'error-validation' || formState === 'error-server') && (
              <p className="text-red-400 text-xs w-full">{errorMessage}</p>
            )}
          </>
        )}
      </div>
    );
  }

  return null;
}
