/**
 * Motion Design Tokens — Premium/Luxury animation system
 * Consistent timing and easing across all animated components
 */

// Primary ease — elegant, slow deceleration (Apple-level)
export const EASE_PRIMARY = [0.22, 1, 0.36, 1] as const;

// Secondary ease — slightly smoother, great for counters/reveals
export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

// Micro ease — for tiny hover interactions
export const EASE_MICRO = [0.2, 0.8, 0.2, 1] as const;

// Durations
export const DURATION = {
  hero: 1.05,
  reveal: 0.8,
  card: 0.72,
  counter: 1.8,
  micro: 0.24,
} as const;

// Stagger delays
export const STAGGER = {
  hero: 0.12,
  grid: 0.08,
  list: 0.06,
} as const;

// Movement distances (keep small for luxury)
export const DISTANCE = {
  hero: 18,
  reveal: 18,
  card: 18,
  pricing: 24,
} as const;
