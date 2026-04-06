/**
 * Vercel Cron Job — Process email sequences daily
 * Runs nurture + abandoned checkout sequences.
 *
 * Schedule: Every hour (catches 1hr abandoned + daily nurture)
 * Auth: Vercel Cron secret (CRON_SECRET env var)
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { getServiceClient } from '../../../lib/supabase';
import { processNurtureSequence, processAbandonedSequence } from '../../../lib/email-sequences';

export const GET: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  // Auth: Vercel Cron sends Authorization header with CRON_SECRET
  const cronSecret = import.meta.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
    }
  }

  const supabase = getServiceClient();

  try {
    const [nurture, abandoned] = await Promise.all([
      processNurtureSequence(supabase),
      processAbandonedSequence(supabase),
    ]);

    const result = {
      ok: true,
      timestamp: new Date().toISOString(),
      nurture,
      abandoned,
    };

    console.log('[Cron] Email sequences processed:', JSON.stringify(result));

    return new Response(JSON.stringify(result), { status: 200, headers });
  } catch (err: any) {
    console.error('[Cron] Email sequences error:', err);
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500, headers }
    );
  }
};
