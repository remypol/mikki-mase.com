/**
 * Auth Callback — OAuth code exchange endpoint
 * Handles Supabase OAuth redirect with code → session exchange
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { getServerClient } from '../../../lib/supabase';

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') || '/masterclass/course';

  // Validate next param to prevent open redirect
  // Block: //, /\, protocol-relative URLs, and path traversal
  const DEFAULT_REDIRECT = '/masterclass/course';
  let safeNext = DEFAULT_REDIRECT;
  try {
    // Normalize and verify same-origin by constructing full URL
    const siteOrigin = url.origin;
    const resolved = new URL(next, siteOrigin);
    if (resolved.origin === siteOrigin && resolved.pathname.startsWith('/')) {
      safeNext = resolved.pathname + resolved.search;
    }
  } catch {
    // Malformed URL — use default
    safeNext = DEFAULT_REDIRECT;
  }

  if (code) {
    const supabase = getServerClient(cookies, request);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return redirect(safeNext);
    }

    console.error('Auth callback error:', error.message);
  }

  return redirect('/auth/login?error=auth_failed');
};
