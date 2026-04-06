/**
 * AI Casino Strategy Advisor API
 * Tier-gated: Inner Circle (20/day) and Lifetime VIP (unlimited)
 * Uses Claude Haiku for cost efficiency.
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { getServerClient } from '../../lib/supabase';

const ANTHROPIC_API_KEY = import.meta.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `You are the Mikki Mase Casino Strategy AI Advisor. You help students apply the masterclass strategies to real casino situations. You know Mikki's system inside-out: bankroll management, session discipline, casino psychology, blackjack mastery, negotiation tactics, comp optimization, and the discount system.

Core knowledge from the masterclass:
- Session discipline: 30-45 minute sessions, strict win/loss limits, play big and fast then leave
- Bankroll management: never risk more than 5% of bankroll per session, separate casino money from life money
- Casino psychology: casinos manipulate via architecture, rewards, and social pressure — awareness is defense
- Blackjack: basic strategy, table selection, avoid CSMs, know when to split and double
- Side bets: 21+3 is the only side bet worth playing, avoid all insurance and "fun" bets
- Pai Gow Poker: face-up variant, bonus betting strategy, break-even main game while collecting bonuses
- Casino negotiation: find a host, leverage multi-casino play, never accept first offer
- Discount system: loss rebates of 10-20%, multi-casino arbitrage, negotiate theoretical vs actual loss
- Comps: comp slips vs charges, front money advantages, RFB packages, always ask for more

Rules:
- Answer based on Mikki's proven strategies only
- NEVER guarantee wins or specific outcomes — emphasize discipline, math, and strategy
- Keep responses concise (2-4 sentences) unless the question requires detail
- If asked about something outside the masterclass scope, redirect to relevant modules
- Be direct and confident — speak like a seasoned player sharing real knowledge
- Reference specific modules when relevant (e.g., "Module 7 covers this in depth")`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const DAILY_LIMIT_INNER_CIRCLE = 20;

export const POST: APIRoute = async ({ request, cookies }) => {
  const headers = { 'Content-Type': 'application/json' };

  if (!ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: 'AI Advisor not configured' }), { status: 503, headers });
  }

  try {
    const supabase = getServerClient(cookies, request);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
    }

    // Tier check: must have Inner Circle or Lifetime VIP
    const { data: purchases } = await supabase
      .from('purchases')
      .select('product_key')
      .eq('user_id', user.id)
      .in('product_key', ['inner-circle-yearly', 'lifetime-vip'])
      .eq('status', 'completed');

    let tier: string | null = null;

    if (purchases && purchases.length > 0) {
      // Determine highest tier
      const hasVip = purchases.some((p: any) => p.product_key === 'lifetime-vip');
      tier = hasVip ? 'lifetime-vip' : 'inner-circle';
    }

    if (!tier) {
      // Check subscriptions
      try {
        const { data: sub } = await supabase
          .from('subscriptions')
          .select('id, plan')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle();
        if (sub) tier = 'inner-circle';
      } catch { /* table might not exist */ }
    }

    if (!tier) {
      return new Response(
        JSON.stringify({ error: 'AI Advisor requires Inner Circle or Lifetime VIP', upgrade: true }),
        { status: 403, headers }
      );
    }

    // Rate limiting for Inner Circle (VIP = unlimited)
    if (tier === 'inner-circle') {
      try {
        const today = new Date().toISOString().split('T')[0];

        // Upsert today's usage row
        const { data: usage } = await supabase
          .from('ai_advisor_usage')
          .select('message_count')
          .eq('user_id', user.id)
          .eq('date', today)
          .maybeSingle();

        const currentCount = usage?.message_count || 0;

        if (currentCount >= DAILY_LIMIT_INNER_CIRCLE) {
          return new Response(
            JSON.stringify({
              error: `Daily limit reached (${DAILY_LIMIT_INNER_CIRCLE}/day). Upgrade to Lifetime VIP for unlimited access.`,
              limit_reached: true,
              count: currentCount,
              limit: DAILY_LIMIT_INNER_CIRCLE,
            }),
            { status: 429, headers }
          );
        }

        // Increment counter
        if (usage) {
          await supabase
            .from('ai_advisor_usage')
            .update({ message_count: currentCount + 1 })
            .eq('user_id', user.id)
            .eq('date', today);
        } else {
          await supabase
            .from('ai_advisor_usage')
            .insert({ user_id: user.id, date: today, message_count: 1 });
        }
      } catch {
        // If usage table doesn't exist, allow the request
      }
    }

    // Parse request
    const { message, history = [] } = await request.json() as {
      message: string;
      history: ChatMessage[];
    };

    if (!message || typeof message !== 'string' || message.length > 2000) {
      return new Response(JSON.stringify({ error: 'Invalid message' }), { status: 400, headers });
    }

    // Build messages with history (last 10 for context)
    const messages = [
      ...history.slice(-10).map((m: ChatMessage) => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const errorBody = await res.text();
      console.error('[AI Advisor] Anthropic error:', res.status, errorBody);
      return new Response(JSON.stringify({ error: 'AI service unavailable' }), { status: 502, headers });
    }

    const data = await res.json();
    const reply = data.content?.[0]?.text || 'Sorry, I couldn\'t generate a response. Please try again.';

    return new Response(JSON.stringify({ reply, tier }), { status: 200, headers });

  } catch (err: any) {
    if (err.name === 'AbortError') {
      return new Response(JSON.stringify({ error: 'Request timed out' }), { status: 504, headers });
    }
    console.error('[AI Advisor] Error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500, headers });
  }
};
