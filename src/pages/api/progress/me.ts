/**
 * Course Progress API — cross-device sync for useCourseProgress
 *
 * GET  /api/progress/me  → returns current user's saved progress JSON (or {} if none)
 * PUT  /api/progress/me  → upserts the caller's progress row
 *
 * Scope: RLS-trusted; every call is scoped to the authenticated user via user_id.
 * Failsafe: if the `course_progress` table doesn't exist yet, both methods no-op
 *            gracefully so localStorage keeps working. The migration lives in
 *            `scripts/migration-course-progress.sql`.
 *
 * Cache: private/no-store — per-user data.
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { getServerClient } from '../../../lib/supabase';

const HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'private, no-store, no-cache, must-revalidate',
};

async function requireUser(cookies: any, request: Request) {
  const supabase = getServerClient(cookies, request);
  const { data: { user } } = await supabase.auth.getUser();
  return { supabase, user };
}

export const GET: APIRoute = async ({ cookies, request }) => {
  try {
    const { supabase, user } = await requireUser(cookies, request);
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }),
        { status: 401, headers: HEADERS },
      );
    }

    const { data, error } = await supabase
      .from('course_progress')
      .select('progress, updated_at')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      // Table missing or other error — fail open so localStorage owns state.
      if (error.code === '42P01' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        return new Response(
          JSON.stringify({ progress: null, remote: false, reason: 'table_missing' }),
          { status: 200, headers: HEADERS },
        );
      }
      console.error('[/api/progress/me] GET error:', error);
      return new Response(
        JSON.stringify({ progress: null, remote: false, reason: 'query_error' }),
        { status: 200, headers: HEADERS },
      );
    }

    return new Response(
      JSON.stringify({
        progress: data?.progress ?? null,
        updatedAt: data?.updated_at ?? null,
        remote: true,
      }),
      { status: 200, headers: HEADERS },
    );
  } catch (err) {
    console.error('[/api/progress/me] GET unexpected:', err);
    return new Response(
      JSON.stringify({ progress: null, remote: false, reason: 'exception' }),
      { status: 200, headers: HEADERS },
    );
  }
};

export const PUT: APIRoute = async ({ cookies, request }) => {
  try {
    const { supabase, user } = await requireUser(cookies, request);
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }),
        { status: 401, headers: HEADERS },
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers: HEADERS },
      );
    }

    // Hard size cap — protects against a compromised client spamming our table.
    // A reasonable progress blob is <5 KB in practice.
    const serialized = JSON.stringify(body?.progress ?? {});
    if (serialized.length > 32_000) {
      return new Response(
        JSON.stringify({ error: 'Progress payload too large' }),
        { status: 413, headers: HEADERS },
      );
    }

    const { error } = await supabase
      .from('course_progress')
      .upsert(
        {
          user_id: user.id,
          progress: body.progress ?? {},
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' },
      );

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        // Table missing — silently succeed so localStorage keeps working.
        return new Response(
          JSON.stringify({ ok: true, remote: false, reason: 'table_missing' }),
          { status: 200, headers: HEADERS },
        );
      }
      console.error('[/api/progress/me] PUT error:', error);
      return new Response(
        JSON.stringify({ ok: false, remote: false, reason: 'query_error' }),
        { status: 200, headers: HEADERS },
      );
    }

    return new Response(
      JSON.stringify({ ok: true, remote: true }),
      { status: 200, headers: HEADERS },
    );
  } catch (err) {
    console.error('[/api/progress/me] PUT unexpected:', err);
    return new Response(
      JSON.stringify({ ok: false, remote: false, reason: 'exception' }),
      { status: 200, headers: HEADERS },
    );
  }
};
