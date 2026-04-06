/**
 * Tier Gating Utilities
 * Central logic for determining user tier and feature access.
 */

export type UserTier = 'masterclass' | 'inner-circle' | 'lifetime-vip';

/** Product keys that map to each tier */
const TIER_MAP: Record<string, UserTier> = {
  masterclass: 'masterclass',
  'inner-circle-monthly': 'inner-circle',
  'inner-circle-yearly': 'inner-circle',
  'lifetime-vip': 'lifetime-vip',
};

/** Tier priority (highest first) */
const TIER_PRIORITY: UserTier[] = ['lifetime-vip', 'inner-circle', 'masterclass'];

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
  'masterclass',
  'inner-circle-monthly',
  'inner-circle-yearly',
  'lifetime-vip',
] as const;

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
