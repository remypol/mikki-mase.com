/**
 * FinalCTA — Animated final call-to-action section
 * Simple reveal with staggered headline + buttons
 */
import { motion } from 'framer-motion';
import { EASE_PRIMARY, STAGGER } from './tokens';
import MasterclassBuyButton from '../MasterclassBuyButton';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: STAGGER.hero,
      delayChildren: 0.04,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_PRIMARY },
  },
};

export default function FinalCTA() {
  return (
    <section
      className="py-16 md:py-20"
      style={{ background: '#000', borderTop: '1px solid #1A1A1A' }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-2xl mx-auto px-4 sm:px-6 text-center"
      >
        <motion.h2
          variants={item}
          className="text-2xl md:text-3xl font-black text-white mb-3"
        >
          Stop Playing Blind. Start Thinking Like Mikki.
        </motion.h2>

        <motion.p
          variants={item}
          className="text-sm mb-8 mx-auto"
          style={{ color: 'var(--color-gray-400)', maxWidth: '40ch' }}
        >
          One bad session costs more than $27. One good framework saves you thousands.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <MasterclassBuyButton variant="compact" className="text-lg px-8 py-4" />
          <a
            href="/masterclass/course/mindset-disclaimer/the-gamblers-code"
            className="btn btn-tertiary px-8 py-4"
          >
            Start Module 1 Free
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
