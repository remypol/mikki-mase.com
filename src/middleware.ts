/**
 * Astro Middleware — Server-side auth & purchase gating
 *
 * Only runs for pages with `prerender = false` (SSR).
 * Protects /masterclass/course/* routes (except free preview modules).
 */

import { defineMiddleware } from 'astro:middleware';
import { getServerClient } from './lib/supabase';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Only gate /masterclass/course/* routes
  if (!pathname.startsWith('/masterclass/course')) {
    return next();
  }

  // Parse module slug from URL
  // Pattern: /masterclass/course/{moduleSlug}/{lessonSlug}
  // Or:      /masterclass/course (dashboard)
  const segments = pathname.split('/').filter(Boolean);
  const moduleSlug = segments[2]; // 'mindset-disclaimer', etc.

  // Check if this is a free preview module
  if (moduleSlug) {
    try {
      const { courseManifest } = await import('./config/course/manifest');
      const mod = courseManifest.modules.find((m) => m.slug === moduleSlug);
      if (mod?.isFreePreview) {
        // Free preview modules are accessible without auth
        return next();
      }
    } catch {
      // If manifest import fails, continue with auth check
    }
  }

  // Verify Supabase session
  const supabase = getServerClient(context.cookies, context.request);
  const { data: { user } } = await supabase.auth.getUser();

  // Attach user to locals for downstream pages
  context.locals.user = user;
  context.locals.hasMasterclass = false;

  if (!user) {
    // Not authenticated — redirect to login
    const loginUrl = `/auth/login?next=${encodeURIComponent(pathname)}`;
    return context.redirect(loginUrl);
  }

  // Check for active masterclass purchase
  const { data: purchase, error: purchaseError } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_key', 'masterclass')
    .eq('status', 'completed')
    .limit(1)
    .single();

  // PGRST116 = no rows found (expected when user hasn't purchased)
  if (purchaseError && purchaseError.code !== 'PGRST116') {
    // Real DB error — don't deny access, show error page
    console.error('Purchase check DB error:', purchaseError);
    return new Response('Service temporarily unavailable. Please try again.', {
      status: 503,
      headers: { 'Retry-After': '5' },
    });
  }

  if (!purchase) {
    // Authenticated but no purchase — redirect to sales page
    return context.redirect('/masterclass?access=denied');
  }

  context.locals.hasMasterclass = true;

  // Set cache headers for protected pages
  const response = await next();
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  return response;
});
