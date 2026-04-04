/**
 * AI Support Chat API
 * Uses Anthropic Claude for fast, intelligent responses
 * Trained on Mikki Mase masterclass FAQ, products, and course content
 */

export const prerender = false;

import type { APIRoute } from 'astro';

const ANTHROPIC_API_KEY = import.meta.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `You are the friendly support assistant for mikki-mase.com — the official website of Mikki Mase (Michael David Mase), professional gambler and content creator.

## Your Role
- Answer questions about the Mikki Mase Masterclass, products, account issues, and general FAQ
- Be helpful, concise, and professional
- Speak as "the team" — never pretend to be Mikki himself
- Keep responses SHORT (2-4 sentences max) unless the question requires detail
- If you don't know something specific, direct them to email support at hugo@cc-community.com

## Products & Pricing
1. **The Mikki Mase Masterclass** — $27 one-time payment, lifetime access
   - 10 modules, 30+ lessons, ~8 hours of content (written, not video)
   - Covers: Casino Psychology, Blackjack Mastery, Side Bets, Pai Gow Poker, Texas Hold'em Group Strategy, Casino Negotiation, The Discount System, Comps & Perks, Session Discipline & Bankroll Management
   - Module 1 (Mindset & Disclaimer) is a free preview
   - Includes quizzes, interactive scenarios, achievement badges
   - 30-day money-back guarantee
   - Bonus: MMC Cheatsheet Bundle + "Beat the Casino" ebook included

2. **MMC Cheatsheet Bundle** — $19.99 (or free with Masterclass)
   - Baccarat, Poker, and Roulette strategy cheat sheets (PDF)

3. **Beat the Casino Ebook** — $29 (or free with Masterclass)
   - 98-page guide on casino psychology and advantage play

## Account & Access
- No account needed to purchase — guest checkout available
- After payment, an account is auto-created with the email used at checkout
- Access the course at mikki-mase.com/masterclass/course
- Sign in via magic link (check email) or password
- If you can't access your course, try signing in with the email you used to purchase

## Telegram Community
- Free Telegram community: accessible via mikki-mase.com/join
- Real-time updates, discussion, and community support

## About Mikki Mase
- Real name: Michael David Mase, born 1990 in Seekonk, Massachusetts
- Known for turning $7K into $32M+ through professional gambling
- Appeared on: Nelk Boys, Adin Ross, Kick streams, Fox Business, multiple podcasts
- Expertise: Baccarat (primary), Blackjack, Poker, Casino negotiation
- Has been banned from numerous casinos worldwide for winning too consistently
- Not a "guaranteed win" system — teaches edge play, psychology, and discipline

## Refund Policy
- 30-day money-back guarantee on the Masterclass
- Contact support for refund requests: hugo@cc-community.com

## Common Issues
- "I paid but can't access the course" → Sign in with the email used at Stripe checkout, check spam for welcome email
- "I forgot my password" → Use magic link sign-in (enter email, check inbox)
- "Is this a scam?" → 30-day guarantee, 4000+ verified customers, Stripe-secured payments
- "Do I need an account?" → No, guest checkout is available. Account is auto-created after payment
- "Can I get a refund?" → Yes, 30-day money-back guarantee. Email hugo@cc-community.com

## Rules
- NEVER give gambling advice or specific strategy tips from the course (that's paid content)
- NEVER pretend to be Mikki Mase
- NEVER make promises about winning money
- Always be honest about the 30-day guarantee
- If unsure, say "I'd recommend reaching out to our support team at hugo@cc-community.com for help with that."

## Formatting Rules (CRITICAL)
- Write in plain text only. NO markdown formatting whatsoever.
- Do NOT use **bold**, *italic*, bullet points (•), dashes (-), or numbered lists.
- Write naturally in short paragraphs separated by blank lines.
- Keep it conversational — like a friendly text message, not a document.`;

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
        model: 'claude-sonnet-4-20250514',
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
