/**
 * CredibilityStrip — Animated stat counters that count up on scroll
 * Premium count-up with staggered reveal
 */
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import { EASE_PRIMARY, STAGGER } from './tokens';

interface Props {
  moduleCount: number;
  totalLessons: number;
}

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.grid,
      delayChildren: 0.04,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_PRIMARY },
  },
};

export default function CredibilityStrip({ moduleCount, totalLessons }: Props) {
  return (
    <section
      style={{
        background: 'var(--color-gray-950)',
        borderTop: '1px solid #1A1A1A',
        borderBottom: '1px solid #1A1A1A',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center"
        >
          <motion.div variants={item}>
            <div className="text-2xl md:text-3xl font-black" style={{ color: 'var(--color-gold)' }}>
              <AnimatedCounter target={32} prefix="$" suffix="M+" />
            </div>
            <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--color-gray-500)' }}>
              Won Gambling
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="text-2xl md:text-3xl font-black text-white">
              <AnimatedCounter target={150} suffix="+" />
            </div>
            <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--color-gray-500)' }}>
              Casinos Banned From
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="text-2xl md:text-3xl font-black text-white">
              <AnimatedCounter target={moduleCount} />
            </div>
            <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--color-gray-500)' }}>
              In-Depth Modules
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="text-2xl md:text-3xl font-black text-white">
              <AnimatedCounter target={totalLessons} suffix="+" />
            </div>
            <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--color-gray-500)' }}>
              Lessons & Scenarios
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
