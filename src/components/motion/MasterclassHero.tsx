/**
 * MasterclassHero — Animated hero section with staggered text reveal
 * Premium, editorial entrance: eyebrow → headline → body → price → CTAs → trust
 */
import { motion } from 'framer-motion';
import { EASE_PRIMARY, STAGGER } from './tokens';
import MasterclassBuyButton from '../MasterclassBuyButton';

interface Props {
  totalLessons: number;
  accessDenied?: boolean;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: STAGGER.hero,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: EASE_PRIMARY },
  },
};

const headline = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE_PRIMARY },
  },
};

export default function MasterclassHero({ totalLessons, accessDenied = false }: Props) {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ background: '#000', minHeight: 'min(85vh, 720px)' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(207, 181, 59, 0.12) 0%, transparent 60%)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center py-16 md:py-24"
      >
        <motion.span
          variants={item}
          className="eyebrow inline-block mb-4"
        >
          From the man banned from 100+ casinos
        </motion.span>

        <motion.h1
          variants={headline}
          className="text-white mb-5 font-black"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
          }}
        >
          THE MIKKI MASE <span style={{ color: '#CFB53B' }}>MASTERCLASS</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-base md:text-lg mx-auto mb-6"
          style={{ color: '#BEBEBE', maxWidth: '48ch', lineHeight: 1.6 }}
        >
          The discipline, strategy, and decision-making behind $52M+ in winnings — now
          available as an instant-access masterclass.
        </motion.p>

        {/* Price anchor */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="text-3xl md:text-4xl font-black text-white">$47</span>
          <span className="text-lg line-through" style={{ color: '#6B6B6B' }}>$297</span>
          <span
            className="text-xs font-bold uppercase px-2 py-1 rounded"
            style={{ background: 'rgba(207, 181, 59, 0.15)', color: '#CFB53B' }}
          >
            Launch Price
          </span>
        </motion.div>

        {/* Access denied banner */}
        {accessDenied && (
          <motion.div
            variants={item}
            className="mb-6 px-4 py-3 rounded-xl text-sm text-center"
            style={{
              background: 'rgba(168, 0, 30, 0.15)',
              border: '1px solid rgba(168, 0, 30, 0.3)',
              color: '#ff8a8a',
            }}
          >
            You're signed in but don't have access yet. Purchase below to unlock the
            masterclass.
          </motion.div>
        )}

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
        >
          <MasterclassBuyButton variant="hero" className="text-lg px-8 py-4" />
          <a
            href="/masterclass/course/mindset-disclaimer/assessment"
            className="btn btn-tertiary text-lg px-8 py-4"
          >
            Try Free Assessment
          </a>
        </motion.div>

        {/* Mini proof */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-6 text-xs"
          style={{ color: '#9A9A9A' }}
        >
          <span>Instant access</span>
          <span style={{ color: '#3A3A3A' }}>&bull;</span>
          <span>{totalLessons}+ lessons</span>
          <span style={{ color: '#3A3A3A' }}>&bull;</span>
          <span>7-day guarantee</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
