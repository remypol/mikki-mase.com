/**
 * Secure Download Token System
 * Generates and verifies time-limited download tokens using JWT
 *
 * Setup:
 * 1. npm install jsonwebtoken
 * 2. Add DOWNLOAD_TOKEN_SECRET to environment variables
 * 3. Generate secret: openssl rand -hex 32
 *
 * Environment variables required:
 * - DOWNLOAD_TOKEN_SECRET: Secret key for signing tokens
 * - DOWNLOAD_TOKEN_EXPIRY: Expiry in seconds (default: 604800 = 7 days)
 */

import jwt from 'jsonwebtoken';

// ============================================
// CONFIGURATION
// ============================================

const TOKEN_SECRET = import.meta.env.DOWNLOAD_TOKEN_SECRET || 'dev-secret-change-in-production';
const TOKEN_EXPIRY = parseInt(import.meta.env.DOWNLOAD_TOKEN_EXPIRY || '604800', 10); // 7 days

// ============================================
// TOKEN TYPES
// ============================================

interface DownloadTokenPayload {
  productId: string;
  email: string;
  sessionId: string;
}

export interface VerifyResult {
  valid: boolean;
  productId?: string;
  email?: string;
  sessionId?: string;
  error?: string;
}

// ============================================
// TOKEN GENERATION
// ============================================

/**
 * Generate a secure download token using JWT
 */
export function generateDownloadToken(
  productId: string,
  email: string,
  sessionId: string
): string {
  const payload: DownloadTokenPayload = {
    productId,
    email,
    sessionId,
  };

  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRY });
}

// ============================================
// TOKEN VERIFICATION
// ============================================

/**
 * Verify a download token
 */
export function verifyDownloadToken(token: string): VerifyResult {
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET) as DownloadTokenPayload;

    return {
      valid: true,
      productId: decoded.productId,
      email: decoded.email,
      sessionId: decoded.sessionId,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { valid: false, error: 'Token expired' };
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return { valid: false, error: 'Invalid token' };
    }
    console.error('Token verification error:', error);
    return { valid: false, error: 'Token verification failed' };
  }
}

// ============================================
// DOWNLOAD PATHS
// ============================================

/**
 * Get download file URL for a product
 * Files are hosted on Cloudflare R2
 */
export function getDownloadPath(productId: string): string {
  const paths: Record<string, string> = {
    'bedroom-boss': 'https://pub-5da1fec1f5ee477585a0dcc3b9e811d0.r2.dev/bedroom-boss.pdf',
    // Add more products as needed
  };

  return paths[productId] || '';
}

// ============================================
// DOWNLOAD URL
// ============================================

const SITE_URL = import.meta.env.SITE_URL || 'https://mikki-mase.com';

/**
 * Generate a download URL for a token
 */
export function getDownloadUrl(token: string): string {
  return `${SITE_URL}/download/${token}`;
}

// ============================================
// HELPER
// ============================================

export const isDownloadSystemConfigured = (): boolean => {
  return TOKEN_SECRET !== 'dev-secret-change-in-production';
};
