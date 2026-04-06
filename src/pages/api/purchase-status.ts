/**
 * Purchase Status API
 * Returns auth + purchase state for the current user
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { getServerClient } from '../../lib/supabase';

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
        JSON.stringify({ authenticated: false, purchased: false }),
        { status: 200, headers }
      );
    }

    // Check for active masterclass purchase (any tier)
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .select('id, product_key, created_at')
      .eq('user_id', user.id)
      .in('product_key', ['masterclass', 'inner-circle-monthly', 'inner-circle-yearly', 'lifetime-vip'])
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (purchaseError && purchaseError.code !== 'PGRST116') {
      console.error('Purchase status DB error:', purchaseError);
      return new Response(
        JSON.stringify({ authenticated: true, purchased: false, error: 'Service temporarily unavailable' }),
        { status: 503, headers }
      );
    }

    // Also check active subscriptions
    let hasSubscription = false;
    if (!purchase) {
      try {
        const { data: sub } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle();
        if (sub) hasSubscription = true;
      } catch { /* table might not exist */ }
    }

    return new Response(
      JSON.stringify({
        authenticated: true,
        purchased: !!purchase || hasSubscription,
        user: {
          email: user.email,
          name: user.user_metadata?.full_name || user.user_metadata?.name || null,
          avatar: user.user_metadata?.avatar_url || null,
        },
      }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error('Purchase status check error:', err);
    return new Response(
      JSON.stringify({ authenticated: false, purchased: false, error: 'Internal error' }),
      { status: 500, headers }
    );
  }
};
