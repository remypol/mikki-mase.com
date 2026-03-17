/**
 * Support Email API
 * Sends support form submissions to hugo@cc-community.com via Resend
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { sendEmail } from '../../../lib/resend';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message } = await request.json() as {
      name: string;
      email: string;
      message: string;
    };

    // Validate
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (message.length > 5000) {
      return new Response(JSON.stringify({ error: 'Message too long' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #111; color: #fff;">
  <div style="background: #1a1a1a; border-radius: 12px; padding: 32px; border: 1px solid #333;">
    <h2 style="color: #CFB53B; margin: 0 0 24px; font-size: 20px;">New Support Request</h2>

    <div style="margin-bottom: 16px;">
      <strong style="color: #999; font-size: 12px; text-transform: uppercase;">Name</strong>
      <p style="margin: 4px 0 0; color: #fff;">${escHtml(name)}</p>
    </div>

    <div style="margin-bottom: 16px;">
      <strong style="color: #999; font-size: 12px; text-transform: uppercase;">Email</strong>
      <p style="margin: 4px 0 0; color: #fff;"><a href="mailto:${escHtml(email)}" style="color: #CFB53B;">${escHtml(email)}</a></p>
    </div>

    <div style="margin-bottom: 0;">
      <strong style="color: #999; font-size: 12px; text-transform: uppercase;">Message</strong>
      <p style="margin: 4px 0 0; color: #fff; white-space: pre-wrap; line-height: 1.6;">${escHtml(message)}</p>
    </div>
  </div>

  <p style="color: #666; font-size: 12px; text-align: center; margin-top: 16px;">
    Sent from mikki-mase.com support widget
  </p>
</body>
</html>`;

    const result = await sendEmail({
      to: 'hugo@cc-community.com',
      subject: `[Support] ${name} — ${message.slice(0, 60)}${message.length > 60 ? '...' : ''}`,
      html,
      text: `Support Request\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    if (!result.success) {
      console.error('[Support] Email failed:', result.error);
      return new Response(JSON.stringify({ error: 'Failed to send message' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[Support] Error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
