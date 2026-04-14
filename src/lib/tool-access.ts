/**
 * Tool Access Gating
 * Centralized helper for checking tool access across all calculator pages.
 *
 * - Inner Circle / Lifetime VIP subscribers: unlimited access
 * - Everyone else: 3 free calculations per day (tracked via signed cookie)
 */

import { getServerClient } from './supabase';
import { getHighestTier, hasInnerCircleAccess, type UserTier } from './tiers';
import type { AstroCookies } from 'astro';

const ANON_CALCULATIONS_PER_DAY = 3;     // Not logged in / no purchase
const MASTERCLASS_CALCULATIONS_PER_DAY = 25; // Paid $27 masterclass
// Inner Circle / Lifetime VIP = unlimited (no limit)
const COOKIE_NAME = 'tool_usage';
const COOKIE_MAX_AGE = 86400; // 24 hours

export interface ToolAccessResult {
  hasFullAccess: boolean;
  remainingFree: number;
  tier: UserTier | null;
  isAuthenticated: boolean;
}

export async function getToolAccess(
  cookies: AstroCookies,
  request: Request
): Promise<ToolAccessResult> {
  // Check auth
  const supabase = getServerClient(cookies, request);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Anonymous user — 3 free per day
    const usage = getUsageFromCookie(cookies);
    return {
      hasFullAccess: false,
      remainingFree: Math.max(0, ANON_CALCULATIONS_PER_DAY - usage),
      tier: null,
      isAuthenticated: false,
    };
  }

  // Authenticated — check tier
  const { data: purchases } = await supabase
    .from('purchases')
    .select('product_key')
    .eq('user_id', user.id)
    .eq('status', 'completed');

  const productKeys = (purchases || []).map((p: any) => p.product_key);

  // Also check subscriptions
  try {
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('plan')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .limit(1)
      .maybeSingle();

    if (sub) {
      if (sub.plan === 'monthly') productKeys.push('inner-circle-monthly');
      if (sub.plan === 'yearly') productKeys.push('inner-circle-yearly');
    }
  } catch { /* table may not exist */ }

  const tier = getHighestTier(productKeys);
  const hasFullAccess = tier ? hasInnerCircleAccess(tier) : false;

  if (hasFullAccess) {
    return { hasFullAccess: true, remainingFree: 999, tier, isAuthenticated: true };
  }

  // Authenticated: masterclass buyers get 25/day, others get 3/day
  const dailyLimit = tier === 'masterclass' ? MASTERCLASS_CALCULATIONS_PER_DAY : ANON_CALCULATIONS_PER_DAY;
  const usage = getUsageFromCookie(cookies);
  return {
    hasFullAccess: false,
    remainingFree: Math.max(0, dailyLimit - usage),
    tier,
    isAuthenticated: true,
  };
}

function getUsageFromCookie(cookies: AstroCookies): number {
  const raw = cookies.get(COOKIE_NAME)?.value;
  if (!raw) return 0;
  try {
    const data = JSON.parse(raw);
    // Check if same day
    const today = new Date().toISOString().slice(0, 10);
    if (data.date !== today) return 0;
    return data.count || 0;
  } catch {
    return 0;
  }
}

/**
 * Increment usage count. Call this from an API endpoint when a calculation is performed.
 */
export function incrementUsage(cookies: AstroCookies): number {
  const today = new Date().toISOString().slice(0, 10);
  const currentUsage = getUsageFromCookie(cookies);
  const newCount = currentUsage + 1;
  cookies.set(COOKIE_NAME, JSON.stringify({ date: today, count: newCount }), {
    path: '/',
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
  return newCount;
}
