/**
 * PricingSection — Premium pricing card with assured, stable entrance
 * Subtle scale + fade for a confident, luxury feel
 */
import { motion } from 'framer-motion';
import { EASE_SMOOTH, EASE_MICRO } from './tokens';
import ScrollReveal from './ScrollReveal';
import MasterclassBuyButton from '../MasterclassBuyButton';

export default function PricingSection() {
  return (
    <section
      className="py-16 md:py-20"
      style={{ background: '#0A0A0A', borderTop: '1px solid #1A1A1A' }}
    >
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.987 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: EASE_SMOOTH }}
          className="rounded-2xl p-8 text-center"
          style={{
            background: '#111',
            border: '1px solid rgba(207, 181, 59, 0.2)',
            boxShadow: '0 0 60px rgba(207, 181, 59, 0.08)',
          }}
        >
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#CFB53B' }}
          >
            Full Masterclass Access
          </span>

          <div className="flex items-center justify-center gap-3 mt-4 mb-2">
            <span className="text-4xl md:text-5xl font-black text-white">$47</span>
            <span className="text-xl line-through" style={{ color: '#6B6B6B' }}>
              $297
            </span>
          </div>

          <p className="text-xs mb-6" style={{ color: '#9A9A9A' }}>
            One-time payment &middot; Lifetime access &middot; All future updates
          </p>

          <div className="mb-4">
            <MasterclassBuyButton variant="pricing" className="w-full text-lg py-4" />
          </div>

          <a
            href="/masterclass/course/mindset-disclaimer/assessment"
            className="btn btn-tertiary btn-full text-sm py-3"
          >
            Or Try Free Assessment First
          </a>

          {/* Guarantee */}
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid #2D2D2D' }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg
                className="w-5 h-5"
                style={{ color: '#059669' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="text-sm font-bold" style={{ color: '#059669' }}>
                7-Day Money-Back Guarantee
              </span>
            </div>
            <p className="text-xs" style={{ color: '#9A9A9A' }}>
              Go through the masterclass. If it doesn't sharpen your casino discipline
              and decision-making, email us within 7 days for a full refund. No questions
              asked.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
