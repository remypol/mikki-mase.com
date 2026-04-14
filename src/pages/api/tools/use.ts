export const prerender = false;
import type { APIRoute } from 'astro';
import { incrementUsage } from '../../../lib/tool-access';

const FREE_CALCULATIONS_PER_DAY = 3;

export const POST: APIRoute = async ({ cookies }) => {
  const newCount = incrementUsage(cookies);
  const remaining = Math.max(0, FREE_CALCULATIONS_PER_DAY - newCount);
  return new Response(JSON.stringify({ remaining, blocked: remaining <= 0 }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
