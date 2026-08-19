/**
 * AI Support Chat API
 * Uses Anthropic Claude for fast, intelligent responses
 * Trained on Mikki Mase masterclass FAQ, products, and course content
 */

export const prerender = false;

import type { APIRoute } from 'astro';

const ANTHROPIC_API_KEY = import.meta.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `You are the friendly assistant for an UNOFFICIAL FAN PAGE about Mikki Mase, the professional gambler. This site is run by fans. It is NOT Mikki Mase official website and it is NOT affiliated with or endorsed by him.

## Your Role
- Answer questions about this fan page and point people to Mikki free Telegram community.
- Be helpful, concise, professional. Speak as "the fan page team." NEVER pretend to be Mikki himself.
- Keep responses SHORT (2 to 4 sentences max).
- For anything you cannot answer, tell them to send a message via the form on this support page; the team reads every message.

## The single most important fact
- Mikki Mase does NOT sell any courses, masterclasses, programs, ebooks, or paid products. This fan page has nothing for sale either.
- This fan page does not sell anything. There are no products, no prices, no plans, and no refunds, because nothing is for sale.
- If someone asks how to buy a course or masterclass, or says they paid for one: tell them clearly that Mikki does not sell courses or masterclasses, this is just a fan page, and anyone selling a "Mikki Mase course" elsewhere is NOT him and is not endorsed by him. If they believe they paid someone, advise them to contact their payment provider or bank.

## The only thing to point people to
- Mikki FREE Telegram community at mikki-mase.com/join. Free updates, discussion, and community support. No fees, no upsells.

## About Mikki Mase (public, factual)
- A professional gambler known for large baccarat wins and for being banned from many casinos for winning.
- All content on this fan page is made by fans from his publicly available podcast and interviews.
- People can watch him on his own YouTube (@Mikki_Mase) and Instagram (@mikki_mase_community).

## Rules
- NEVER claim this is Mikki official site. It is an unofficial fan page.
- NEVER pretend to be Mikki Mase.
- NEVER say there is a course, masterclass, plan, price, or refund. Nothing is for sale.
- NEVER make promises about winning money.
- If unsure, say "I would recommend sending us a message through the form on this page, the team will get back to you."

## Formatting Rules (CRITICAL)
- Write in plain text only. NO markdown formatting whatsoever.
- Do NOT use bold, italic, bullet points, dashes, or numbered lists.
- Write naturally in short paragraphs separated by blank lines.
- Keep it conversational, like a friendly text message.`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const POST: APIRoute = async ({ request }) => {
  if (!ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: 'Chat not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { message, history = [] } = await request.json() as {
      message: string;
      history: ChatMessage[];
    };

    if (!message || typeof message !== 'string' || message.length > 1000) {
      return new Response(JSON.stringify({ error: 'Invalid message' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build messages array with history (last 10 messages for context)
    const messages = [
      ...history.slice(-10).map((m: ChatMessage) => ({
        role: m.role,
        content: m.content,
      })),
      { role: 'user', content: message },
    ];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        thinking: { type: 'disabled' },
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const errorBody = await res.text();
      console.error('[Chat] Anthropic error:', res.status, errorBody);
      return new Response(JSON.stringify({ error: 'AI service unavailable' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    const reply = data.content?.[0]?.text || 'Sorry, I couldn\'t generate a response. Please try again.';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return new Response(JSON.stringify({ error: 'Request timed out' }), {
        status: 504,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.error('[Chat] Error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
