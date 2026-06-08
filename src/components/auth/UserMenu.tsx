/**
 * UserMenu — Header auth state display
 * Shows Sign In link or user name + Sign Out
 */

import { useAuth } from '../../hooks/useAuth';

export default function UserMenu() {
  const { user, loading, signOut } = useAuth();

  // Loading: render invisible placeholder to prevent layout shift
  if (loading) {
    return <div className="w-[11.5rem] h-10" />;
  }

  // Not logged in: Sign In ghost link + Join Telegram primary CTA
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <a
          href="/auth/login"
          className="text-sm font-medium text-white/80 hover:text-white transition-colors min-h-[40px] inline-flex items-center"
        >
          Sign in
        </a>
        <a
          href="/join"
          className="inline-flex items-center justify-center font-bold text-white min-h-[40px] rounded-lg px-5 text-sm transition-all hover:brightness-110 active:scale-[0.98] gap-2"
          style={{ backgroundColor: '#0088cc' }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          Join Fan Community
        </a>
      </div>
    );
  }

  // Logged in: show name + sign out
  const displayName = user.user_metadata?.full_name
    || user.user_metadata?.name
    || user.email?.split('@')[0]
    || 'User';

  const avatarUrl = user.user_metadata?.avatar_url;

  const initial = displayName.charAt(0).toUpperCase();

  // Post-audit fix: avatar is now a real link to /account, not a decorative div.
  // Gives a paying user a single in-product surface for logout / billing / cancel.
  return (
    <div className="flex items-center gap-3">
      <a
        href="/account"
        aria-label={`Account — signed in as ${displayName}`}
        className="group flex items-center gap-2 rounded-full px-1.5 py-1 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)]"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="w-8 h-8 rounded-full border border-[#3A3A3A] group-hover:border-[color:var(--color-gold)] transition-colors"
          />
        ) : (
          <span
            aria-hidden="true"
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold group-hover:border-[color:var(--color-gold)] transition-colors"
            style={{ backgroundColor: '#2D2D2D', color: '#CFB53B', border: '1px solid #3A3A3A' }}
          >
            {initial}
          </span>
        )}
        <span className="text-sm text-white truncate max-w-[100px] hidden lg:block">
          {displayName}
        </span>
      </a>
      <button
        type="button"
        onClick={signOut}
        className="text-xs transition-colors hover:text-white"
        style={{ color: '#9A9A9A' }}
      >
        Sign out
      </button>
    </div>
  );
}
