/**
 * CreatorBio — Creator credibility section with image, bio, and media mentions
 * Framer Motion scroll reveal animation
 */
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION, DISTANCE, STAGGER } from '../motion/tokens';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.grid } },
};

const item = {
  hidden: { opacity: 0, y: DISTANCE.reveal },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASE_PRIMARY } },
};

const STATS = [
  { value: '10+', label: 'Years Experience' },
  { value: '30+', label: 'Lessons' },
  { value: '1000s', label: 'Students' },
];

const MEDIA_MENTIONS = ['Forbes', 'Complex', 'Barstool', 'The NY Post', 'TMZ'];

export default function CreatorBio() {
  return (
    <section className="py-16 md:py-24" style={{ background: '#0A0A0A' }}>
      <motion.div
        className="mx-auto max-w-5xl px-4 sm:px-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Image */}
          <motion.div variants={item} className="relative">
            <div
              className="overflow-hidden rounded-2xl"
              style={{ border: '1px solid #2D2D2D' }}
            >
              <img
                src="/images/mikki-main-1.webp"
                alt="Mikki Mase — Professional gambler and educator"
                className="h-auto w-full object-cover"
                loading="lazy"
                width={600}
                height={750}
              />
            </div>
            {/* Gold accent line */}
            <div
              className="absolute -bottom-3 left-6 right-6 h-1 rounded-full"
              style={{ background: '#CFB53B' }}
            />
          </motion.div>

          {/* Content */}
          <motion.div variants={item} className="space-y-6">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: '#CFB53B' }}
            >
              Meet the Instructor
            </span>

            <h2 className="text-3xl font-black text-white md:text-4xl">About Mikki Mase</h2>

            <p className="text-sm leading-relaxed text-gray-400">
              Professional gambler and educator known for his analytical approach to casino games.
              Banned from 150+ casinos worldwide after winning over $32 million, Mikki now teaches
              the decision-making frameworks and bankroll strategies that changed his game.
            </p>

            {/* Media mentions */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Featured in
              </p>
              <div className="flex flex-wrap gap-3">
                {MEDIA_MENTIONS.map((name) => (
                  <span
                    key={name}
                    className="rounded-lg px-3 py-1.5 text-xs font-bold text-gray-400"
                    style={{ background: '#1A1A1A', border: '1px solid #2D2D2D' }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-2">
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-black" style={{ color: '#CFB53B' }}>
                    {value}
                  </div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <p
              className="rounded-lg px-4 py-3 text-xs leading-relaxed text-gray-500"
              style={{ background: '#111', border: '1px solid #1A1A1A' }}
            >
              Past results do not guarantee future outcomes. All educational content is for
              informational purposes only.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
