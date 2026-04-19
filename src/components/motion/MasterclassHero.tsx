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
  /** True when the viewing user already owns a masterclass-family entitlement.
   *  Swaps the price anchor + "Get the Masterclass" buy CTA for a welcome-back
   *  message and a "Continue" link. */
  isOwner?: boolean;
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

export default function MasterclassHero({ totalLessons, accessDenied = false, isOwner = false }: Props) {
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
          Casino Decision Framework
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
          THE MIKKI MASE <span style={{ color: 'var(--color-gold)' }}>MASTERCLASS</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-base md:text-lg mx-auto mb-6"
          style={{ color: 'var(--color-gray-400)', maxWidth: '48ch', lineHeight: 1.6 }}
        >
          Bankroll discipline, game selection, and risk management for serious players.
          Educational content from Mikki Mase.
        </motion.p>

        {/* Price anchor + access-denied banner — non-owners only */}
        {!isOwner && (
          <>
            <motion.div
              variants={item}
              className="flex items-center justify-center gap-3 mb-3"
            >
              <span className="text-3xl md:text-4xl font-black text-white">$27</span>
              <span className="text-lg line-through" style={{ color: 'var(--color-gray-600)' }}>$97</span>
              <span
                className="text-xs font-bold uppercase px-2 py-1 rounded"
                style={{ background: 'rgba(207, 181, 59, 0.15)', color: 'var(--color-gold)' }}
              >
                Launch Price
              </span>
            </motion.div>
            <motion.p
              variants={item}
              className="text-xs mb-6"
              style={{ color: 'var(--color-gray-600)' }}
            >
              One-time payment &middot; Lifetime access &middot; 7-day money-back guarantee
            </motion.p>

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
          </>
        )}

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
        >
          {isOwner ? (
            <a
              href="/masterclass/course"
              className="inline-flex items-center justify-center font-bold text-white min-h-[52px] rounded-xl text-lg px-8 py-4 transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ backgroundColor: 'rgb(var(--accent-red))' }}
            >
              Continue your masterclass
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ) : (
            <>
              <a
                href="/checkout/playbook"
                className="inline-flex items-center justify-center font-bold text-black min-h-[52px] rounded-xl text-lg px-8 py-4 transition-all hover:brightness-110 active:scale-[0.98]"
                style={{ backgroundColor: '#CFB53B' }}
              >
                Get the Masterclass — $27
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/masterclass/course/mindset-disclaimer/assessment"
                className="btn btn-tertiary text-lg px-8 py-4"
              >
                Try Free Assessment
              </a>
            </>
          )}
        </motion.div>

        {/* Mini proof */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-6 text-xs"
          style={{ color: 'var(--color-gray-500)' }}
        >
          <span>Instant access</span>
          <span style={{ color: 'var(--color-gray-700)' }}>&bull;</span>
          <span>{totalLessons}+ lessons</span>
          <span style={{ color: 'var(--color-gray-700)' }}>&bull;</span>
          <span>7-day guarantee</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
