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
                      <a href="https://www.mikki-mase.com/cheat-sheets" style="color: #CFB53B; text-decoration: none; font-weight: 700; font-size: 14px;">View Bundle &rarr;</a>
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
View Bundle: https://www.mikki-mase.com/cheat-sheets

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
// MASTERCLASS WELCOME EMAIL
// ============================================

export interface MasterclassWelcomeData {
  customerEmail: string;
  customerName?: string;
  courseUrl: string;
  cheatsheetDownloadUrl: string;
  ebookDownloadUrl: string;
  /** Magic login link for guest accounts (one-click login, no password) */
  magicLink?: string;
  /** Whether this is a guest checkout (no account existed before payment) */
  isGuest?: boolean;
}

/**
 * Send masterclass welcome email with course access + bonus downloads
 */
export async function sendMasterclassWelcome(data: MasterclassWelcomeData) {
  const greeting = data.customerName ? `${data.customerName}, welcome` : 'Welcome';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to The Mikki Mase Masterclass</title>
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
                ${greeting} to the Masterclass
              </h2>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                You now have <strong style="color: #CFB53B;">lifetime access</strong> to all 10 modules, 30+ lessons, interactive scenarios, quizzes, and bonus content.
              </p>

              ${data.isGuest && data.magicLink ? `
              <!-- Guest account notice -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="background-color: rgba(207, 181, 59, 0.1); border: 1px solid rgba(207, 181, 59, 0.3); border-radius: 12px; padding: 16px;">
                    <p style="margin: 0; color: #CFB53B; font-size: 14px; font-weight: 600;">
                      We created your account automatically. Click below to log in instantly. No password needed.
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Course Access Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${data.magicLink || data.courseUrl}"
                       style="display: inline-block; background-color: #A8001E; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 700; font-size: 18px;">
                      ${data.isGuest && data.magicLink ? 'Click to Access Your Masterclass' : 'Start the Masterclass'}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Bonus Downloads -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px; padding-top: 30px; border-top: 1px solid #333;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 16px; color: #CFB53B; font-size: 18px; font-weight: 700;">
                      Your Bonus Downloads
                    </h3>

                    <p style="margin: 0 0 12px;">
                      <a href="${data.cheatsheetDownloadUrl}" style="color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px;">
                        &#128196; MMC Cheatsheet Bundle (Baccarat, Poker, Roulette)
                      </a>
                    </p>

                    <p style="margin: 0 0 12px;">
                      <a href="${data.ebookDownloadUrl}" style="color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px;">
                        &#128214; Beat the Casino Ebook (98 pages)
                      </a>
                    </p>

                    <p style="margin: 16px 0 0; color: #757575; font-size: 13px;">
                      Download links expire in 7 days. You can always re-download from your course dashboard.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Telegram CTA -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px; padding-top: 30px; border-top: 1px solid #333;">
                <tr>
                  <td>
                    <p style="margin: 0 0 12px; color: #a3a3a3; font-size: 14px; line-height: 1.6;">
                      Join the free Telegram community to connect with other serious players.
                    </p>
                    <a href="https://www.mikki-mase.com/join" style="color: #CFB53B; text-decoration: none; font-weight: 700; font-size: 14px;">
                      Join Telegram &rarr;
                    </a>
                  </td>
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
Welcome to The Mikki Mase Masterclass

${greeting} to the Masterclass!

You now have lifetime access to all 10 modules, 30+ lessons, interactive scenarios, quizzes, and bonus content.
${data.isGuest && data.magicLink ? `\nWe created your account automatically. Click below to log in instantly — no password needed.\n\nAccess Your Masterclass: ${data.magicLink}` : `\nStart the Masterclass: ${data.courseUrl}`}

---

Your Bonus Downloads:

MMC Cheatsheet Bundle (Baccarat, Poker, Roulette): ${data.cheatsheetDownloadUrl}

Beat the Casino Ebook (98 pages): ${data.ebookDownloadUrl}

Download links expire in 7 days. You can always re-download from your course dashboard.

---

Join the free Telegram community: https://www.mikki-mase.com/join

Questions? Reply to this email or contact support@mikki-mase.com

(c) ${new Date().getFullYear()} Mikki Mase. All rights reserved.
  `.trim();

  return sendEmail({
    to: data.customerEmail,
    subject: "You're in! Welcome to The Mikki Mase Masterclass",
    html,
    text,
  });
}

// ============================================
// PLAYBOOK WELCOME EMAIL (Session Playbook $27)
// ============================================

export interface PlaybookWelcomeData {
  customerEmail: string;
  customerName?: string;
  accessUrl: string;
  cheatsheetDownloadUrl: string;
  isGuest?: boolean;
  magicLink?: string;
}

/**
 * Send welcome email after Masterclass purchase ($27)
 */
export async function sendPlaybookWelcome(data: PlaybookWelcomeData) {
  const greeting = data.customerName ? `${data.customerName}, your` : 'Your';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to the Masterclass</title>
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
                Welcome to the Masterclass
              </h2>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                You just made the smartest $27 decision of your gambling education. The Masterclass breaks down Mikki's core framework into actionable steps you can use before, during, and after every session.
              </p>

              ${data.isGuest && data.magicLink ? `
              <!-- Guest account notice -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="background-color: rgba(207, 181, 59, 0.1); border: 1px solid rgba(207, 181, 59, 0.3); border-radius: 12px; padding: 16px;">
                    <p style="margin: 0; color: #CFB53B; font-size: 14px; font-weight: 600;">
                      We created your account automatically. Click below to log in instantly &mdash; no password needed.
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Access Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${data.magicLink || data.accessUrl}"
                       style="display: inline-block; background-color: #A8001E; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 700; font-size: 18px;">
                      ${data.isGuest && data.magicLink ? 'Click to Access Your Masterclass' : 'Open Your Masterclass'}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Bonus Cheatsheet -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px; padding-top: 30px; border-top: 1px solid #333;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 12px; color: #CFB53B; font-size: 18px; font-weight: 700;">
                      Bonus: Blackjack Cheat Sheet
                    </h3>
                    <p style="margin: 0 0 12px; color: #a3a3a3; font-size: 14px; line-height: 1.6;">
                      Your free cheat sheet is included with the Masterclass. Print it, screenshot it, keep it handy.
                    </p>
                    <a href="${data.cheatsheetDownloadUrl}" style="color: #CFB53B; text-decoration: none; font-weight: 700; font-size: 14px;">
                      Download Cheat Sheet &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- What's Inside -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 30px; padding-top: 30px; border-top: 1px solid #333;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 16px; color: #ffffff; font-size: 18px; font-weight: 700;">
                      What's Inside
                    </h3>
                    <p style="margin: 0 0 8px; color: #a3a3a3; font-size: 14px; line-height: 1.6;">
                      &#x2713; Bankroll management fundamentals<br>
                      &#x2713; Pre-session preparation checklist<br>
                      &#x2713; Session tracking framework<br>
                      &#x2713; Risk management principles<br>
                      &#x2713; Post-session review process
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
                Questions? Reply to this email or contact support@mikki-mase.com
              </p>
              <p style="margin: 0 0 8px; color: #555555; font-size: 12px;">
                For educational purposes only. No guarantee of winnings. Gambling involves risk.
              </p>
              <p style="margin: 0 0 8px; color: #555555; font-size: 12px;">
                18+ | Gamble Responsibly
              </p>
              <p style="margin: 0; color: #333333; font-size: 12px;">
                You're receiving this because you purchased from mikki-mase.com<br>
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
Welcome to the Masterclass

${greeting} Masterclass is ready!

You just made the smartest $27 decision of your gambling education. The Masterclass breaks down Mikki's core framework into actionable steps you can use before, during, and after every session.
${data.isGuest && data.magicLink ? `\nWe created your account automatically. Click below to log in instantly — no password needed.\n\nAccess Your Masterclass: ${data.magicLink}` : `\nOpen Your Masterclass: ${data.accessUrl}`}

---

Bonus: Blackjack Cheat Sheet
Your free cheat sheet is included with the Masterclass. Print it, screenshot it, keep it handy.
Download: ${data.cheatsheetDownloadUrl}

---

What's Inside:
- Bankroll management fundamentals
- Pre-session preparation checklist
- Session tracking framework
- Risk management principles
- Post-session review process

---

Questions? Reply to this email or contact support@mikki-mase.com

For educational purposes only. No guarantee of winnings. Gambling involves risk.
18+ | Gamble Responsibly

You're receiving this because you purchased from mikki-mase.com
(c) ${new Date().getFullYear()} Mikki Mase. All rights reserved.
  `.trim();

  return sendEmail({
    to: data.customerEmail,
    subject: "You're in! Welcome to The Mikki Mase Masterclass",
    html,
    text,
  });
}

// ============================================
// ACTIVATION NUDGE EMAIL (Day 1)
// ============================================

export interface ActivationNudgeData {
  customerEmail: string;
  customerName?: string;
  accessUrl: string;
  lessonTitle: string;
}

/**
 * Send activation nudge email (Day 1 after purchase)
 * Encourages first login and teases lesson 1
 */
export async function sendActivationNudge(data: ActivationNudgeData) {
  const greeting = data.customerName ? `Hey ${data.customerName},` : 'Hey,';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quick win: Try this before your next session</title>
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
                Quick Win Before Your Next Session
              </h2>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                ${greeting}
              </p>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                Most people buy a course and never open it. Don't be most people.
              </p>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                Lesson 1 &mdash; <strong style="color: #CFB53B;">${data.lessonTitle}</strong> &mdash; takes about 10 minutes and gives you one framework you can use immediately. It's the single most important concept in the entire playbook.
              </p>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                The players who get results start here. The ones who don't&hellip; well, the casino thanks them.
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${data.accessUrl}"
                       style="display: inline-block; background-color: #A8001E; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 700; font-size: 18px;">
                      Start Lesson 1
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; color: #757575; font-size: 14px; line-height: 1.6;">
                10 minutes. One concept. Use it this weekend.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center;">
              <p style="margin: 0 0 10px; color: #757575; font-size: 14px;">
                Questions? Reply to this email or contact support@mikki-mase.com
              </p>
              <p style="margin: 0 0 8px; color: #555555; font-size: 12px;">
                For educational purposes only. No guarantee of winnings. Gambling involves risk.
              </p>
              <p style="margin: 0 0 8px; color: #555555; font-size: 12px;">
                18+ | Gamble Responsibly
              </p>
              <p style="margin: 0; color: #333333; font-size: 12px;">
                You're receiving this because you purchased from mikki-mase.com<br>
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
Quick Win Before Your Next Session

${greeting}

Most people buy a course and never open it. Don't be most people.

Lesson 1 — ${data.lessonTitle} — takes about 10 minutes and gives you one framework you can use immediately. It's the single most important concept in the entire playbook.

The players who get results start here. The ones who don't... well, the casino thanks them.

Start Lesson 1: ${data.accessUrl}

10 minutes. One concept. Use it this weekend.

---

Questions? Reply to this email or contact support@mikki-mase.com

For educational purposes only. No guarantee of winnings. Gambling involves risk.
18+ | Gamble Responsibly

You're receiving this because you purchased from mikki-mase.com
(c) ${new Date().getFullYear()} Mikki Mase. All rights reserved.
  `.trim();

  return sendEmail({
    to: data.customerEmail,
    subject: 'Quick win: Try this before your next session',
    html,
    text,
  });
}

// ============================================
// MASTERCLASS UPSELL EMAIL (Day 7)
// ============================================

export interface MasterclassUpsellData {
  customerEmail: string;
  customerName?: string;
  upgradeUrl: string;
  price: number;
}

/**
 * Send masterclass upsell email (Day 7 for non-upgraders)
 */
export async function sendMasterclassUpsell(data: MasterclassUpsellData) {
  const greeting = data.customerName ? `${data.customerName}, you` : 'You';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You've seen the framework. Here's the full picture.</title>
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
                You've Seen the Framework. Here's the Full Picture.
              </h2>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                ${greeting}'ve had the Session Playbook for a week now. If you've been applying the fundamentals, you already know this stuff works.
              </p>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                But the Playbook only covers the foundation. The <strong style="color: #CFB53B;">Full Masterclass</strong> goes deeper &mdash; 10 modules, 30+ lessons, interactive scenarios, and the advanced strategies Mikki actually uses at the table.
              </p>

              <!-- What's Included -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 20px 0; padding: 20px; background-color: rgba(207, 181, 59, 0.05); border: 1px solid rgba(207, 181, 59, 0.2); border-radius: 12px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 12px; color: #CFB53B; font-size: 16px; font-weight: 700;">
                      What the Full Masterclass Includes:
                    </h3>
                    <p style="margin: 0; color: #a3a3a3; font-size: 14px; line-height: 2;">
                      &#x2713; All 10 modules (Blackjack, Baccarat, Poker, Roulette &amp; more)<br>
                      &#x2713; 30+ video lessons with real-world examples<br>
                      &#x2713; Interactive scenario training<br>
                      &#x2713; Advanced bankroll &amp; risk management<br>
                      &#x2713; Casino psychology &amp; tells<br>
                      &#x2713; MMC Cheatsheet Bundle + Beat the Casino Ebook<br>
                      &#x2713; Lifetime access &amp; future updates
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                The difference between the Playbook and the Masterclass is the difference between knowing the rules and understanding the game.
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${data.upgradeUrl}"
                       style="display: inline-block; background-color: #A8001E; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 700; font-size: 18px;">
                      Upgrade to Full Masterclass &mdash; $${data.price}
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; color: #757575; font-size: 14px; line-height: 1.6;">
                Lifetime access. One payment. No subscriptions.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center;">
              <p style="margin: 0 0 10px; color: #757575; font-size: 14px;">
                Questions? Reply to this email or contact support@mikki-mase.com
              </p>
              <p style="margin: 0 0 8px; color: #555555; font-size: 12px;">
                For educational purposes only. No guarantee of winnings. Gambling involves risk.
              </p>
              <p style="margin: 0 0 8px; color: #555555; font-size: 12px;">
                18+ | Gamble Responsibly
              </p>
              <p style="margin: 0; color: #333333; font-size: 12px;">
                You're receiving this because you purchased from mikki-mase.com<br>
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
You've Seen the Framework. Here's the Full Picture.

${greeting}'ve had the Session Playbook for a week now. If you've been applying the fundamentals, you already know this stuff works.

But the Playbook only covers the foundation. The Full Masterclass goes deeper — 10 modules, 30+ lessons, interactive scenarios, and the advanced strategies Mikki actually uses at the table.

What the Full Masterclass Includes:
- All 10 modules (Blackjack, Baccarat, Poker, Roulette & more)
- 30+ video lessons with real-world examples
- Interactive scenario training
- Advanced bankroll & risk management
- Casino psychology & tells
- MMC Cheatsheet Bundle + Beat the Casino Ebook
- Lifetime access & future updates

The difference between the Playbook and the Masterclass is the difference between knowing the rules and understanding the game.

Upgrade to Full Masterclass — $${data.price}: ${data.upgradeUrl}

Lifetime access. One payment. No subscriptions.

---

Questions? Reply to this email or contact support@mikki-mase.com

For educational purposes only. No guarantee of winnings. Gambling involves risk.
18+ | Gamble Responsibly

You're receiving this because you purchased from mikki-mase.com
(c) ${new Date().getFullYear()} Mikki Mase. All rights reserved.
  `.trim();

  return sendEmail({
    to: data.customerEmail,
    subject: "You've seen the framework. Here's the full picture.",
    html,
    text,
  });
}

// ============================================
// ABANDONED CHECKOUT EMAIL (3-step recovery)
// ============================================

export interface AbandonedCheckoutData {
  customerEmail: string;
  productName: string;
  checkoutUrl: string;
  step: 1 | 2 | 3;
}

/**
 * Send abandoned checkout recovery email (3-step sequence)
 * Step 1: 1 hour after abandonment — gentle reminder
 * Step 2: 24 hours — objection handling
 * Step 3: 72 hours — final push
 */
export async function sendAbandonedCheckout(data: AbandonedCheckoutData) {
  const subjects: Record<1 | 2 | 3, string> = {
    1: 'You left something behind',
    2: 'Quick question — what held you back?',
    3: `Last reminder: ${data.productName} — $27`,
  };

  const step1Html = `
              <h2 style="margin: 0 0 20px; color: #ffffff; font-size: 24px; font-weight: 700;">
                You Left Something Behind
              </h2>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                Looks like you were checking out the <strong style="color: #CFB53B;">${data.productName}</strong> but didn't finish.
              </p>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                No pressure &mdash; your cart is still waiting. If you had a technical issue or a question, just reply to this email and we'll sort it out.
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${data.checkoutUrl}"
                       style="display: inline-block; background-color: #A8001E; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 700; font-size: 18px;">
                      Complete Your Order
                    </a>
                  </td>
                </tr>
              </table>
  `;

  const step2Html = `
              <h2 style="margin: 0 0 20px; color: #ffffff; font-size: 24px; font-weight: 700;">
                Quick Question
              </h2>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                You were about to grab the <strong style="color: #CFB53B;">${data.productName}</strong> yesterday. What held you back?
              </p>

              <p style="margin: 0 0 8px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                If it's one of these, here's the honest answer:
              </p>

              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #333;">
                    <p style="margin: 0 0 4px; color: #ffffff; font-size: 15px; font-weight: 600;">"Is this legit?"</p>
                    <p style="margin: 0; color: #a3a3a3; font-size: 14px; line-height: 1.5;">Over 10,000 students. Mikki's framework is built on mathematics, not luck.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #333;">
                    <p style="margin: 0 0 4px; color: #ffffff; font-size: 15px; font-weight: 600;">"Will it work for me?"</p>
                    <p style="margin: 0; color: #a3a3a3; font-size: 14px; line-height: 1.5;">If you can follow a checklist, you can apply this. It's a system, not talent.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px;">
                    <p style="margin: 0 0 4px; color: #ffffff; font-size: 15px; font-weight: 600;">"$27 is still money."</p>
                    <p style="margin: 0; color: #a3a3a3; font-size: 14px; line-height: 1.5;">It's less than one bad hand at any table. The education lasts forever.</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${data.checkoutUrl}"
                       style="display: inline-block; background-color: #A8001E; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 700; font-size: 18px;">
                      Get the ${data.productName}
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; color: #757575; font-size: 14px; line-height: 1.6;">
                Still have a question? Just reply &mdash; a real person reads these.
              </p>
  `;

  const step3Html = `
              <h2 style="margin: 0 0 20px; color: #ffffff; font-size: 24px; font-weight: 700;">
                Last Reminder
              </h2>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                This is the last time we'll email you about the <strong style="color: #CFB53B;">${data.productName}</strong>. No spam, no games.
              </p>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                Here's what it comes down to: for $27, you get the exact session framework that Mikki uses. Bankroll management, risk control, pre- and post-session systems &mdash; the fundamentals that separate educated players from everyone else.
              </p>

              <p style="margin: 0 0 20px; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                If it's not for you, no hard feelings. But if you're still thinking about it, this is your last nudge.
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${data.checkoutUrl}"
                       style="display: inline-block; background-color: #A8001E; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 700; font-size: 18px;">
                      Get It Now &mdash; $27
                    </a>
                  </td>
                </tr>
              </table>
  `;

  const stepContent: Record<1 | 2 | 3, string> = {
    1: step1Html,
    2: step2Html,
    3: step3Html,
  };

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subjects[data.step]}</title>
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

              ${stepContent[data.step]}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center;">
              <p style="margin: 0 0 10px; color: #757575; font-size: 14px;">
                Questions? Reply to this email or contact support@mikki-mase.com
              </p>
              <p style="margin: 0 0 8px; color: #555555; font-size: 12px;">
                For educational purposes only. No guarantee of winnings. Gambling involves risk.
              </p>
              <p style="margin: 0 0 8px; color: #555555; font-size: 12px;">
                18+ | Gamble Responsibly
              </p>
              <p style="margin: 0; color: #333333; font-size: 12px;">
                You're receiving this because you started a checkout on mikki-mase.com<br>
                If you don't want to hear from us, reply with "unsubscribe".<br>
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

  // Plain text versions per step
  const step1Text = `
You Left Something Behind

Looks like you were checking out the ${data.productName} but didn't finish.

No pressure — your cart is still waiting. If you had a technical issue or a question, just reply to this email and we'll sort it out.

Complete Your Order: ${data.checkoutUrl}
  `.trim();

  const step2Text = `
Quick Question

You were about to grab the ${data.productName} yesterday. What held you back?

"Is this legit?"
Over 10,000 students. Mikki's framework is built on mathematics, not luck.

"Will it work for me?"
If you can follow a checklist, you can apply this. It's a system, not talent.

"$27 is still money."
It's less than one bad hand at any table. The education lasts forever.

Get the ${data.productName}: ${data.checkoutUrl}

Still have a question? Just reply — a real person reads these.
  `.trim();

  const step3Text = `
Last Reminder

This is the last time we'll email you about the ${data.productName}. No spam, no games.

Here's what it comes down to: for $27, you get the exact session framework that Mikki uses. Bankroll management, risk control, pre- and post-session systems — the fundamentals that separate educated players from everyone else.

If it's not for you, no hard feelings. But if you're still thinking about it, this is your last nudge.

Get It Now — $27: ${data.checkoutUrl}
  `.trim();

  const stepTexts: Record<1 | 2 | 3, string> = {
    1: step1Text,
    2: step2Text,
    3: step3Text,
  };

  const textFooter = `

---

Questions? Reply to this email or contact support@mikki-mase.com

For educational purposes only. No guarantee of winnings. Gambling involves risk.
18+ | Gamble Responsibly

You're receiving this because you started a checkout on mikki-mase.com
If you don't want to hear from us, reply with "unsubscribe".
(c) ${new Date().getFullYear()} Mikki Mase. All rights reserved.`;

  return sendEmail({
    to: data.customerEmail,
    subject: subjects[data.step],
    html,
    text: stepTexts[data.step] + textFooter,
  });
}

// ============================================
// PLACEHOLDER EXPORTS
// ============================================

export const isResendConfigured = (): boolean => {
  return Boolean(RESEND_API_KEY);
};
