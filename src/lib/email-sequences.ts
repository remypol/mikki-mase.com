/**
 * Email Sequence Engine
 * Handles post-purchase nurture, abandoned checkout recovery, and win-back emails.
 *
 * TWO SYSTEMS:
 * 1. Legacy step-based sequences (NURTURE_STEPS, ABANDONED_STEPS) — called by Vercel Cron
 * 2. New state-machine sequences (SequenceManager) — Supabase email_flow_state table
 *
 * Sequences (legacy):
 * - nurture: Day 1, 3, 7, 14, 30 after purchase
 * - abandoned: 1hr, Day 1, Day 3 after checkout start without completion
 *
 * Sequences (new):
 * - activation: Post-Playbook-purchase welcome + Day 1 nudge
 * - masterclass_upsell: Day 7 upsell for Playbook buyers who haven't upgraded
 * - inner_circle: Future inner circle upsell (placeholder)
 * - abandoned: 3-step recovery (1hr, 24hr, 72hr) via new sendAbandonedCheckout
 *
 * Called by Vercel Cron (/api/cron/email-sequences)
 */

import { sendEmail } from './resend';
import {
  sendPlaybookWelcome,
  sendActivationNudge,
  sendMasterclassUpsell,
  sendAbandonedCheckout,
} from './resend';
import { getServiceClient } from './supabase';

// ============================================
// NURTURE SEQUENCE (post-purchase, legacy)
// ============================================

interface NurtureStep {
  step: number;
  daysAfterPurchase: number;
  subject: string;
  getHtml: (name: string, tier: string) => string;
  getText: (name: string, tier: string) => string;
}

const BASE_URL = 'https://www.mikki-mase.com';

function emailWrapper(content: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" style="width:100%;border-collapse:collapse;"><tr><td align="center" style="padding:40px 20px;">
<table role="presentation" style="max-width:600px;width:100%;border-collapse:collapse;">
<tr><td style="padding:40px 40px 20px;text-align:center;"><h1 style="margin:0;color:#CFB53B;font-size:28px;font-weight:900;letter-spacing:2px;">MIKKI MASE</h1></td></tr>
<tr><td style="background:linear-gradient(135deg,#1a1a1a 0%,#0a0a0a 100%);border-radius:16px;padding:40px;border:1px solid #333;">
${content}
</td></tr>
<tr><td style="padding:30px 40px;text-align:center;"><p style="margin:0;color:#333;font-size:12px;">&copy; 2026 Mikki Mase. All rights reserved.<br><a href="${BASE_URL}/unsubscribe" style="color:#555;text-decoration:underline;font-size:11px;">Unsubscribe</a></p></td></tr>
</table></td></tr></table></body></html>`;
}

function cta(text: string, url: string): string {
  return `<table role="presentation" style="width:100%;border-collapse:collapse;"><tr><td align="center" style="padding:20px 0;">
<a href="${url}" style="display:inline-block;background:#CFB53B;color:#000;text-decoration:none;padding:14px 36px;border-radius:12px;font-weight:700;font-size:16px;">${text}</a>
</td></tr></table>`;
}

export const NURTURE_STEPS: NurtureStep[] = [
  {
    step: 1,
    daysAfterPurchase: 1,
    subject: 'Start here — the one module that changes everything',
    getHtml: (name, tier) => emailWrapper(`
      <h2 style="margin:0 0 20px;color:#fff;font-size:22px;font-weight:700;">${name ? `${name}, you` : 'You'} made a smart move.</h2>
      <p style="margin:0 0 16px;color:#a3a3a3;font-size:15px;line-height:1.6;">Most players jump straight to blackjack strategy. But the students who get the best results? They start with <strong style="color:#CFB53B;">Module 2: Casino Psychology</strong>.</p>
      <p style="margin:0 0 20px;color:#a3a3a3;font-size:15px;line-height:1.6;">It shows you exactly how casinos are designed to make you lose — the architecture, the rewards traps, the social pressure. Once you see it, you can't unsee it. And that awareness is worth more than any strategy card.</p>
      ${cta('Start Module 2', `${BASE_URL}/masterclass/course/casino-psychology/how-casinos-manipulate-behavior`)}
      <p style="margin:16px 0 0;color:#757575;font-size:13px;">Takes about 15 minutes. Worth every second.</p>
    `),
    getText: (name) => `${name ? `${name}, you` : 'You'} made a smart move.\n\nMost players jump straight to blackjack strategy. But the students who get the best results start with Module 2: Casino Psychology.\n\nStart Module 2: ${BASE_URL}/masterclass/course/casino-psychology/how-casinos-manipulate-behavior`,
  },
  {
    step: 2,
    daysAfterPurchase: 3,
    subject: 'The #1 mistake that costs players thousands',
    getHtml: (name) => emailWrapper(`
      <h2 style="margin:0 0 20px;color:#fff;font-size:22px;font-weight:700;">Most players skip this. Don't.</h2>
      <p style="margin:0 0 16px;color:#a3a3a3;font-size:15px;line-height:1.6;">The #1 reason players lose money isn't bad strategy — it's <strong style="color:#CFB53B;">no session discipline</strong>.</p>
      <p style="margin:0 0 16px;color:#a3a3a3;font-size:15px;line-height:1.6;">They win $500, keep playing, and leave with nothing. Sound familiar?</p>
      <p style="margin:0 0 20px;color:#a3a3a3;font-size:15px;line-height:1.6;">Module 10 teaches you the 30-45 minute rule, win/loss limits, and why playing big and fast (then leaving) beats grinding for hours. This is what separates Mikki from every other gambler.</p>
      ${cta('Learn Session Discipline', `${BASE_URL}/masterclass/course/session-discipline/win-loss-limits`)}
      <p style="margin:16px 0 0;color:#757575;font-size:13px;">This module alone can save you thousands on your next trip.</p>
    `),
    getText: (name) => `The #1 reason players lose money isn't bad strategy — it's no session discipline.\n\nModule 10 teaches you the 30-45 minute rule and win/loss limits.\n\nLearn Session Discipline: ${BASE_URL}/masterclass/course/session-discipline/win-loss-limits`,
  },
  {
    step: 3,
    daysAfterPurchase: 7,
    subject: 'Have you tried the interactive scenarios?',
    getHtml: (name) => emailWrapper(`
      <h2 style="margin:0 0 20px;color:#fff;font-size:22px;font-weight:700;">Reading strategy is one thing. Practicing it is another.</h2>
      <p style="margin:0 0 16px;color:#a3a3a3;font-size:15px;line-height:1.6;">The masterclass includes <strong style="color:#CFB53B;">interactive blackjack scenarios</strong> where you practice real hands and get instant feedback on your decisions.</p>
      <p style="margin:0 0 20px;color:#a3a3a3;font-size:15px;line-height:1.6;">No money at risk. Just pure practice. Students who complete the scenarios score 40% higher on the module quizzes.</p>
      ${cta('Try the Scenarios', `${BASE_URL}/masterclass/course/blackjack-mastery/blackjack-types-ranked`)}
      <p style="margin:16px 0 0;color:#757575;font-size:13px;">10 hands. 5 minutes. See how you do.</p>
    `),
    getText: () => `The masterclass includes interactive blackjack scenarios where you practice real hands.\n\nTry the Scenarios: ${BASE_URL}/masterclass/course/blackjack-mastery/blackjack-types-ranked`,
  },
  {
    step: 4,
    daysAfterPurchase: 14,
    subject: "You've been a member for 2 weeks — here's what top students do next",
    getHtml: (name, tier) => {
      const isBaseTier = tier === 'masterclass';
      const upgradeBlock = isBaseTier ? `
        <table role="presentation" style="width:100%;border-collapse:collapse;margin-top:24px;padding-top:24px;border-top:1px solid #333;"><tr><td>
          <p style="margin:0 0 8px;color:#CFB53B;font-size:13px;font-weight:700;">INNER CIRCLE</p>
          <p style="margin:0 0 12px;color:#a3a3a3;font-size:14px;line-height:1.5;">Top students join the Inner Circle for daily strategy drops, community access, and the AI Casino Advisor. $8.33/mo billed annually.</p>
          <a href="${BASE_URL}/masterclass#pricing" style="color:#CFB53B;text-decoration:none;font-weight:700;font-size:14px;">See plans &rarr;</a>
        </td></tr></table>
      ` : '';

      return emailWrapper(`
        <h2 style="margin:0 0 20px;color:#fff;font-size:22px;font-weight:700;">2 weeks in. Here's your edge.</h2>
        <p style="margin:0 0 16px;color:#a3a3a3;font-size:15px;line-height:1.6;">The students who see the best results all do three things:</p>
        <p style="margin:0 0 8px;color:#fff;font-size:15px;">1. Complete the <strong style="color:#CFB53B;">Casino Negotiation</strong> module — most underrated section</p>
        <p style="margin:0 0 8px;color:#fff;font-size:15px;">2. Use the <strong style="color:#CFB53B;">Discount System</strong> to get 10-20% loss rebates</p>
        <p style="margin:0 0 16px;color:#fff;font-size:15px;">3. Master <strong style="color:#CFB53B;">Comps & Perks</strong> — never pay for hotel, food, or shows again</p>
        ${cta('Continue the Course', `${BASE_URL}/masterclass/course`)}
        ${upgradeBlock}
      `);
    },
    getText: (name, tier) => `2 weeks in. Top students focus on: Casino Negotiation, the Discount System, and Comps & Perks.\n\nContinue: ${BASE_URL}/masterclass/course`,
  },
  {
    step: 5,
    daysAfterPurchase: 30,
    subject: 'Your first month — and a question',
    getHtml: (name, tier) => {
      const isBaseTier = tier === 'masterclass';
      return emailWrapper(`
        <h2 style="margin:0 0 20px;color:#fff;font-size:22px;font-weight:700;">One month. How's it going?</h2>
        <p style="margin:0 0 16px;color:#a3a3a3;font-size:15px;line-height:1.6;">You've had the masterclass for 30 days now. Quick question — have you applied any of the strategies at a casino yet?</p>
        <p style="margin:0 0 16px;color:#a3a3a3;font-size:15px;line-height:1.6;">If yes — reply to this email with your story. We might feature it (anonymously if you prefer).</p>
        <p style="margin:0 0 20px;color:#a3a3a3;font-size:15px;line-height:1.6;">If not yet — no rush. But Module 10 (Session Discipline) and Module 7 (Casino Negotiation) are the two that will make the biggest difference on your next trip. Start there.</p>
        ${cta('Back to the Course', `${BASE_URL}/masterclass/course`)}
        ${isBaseTier ? `
          <table role="presentation" style="width:100%;border-collapse:collapse;margin-top:24px;padding-top:24px;border-top:1px solid #333;"><tr><td>
            <p style="margin:0 0 8px;color:#CFB53B;font-size:13px;font-weight:700;">READY FOR MORE?</p>
            <p style="margin:0 0 12px;color:#a3a3a3;font-size:14px;line-height:1.5;">Join the Inner Circle for daily strategy drops, the AI Casino Advisor, and community access. From $8.33/mo.</p>
            <a href="${BASE_URL}/masterclass#pricing" style="color:#CFB53B;text-decoration:none;font-weight:700;font-size:14px;">Upgrade &rarr;</a>
          </td></tr></table>
        ` : ''}
      `);
    },
    getText: () => `One month with the masterclass. How's it going?\n\nReply with your story — we might feature it.\n\nBack to Course: ${BASE_URL}/masterclass/course`,
  },
];

// ============================================
// ABANDONED CHECKOUT SEQUENCE (legacy)
// ============================================

interface AbandonedStep {
  step: number;
  hoursAfterAbandon: number;
  subject: string;
  getHtml: () => string;
  getText: () => string;
}

export const ABANDONED_STEPS: AbandonedStep[] = [
  {
    step: 1,
    hoursAfterAbandon: 1,
    subject: 'You left something on the table',
    getHtml: () => emailWrapper(`
      <h2 style="margin:0 0 20px;color:#fff;font-size:22px;font-weight:700;">You were so close.</h2>
      <p style="margin:0 0 16px;color:#a3a3a3;font-size:15px;line-height:1.6;">You started checkout for the Mikki Mase Masterclass but didn't finish. No pressure — but your spot is still open.</p>
      <p style="margin:0 0 20px;color:#a3a3a3;font-size:15px;line-height:1.6;">10 modules. 30+ lessons. Interactive scenarios. The exact system behind $32M+ in casino winnings.</p>
      ${cta('Complete Your Purchase', `${BASE_URL}/checkout/masterclass`)}
      <p style="margin:16px 0 0;color:#757575;font-size:13px;">7-day money-back guarantee. No questions asked.</p>
    `),
    getText: () => `You started checkout but didn't finish. Your spot is still open.\n\nComplete Your Purchase: ${BASE_URL}/checkout/masterclass`,
  },
  {
    step: 2,
    hoursAfterAbandon: 24,
    subject: "Here's what Module 3 teaches you",
    getHtml: () => emailWrapper(`
      <h2 style="margin:0 0 20px;color:#fff;font-size:22px;font-weight:700;">The blackjack module alone is worth 10x the price.</h2>
      <p style="margin:0 0 16px;color:#a3a3a3;font-size:15px;line-height:1.6;">Module 3: Blackjack Mastery covers:</p>
      <p style="margin:0 0 6px;color:#fff;font-size:14px;">&#x2022; Which blackjack types to play (and which to avoid)</p>
      <p style="margin:0 0 6px;color:#fff;font-size:14px;">&#x2022; Basic strategy that actually works at the table</p>
      <p style="margin:0 0 6px;color:#fff;font-size:14px;">&#x2022; Soft hands — the plays most people get wrong</p>
      <p style="margin:0 0 6px;color:#fff;font-size:14px;">&#x2022; Why CSMs are your enemy</p>
      <p style="margin:0 0 20px;color:#fff;font-size:14px;">&#x2022; Interactive scenarios to practice before risking real money</p>
      ${cta('Get the Full System', `${BASE_URL}/checkout/masterclass`)}
      <p style="margin:16px 0 0;color:#757575;font-size:13px;">One bad session costs more than the entire masterclass.</p>
    `),
    getText: () => `Module 3: Blackjack Mastery covers which types to play, basic strategy, soft hands, and more.\n\nGet the Full System: ${BASE_URL}/checkout/masterclass`,
  },
  {
    step: 3,
    hoursAfterAbandon: 72,
    subject: 'Last reminder — launch pricing ends soon',
    getHtml: () => emailWrapper(`
      <h2 style="margin:0 0 20px;color:#fff;font-size:22px;font-weight:700;">This is your last reminder.</h2>
      <p style="margin:0 0 16px;color:#a3a3a3;font-size:15px;line-height:1.6;">The Mikki Mase Masterclass is still at launch pricing. 847+ students are already inside.</p>
      <p style="margin:0 0 20px;color:#a3a3a3;font-size:15px;line-height:1.6;">The question isn't whether the masterclass is worth it. It's how much your next losing session will cost you <em>without</em> it.</p>
      ${cta('Get Instant Access', `${BASE_URL}/checkout/masterclass`)}
      <p style="margin:16px 0 0;color:#757575;font-size:13px;">7-day money-back guarantee. No risk.</p>
    `),
    getText: () => `Last reminder. 847+ students inside. Launch pricing won't last.\n\nGet Instant Access: ${BASE_URL}/checkout/masterclass`,
  },
];

// ============================================
// LEGACY SEQUENCE PROCESSOR
// ============================================

export interface SequenceResult {
  sent: number;
  skipped: number;
  errors: number;
}

/**
 * Process nurture sequence: find users who purchased X days ago and haven't received step Y
 */
export async function processNurtureSequence(supabase: any): Promise<SequenceResult> {
  const result: SequenceResult = { sent: 0, skipped: 0, errors: 0 };

  for (const step of NURTURE_STEPS) {
    // Find users who purchased exactly N days ago (within a 24h window)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - step.daysAfterPurchase);
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Get purchases from that day
    const { data: purchases } = await supabase
      .from('purchases')
      .select('user_id, product_key, created_at')
      .in('product_key', ['masterclass', 'inner-circle-yearly', 'lifetime-vip'])
      .eq('status', 'completed')
      .gte('created_at', startOfDay.toISOString())
      .lte('created_at', endOfDay.toISOString());

    if (!purchases || purchases.length === 0) continue;

    for (const purchase of purchases) {
      // Get user email
      const { data: profile } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', purchase.user_id)
        .single();

      if (!profile?.email) { result.skipped++; continue; }

      // Check if this step was already sent
      const { data: existing } = await supabase
        .from('email_sequences')
        .select('id')
        .eq('email', profile.email)
        .eq('sequence_name', 'nurture')
        .eq('step_number', step.step)
        .maybeSingle();

      if (existing) { result.skipped++; continue; }

      // Determine tier for personalized content
      const tier = purchase.product_key === 'lifetime-vip' ? 'lifetime-vip'
        : purchase.product_key.includes('inner-circle') ? 'inner-circle'
        : 'masterclass';

      // Send email
      try {
        const name = profile.full_name || '';
        await sendEmail({
          to: profile.email,
          subject: step.subject,
          html: step.getHtml(name, tier),
          text: step.getText(name, tier),
        });

        // Record sent
        await supabase.from('email_sequences').insert({
          user_id: purchase.user_id,
          email: profile.email,
          sequence_name: 'nurture',
          step_number: step.step,
        });

        result.sent++;
      } catch (err) {
        console.error(`[Nurture] Failed to send step ${step.step} to ${profile.email}:`, err);
        result.errors++;
      }
    }
  }

  return result;
}

/**
 * Process abandoned checkout sequence (legacy)
 */
export async function processAbandonedSequence(supabase: any): Promise<SequenceResult> {
  const result: SequenceResult = { sent: 0, skipped: 0, errors: 0 };

  for (const step of ABANDONED_STEPS) {
    // Find checkout intents from X hours ago that were never completed
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() - step.hoursAfterAbandon);
    const windowStart = new Date(targetTime);
    windowStart.setMinutes(windowStart.getMinutes() - 30);
    const windowEnd = new Date(targetTime);
    windowEnd.setMinutes(windowEnd.getMinutes() + 30);

    const { data: intents } = await supabase
      .from('checkout_intents')
      .select('email, product_key')
      .is('completed_at', null)
      .gte('started_at', windowStart.toISOString())
      .lte('started_at', windowEnd.toISOString());

    if (!intents || intents.length === 0) continue;

    for (const intent of intents) {
      if (!intent.email) { result.skipped++; continue; }

      // Check if they've since purchased (don't email buyers)
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', intent.email)
        .maybeSingle();

      if (profile) {
        const { data: userPurchase } = await supabase
          .from('purchases')
          .select('id')
          .eq('user_id', profile.id)
          .eq('status', 'completed')
          .maybeSingle();

        if (userPurchase) { result.skipped++; continue; }
      }

      // Check if this step was already sent
      const { data: existing } = await supabase
        .from('email_sequences')
        .select('id')
        .eq('email', intent.email)
        .eq('sequence_name', 'abandoned')
        .eq('step_number', step.step)
        .maybeSingle();

      if (existing) { result.skipped++; continue; }

      // Send email
      try {
        await sendEmail({
          to: intent.email,
          subject: step.subject,
          html: step.getHtml(),
          text: step.getText(),
        });

        await supabase.from('email_sequences').insert({
          email: intent.email,
          sequence_name: 'abandoned',
          step_number: step.step,
        });

        result.sent++;
      } catch (err) {
        console.error(`[Abandoned] Failed to send step ${step.step} to ${intent.email}:`, err);
        result.errors++;
      }
    }
  }

  return result;
}

// ============================================
// NEW: STATE-MACHINE SEQUENCE MANAGER
// ============================================

export type SequenceName = 'activation' | 'masterclass_upsell' | 'inner_circle' | 'abandoned_v2';

export interface SequenceStep {
  /** Delay in hours after sequence start */
  delayHours: number;
  /** Human-readable label for logging/debugging */
  label: string;
  /** The action to execute for this step */
  action: (customerId: string, email: string, metadata?: Record<string, string>) => Promise<void>;
}

export interface EmailFlowState {
  id?: string;
  customer_id: string;
  customer_email: string;
  sequence_name: SequenceName;
  current_step: number;
  started_at: string;
  next_send_at: string;
  completed_at: string | null;
  cancelled_at: string | null;
  metadata: Record<string, string>;
}

// ============================================
// SEQUENCE DEFINITIONS
// ============================================

export const sequenceDefinitions: Record<SequenceName, SequenceStep[]> = {
  /**
   * Activation sequence — triggered on Session Playbook purchase
   * Step 0: Welcome email (sent immediately by webhook, tracked here)
   * Step 1: Day 1 activation nudge
   */
  activation: [
    {
      delayHours: 0,
      label: 'Playbook Welcome (sent by webhook)',
      action: async () => {
        // Welcome email is sent directly by the purchase webhook
        // This step exists as a placeholder for tracking
      },
    },
    {
      delayHours: 24,
      label: 'Day 1 Activation Nudge',
      action: async (_customerId, email, metadata) => {
        await sendActivationNudge({
          customerEmail: email,
          customerName: metadata?.customerName,
          accessUrl: metadata?.accessUrl || `${BASE_URL}/masterclass/course`,
          lessonTitle: 'Bankroll Fundamentals',
        });
      },
    },
  ],

  /**
   * Masterclass upsell — triggered 7 days after Playbook purchase
   * Only for customers who haven't upgraded yet
   */
  masterclass_upsell: [
    {
      delayHours: 168, // 7 days
      label: 'Day 7 Masterclass Upsell',
      action: async (_customerId, email, metadata) => {
        await sendMasterclassUpsell({
          customerEmail: email,
          customerName: metadata?.customerName,
          upgradeUrl: metadata?.upgradeUrl || `${BASE_URL}/masterclass`,
          price: 79,
        });
      },
    },
  ],

  /**
   * Inner circle upsell — future sequence for masterclass completers
   * Placeholder for now
   */
  inner_circle: [],

  /**
   * Abandoned checkout recovery v2 — 3-step sequence using new email templates
   * Step 1: 1 hour after abandonment
   * Step 2: 24 hours after abandonment
   * Step 3: 72 hours after abandonment
   */
  abandoned_v2: [
    {
      delayHours: 1,
      label: 'Abandoned Cart — Reminder',
      action: async (_customerId, email, metadata) => {
        await sendAbandonedCheckout({
          customerEmail: email,
          productName: metadata?.productName || 'Session Playbook',
          checkoutUrl: metadata?.checkoutUrl || `${BASE_URL}/masterclass`,
          step: 1,
        });
      },
    },
    {
      delayHours: 24,
      label: 'Abandoned Cart — Objection Handling',
      action: async (_customerId, email, metadata) => {
        await sendAbandonedCheckout({
          customerEmail: email,
          productName: metadata?.productName || 'Session Playbook',
          checkoutUrl: metadata?.checkoutUrl || `${BASE_URL}/masterclass`,
          step: 2,
        });
      },
    },
    {
      delayHours: 72,
      label: 'Abandoned Cart — Final Push',
      action: async (_customerId, email, metadata) => {
        await sendAbandonedCheckout({
          customerEmail: email,
          productName: metadata?.productName || 'Session Playbook',
          checkoutUrl: metadata?.checkoutUrl || `${BASE_URL}/masterclass`,
          step: 3,
        });
      },
    },
  ],
};

// ============================================
// SEQUENCE MANAGEMENT
// ============================================

/**
 * Start an email sequence for a customer.
 * If the customer already has an active instance of this sequence, it will be replaced.
 */
export async function startSequence(
  customerId: string,
  customerEmail: string,
  sequenceName: SequenceName,
  metadata: Record<string, string> = {},
): Promise<void> {
  const supabase = getServiceClient();
  const sequenceDef = sequenceDefinitions[sequenceName];

  if (!sequenceDef || sequenceDef.length === 0) {
    console.warn(`[email-sequences] Sequence "${sequenceName}" has no steps, skipping.`);
    return;
  }

  const now = new Date();
  const firstStep = sequenceDef[0];
  const nextSendAt = new Date(now.getTime() + firstStep.delayHours * 60 * 60 * 1000);

  const { error } = await supabase.from('email_flow_state').upsert(
    {
      customer_id: customerId,
      customer_email: customerEmail,
      sequence_name: sequenceName,
      current_step: 0,
      started_at: now.toISOString(),
      next_send_at: nextSendAt.toISOString(),
      completed_at: null,
      cancelled_at: null,
      metadata,
    },
    { onConflict: 'customer_id,sequence_name' },
  );

  if (error) {
    console.error(`[email-sequences] Failed to start sequence "${sequenceName}" for ${customerId}:`, error);
    throw error;
  }

  console.log(
    `[email-sequences] Started "${sequenceName}" for ${customerEmail} — next send at ${nextSendAt.toISOString()}`,
  );
}

/**
 * Cancel an active sequence (e.g., when a customer completes checkout after abandoning)
 */
export async function cancelSequence(
  customerId: string,
  sequenceName: SequenceName,
): Promise<void> {
  const supabase = getServiceClient();

  const { error } = await supabase
    .from('email_flow_state')
    .update({
      cancelled_at: new Date().toISOString(),
    })
    .eq('customer_id', customerId)
    .eq('sequence_name', sequenceName)
    .is('completed_at', null)
    .is('cancelled_at', null);

  if (error) {
    console.error(`[email-sequences] Failed to cancel sequence "${sequenceName}" for ${customerId}:`, error);
    throw error;
  }

  console.log(`[email-sequences] Cancelled "${sequenceName}" for ${customerId}`);
}

/**
 * Cancel all active sequences for a customer (e.g., on unsubscribe)
 */
export async function cancelAllSequences(customerId: string): Promise<void> {
  const supabase = getServiceClient();

  const { error } = await supabase
    .from('email_flow_state')
    .update({
      cancelled_at: new Date().toISOString(),
    })
    .eq('customer_id', customerId)
    .is('completed_at', null)
    .is('cancelled_at', null);

  if (error) {
    console.error(`[email-sequences] Failed to cancel all sequences for ${customerId}:`, error);
    throw error;
  }

  console.log(`[email-sequences] Cancelled all sequences for ${customerId}`);
}

// ============================================
// QUEUE PROCESSING (called by cron)
// ============================================

/**
 * Process pending emails in the state-machine queue.
 * Call this from a cron job every 15 minutes alongside the legacy processors.
 *
 * Queries email_flow_state for sequences where:
 * - next_send_at <= now
 * - completed_at is null
 * - cancelled_at is null
 *
 * For each match, sends the email for the current step and advances the sequence.
 */
export async function processEmailQueue(): Promise<{
  processed: number;
  errors: number;
}> {
  const supabase = getServiceClient();
  const now = new Date().toISOString();

  // Fetch all sequences that need to send
  const { data: pendingRows, error: fetchError } = await supabase
    .from('email_flow_state')
    .select('*')
    .lte('next_send_at', now)
    .is('completed_at', null)
    .is('cancelled_at', null)
    .order('next_send_at', { ascending: true })
    .limit(50); // Process in batches to avoid timeouts

  if (fetchError) {
    console.error('[email-sequences] Failed to fetch pending emails:', fetchError);
    return { processed: 0, errors: 1 };
  }

  if (!pendingRows || pendingRows.length === 0) {
    return { processed: 0, errors: 0 };
  }

  let processed = 0;
  let errors = 0;

  for (const row of pendingRows as EmailFlowState[]) {
    const sequenceDef = sequenceDefinitions[row.sequence_name];
    if (!sequenceDef) {
      console.warn(`[email-sequences] Unknown sequence "${row.sequence_name}", skipping row ${row.id}`);
      errors++;
      continue;
    }

    const step = sequenceDef[row.current_step];
    if (!step) {
      // Current step is beyond the sequence length — mark completed
      await supabase
        .from('email_flow_state')
        .update({ completed_at: new Date().toISOString() })
        .eq('id', row.id);
      continue;
    }

    try {
      // Execute the step action
      console.log(
        `[email-sequences] Sending "${row.sequence_name}" step ${row.current_step} (${step.label}) to ${row.customer_email}`,
      );
      await step.action(row.customer_id, row.customer_email, row.metadata);

      // Advance to next step
      const nextStepIndex = row.current_step + 1;
      const nextStep = sequenceDef[nextStepIndex];

      if (nextStep) {
        // Calculate next send time based on sequence start + next step delay
        const startedAt = new Date(row.started_at);
        const nextSendAt = new Date(startedAt.getTime() + nextStep.delayHours * 60 * 60 * 1000);

        await supabase
          .from('email_flow_state')
          .update({
            current_step: nextStepIndex,
            next_send_at: nextSendAt.toISOString(),
          })
          .eq('id', row.id);
      } else {
        // No more steps — mark sequence as completed
        await supabase
          .from('email_flow_state')
          .update({
            current_step: nextStepIndex,
            completed_at: new Date().toISOString(),
          })
          .eq('id', row.id);
      }

      processed++;
    } catch (err) {
      console.error(
        `[email-sequences] Error processing "${row.sequence_name}" step ${row.current_step} for ${row.customer_email}:`,
        err,
      );
      errors++;
    }
  }

  console.log(`[email-sequences] Queue processed: ${processed} sent, ${errors} errors`);
  return { processed, errors };
}

// ============================================
// SUPABASE TABLE SCHEMA (for reference)
// ============================================

/**
 * Required Supabase table: email_flow_state
 *
 * CREATE TABLE email_flow_state (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   customer_id TEXT NOT NULL,
 *   customer_email TEXT NOT NULL,
 *   sequence_name TEXT NOT NULL,
 *   current_step INTEGER NOT NULL DEFAULT 0,
 *   started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   next_send_at TIMESTAMPTZ NOT NULL,
 *   completed_at TIMESTAMPTZ,
 *   cancelled_at TIMESTAMPTZ,
 *   metadata JSONB DEFAULT '{}',
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ DEFAULT NOW(),
 *   UNIQUE(customer_id, sequence_name)
 * );
 *
 * -- Index for queue processing
 * CREATE INDEX idx_email_flow_pending
 *   ON email_flow_state (next_send_at)
 *   WHERE completed_at IS NULL AND cancelled_at IS NULL;
 */
