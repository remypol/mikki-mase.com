/**
 * Live Activity Notifications → Telegram
 *
 * Lightweight endpoint for real-time user activity tracking.
 * Fires non-blocking Telegram messages for key funnel events.
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const { event, email, detail } = await request.json();

    const config = EVENTS[event];
    if (!config) {
      return new Response('Unknown event', { status: 400 });
    }

    const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
    const chatIds = (import.meta.env.TELEGRAM_CHAT_IDS || import.meta.env.TELEGRAM_CHAT_ID || '')
      .split(',').map((id: string) => id.trim()).filter(Boolean);

    if (!botToken || chatIds.length === 0) {
      return new Response('OK', { status: 200 });
    }

    const emailLine = email ? `\n📧 ${escHtml(email)}` : '';
    const detailLine = detail ? `\n📝 ${escHtml(detail)}` : '';

    const message = `${config.emoji} <b>${config.label}</b>${emailLine}${detailLine}`;

    // Fire and forget — don't block the response
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    for (const chatId of chatIds) {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
          disable_notification: true,
          disable_web_page_preview: true,
        }),
      }).catch(() => {});
    }

    return new Response('OK', { status: 200 });
  } catch {
    return new Response('OK', { status: 200 });
  }
};

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
