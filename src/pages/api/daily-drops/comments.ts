/**
 * GET /api/daily-drops/comments?postId=xxx — List comments for a post
 * POST /api/daily-drops/comments — Add a comment
 * DELETE /api/daily-drops/comments?id=xxx — Delete own comment
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
    const postId = url.searchParams.get('postId');
    if (!postId) return new Response(JSON.stringify({ error: 'postId required' }), { status: 400, headers });

    const { data: comments, error } = await supabase
      .from('daily_drops_comments')
      .select(`
        id, content, created_at,
        user:profiles!daily_drops_comments_user_id_fkey(id, full_name, avatar_url, role)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Comments fetch error:', error);
      return new Response(JSON.stringify({ error: 'Failed to load comments' }), { status: 500, headers });
    }

    const transformed = (comments || []).map((c: any) => ({
      id: c.id,
      content: c.content,
      createdAt: c.created_at,
      isOwn: c.user?.id === user.id,
      author: {
        name: c.user?.full_name || 'Anonymous',
        avatar: c.user?.avatar_url,
        isAdmin: c.user?.role === 'admin',
      },
    }));

    return new Response(JSON.stringify({ comments: transformed }), { status: 200, headers });
  } catch (err) {
    console.error('Comments error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500, headers });
  }
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const supabase = getServerClient(cookies, request);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });

    const body = await request.json();
    const { postId, content } = body;

    if (!postId || !content?.trim()) {
      return new Response(JSON.stringify({ error: 'Post ID and content required' }), { status: 400, headers });
    }

    const trimmed = content.trim();
    if (trimmed.length > 2000) {
      return new Response(JSON.stringify({ error: 'Comment too long (max 2000 chars)' }), { status: 400, headers });
    }

    const { data: comment, error } = await supabase
      .from('daily_drops_comments')
      .insert({
        post_id: postId,
        user_id: user.id,
        content: trimmed,
      })
      .select(`
        id, content, created_at,
        user:profiles!daily_drops_comments_user_id_fkey(id, full_name, avatar_url, role)
      `)
      .single();

    if (error) {
      console.error('Create comment error:', error);
      return new Response(JSON.stringify({ error: 'Failed to post comment' }), { status: 500, headers });
    }

    return new Response(JSON.stringify({
      comment: {
        id: comment.id,
        content: comment.content,
        createdAt: comment.created_at,
        isOwn: true,
        author: {
          name: (comment as any).user?.full_name || 'You',
          avatar: (comment as any).user?.avatar_url,
          isAdmin: (comment as any).user?.role === 'admin',
        },
      },
    }), { status: 201, headers });
  } catch (err) {
    console.error('Create comment error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500, headers });
  }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const supabase = getServerClient(cookies, request);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });

    const url = new URL(request.url);
    const commentId = url.searchParams.get('id');
    if (!commentId) return new Response(JSON.stringify({ error: 'Comment ID required' }), { status: 400, headers });

    // RLS ensures user can only delete their own (or admin can delete any)
    // Use .select() to verify a row was actually deleted
    const { data: deleted, error } = await supabase
      .from('daily_drops_comments')
      .delete()
      .eq('id', commentId)
      .select('id');

    if (error) {
      console.error('Delete comment error:', error);
      return new Response(JSON.stringify({ error: 'Failed to delete comment' }), { status: 500, headers });
    }

    if (!deleted || deleted.length === 0) {
      return new Response(JSON.stringify({ error: 'Comment not found or not authorized' }), { status: 404, headers });
    }

    return new Response(JSON.stringify({ deleted: true }), { status: 200, headers });
  } catch (err) {
    console.error('Delete comment error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500, headers });
  }
};
