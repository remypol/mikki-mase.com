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
  { icon: '\uD83C\uDFA9', titleFn: () => 'Casino Negotiation Playbook', desc: 'Exact scripts for finding a host, booking a rebate, and leveraging competing properties. The highest-authenticity module in the course.' },
  { icon: '\uD83D\uDCB0', titleFn: () => 'The Discount System', desc: 'Loss rebates 5-25%. When a rebate flips house edge into YOUR edge — with a live calculator at the rail.' },
  { icon: '\u23F1', titleFn: () => 'Session Timer PWA', desc: 'Install it on your phone home screen. Pre-set stop-loss and win-limit. The 30-45 minute rule, wired.' },
  { icon: '\u2261', titleFn: (p: Props) => `${p.moduleCount} Modules · 32 Lessons`, desc: 'From session discipline to comp maximisation. Every lesson with promise block, drill, and field note.' },
  { icon: '\uD83C\uDFC6', titleFn: () => 'Casino IQ Assessment', desc: 'Four-station skill diagnostic you can retake after every module to track the delta.' },
  { icon: '\uD83D\uDE80', titleFn: () => 'Lifetime Access', desc: 'One payment. No subscriptions. Every new lesson and widget included, forever.' },
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
