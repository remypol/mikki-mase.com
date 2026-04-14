/**
 * Tier Gating Utilities
 * Central logic for determining user tier and feature access.
 *
 * Tiers (highest → lowest): lifetime-vip > inner-circle > masterclass
 * The $27 purchase grants 'masterclass' tier (full course access).
 * Inner Circle ($29/mo) adds: tools, AI advisor, community.
 */

export type UserTier = 'masterclass' | 'inner-circle' | 'lifetime-vip';

/** Product keys that map to each tier */
const TIER_MAP: Record<string, UserTier> = {
  // Active products
  'session-playbook': 'masterclass',       // $27 — full course access
  'inner-circle-monthly-v2': 'inner-circle',
  'inner-circle-annual-v2': 'inner-circle',
  // Deprecated v2 products (backwards compat — still grant masterclass)
  'session-toolkit': 'masterclass',
  'full-masterclass': 'masterclass',
  // Legacy products (existing customers)
  masterclass: 'masterclass',
  'inner-circle-monthly': 'inner-circle',
  'inner-circle-yearly': 'inner-circle',
  'lifetime-vip': 'lifetime-vip',
};

/** Tier priority (highest first) */
const TIER_PRIORITY: UserTier[] = ['lifetime-vip', 'inner-circle', 'masterclass'];

export function getTierFromProductKey(productKey: string): UserTier | null {
  // Runtime fallback for any cached 'playbook' values
  if (productKey === 'playbook') return 'masterclass';
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
  // Active
  'session-playbook',
  'inner-circle-monthly-v2',
  'inner-circle-annual-v2',
  // Deprecated (still valid for existing customers)
  'session-toolkit',
  'full-masterclass',
  'masterclass',
  'inner-circle-monthly',
  'inner-circle-yearly',
  'lifetime-vip',
] as const;

export function hasMasterclassAccess(tier: UserTier): boolean {
  return true; // All tiers include masterclass
}

export function hasInnerCircleAccess(tier: UserTier): boolean {
  return tier === 'inner-circle' || tier === 'lifetime-vip';
}

export function hasVipAccess(tier: UserTier): boolean {
  return tier === 'lifetime-vip';
}

export const TIER_LABELS: Record<UserTier, string> = {
  masterclass: 'Masterclass',
  'inner-circle': 'Inner Circle',
  'lifetime-vip': 'Lifetime VIP',
};
