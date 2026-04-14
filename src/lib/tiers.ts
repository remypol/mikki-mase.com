/**
 * Tier Gating Utilities
 * Central logic for determining user tier and feature access.
 */

export type UserTier = 'playbook' | 'masterclass' | 'inner-circle' | 'lifetime-vip';

/** Product keys that map to each tier */
const TIER_MAP: Record<string, UserTier> = {
  // v2 funnel products
  'session-playbook': 'playbook',
  'session-toolkit': 'playbook',
  'full-masterclass': 'masterclass',
  'inner-circle-monthly-v2': 'inner-circle',
  'inner-circle-annual-v2': 'inner-circle',
  // Legacy products (existing customers)
  masterclass: 'masterclass',
  'inner-circle-monthly': 'inner-circle',
  'inner-circle-yearly': 'inner-circle',
  'lifetime-vip': 'lifetime-vip',
};

/** Tier priority (highest first) */
const TIER_PRIORITY: UserTier[] = ['lifetime-vip', 'inner-circle', 'masterclass', 'playbook'];

export function getTierFromProductKey(productKey: string): UserTier | null {
  return TIER_MAP[productKey] ?? null;
}

export function getHighestTier(productKeys: string[]): UserTier | null {
  const tiers = productKeys
    .map(getTierFromProductKey)
    .filter((t): t is UserTier => t !== null);
  return TIER_PRIORITY.find((t) => tiers.includes(t)) ?? null;
}

/** All valid product keys that grant course access */
export const ALL_ENTITLEMENT_KEYS = [
  // v2 funnel
  'session-playbook',
  'session-toolkit',
  'full-masterclass',
  'inner-circle-monthly-v2',
  'inner-circle-annual-v2',
  // Legacy
  'masterclass',
  'inner-circle-monthly',
  'inner-circle-yearly',
  'lifetime-vip',
] as const;

export function hasPlaybookAccess(tier: UserTier): boolean {
  return true; // All tiers include playbook content
}

export function hasMasterclassAccess(tier: UserTier): boolean {
  return tier === 'masterclass' || tier === 'inner-circle' || tier === 'lifetime-vip';
}

export function hasInnerCircleAccess(tier: UserTier): boolean {
  return tier === 'inner-circle' || tier === 'lifetime-vip';
}

export function hasVipAccess(tier: UserTier): boolean {
  return tier === 'lifetime-vip';
}

export const TIER_LABELS: Record<UserTier, string> = {
  playbook: 'Session Playbook',
  masterclass: 'Masterclass',
  'inner-circle': 'Inner Circle',
  'lifetime-vip': 'Lifetime VIP',
};
