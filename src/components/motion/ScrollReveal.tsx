/**
 * ScrollReveal — Reusable scroll-triggered reveal animation
 * Premium easing with configurable direction
 */
import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION, DISTANCE } from './tokens';

interface Props {
  children: ReactNode;
  /** Vertical offset (positive = enters from below) */
  y?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Additional className */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children,
  y = DISTANCE.reveal,
  duration = DURATION.reveal,
  delay = 0,
  className = '',
  style,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, delay, ease: EASE_PRIMARY }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
