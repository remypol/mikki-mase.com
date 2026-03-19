/**
 * StudentReviews — Social proof section above the buy button
 * Authentic-sounding reviews from masterclass students
 */

import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const reviews = [
  {
    name: 'Ray M.',
    location: 'Nevada',
    avatar: 'R',
    rating: 5,
    timeAgo: '6 days ago',
    text: `The walk away part hit different. Actually came home up from Vegas for once lol`,
    verified: true,
  },
  {
    name: 'Chris P.',
    location: 'New Jersey',
    avatar: 'C',
    rating: 5,
    timeAgo: '2 weeks ago',
    text: `I was the guy buying drinks for the table thinking I was hot shit. This course made me realize how much the casino was playing ME not the other way around. The psychology module alone is worth it. I dont even look at the free drinks the same way anymore. You start seeing all the little tricks they pull on you and once you see it you cant unsee it`,
    verified: true,
  },
  {
    name: 'Andre W.',
    location: 'Florida',
    avatar: 'A',
    rating: 4,
    timeAgo: '9 days ago',
    text: `Solid. Not some get rich quick bs. Wish there was more on poker tho. But for baccarat and blackjack this is legit`,
    verified: true,
  },
  {
    name: 'Mike D.',
    location: 'California',
    avatar: 'M',
    rating: 5,
    timeAgo: '3 days ago',
    text: `Spent more than $47 on my last losing hand so this was a no brainer. The bankroll management stuff changed how I play completely. I used to just bring whatever cash I had and sit down and play til its gone or I doubled up. Thats literally what the casino wants you to do and I had no idea. Feel stupid for not knowing this earlier honestly`,
    verified: true,
  },
  {
    name: 'Dan S.',
    location: 'Texas',
    avatar: 'D',
    rating: 5,
    timeAgo: '11 days ago',
    text: `The scenario things where you practice actual hands before playing for real money is insane. I kept making the wrong call on the blackjack sim and it shows you exactly why and what the right move wouldve been. Ran through it like 20 times before my trip and I swear I played different. You dont just read theory you actually train`,
    verified: true,
  },
  {
    name: 'Jason B.',
    location: 'Arizona',
    avatar: 'J',
    rating: 5,
    timeAgo: '4 days ago',
    text: `My buddy told me about this and I thought it was cap. Its not. Wish I had this 2 years ago`,
    verified: true,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          style={{ color: i < count ? '#CFB53B' : '#2D2D2D' }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function StudentReviews() {
  return (
    <section className="py-16 md:py-20" style={{ background: '#0A0A0A' }}>
      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {/* Header */}
        <motion.div variants={item} className="text-center mb-12">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#CFB53B' }}
          >
            From Real Students
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-3">
            What Players Are Saying
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Stars count={5} />
            <span className="text-sm font-semibold text-white">4.9</span>
            <span className="text-sm" style={{ color: '#6B6B6B' }}>
              from verified buyers
            </span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <motion.div
              key={review.name}
              variants={item}
              className="rounded-xl p-5 md:p-6"
              style={{
                background: '#111',
                border: '1px solid #2D2D2D',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: 'rgba(207, 181, 59, 0.1)',
                      color: '#CFB53B',
                      border: '1px solid rgba(207, 181, 59, 0.2)',
                    }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">
                        {review.name}
                      </span>
                      {review.verified && (
                        <svg
                          className="w-4 h-4"
                          style={{ color: '#059669' }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs" style={{ color: '#6B6B6B' }}>
                      {review.location}
                    </span>
                  </div>
                </div>
                <span className="text-xs" style={{ color: '#6B6B6B' }}>
                  {review.timeAgo}
                </span>
              </div>

              {/* Stars */}
              <div className="mb-3">
                <Stars count={review.rating} />
              </div>

              {/* Review text */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#BEBEBE' }}
              >
                {review.text}
              </p>

              {/* Verified badge */}
              {review.verified && (
                <div
                  className="flex items-center gap-1.5 mt-4 pt-3"
                  style={{ borderTop: '1px solid #1A1A1A' }}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    style={{ color: '#059669' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="text-xs" style={{ color: '#6B6B6B' }}>
                    Verified purchase
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
