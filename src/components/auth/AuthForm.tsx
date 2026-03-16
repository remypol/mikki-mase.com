/**
 * AuthForm — Login / Signup component
 * Email/Password authentication with tab switching
 */

import { useState, type FormEvent } from 'react';
import { getBrowserClient } from '../../lib/supabase';

interface Props {
  redirectTo?: string;
}

type Tab = 'signin' | 'signup';

export default function AuthForm({ redirectTo }: Props) {
  const [tab, setTab] = useState<Tab>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const callbackUrl = `${siteUrl}/api/auth/callback${redirectTo ? `?next=${encodeURIComponent(redirectTo)}` : ''}`;

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = getBrowserClient();

      if (tab === 'signup') {
        const { error: signupError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: callbackUrl,
          },
        });
        if (signupError) throw signupError;
        setEmailSent(true);
      } else {
        const { error: signinError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signinError) throw signinError;

        // Redirect on successful sign-in
        window.location.href = redirectTo || '/masterclass/course';
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
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
        <button
          onClick={() => { setEmailSent(false); setTab('signin'); }}
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
