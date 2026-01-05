/**
 * FAQAccordion Component
 * Expandable FAQ section with analytics
 * Pre-expands key FAQs on load
 */

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  preExpandQuestions?: string[];
}

declare const gtag: Function | undefined;

// Default questions to pre-expand
const DEFAULT_PRE_EXPAND = [
  "What if it doesn't work for me?",
  "Is this for beginners?"
];

export default function FAQAccordion({
  faqs,
  preExpandQuestions = DEFAULT_PRE_EXPAND
}: FAQAccordionProps) {
  // Find indices of questions to pre-expand
  const preExpandIndices = new Set(
    faqs
      .map((faq, i) => preExpandQuestions.includes(faq.question) ? i : -1)
      .filter(i => i !== -1)
  );

  const [openIndices, setOpenIndices] = useState<Set<number>>(preExpandIndices);

  const toggle = (index: number) => {
    const newIndices = new Set(openIndices);
    if (newIndices.has(index)) {
      newIndices.delete(index);
    } else {
      newIndices.add(index);
      // Track analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'faq_interaction', { question: faqs[index].question });
      }
    }
    setOpenIndices(newIndices);
  };

  const isOpen = (index: number) => openIndices.has(index);

  return (
    <section className="py-16 md:py-24 bg-gray-900/50">
      <div className="max-w-3xl mx-auto px-4">

        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`
                border rounded-lg overflow-hidden transition-colors duration-200
                ${isOpen(index) ? 'border-[#CFB53B]' : 'border-gray-700 hover:border-gray-600'}
              `}
            >
              <button
                onClick={() => toggle(index)}
                className="
                  w-full px-6 py-5 md:py-4 text-left flex items-center justify-between
                  min-h-[64px] md:min-h-[56px] focus:outline-none focus-visible:ring-2
                  focus-visible:ring-[#CFB53B] bg-gray-800/50
                "
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-[#CFB53B] flex-shrink-0 transition-transform duration-200
                             ${isOpen(index) ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`
                  overflow-hidden transition-all duration-300
                  ${isOpen(index) ? 'max-h-96' : 'max-h-0'}
                `}
              >
                <div className="px-6 pb-5 text-gray-300 leading-relaxed border-t border-gray-800 pt-4 bg-gray-800/30">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
