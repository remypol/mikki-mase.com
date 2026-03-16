/**
 * WhoThisIsFor — Animated qualification section
 * Two columns with staggered list items
 */
import ScrollReveal from './ScrollReveal';
import { StaggerContainer, StaggerItem } from './StaggerContainer';

const forYou = [
  'You want a structured framework, not random gambling tips',
  "You're tired of emotional, impulsive casino decisions",
  'You want to understand bankroll management and session discipline',
  'You follow Mikki and want to learn how he actually thinks',
];

const notForYou = [
  "You're looking for \"guaranteed wins\" or magic systems",
  'You ignore bankroll limits and chase losses',
  'You want reckless gambling advice with no discipline',
  "You're not willing to study and practice the strategies",
];

export default function WhoThisIsFor() {
  return (
    <section className="py-16 md:py-20" style={{ background: '#000' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-white">
            Built for Serious Players
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {/* For */}
          <StaggerContainer
            staggerDelay={0.06}
            className="p-6 rounded-xl"
            style={{ background: '#0A0A0A', border: '1px solid #1A1A1A' }}
          >
            <StaggerItem>
              <h3 className="text-base font-bold mb-4" style={{ color: '#059669' }}>
                This Is For You If&hellip;
              </h3>
            </StaggerItem>
            <ul className="space-y-3">
              {forYou.map((text, i) => (
                <StaggerItem key={i}>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5" style={{ color: '#059669' }}>&#10003;</span>
                    <span className="text-sm text-white">{text}</span>
                  </li>
                </StaggerItem>
              ))}
            </ul>
          </StaggerContainer>

          {/* Not for */}
          <StaggerContainer
            staggerDelay={0.06}
            className="p-6 rounded-xl"
            style={{ background: '#0A0A0A', border: '1px solid #1A1A1A' }}
          >
            <StaggerItem>
              <h3 className="text-base font-bold mb-4" style={{ color: '#A8001E' }}>
                This Is Not For You If&hellip;
              </h3>
            </StaggerItem>
            <ul className="space-y-3">
              {notForYou.map((text, i) => (
                <StaggerItem key={i}>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5" style={{ color: '#A8001E' }}>&#10007;</span>
                    <span className="text-sm" style={{ color: '#BEBEBE' }}>{text}</span>
                  </li>
                </StaggerItem>
              ))}
            </ul>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
