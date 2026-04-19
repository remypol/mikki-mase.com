/**
 * Account Me API
 * Returns the signed-in user's tier + purchase history for the /account page.
 *
 * Scope: returns ONLY what the user already knows/owns. No admin fields.
 * Cache: private/no-store — this is per-user.
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { getServerClient } from '../../../lib/supabase';
import {
  ALL_ENTITLEMENT_KEYS,
  getHighestTier,
  TIER_LABELS,
  type UserTier,
} from '../../../lib/tiers';

// GPT 5.4 MEDIUM fix: we intentionally do NOT surface stripe_session_id.
// It's an internal payment identifier with no product-surface need; leaking it
// to the client expands attack/correlation surface for zero benefit.
interface PurchaseRow {
  id: string;
  product_key: string;
  amount_total: number | null;
  currency: string | null;
  status: string | null;
  created_at: string;
}

export const GET: APIRoute = async ({ cookies, request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'private, no-store, no-cache, must-revalidate',
  };

  try {
    const supabase = getServerClient(cookies, request);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }),
        { status: 401, headers },
      );
    }

    // Pull the user's own purchases. RLS policies should already scope by user_id,
    // but we filter explicitly as a defence-in-depth measure.
    const { data: rawPurchases, error } = await supabase
      .from('purchases')
      .select('id, product_key, amount_total, currency, status, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[/api/account/me] purchases query error:', error);
      return new Response(
        JSON.stringify({ error: 'Could not load account' }),
        { status: 503, headers },
      );
    }

    const purchases: PurchaseRow[] = (rawPurchases || []) as PurchaseRow[];

    const completedKeys = purchases
      .filter((p) => p.status === 'completed')
      .map((p) => p.product_key);

    const tier: UserTier | null = getHighestTier(completedKeys);
    const tierLabel = tier ? TIER_LABELS[tier] : null;

    return new Response(
      JSON.stringify({
        email: user.email ?? null,
        tier,
        tierLabel,
        purchases,
      }),
      { status: 200, headers },
    );
  } catch (err) {
    console.error('[/api/account/me] unexpected:', err);
    return new Response(
      JSON.stringify({ error: 'Internal error' }),
      { status: 500, headers },
    );
  }
};
