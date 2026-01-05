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
// PLACEHOLDER EXPORTS
// ============================================

export const isResendConfigured = (): boolean => {
  return Boolean(RESEND_API_KEY);
};
