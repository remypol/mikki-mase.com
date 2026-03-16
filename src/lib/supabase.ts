/**
 * Supabase Client Helpers
 *
 * Three client types for different contexts:
 * 1. getServiceClient()  — Server-only, bypasses RLS (webhooks, admin)
 * 2. getServerClient()   — SSR pages/middleware, reads cookies, respects RLS
 * 3. getBrowserClient()  — React islands, client-side auth
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { createServerClient, createBrowserClient } from '@supabase/ssr';
import type { AstroCookies } from 'astro';

// ============================================
// 1. SERVICE CLIENT (server-only, admin ops)
// ============================================

let _serviceClient: SupabaseClient | null = null;

/**
 * Server-only admin client using service role key.
 * Bypasses RLS — use for webhooks, admin operations.
 * NEVER import this in client-side code.
 */
export function getServiceClient(): SupabaseClient {
  if (_serviceClient) return _serviceClient;

  const url = import.meta.env.SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  _serviceClient = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return _serviceClient;
}

// ============================================
// 2. SERVER CLIENT (SSR, cookie-based session)
// ============================================

/**
 * Per-request SSR client that reads/writes Supabase session cookies.
 * Respects RLS based on the logged-in user.
 * Use in Astro page frontmatter, middleware, and API routes.
 *
 * @param cookies - Astro.cookies (for writing response cookies)
 * @param request - Astro.request (for reading request cookies)
 */
export function getServerClient(cookies: AstroCookies, request?: Request) {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY');
  }

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        // Read cookies from the incoming request header
        const cookieHeader = request?.headers?.get('cookie') ?? '';
        if (!cookieHeader) return [];
        return cookieHeader.split(';').map((c) => {
          const [name, ...rest] = c.trim().split('=');
          return { name: name || '', value: rest.join('=') };
        }).filter((c) => c.name);
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookies.set(name, value, {
            path: '/',
            secure: import.meta.env.PROD, // Allow HTTP on localhost
            httpOnly: true,
            sameSite: 'lax',
            ...options, // Respect Supabase-provided options (expiry, etc.)
          });
        });
      },
    },
  });
}

// ============================================
// 3. BROWSER CLIENT (React islands)
// ============================================

let _browserClient: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Singleton browser client for React islands.
 * Uses anon key — never has access to service role.
 */
export function getBrowserClient() {
  if (_browserClient) return _browserClient;

  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY');
  }

  _browserClient = createBrowserClient(url, anonKey);
  return _browserClient;
}
