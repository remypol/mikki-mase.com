/**
 * POST /api/checkout/wheel-complete
 * Sets httpOnly cookie proving wheel was spun. Required for $27 pricing.
 * Protected with Origin check + Content-Type validation (same as create-intent).
 */

export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies, request }) => {
  const headers = { 'Content-Type': 'application/json' };

  // CSRF: verify origin (same checks as create-intent)
  const origin = request.headers.get('origin');
  const siteUrl = import.meta.env.SITE_URL || 'https://www.mikki-mase.com';
  const allowedOrigins = new Set([
    new URL(siteUrl).origin,
    'https://www.mikki-mase.com',
    'https://mikki-mase.com',
    ...(import.meta.env.DEV ? ['http://localhost:4321', 'http://localhost:3000'] : []),
  ]);

  if (!origin || !allowedOrigins.has(origin)) {
    return new Response(
      JSON.stringify({ error: 'Invalid or missing origin' }),
      { status: 403, headers }
    );
  }

  // Verify Content-Type
  const contentType = request.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    return new Response(
      JSON.stringify({ error: 'Content-Type must be application/json' }),
      { status: 400, headers }
    );
  }

  // Verify this user is assigned to variant B
  const abVariant = cookies.get('ab_variant')?.value;
  if (abVariant !== 'B') {
    return new Response(
      JSON.stringify({ error: 'Not eligible for wheel discount' }),
      { status: 403, headers }
    );
  }

  // Set wheel eligibility cookie (httpOnly, 1 hour expiry)
  cookies.set('wheel_eligible', 'true', {
    path: '/',
    httpOnly: true,
    secure: !import.meta.env.DEV,
    sameSite: 'lax',
    maxAge: 60 * 60, // 1 hour
  });

  return new Response(
    JSON.stringify({ ok: true }),
    { status: 200, headers }
  );
};
