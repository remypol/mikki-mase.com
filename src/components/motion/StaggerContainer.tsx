/**
 * StaggerContainer + StaggerItem — Staggered children reveal
 * Children animate in sequence when the container enters the viewport
 */
import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION, STAGGER, DISTANCE } from './tokens';

interface ContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  baseDelay?: number;
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface ItemProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const containerVariants = (stagger: number, baseDelay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: baseDelay,
    },
  },
});

const itemVariants = {
  hidden: {
    opacity: 0,
    y: DISTANCE.card,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION.card,
      ease: EASE_PRIMARY,
    },
  },
};

export function StaggerContainer({
  children,
  staggerDelay = STAGGER.grid,
  baseDelay = 0.04,
  threshold = 0.15,
  className = '',
  style,
}: ContainerProps) {
  return (
    <motion.div
      variants={containerVariants(staggerDelay, baseDelay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', style }: ItemProps) {
  return (
    <motion.div variants={itemVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}
