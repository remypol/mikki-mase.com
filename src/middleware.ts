/**
 * Astro Middleware — Server-side auth, purchase gating & tier resolution
 *
 * Only runs for pages with `prerender = false` (SSR).
 * Protects /masterclass/course/* routes (except free preview modules).
 * Resolves user tier: masterclass | inner-circle | lifetime-vip
 */

import { defineMiddleware } from 'astro:middleware';
import { getServerClient } from './lib/supabase';
import { getHighestTier, ALL_ENTITLEMENT_KEYS, type UserTier } from './lib/tiers';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Only gate /masterclass/course/* routes
  if (!pathname.startsWith('/masterclass/course')) {
    return next();
  }

  // Parse module slug from URL
  const segments = pathname.split('/').filter(Boolean);
  const moduleSlug = segments[2];

  // Check if this is a free preview module
  if (moduleSlug) {
    try {
      const { courseManifest } = await import('./config/course/manifest');
      const mod = courseManifest.modules.find((m) => m.slug === moduleSlug);
      if (mod?.isFreePreview) {
        return next();
      }
    } catch {
      // If manifest import fails, continue with auth check
    }
  }

  // Verify Supabase session
  const supabase = getServerClient(context.cookies, context.request);
  const { data: { user } } = await supabase.auth.getUser();

  // Defaults
  context.locals.user = user;
  context.locals.hasMasterclass = false;
  context.locals.tier = undefined;

  if (!user) {
    const loginUrl = `/auth/login?next=${encodeURIComponent(pathname)}`;
    return context.redirect(loginUrl);
  }

  // Check for purchases (returns all matching tiers)
  const { data: purchases, error: purchaseError } = await supabase
    .from('purchases')
    .select('id, product_key')
    .eq('user_id', user.id)
    .in('product_key', [...ALL_ENTITLEMENT_KEYS])
    .eq('status', 'completed');

  if (purchaseError && purchaseError.code !== 'PGRST116') {
    console.error('Purchase check DB error:', purchaseError);
    return new Response('Service temporarily unavailable. Please try again.', {
      status: 503,
      headers: { 'Retry-After': '5' },
    });
  }

  // Collect all product keys from purchases
  const productKeys: string[] = (purchases || []).map((p: any) => p.product_key);

  // Also check active subscriptions (monthly Inner Circle)
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('id, plan')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .limit(1)
      .maybeSingle();

    if (subscription) {
      // Map subscription plan to product key
      if (subscription.plan === 'monthly') productKeys.push('inner-circle-monthly');
      if (subscription.plan === 'yearly') productKeys.push('inner-circle-yearly');
      if (subscription.plan === 'lifetime') productKeys.push('lifetime-vip');
    }
  } catch {
    // subscriptions table might not exist yet — skip
  }

  if (productKeys.length === 0) {
    return context.redirect('/masterclass?access=denied');
  }

  // Resolve highest tier (fail closed: null = no valid tier)
  const tier = getHighestTier(productKeys);

  if (!tier) {
    return context.redirect('/masterclass?access=denied');
  }

  context.locals.hasMasterclass = true;
  context.locals.tier = tier;

  const response = await next();
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  return response;
});
