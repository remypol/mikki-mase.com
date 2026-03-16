/**
 * AnimatedCounter — Counts up a number when it enters the viewport
 * Calm, premium count-up with luxury easing
 */
import { useRef, useEffect, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import { EASE_SMOOTH, DURATION } from './tokens';

interface Props {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = DURATION.counter,
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const controls = animate(0, target, {
      duration,
      ease: EASE_SMOOTH,
      onUpdate(value) {
        setDisplayValue(Number.isInteger(target) ? Math.round(value) : Math.round(value * 10) / 10);
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
