/**
 * UserMenu — Header auth state display
 * Shows Sign In link or user name + Sign Out
 */

import { useAuth } from '../../hooks/useAuth';

export default function UserMenu() {
  const { user, loading, signOut } = useAuth();

  // Loading: render invisible placeholder to prevent layout shift
  if (loading) {
    return <div className="w-20 h-10" />;
  }

  // Not logged in: Sign In button
  if (!user) {
    return (
      <a
        href="/auth/login"
        className="inline-flex items-center justify-center font-bold text-white min-h-[40px] rounded-lg px-5 text-sm transition-all hover:brightness-110 active:scale-[0.98]"
        style={{ backgroundColor: '#A8001E' }}
      >
        Sign In
      </a>
    );
  }

  // Logged in: show name + sign out
  const displayName = user.user_metadata?.full_name
    || user.user_metadata?.name
    || user.email?.split('@')[0]
    || 'User';

  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <div className="flex items-center gap-3">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={displayName}
          className="w-8 h-8 rounded-full border border-[#3A3A3A]"
        />
      ) : (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ backgroundColor: '#2D2D2D', color: '#CFB53B', border: '1px solid #3A3A3A' }}
        >
          {displayName.charAt(0).toUpperCase()}
        </div>
      )}
      <span className="text-sm text-white truncate max-w-[100px] hidden lg:block">
        {displayName}
      </span>
      <button
        onClick={signOut}
        className="text-xs transition-colors hover:text-white"
        style={{ color: '#9A9A9A' }}
      >
        Sign Out
      </button>
    </div>
  );
}
