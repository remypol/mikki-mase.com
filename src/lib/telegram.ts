/**
 * Telegram Bot Notification Helper
 *
 * Sends payment notifications to a Telegram chat/group when
 * a Stripe checkout is completed.
 *
 * Env vars required:
 *   TELEGRAM_BOT_TOKEN  — from @BotFather
 *   TELEGRAM_CHAT_ID    — group or user chat ID
 */

const TELEGRAM_BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

interface PaymentNotification {
  customerEmail: string;
  customerName?: string;
  productName: string;
  amountCents: number;
  currency?: string;
  stripeSessionId: string;
}

/**
 * Send a payment notification to Telegram.
 * Non-throwing — logs errors but never fails the webhook.
 */
export async function sendPaymentNotification(data: PaymentNotification): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('[Telegram] Bot token or chat ID not configured, skipping notification');
    return;
  }

  const amount = (data.amountCents / 100).toFixed(2);
  const currency = (data.currency || 'USD').toUpperCase();
  const name = data.customerName || 'Unknown';
  const shortSessionId = data.stripeSessionId.slice(-8).toUpperCase();

  const message = [
    `💰 *New Payment Received*`,
    ``,
    `*Product:* ${escapeMarkdown(data.productName)}`,
    `*Amount:* $${amount} ${currency}`,
    `*Customer:* ${escapeMarkdown(name)}`,
    `*Email:* ${escapeMarkdown(data.customerEmail)}`,
    `*Order:* \\#${shortSessionId}`,
    ``,
    `🎰 _The house doesn't always win_`,
  ].join('\n');

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[Telegram] API error ${res.status}:`, body);
    } else {
      console.log(`[Telegram] Payment notification sent for ${data.customerEmail}`);
    }
  } catch (err) {
    console.error('[Telegram] Failed to send notification:', err);
  }
}

/**
 * Send a refund/dispute notification to Telegram.
 */
export async function sendRefundNotification(data: {
  type: 'refund' | 'dispute';
  userId: string;
  productKey: string;
  purchaseId: string;
}): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  const emoji = data.type === 'refund' ? '↩️' : '⚠️';
  const label = data.type === 'refund' ? 'Refund Processed' : 'Dispute Filed';

  const message = [
    `${emoji} *${escapeMarkdown(label)}*`,
    ``,
    `*Product:* ${escapeMarkdown(data.productKey)}`,
    `*User ID:* \`${data.userId}\``,
    `*Purchase ID:* \`${data.purchaseId}\``,
  ].join('\n');

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[Telegram] Refund notification error ${res.status}:`, body);
    }
  } catch (err) {
    console.error('[Telegram] Failed to send refund notification:', err);
  }
}

/** Escape special chars for Telegram MarkdownV2 */
function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}
