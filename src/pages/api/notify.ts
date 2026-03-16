/**
 * Live Activity Notifications → Telegram DM
 *
 * Lightweight endpoint for real-time user activity tracking.
 * Sends to Hugo's personal chat only (no group spam).
 */

export const prerender = false;

import type { APIRoute } from 'astro';

const EVENTS: Record<string, { emoji: string; label: string }> = {
  signup:         { emoji: '🆕', label: 'New Signup' },
  cta_click:      { emoji: '👆', label: 'CTA Clicked' },
  checkout_start: { emoji: '💳', label: 'Checkout Started' },
  free_module:    { emoji: '🎓', label: 'Free Module Started' },
  page_view:      { emoji: '👀', label: 'Masterclass Viewed' },
};

// Hugo's personal chat only — no group chat
const CHAT_ID = '1682809817';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { event, email, detail } = await request.json();

    const config = EVENTS[event];
    if (!config) {
      return new Response('Unknown event', { status: 400 });
    }

    const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      return new Response('OK', { status: 200 });
    }

    const emailLine = email ? `\n📧 ${escHtml(email)}` : '';
    const detailLine = detail ? `\n📝 ${escHtml(detail)}` : '';
    const message = `${config.emoji} <b>${config.label}</b>${emailLine}${detailLine}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Await the fetch so it actually completes before the response ends
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
          disable_notification: false,
          disable_web_page_preview: true,
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error('[Notify] Telegram error:', res.status, body);
      }
    } catch (err) {
      console.error('[Notify] Telegram fetch failed:', err);
    }

    return new Response('OK', { status: 200 });
  } catch {
    return new Response('OK', { status: 200 });
  }
};

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
