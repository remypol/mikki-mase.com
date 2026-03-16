/**
 * AuthForm — Login / Signup component
 * Email/Password authentication with tab switching
 */

import { useState, useEffect, useRef, type FormEvent } from 'react';
import { getBrowserClient } from '../../lib/supabase';

interface Props {
  redirectTo?: string;
}

type Tab = 'signin' | 'signup';

/** Validate redirect target — must be a safe internal path (no open redirect) */
function sanitizeRedirect(url?: string): string {
  if (!url) return '/masterclass/course';
  // Must start with / and NOT start with // (protocol-relative URL)
  if (url.startsWith('/') && !url.startsWith('//')) return url;
  return '/masterclass/course';
}

/** Map raw Supabase error messages to user-friendly copy */
function mapAuthError(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower.includes('invalid login credentials')) return 'Invalid email or password.';
  if (lower.includes('email not confirmed')) return 'Please check your inbox and confirm your email before signing in.';
  if (lower.includes('user already registered')) return 'An account with this email already exists. Try signing in instead.';
  if (lower.includes('password should be at least 6 characters')) return 'Password must be at least 6 characters.';
  return 'Something went wrong. Please try again.';
}

export default function AuthForm({ redirectTo }: Props) {
  const [tab, setTab] = useState<Tab>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Forgot password state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);

  // Resend verification email state
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);
  // Store signup email separately so resend uses the correct value
  const [signupEmail, setSignupEmail] = useState('');

  const safeRedirect = sanitizeRedirect(redirectTo);
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const callbackUrl = `${siteUrl}/api/auth/callback?next=${encodeURIComponent(safeRedirect)}`;
  // Email confirmation lands on /auth/verified which auto-picks up the session
  const signupRedirectUrl = `${siteUrl}/auth/verified`;

  // Manage resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [resendCooldown]);

  async function handleResendVerification() {
    if (resendCooldown > 0) return;
    setResendSuccess(false);
    try {
      const supabase = getBrowserClient();
      const { error: resendError } = await supabase.auth.resend({ type: 'signup', email: signupEmail || email, options: { emailRedirectTo: signupRedirectUrl } });
      if (resendError) throw resendError;
      setResendSuccess(true);
      setResendCooldown(60);
    } catch {
      // Silently handle — don't reveal account state
      setResendSuccess(true);
      setResendCooldown(60);
    }
  }

  async function handleForgotPassword(e: FormEvent) {
    e.preventDefault();
    setForgotError(null);
    setForgotLoading(true);

    try {
      const supabase = getBrowserClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        forgotEmail.trim(),
        { redirectTo: callbackUrl }
      );
      if (resetError) throw resetError;
      setForgotSuccess(true);
    } catch {
      // Always show success to avoid leaking account existence
      setForgotSuccess(true);
    } finally {
      setForgotLoading(false);
    }
  }

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const trimmedEmail = email.trim();

    try {
      const supabase = getBrowserClient();

      if (tab === 'signup') {
        const { error: signupError } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: {
            data: { full_name: fullName.trim() },
            emailRedirectTo: signupRedirectUrl,
          },
        });
        if (signupError) throw signupError;
        setSignupEmail(trimmedEmail);
        setEmailSent(true);
      } else {
        const { error: signinError } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });
        if (signinError) throw signinError;

        // Redirect on successful sign-in (sanitized to prevent open redirect)
        window.location.href = safeRedirect;
      }
    } catch (err: any) {
      setError(mapAuthError(err.message || ''));
    } finally {
      setLoading(false);
    }
  }

  // Forgot password view
  if (showForgotPassword) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">Reset Password</h1>
          <p className="text-[#BEBEBE] text-sm">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        {forgotSuccess ? (
          <div className="text-center">
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(207, 181, 59, 0.2)' }}
            >
              <svg className="w-8 h-8" style={{ color: '#CFB53B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Check your email</h2>
            <p className="text-[#BEBEBE]">
              If an account exists for <span className="text-white font-medium">{forgotEmail.trim()}</span>, you'll receive a password reset link shortly.
            </p>
            <button
              onClick={() => { setShowForgotPassword(false); setForgotSuccess(false); setForgotEmail(''); }}
              className="mt-6 text-sm hover:underline"
              style={{ color: '#CFB53B' }}
            >
              Back to sign in
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label htmlFor="forgotEmail" className="block text-sm text-[#BEBEBE] mb-1.5">
                  Email
                </label>
                <input
                  id="forgotEmail"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg px-4 py-3 text-white placeholder-[#6B6B6B] outline-none transition-colors focus:border-[#CFB53B]"
                  style={{ backgroundColor: '#1A1A1A', border: '1px solid #2D2D2D' }}
                />
              </div>

              {forgotError && (
                <div className="rounded-lg px-4 py-3 text-sm text-red-300" style={{ backgroundColor: 'rgba(168, 0, 30, 0.15)', border: '1px solid rgba(168, 0, 30, 0.3)' }}>
                  {forgotError}
                </div>
              )}

              <button
                type="submit"
                disabled={forgotLoading}
                className="w-full rounded-xl px-4 py-3.5 font-bold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
                style={{ backgroundColor: '#A8001E' }}
              >
                {forgotLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <button
              onClick={() => { setShowForgotPassword(false); setForgotError(null); setForgotEmail(''); }}
              className="mt-6 block mx-auto text-sm hover:underline"
              style={{ color: '#CFB53B' }}
            >
              Back to sign in
            </button>
          </>
        )}
      </div>
    );
  }

  if (emailSent) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <div
          className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(207, 181, 59, 0.2)' }}
        >
          <svg className="w-8 h-8" style={{ color: '#CFB53B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Check your email</h2>
        <p className="text-[#BEBEBE]">
          We sent a verification link to <span className="text-white font-medium">{email}</span>.
          Click the link to complete your sign-up.
        </p>
        <p className="text-[#9A9A9A] text-sm mt-3">
          Email sent from <span className="text-white">noreply@mikki-mase.com</span> — check your spam folder.
        </p>

        {/* Resend verification email */}
        <div className="mt-4">
          {resendSuccess && (
            <p className="text-sm mb-2" style={{ color: '#CFB53B' }}>
              Verification email resent.
            </p>
          )}
          <button
            onClick={handleResendVerification}
            disabled={resendCooldown > 0}
            className="text-sm hover:underline disabled:opacity-50 disabled:no-underline"
            style={{ color: resendCooldown > 0 ? '#6B6B6B' : '#CFB53B' }}
          >
            {resendCooldown > 0
              ? `Resend email (${resendCooldown}s)`
              : 'Resend email'
            }
          </button>
        </div>

        <button
          onClick={() => { setEmailSent(false); setTab('signin'); setResendCooldown(0); setResendSuccess(false); }}
          className="mt-6 text-sm hover:underline"
          style={{ color: '#CFB53B' }}
        >
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-white mb-2">
          {tab === 'signin' ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-[#BEBEBE] text-sm">
          {tab === 'signin'
            ? 'Sign in to access your masterclass'
            : 'Sign up to get started'
          }
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex rounded-lg overflow-hidden mb-6" style={{ border: '1px solid #2D2D2D' }}>
        <button
          onClick={() => { setTab('signin'); setError(null); }}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
            tab === 'signin' ? 'text-white' : 'text-[#6B6B6B] hover:text-[#BEBEBE]'
          }`}
          style={tab === 'signin' ? { backgroundColor: '#2D2D2D' } : {}}
        >
          Sign In
        </button>
        <button
          onClick={() => { setTab('signup'); setError(null); }}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
            tab === 'signup' ? 'text-white' : 'text-[#6B6B6B] hover:text-[#BEBEBE]'
          }`}
          style={tab === 'signup' ? { backgroundColor: '#2D2D2D' } : {}}
        >
          Sign Up
        </button>
      </div>

      {/* Email form */}
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        {tab === 'signup' && (
          <div>
            <label htmlFor="fullName" className="block text-sm text-[#BEBEBE] mb-1.5">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full rounded-lg px-4 py-3 text-white placeholder-[#6B6B6B] outline-none transition-colors focus:border-[#CFB53B]"
              style={{ backgroundColor: '#1A1A1A', border: '1px solid #2D2D2D' }}
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm text-[#BEBEBE] mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-lg px-4 py-3 text-white placeholder-[#6B6B6B] outline-none transition-colors focus:border-[#CFB53B]"
            style={{ backgroundColor: '#1A1A1A', border: '1px solid #2D2D2D' }}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm text-[#BEBEBE] mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={tab === 'signup' ? 'Min. 6 characters' : 'Your password'}
            required
            minLength={6}
            className="w-full rounded-lg px-4 py-3 text-white placeholder-[#6B6B6B] outline-none transition-colors focus:border-[#CFB53B]"
            style={{ backgroundColor: '#1A1A1A', border: '1px solid #2D2D2D' }}
          />
        </div>

        {/* Forgot password link (sign in tab only) */}
        {tab === 'signin' && (
          <div className="text-right -mt-1">
            <button
              type="button"
              onClick={() => { setShowForgotPassword(true); setForgotEmail(email); setError(null); }}
              className="text-xs hover:underline"
              style={{ color: '#CFB53B' }}
            >
              Forgot password?
            </button>
          </div>
        )}

        {error && (
          <div className="rounded-lg px-4 py-3 text-sm text-red-300" style={{ backgroundColor: 'rgba(168, 0, 30, 0.15)', border: '1px solid rgba(168, 0, 30, 0.3)' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl px-4 py-3.5 font-bold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
          style={{ backgroundColor: '#A8001E' }}
        >
          {loading ? 'Loading...' : tab === 'signin' ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-[#6B6B6B] text-xs mt-6">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
