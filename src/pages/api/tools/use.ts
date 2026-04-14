export const prerender = false;
import type { APIRoute } from 'astro';
import { incrementUsage, getToolAccess } from '../../../lib/tool-access';

export const POST: APIRoute = async ({ cookies, request }) => {
  // Check current access level to determine the right limit
  const access = await getToolAccess(cookies, request);

  // If full access (Inner Circle), don't increment — just confirm
  if (access.hasFullAccess) {
    return new Response(JSON.stringify({ remaining: 999, blocked: false }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const newCount = incrementUsage(cookies);

  // Masterclass buyers get 25/day, anonymous get 3/day
  const limit = access.tier === 'masterclass' ? 25 : 3;
  const remaining = Math.max(0, limit - newCount);

  return new Response(JSON.stringify({ remaining, blocked: remaining <= 0 }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
