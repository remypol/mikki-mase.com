/**
 * WhatThisIs — Two-column "What This Is / What This Is Not" trust builder
 * Green checkmarks vs red X marks, framer-motion fade-in
 */
import { motion } from 'framer-motion';
import { EASE_PRIMARY, DURATION, DISTANCE, STAGGER } from '../motion/tokens';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.grid } },
};

const item = {
  hidden: { opacity: 0, y: DISTANCE.reveal },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.card, ease: EASE_PRIMARY } },
};

const IS_ITEMS = [
  'Education on decision-making, bankroll management, and game analysis',
  'Frameworks used by experienced players',
  'Tools to plan and review your sessions',
];

const IS_NOT_ITEMS = [
  'A guaranteed winning system',
  'A way to "beat the house" every time',
  'Financial or investment advice',
  'A bot, cheat, or exploit',
];

function CheckIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function WhatThisIs() {
  return (
    <section className="py-16 md:py-24">
      <motion.div
        className="mx-auto max-w-5xl px-4 sm:px-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div
          className="grid gap-6 rounded-2xl p-6 md:grid-cols-2 md:gap-0 md:divide-x md:divide-gray-800 md:p-0"
          style={{
            background: '#111',
            borderTop: '3px solid #CFB53B',
          }}
        >
          {/* What This IS */}
          <motion.div variants={item} className="space-y-5 p-2 md:p-8">
            <h3 className="text-lg font-black uppercase tracking-wider text-white">
              What This Is
            </h3>
            <ul className="space-y-4">
              {IS_ITEMS.map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm leading-relaxed text-gray-300">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* What This IS NOT */}
          <motion.div variants={item} className="space-y-5 p-2 md:p-8">
            <h3 className="text-lg font-black uppercase tracking-wider text-white">
              What This Is Not
            </h3>
            <ul className="space-y-4">
              {IS_NOT_ITEMS.map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <XIcon />
                  <span className="text-sm leading-relaxed text-gray-300">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
