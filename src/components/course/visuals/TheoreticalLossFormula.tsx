/**
 * TheoreticalLossFormula — highlighted callout for the TL formula that
 * M3 L2 "The Rewards Trap" currently buries in prose.
 *
 * Audit: "M2 L2 has an ACTUAL mathematical formula, but buried in prose."
 * Promotes it to a first-class visual so students can't miss it.
 */

interface Example {
  avgBet: number;
  handsPerHour: number;
  houseEdge: string; // "1.0%"
  hours: number;
  tl: number;
  note: string;
}

const EXAMPLES: Example[] = [
  {
    avgBet: 100,
    handsPerHour: 80,
    houseEdge: '0.5%',
    hours: 4,
    tl: 160,
    note: 'Low-edge 3:2 blackjack with perfect strategy, ~$160 expected loss.',
  },
  {
    avgBet: 100,
    handsPerHour: 80,
    houseEdge: '2.0%',
    hours: 4,
    tl: 640,
    note: 'Same bet, same hours — 6:5 table quadruples your theoretical loss.',
  },
  {
    avgBet: 500,
    handsPerHour: 80,
    houseEdge: '0.5%',
    hours: 4,
    tl: 800,
    note: 'Bump to $500 avg bet, even at 0.5% edge — $800 expected loss. This is your comp rating input.',
  },
];

function money(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function TheoreticalLossFormula() {
  return (
    <figure className="stake-card">
      <figcaption className="mb-5">
        <p className="text-xs uppercase tracking-widest text-tertiary font-semibold mb-1">
          The casino's math
        </p>
        <h3 className="display-h3">Theoretical loss</h3>
        <p className="text-secondary text-sm mt-1">
          Every comp you get is calculated off this formula. Know it, and you know what the casino thinks you're worth.
        </p>
      </figcaption>

      {/* Formula */}
      <div
        className="rounded-xl p-5 mb-5 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(207,181,59,0.08) 0%, rgba(20,22,32,1) 100%)',
          border: '1px solid rgba(207,181,59,0.25)',
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-serif text-lg md:text-xl text-primary">
          <span className="font-semibold">Theoretical Loss</span>
          <span className="accent-gold">=</span>
          <span>avg bet</span>
          <span className="accent-gold">×</span>
          <span>hands / hour</span>
          <span className="accent-gold">×</span>
          <span>house edge</span>
          <span className="accent-gold">×</span>
          <span>hours</span>
        </div>
      </div>

      {/* Worked examples */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="text-left text-tertiary uppercase tracking-widest text-[10px] font-semibold">
              <th className="pb-2 pr-3">Avg bet</th>
              <th className="pb-2 pr-3">Hands/hr</th>
              <th className="pb-2 pr-3">House edge</th>
              <th className="pb-2 pr-3">Hours</th>
              <th className="pb-2 pr-3 text-right">Theoretical loss</th>
            </tr>
          </thead>
          <tbody>
            {EXAMPLES.map((e, i) => (
              <>
                <tr
                  key={i}
                  className="border-t"
                  style={{ borderColor: 'rgb(var(--border-subtle))' }}
                >
                  <td className="py-3 pr-3 text-primary font-semibold tabular-nums">{money(e.avgBet)}</td>
                  <td className="py-3 pr-3 text-secondary tabular-nums">{e.handsPerHour}</td>
                  <td className="py-3 pr-3 text-secondary tabular-nums">{e.houseEdge}</td>
                  <td className="py-3 pr-3 text-secondary tabular-nums">{e.hours}h</td>
                  <td className="py-3 pr-3 text-right font-bold tabular-nums accent-gold">{money(e.tl)}</td>
                </tr>
                <tr>
                  <td colSpan={5} className="pb-3 text-tertiary text-xs italic">{e.note}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-tertiary text-xs mt-5">
        The casino pays comps as a fraction (usually 20–40%) of theoretical loss. If your comp offer is worth less than that range, you're negotiating badly — revisit Module 5.
      </p>
    </figure>
  );
}
