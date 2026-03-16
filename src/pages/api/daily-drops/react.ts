/**
 * POST /api/daily-drops/react — Toggle a reaction on a post
 * Body: { postId, reaction }
 *
 * If user already reacted with this type → removes it (toggle off)
 * If not → adds it (toggle on)
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { getServerClient } from '../../../lib/supabase';

const VALID_REACTIONS = ['fire', 'brain', 'money', 'clap', 'goat'] as const;

export const POST: APIRoute = async ({ request, cookies }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const supabase = getServerClient(cookies, request);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });

    const body = await request.json();
    const { postId, reaction } = body;

    if (!postId || !reaction || !VALID_REACTIONS.includes(reaction)) {
      return new Response(JSON.stringify({ error: 'Invalid postId or reaction' }), { status: 400, headers });
    }

    // Check if reaction already exists (.maybeSingle — no error when 0 rows)
    const { data: existing } = await supabase
      .from('daily_drops_reactions')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .eq('reaction', reaction)
      .maybeSingle();

    if (existing) {
      // Toggle off — remove reaction
      await supabase
        .from('daily_drops_reactions')
        .delete()
        .eq('id', existing.id);

      return new Response(JSON.stringify({ action: 'removed', reaction }), { status: 200, headers });
    } else {
      // Toggle on — add reaction
      const { error } = await supabase
        .from('daily_drops_reactions')
        .insert({
          post_id: postId,
          user_id: user.id,
          reaction,
        });

      if (error) {
        if (error.code === '23505') {
          // Unique constraint — already exists (race condition)
          return new Response(JSON.stringify({ action: 'already_exists', reaction }), { status: 200, headers });
        }
        throw error;
      }

      return new Response(JSON.stringify({ action: 'added', reaction }), { status: 200, headers });
    }
  } catch (err) {
    console.error('React error:', err);
    return new Response(JSON.stringify({ error: 'Failed to react' }), { status: 500, headers });
  }
};
