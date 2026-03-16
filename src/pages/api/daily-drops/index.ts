/**
 * GET /api/daily-drops — List posts with reactions & comment counts
 * POST /api/daily-drops — Create a new post (admin only)
 *
 * Query params: ?page=1&limit=10&category=insight
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { getServerClient } from '../../../lib/supabase';

export const GET: APIRoute = async ({ request, cookies }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'private, no-store',
  };

  try {
    const supabase = getServerClient(cookies, request);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });

    const url = new URL(request.url);
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') || '10')));
    const category = url.searchParams.get('category');
    const offset = (page - 1) * limit;

    // Build query
    let query = supabase
      .from('daily_drops')
      .select(`
        *,
        author:profiles!daily_drops_author_id_fkey(full_name, avatar_url, role),
        reactions:daily_drops_reactions(reaction, user_id),
        comments:daily_drops_comments(count)
      `, { count: 'exact' })
      .order('pinned', { ascending: false })
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq('category', category);
    }

    const { data: posts, error, count } = await query;

    if (error) {
      console.error('Daily drops fetch error:', error);
      return new Response(JSON.stringify({ error: 'Failed to load posts' }), { status: 500, headers });
    }

    // Transform posts: aggregate reactions and add user's own reactions
    const transformed = (posts || []).map((post: any) => {
      const reactionCounts: Record<string, number> = {};
      const userReactions: string[] = [];

      for (const r of post.reactions || []) {
        reactionCounts[r.reaction] = (reactionCounts[r.reaction] || 0) + 1;
        if (r.user_id === user.id) {
          userReactions.push(r.reaction);
        }
      }

      return {
        id: post.id,
        title: post.title,
        content: post.content,
        category: post.category,
        pinned: post.pinned,
        published_at: post.published_at,
        author: {
          name: post.author?.full_name || 'Mikki Mase',
          avatar: post.author?.avatar_url,
          isAdmin: post.author?.role === 'admin',
        },
        reactions: reactionCounts,
        userReactions,
        commentCount: post.comments?.[0]?.count || 0,
      };
    });

    return new Response(JSON.stringify({
      posts: transformed,
      page,
      limit,
      total: count || 0,
      hasMore: (count || 0) > offset + limit,
    }), { status: 200, headers });
  } catch (err) {
    console.error('Daily drops error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500, headers });
  }
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const supabase = getServerClient(cookies, request);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });

    // Check admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers });
    }

    const body = await request.json();
    const { title, content, category } = body;

    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Title and content required' }), { status: 400, headers });
    }

    const { data: post, error } = await supabase
      .from('daily_drops')
      .insert({
        author_id: user.id,
        title: title.trim(),
        content: content.trim(),
        category: category || 'insight',
      })
      .select()
      .single();

    if (error) {
      console.error('Create post error:', error);
      return new Response(JSON.stringify({ error: 'Failed to create post' }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ post }), { status: 201, headers });
  } catch (err) {
    console.error('Create post error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500, headers });
  }
};
