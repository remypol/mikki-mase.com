/**
 * Secure Download Token System
 * Generates and verifies time-limited download tokens
 *
 * Setup:
 * 1. Add DOWNLOAD_TOKEN_SECRET to environment variables
 * 2. Generate secret: openssl rand -hex 32
 *
 * Environment variables required:
 * - DOWNLOAD_TOKEN_SECRET: Secret key for signing tokens
 * - DOWNLOAD_TOKEN_EXPIRY: Expiry in seconds (default: 604800 = 7 days)
 */

import type { DownloadToken } from '../config/shop/types';

// ============================================
// CONFIGURATION
// ============================================

const TOKEN_SECRET = import.meta.env.DOWNLOAD_TOKEN_SECRET || 'dev-secret-change-in-production';
const TOKEN_EXPIRY = parseInt(import.meta.env.DOWNLOAD_TOKEN_EXPIRY || '604800', 10); // 7 days

// ============================================
// TOKEN GENERATION
// ============================================

/**
 * Generate a secure download token
 */
export async function generateDownloadToken(
  productId: string,
  email: string
): Promise<DownloadToken> {
  const now = Date.now();
  const expiresAt = now + TOKEN_EXPIRY * 1000;

  // Create token payload
  const payload = {
    productId,
    email,
    createdAt: now,
    expiresAt,
    nonce: crypto.randomUUID(),
  };

  // Sign the token
  const token = await signPayload(payload);

  return {
    token,
    productId,
    email,
    createdAt: now,
    expiresAt,
    used: false,
  };
}

/**
 * Sign a payload using HMAC-SHA256
 */
async function signPayload(payload: Record<string, unknown>): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(payload));
  const keyData = encoder.encode(TOKEN_SECRET);

  // Import key for HMAC
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  // Sign the data
  const signature = await crypto.subtle.sign('HMAC', key, data);

  // Encode as base64url
  const base64Payload = btoa(JSON.stringify(payload))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  const base64Signature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return `${base64Payload}.${base64Signature}`;
}

// ============================================
// TOKEN VERIFICATION
// ============================================

export interface VerifyResult {
  valid: boolean;
  productId?: string;
  email?: string;
  error?: string;
}

/**
 * Verify a download token
 */
export async function verifyDownloadToken(token: string): Promise<VerifyResult> {
  try {
    const [base64Payload, base64Signature] = token.split('.');

    if (!base64Payload || !base64Signature) {
      return { valid: false, error: 'Invalid token format' };
    }

    // Decode payload
    const payloadJson = atob(
      base64Payload.replace(/-/g, '+').replace(/_/g, '/') +
        '='.repeat((4 - (base64Payload.length % 4)) % 4)
    );
    const payload = JSON.parse(payloadJson);

    // Verify signature
    const expectedToken = await signPayload(payload);
    const [, expectedSignature] = expectedToken.split('.');

    if (base64Signature !== expectedSignature) {
      return { valid: false, error: 'Invalid signature' };
    }

    // Check expiry
    if (Date.now() > payload.expiresAt) {
      return { valid: false, error: 'Token expired' };
    }

    return {
      valid: true,
      productId: payload.productId,
      email: payload.email,
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return { valid: false, error: 'Token verification failed' };
  }
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
// PLACEHOLDER EXPORTS
// ============================================

export const isDownloadSystemConfigured = (): boolean => {
  return TOKEN_SECRET !== 'dev-secret-change-in-production';
};
