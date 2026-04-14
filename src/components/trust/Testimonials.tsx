/**
 * Testimonials — Trust-building testimonial grid
 * Accepts testimonials array as prop, gold stars, stagger animation
 */
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION, DISTANCE, STAGGER } from '../motion/tokens';

interface Testimonial {
  name: string;
  rating: number;
  quote: string;
  whatChanged: string;
}

interface Props {
  testimonials: Testimonial[];
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.grid } },
};

const item = {
  hidden: { opacity: 0, y: DISTANCE.card },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.card, ease: EASE_PRIMARY } },
};

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4"
          style={{ color: i < count ? '#CFB53B' : '#333' }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ testimonials }: Props) {
  return (
    <section className="py-16 md:py-24" style={{ background: '#0A0A0A' }}>
      <motion.div
        className="mx-auto max-w-5xl px-4 sm:px-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {/* Header */}
        <motion.div variants={item} className="mb-12 text-center">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#CFB53B' }}
          >
            Student Results
          </span>
          <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">
            Better Decisions, Not Empty Promises
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={item}
              className="rounded-xl p-6"
              style={{
                background: '#111',
                border: '1px solid #2D2D2D',
              }}
            >
              <Stars count={t.rating} />

              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Name + badge */}
              <div className="mt-5 flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{t.name}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: 'rgba(22, 163, 74, 0.1)',
                    color: '#16A34A',
                    border: '1px solid rgba(22, 163, 74, 0.2)',
                  }}
                >
                  Verified Student
                </span>
              </div>

              {/* What changed */}
              <div
                className="mt-4 rounded-lg px-3 py-2"
                style={{ background: '#0A0A0A', border: '1px solid #1A1A1A' }}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                  What changed:
                </span>
                <p className="mt-1 text-xs leading-relaxed text-gray-400">{t.whatChanged}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
