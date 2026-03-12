/**
 * Resend Email Client
 * Transactional emails for mikki-mase.com shop
 *
 * Setup:
 * 1. npm install resend
 * 2. Add RESEND_API_KEY to environment variables
 * 3. Verify sending domain in Resend dashboard
 *
 * Environment variables required:
 * - RESEND_API_KEY: API key from Resend dashboard
 */

// ============================================
// CONFIGURATION
// ============================================

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const FROM_EMAIL = 'Mikki Mase <noreply@mikki-mase.com>';
const REPLY_TO = 'support@mikki-mase.com';

// ============================================
// CLIENT
// ============================================

let resendClient: any = null;

/**
 * Get Resend client instance
 * Lazy initialization to avoid import errors during build
 */
export async function getResendClient() {
  if (!resendClient) {
    const { Resend } = await import('resend');
    resendClient = new Resend(RESEND_API_KEY);
  }
  return resendClient;
}

// ============================================
// EMAIL TYPES
// ============================================

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export interface PurchaseEmailData {
  customerEmail: string;
  customerName?: string;
  productName: string;
  orderNumber: string;
  downloadLink: string;
  receiptUrl?: string;
}

// ============================================
// SEND EMAIL
// ============================================

/**
 * Send a transactional email
 */
export async function sendEmail(options: EmailOptions) {
  try {
    const resend = await getResendClient();

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      reply_to: options.replyTo || REPLY_TO,
    });

    return {
      success: true,
      id: result.id,
    };
  } catch (error) {
    console.error('Resend email error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================
// PURCHASE CONFIRMATION EMAIL
// ============================================

/**
 * Send purchase confirmation with download link
 */
export async function sendPurchaseConfirmation(data: PurchaseEmailData) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Download is Ready</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse;">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <h1 style="margin: 0; color: #CFB53B; font-size: 28px; font-weight: 900; letter-spacing: 2px;">
                MIKKI MASE
              </h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 16px; padding: 40px; border: 1px solid #333;">

              <h2 style="margin: 0 0 20px; color: #ffffff; font-size: 24px; font-weight: 700;">
                Your Download is Ready
              </h2>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                Thank you for your purchase! Your copy of <strong style="color: #CFB53B;">${data.productName}</strong> is ready for download.
              </p>

              <!-- Download Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${data.downloadLink}"
                       style="display: inline-block; background-color: #A8001E; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 700; font-size: 18px;">
                      Download Now
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; color: #757575; font-size: 14px; line-height: 1.6;">
                This download link expires in 7 days. If you have any issues, reply to this email.
              </p>

              <!-- Order Details -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px; padding-top: 30px; border-top: 1px solid #333;">
                <tr>
                  <td style="color: #757575; font-size: 14px; padding: 5px 0;">Order Number:</td>
                  <td style="color: #ffffff; font-size: 14px; padding: 5px 0; text-align: right;">${data.orderNumber}</td>
                </tr>
                <tr>
                  <td style="color: #757575; font-size: 14px; padding: 5px 0;">Product:</td>
                  <td style="color: #ffffff; font-size: 14px; padding: 5px 0; text-align: right;">${data.productName}</td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center;">
              <p style="margin: 0 0 10px; color: #757575; font-size: 14px;">
                Questions? Reply to this email or contact support@mikki-mase.com
              </p>
              <p style="margin: 0; color: #333333; font-size: 12px;">
                &copy; ${new Date().getFullYear()} Mikki Mase. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
Your Download is Ready

Thank you for your purchase! Your copy of ${data.productName} is ready for download.

Download Link: ${data.downloadLink}

This link expires in 7 days.

Order Number: ${data.orderNumber}
Product: ${data.productName}

Questions? Reply to this email or contact support@mikki-mase.com

© ${new Date().getFullYear()} Mikki Mase. All rights reserved.
  `.trim();

  return sendEmail({
    to: data.customerEmail,
    subject: `Your Download: ${data.productName}`,
    html,
    text,
  });
}

// ============================================
// LEAD MAGNET EMAIL
// ============================================

export interface LeadMagnetEmailData {
  customerEmail: string;
  customerName?: string;
  downloadLink: string;
}

/**
 * Send lead magnet email with free Blackjack Cheat Sheet download
 */
export async function sendLeadMagnetEmail(data: LeadMagnetEmailData) {
  const greeting = data.customerName ? `Hey ${data.customerName},` : '';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Blackjack Cheat Sheet is Ready</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse;">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <h1 style="margin: 0; color: #CFB53B; font-size: 28px; font-weight: 900; letter-spacing: 2px;">
                MIKKI MASE
              </h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 16px; padding: 40px; border: 1px solid #333;">

              <h2 style="margin: 0 0 20px; color: #ffffff; font-size: 24px; font-weight: 700;">
                Your Cheat Sheet is Ready
              </h2>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                ${greeting ? `${greeting}<br><br>` : ''}Here's your free Blackjack Cheat Sheet from the MMC community. Print it, save it on your phone, or keep it in your wallet &mdash; it's yours for life.
              </p>

              <!-- Download Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${data.downloadLink}"
                       style="display: inline-block; background-color: #A8001E; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 700; font-size: 18px;">
                      Download Cheat Sheet
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; color: #757575; font-size: 14px; line-height: 1.6;">
                This download link expires in 7 days.
              </p>

              <!-- Upsell Section -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px; padding-top: 30px; border-top: 1px solid #333;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 20px; color: #ffffff; font-size: 20px; font-weight: 700;">
                      Want the Full Arsenal?
                    </h3>

                    <!-- Upsell 1: Cheatsheet Bundle -->
                    <p style="margin: 0 0 4px; color: #ffffff; font-size: 16px; font-weight: 700;">
                      &#x1F4DA; MMC Cheatsheet Bundle ($19.99)
                    </p>
                    <p style="margin: 0 0 8px; color: #a3a3a3; font-size: 14px; line-height: 1.5;">
                      Baccarat + Poker + Roulette strategy cards
                    </p>
                    <p style="margin: 0 0 24px;">
                      <a href="https://www.mikki-mase.com/cheatsheets" style="color: #CFB53B; text-decoration: none; font-weight: 700; font-size: 14px;">View Bundle &rarr;</a>
                    </p>

                    <!-- Upsell 2: Beat the Casino Ebook -->
                    <p style="margin: 0 0 4px; color: #ffffff; font-size: 16px; font-weight: 700;">
                      &#x1F4D6; Beat the Casino Ebook ($29)
                    </p>
                    <p style="margin: 0 0 8px; color: #a3a3a3; font-size: 14px; line-height: 1.5;">
                      98-page deep dive into casino psychology &amp; advantage play
                    </p>
                    <p style="margin: 0 0 0;">
                      <a href="https://www.mikki-mase.com/beat-the-casino" style="color: #CFB53B; text-decoration: none; font-weight: 700; font-size: 14px;">View Ebook &rarr;</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Kirgo Affiliate -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px; padding-top: 30px; border-top: 1px solid #333;">
                <tr>
                  <td>
                    <p style="margin: 0 0 16px; color: #a3a3a3; font-size: 14px; line-height: 1.6;">
                      &#x1F3B2; Ready to practice? Use code <strong style="color: #ffffff;">MMC</strong> at Kirgo for 300% bonus + 50 free spins.
                    </p>
                    <table role="presentation" style="border-collapse: collapse;">
                      <tr>
                        <td align="center">
                          <a href="https://kirgoplay.com/ddb4ff99f"
                             style="display: inline-block; background-color: #A8001E; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 14px;">
                            Try Kirgo &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 10px 0 0; color: #555555; font-size: 12px;">
                      18+ | Gamble Responsibly
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center;">
              <p style="margin: 0 0 10px; color: #757575; font-size: 14px;">
                Questions? Reply to this email.
              </p>
              <p style="margin: 0; color: #333333; font-size: 12px;">
                &copy; 2026 Mikki Mase. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
Your Cheat Sheet is Ready
${greeting ? `\n${greeting}\n` : ''}
Here's your free Blackjack Cheat Sheet from the MMC community. Print it, save it on your phone, or keep it in your wallet — it's yours for life.

Download Cheat Sheet: ${data.downloadLink}

This download link expires in 7 days.

---

Want the Full Arsenal?

MMC Cheatsheet Bundle ($19.99)
Baccarat + Poker + Roulette strategy cards
View Bundle: https://www.mikki-mase.com/cheatsheets

Beat the Casino Ebook ($29)
98-page deep dive into casino psychology & advantage play
View Ebook: https://www.mikki-mase.com/beat-the-casino

---

Ready to practice? Use code MMC at Kirgo for 300% bonus + 50 free spins.
Try Kirgo: https://kirgoplay.com/ddb4ff99f
18+ | Gamble Responsibly

---

Questions? Reply to this email.

© 2026 Mikki Mase. All rights reserved.
  `.trim();

  return sendEmail({
    to: data.customerEmail,
    subject: 'Your Blackjack Cheat Sheet is ready \u{1F3B0}',
    html,
    text,
  });
}

// ============================================
// UPSELL EMAIL
// ============================================

export interface UpsellEmailData {
  customerEmail: string;
  customerName?: string;
  purchasedProduct: string;
}

/**
 * Send upsell email promoting Beat the Casino ebook to existing customers
 */
export async function sendUpsellEmail(data: UpsellEmailData) {
  const greeting = data.customerName ? `${data.customerName}, you` : 'You';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Get the Full Playbook</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse;">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <h1 style="margin: 0; color: #CFB53B; font-size: 28px; font-weight: 900; letter-spacing: 2px;">
                MIKKI MASE
              </h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 16px; padding: 40px; border: 1px solid #333;">

              <h2 style="margin: 0 0 20px; color: #ffffff; font-size: 24px; font-weight: 700;">
                You've Got the Cheat Sheets. Now Get the Full Playbook.
              </h2>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                ${greeting} already have the <strong style="color: #CFB53B;">${data.purchasedProduct}</strong> &mdash; that puts you ahead of 99% of players walking into any casino.
              </p>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                But cheat sheets tell you <em>what</em> to do. The <strong style="color: #ffffff;">Beat the Casino Ebook</strong> teaches you <em>why</em> it works &mdash; and how to exploit the gaps most players never see.
              </p>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                98 pages of casino psychology, bankroll management, advantage play techniques, and the mental frameworks that took me from broke to banned at every major casino.
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://www.mikki-mase.com/beat-the-casino"
                       style="display: inline-block; background-color: #A8001E; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 700; font-size: 18px;">
                      Get the Ebook &mdash; $29
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; color: #757575; font-size: 14px; line-height: 1.6;">
                Instant digital download. Yours forever.
              </p>

              <!-- Kirgo Affiliate -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px; padding-top: 30px; border-top: 1px solid #333;">
                <tr>
                  <td>
                    <p style="margin: 0 0 16px; color: #a3a3a3; font-size: 14px; line-height: 1.6;">
                      &#x1F3B2; Want to put your strategy to the test? Use code <strong style="color: #ffffff;">MMC</strong> at Kirgo for 300% bonus + 50 free spins.
                    </p>
                    <table role="presentation" style="border-collapse: collapse;">
                      <tr>
                        <td align="center">
                          <a href="https://kirgoplay.com/ddb4ff99f"
                             style="display: inline-block; background-color: #A8001E; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 14px;">
                            Try Kirgo &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 10px 0 0; color: #555555; font-size: 12px;">
                      18+ | Gamble Responsibly
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center;">
              <p style="margin: 0 0 10px; color: #757575; font-size: 14px;">
                Questions? Reply to this email.
              </p>
              <p style="margin: 0; color: #333333; font-size: 12px;">
                &copy; 2026 Mikki Mase. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
You've Got the Cheat Sheets. Now Get the Full Playbook.

${greeting} already have the ${data.purchasedProduct} — that puts you ahead of 99% of players walking into any casino.

But cheat sheets tell you what to do. The Beat the Casino Ebook teaches you why it works — and how to exploit the gaps most players never see.

98 pages of casino psychology, bankroll management, advantage play techniques, and the mental frameworks that took me from broke to banned at every major casino.

Get the Ebook — $29: https://www.mikki-mase.com/beat-the-casino

Instant digital download. Yours forever.

---

Want to put your strategy to the test? Use code MMC at Kirgo for 300% bonus + 50 free spins.
Try Kirgo: https://kirgoplay.com/ddb4ff99f
18+ | Gamble Responsibly

---

Questions? Reply to this email.

© 2026 Mikki Mase. All rights reserved.
  `.trim();

  return sendEmail({
    to: data.customerEmail,
    subject: "You've got the cheat sheets. Now get the full playbook.",
    html,
    text,
  });
}

// ============================================
// PLACEHOLDER EXPORTS
// ============================================

export const isResendConfigured = (): boolean => {
  return Boolean(RESEND_API_KEY);
};
