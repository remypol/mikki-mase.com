/**
 * Email Subscription API Endpoint
 * Handles lead magnet email capture with honeypot, rate limiting, and Supabase upsert
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { generateDownloadToken, getDownloadUrl } from '../../lib/downloads';
import { sendLeadMagnetEmail } from '../../lib/resend';

// ============================================
// RATE LIMITING
// ============================================

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// Note: In serverless, the map resets between cold starts, so no cleanup needed.

// ============================================
// EMAIL VALIDATION
// ============================================

function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim().toLowerCase();
  // Must have @, valid format, and a domain with a dot
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(trimmed) && trimmed.length <= 254;
}

// ============================================
// HANDLER
// ============================================

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Content-Type': 'application/json' };

  try {
    // Parse body — handle both JSON and form-encoded submissions
    let body: any;
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      try {
        body = await request.json();
      } catch {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid request body.' }),
          { status: 400, headers }
        );
      }
    } else {
      // Handle URL-encoded form submissions (native form submit before React hydration)
      try {
        const formData = await request.formData();
        body = Object.fromEntries(formData.entries());
      } catch {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid request body.' }),
          { status: 400, headers }
        );
      }
    }

    const {
      email,
      name,
      source,
      leadMagnet,
      utmSource,
      utmMedium,
      utmCampaign,
      honeypot,
    } = body;

    // 1. Honeypot check — silently succeed to fool bots
    if (honeypot) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers }
      );
    }

    // 2. Validate email
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
        { status: 400, headers }
      );
    }

    // 3. Rate limit by IP
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Too many requests. Please try again in a minute.' }),
        { status: 429, headers }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const tags = source ? [source] : ['website'];

    // 4. Upsert into Supabase subscribers table
    const { error: dbError } = await supabase
      .from('subscribers')
      .upsert(
        {
          email: normalizedEmail,
          name: name || null,
          source: source || 'website',
          lead_magnet: leadMagnet || 'blackjack-cheatsheet',
          utm_source: utmSource || null,
          utm_medium: utmMedium || null,
          utm_campaign: utmCampaign || null,
          subscribed_at: new Date().toISOString(),
          tags,
        },
        {
          onConflict: 'email',
          // On conflict, merge tags and update metadata
        }
      );

    // If upsert succeeded, also merge tags for existing subscribers
    if (!dbError) {
      // Fetch existing tags to merge
      const { data: existing } = await supabase
        .from('subscribers')
        .select('tags')
        .eq('email', normalizedEmail)
        .single();

      if (existing?.tags) {
        const mergedTags = [...new Set([...existing.tags, ...tags])];
        await supabase
          .from('subscribers')
          .update({ tags: mergedTags })
          .eq('email', normalizedEmail);
      }
    }

    if (dbError) {
      console.error('Supabase upsert error:', JSON.stringify(dbError));
      return new Response(
        JSON.stringify({ success: false, error: 'Something went wrong. Please try again.' }),
        { status: 500, headers }
      );
    }

    // 5. Generate JWT download token
    const sessionId = crypto.randomUUID();
    const token = generateDownloadToken('blackjack-cheatsheet', normalizedEmail, sessionId);
    const downloadUrl = getDownloadUrl(token);

    // 6. Send welcome email with lead magnet
    const emailResult = await sendLeadMagnetEmail({
      customerEmail: normalizedEmail,
      customerName: name || undefined,
      downloadLink: downloadUrl,
    });

    if (!emailResult.success) {
      console.error('Email send error:', emailResult.error);
      // Still return success — subscriber was saved, email can be retried
    }

    // 7. Return success
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Subscribe endpoint error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Something went wrong. Please try again.' }),
      { status: 500, headers }
    );
  }
};
