/**
 * FreePreviewBanner — Animated free preview CTA section
 * Subtle gold-bordered section with scroll reveal
 */
import ScrollReveal from './ScrollReveal';

export default function FreePreviewBanner() {
  return (
    <section
      style={{
        background:
          'linear-gradient(135deg, rgba(207, 181, 59, 0.08) 0%, rgba(207, 181, 59, 0.02) 100%)',
        borderTop: '1px solid rgba(207, 181, 59, 0.15)',
        borderBottom: '1px solid rgba(207, 181, 59, 0.15)',
      }}
    >
      <ScrollReveal className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-12 text-center">
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: 'var(--color-gold)' }}
        >
          No credit card required
        </span>
        <h2 className="text-xl md:text-2xl font-black text-white mt-2 mb-3">
          Try Module 1 Free
        </h2>
        <p
          className="text-sm mb-6 mx-auto"
          style={{ color: 'var(--color-gray-400)', maxWidth: '42ch' }}
        >
          Get the Gambler's Code lesson and take the Casino IQ Assessment to discover
          your strengths and leaks — completely free.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/masterclass/course/mindset-disclaimer/the-gamblers-code"
            className="btn btn-secondary px-6 py-3 text-base"
          >
            Start Free Module
          </a>
          <a
            href="/masterclass/course/mindset-disclaimer/assessment"
            className="btn btn-tertiary px-6 py-3 text-base"
          >
            Take Casino IQ Assessment
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
