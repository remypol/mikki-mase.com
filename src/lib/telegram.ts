/**
 * Telegram Bot Notification Helper
 *
 * Sends payment/refund/dispute notifications to one or more Telegram chats.
 * Uses the same bot as the Gold IRA project (shared group).
 *
 * Env vars:
 *   TELEGRAM_BOT_TOKEN  — from @BotFather
 *   TELEGRAM_CHAT_IDS   — comma-separated chat IDs (supports multiple chats)
 *   TELEGRAM_CHAT_ID    — fallback: single chat ID
 */

function getConfig() {
  const chatIds = (import.meta.env.TELEGRAM_CHAT_IDS || import.meta.env.TELEGRAM_CHAT_ID || '')
    .split(',')
    .map((id: string) => id.trim())
    .filter(Boolean);
  return {
    botToken: import.meta.env.TELEGRAM_BOT_TOKEN as string | undefined,
    chatIds,
  };
}

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
  const { botToken, chatIds } = getConfig();
  if (!botToken || chatIds.length === 0) {
    console.log('[Telegram] Not configured, skipping payment notification');
    return;
  }

  const amount = (data.amountCents / 100).toFixed(2);
  const currency = (data.currency || 'USD').toUpperCase();
  const name = esc(data.customerName || 'Unknown');
  const shortSessionId = data.stripeSessionId.slice(-8).toUpperCase();

  const message = [
    `💰 <b>New Payment Received</b>`,
    ``,
    `🎰 <b>Product:</b> ${esc(data.productName)}`,
    `💵 <b>Amount:</b> $${amount} ${currency}`,
    `👤 <b>Customer:</b> ${name}`,
    `📧 <b>Email:</b> ${esc(data.customerEmail)}`,
    `🔑 <b>Order:</b> #${shortSessionId}`,
    ``,
    `<i>The house doesn't always win</i>`,
  ].join('\n');

  await sendToAll(botToken, chatIds, message, true);
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
  const { botToken, chatIds } = getConfig();
  if (!botToken || chatIds.length === 0) return;

  const emoji = data.type === 'refund' ? '↩️' : '⚠️';
  const label = data.type === 'refund' ? 'Refund Processed' : 'Dispute Filed';

  const message = [
    `${emoji} <b>${esc(label)}</b>`,
    ``,
    `<b>Product:</b> ${esc(data.productKey)}`,
    `<b>User ID:</b> <code>${esc(data.userId)}</code>`,
    `<b>Purchase ID:</b> <code>${esc(data.purchaseId)}</code>`,
  ].join('\n');

  await sendToAll(botToken, chatIds, message, true);
}

// ============================================
// INTERNAL HELPERS
// ============================================

/** Escape HTML special chars for Telegram HTML parse mode */
function esc(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Send a message to all configured chat IDs with a 5-second timeout */
async function sendToAll(
  botToken: string,
  chatIds: string[],
  message: string,
  urgent: boolean = false,
): Promise<void> {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  for (const chatId of chatIds) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
          disable_notification: !urgent,
          disable_web_page_preview: true,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const body = await res.text();
        console.error(`[Telegram] API error ${res.status} for chat ${chatId}:`, body);
      } else {
        console.log(`[Telegram] Notification sent to chat ${chatId}`);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.error(`[Telegram] Request timed out for chat ${chatId}`);
      } else {
        console.error(`[Telegram] Failed for chat ${chatId}:`, err);
      }
    }
  }
}
