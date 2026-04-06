/**
 * WhatYouGet — Staggered feature grid with premium reveal
 * Each card fades up with slight scale for a polished feel
 */
import ScrollReveal from './ScrollReveal';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

interface Props {
  moduleCount: number;
  scenarioCount: number;
}

const features = [
  { icon: '\u2261', titleFn: (p: Props) => `${p.moduleCount} Full Modules`, desc: 'From casino psychology to bankroll management — the complete system.' },
  { icon: '\u2699', titleFn: (p: Props) => `${p.scenarioCount} Interactive Scenarios`, desc: 'Practice real casino decisions with hands-on simulations.' },
  { icon: '\u2713', titleFn: () => 'Quizzes After Every Module', desc: 'Test your knowledge and track progress with scored assessments.' },
  { icon: '\uD83C\uDFC6', titleFn: () => 'Casino IQ Assessment', desc: 'Find your strengths and leaks with a 4-station skill assessment.' },
  { icon: '\uD83D\uDE80', titleFn: () => 'Lifetime Access', desc: 'One payment. No subscriptions. All future updates included.' },
  { icon: '\uD83D\uDCAA', titleFn: () => 'Blackjack Practice Trainer', desc: 'Unlimited adaptive drills to master basic strategy decisions.' },
];

export default function WhatYouGet(props: Props) {
  return (
    <section className="py-16 md:py-20" style={{ background: '#000' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-12">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: 'var(--color-gold)' }}
          >
            Everything Included
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-3">
            What's Inside the Masterclass
          </h2>
        </ScrollReveal>

        <StaggerContainer
          className="grid md:grid-cols-2 gap-4"
          staggerDelay={0.08}
        >
          {features.map((f, i) => (
            <StaggerItem key={i}>
              <div
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{ background: 'var(--color-gray-950)', border: '1px solid #1A1A1A' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(207, 181, 59, 0.1)' }}
                >
                  <span style={{ color: 'var(--color-gold)' }}>{f.icon}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {f.titleFn(props)}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-gray-400)' }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
