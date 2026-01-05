/**
 * ChapterList Component
 * Interactive accordion for chapter breakdown
 */

import { useState } from 'react';

interface Chapter {
  number: number;
  title: string;
  bullets: string[];
}

interface ChapterListProps {
  chapters: Chapter[];
  defaultOpen?: number;
}

declare const gtag: Function | undefined;

export default function ChapterList({ chapters, defaultOpen = 1 }: ChapterListProps) {
  const [openChapter, setOpenChapter] = useState<number | null>(defaultOpen);

  const toggleChapter = (num: number) => {
    setOpenChapter(openChapter === num ? null : num);

    // Track analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'view_item_details', { chapter: `Chapter ${num}` });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-3xl mx-auto px-4">

        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            What's Inside
          </h2>
          <p className="text-gray-400 text-lg">
            11 chapters. No fluff. No mercy.
          </p>
        </div>

        {/* Chapter list */}
        <div className="space-y-3">
          {chapters.map((chapter) => (
            <div
              key={chapter.number}
              className={`
                border rounded-lg overflow-hidden transition-all duration-300
                ${openChapter === chapter.number
                  ? 'border-[#CFB53B] bg-gray-800/50'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'}
              `}
            >
              {/* Chapter header (always visible) */}
              <button
                onClick={() => toggleChapter(chapter.number)}
                className="w-full px-5 py-4 flex items-center justify-between text-left
                           min-h-[44px] focus:outline-none focus-visible:ring-2
                           focus-visible:ring-[#CFB53B] focus-visible:ring-offset-2
                           focus-visible:ring-offset-black"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#CFB53B] text-xl">🔥</span>
                  <div>
                    <span className="text-gray-500 text-sm uppercase tracking-wider block">
                      Chapter {chapter.number}
                    </span>
                    <h3 className="text-white font-semibold text-lg">
                      {chapter.title}
                    </h3>
                  </div>
                </div>

                {/* Toggle icon */}
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0
                             ${openChapter === chapter.number ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Chapter content (collapsible) */}
              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${openChapter === chapter.number ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="px-5 pb-5 pt-2 border-t border-gray-700/50">
                  <ul className="space-y-3">
                    {chapter.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <svg className="w-5 h-5 text-[#CFB53B] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
