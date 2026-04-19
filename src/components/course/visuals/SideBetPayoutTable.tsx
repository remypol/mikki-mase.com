/**
 * SideBetPayoutTable — 21+3 payout schedule + side-bet edge comparison.
 *
 * Fixes the audit's "M8 L1 payout schedule as prose, M8 L2 edge figures as prose"
 * gap. Uses the project's Verified/Claimed/Loss trust-tag color vocabulary to
 * signal which bets are mathematically tolerable vs donations.
 */

interface Row {
  game: string;
  edge: string;
  ruling: 'tolerable' | 'bad' | 'catastrophic';
  note: string;
}

const PAYOUT_21_3 = [
  { combination: 'Suited three of a kind', payout: '100:1' },
  { combination: 'Straight flush', payout: '40:1' },
  { combination: 'Three of a kind', payout: '30:1' },
  { combination: 'Straight', payout: '10:1' },
  { combination: 'Flush', payout: '5:1' },
];

const EDGES: Row[] = [
  { game: '21+3 (suited bonus)', edge: '2.74% — 8.2%', ruling: 'tolerable', note: 'The one side bet Mikki plays — and only in specific shoe conditions.' },
  { game: 'Perfect Pairs', edge: '4.1% — 11.0%', ruling: 'bad', note: 'Dressed up with flash. Skip it.' },
  { game: 'Lucky Ladies', edge: '17.6%', ruling: 'catastrophic', note: '6× worse than the main bet. Pure donation.' },
  { game: 'Insurance', edge: '~7.4%', ruling: 'bad', note: 'If the dealer is asking, the answer is no.' },
  { game: 'Bust It!', edge: '~6.9%', ruling: 'bad', note: 'High-variance thrill bet. Negative expectation.' },
];

const RULING_STYLE: Record<Row['ruling'], { bg: string; color: string; label: string; tagClass: string }> = {
  tolerable:    { bg: 'rgba(27,107,63,0.12)',  color: '#6EE7A8', label: 'Tolerable',    tagClass: 'trust-tag trust-tag-verified' },
  bad:          { bg: 'rgba(217,119,6,0.12)',  color: '#F3B45C', label: 'Bad',          tagClass: 'trust-tag trust-tag-claimed' },
  catastrophic: { bg: 'rgba(196,30,58,0.15)',  color: '#F87171', label: 'Catastrophic', tagClass: 'trust-tag trust-tag-loss' },
};

export default function SideBetPayoutTable() {
  return (
    <figure className="stake-card">
      <figcaption className="mb-5">
        <p className="text-xs uppercase tracking-widest text-tertiary font-semibold mb-1">
          Side-bet reference
        </p>
        <h3 className="display-h3">21+3 payouts · side-bet edges</h3>
        <p className="text-secondary text-sm mt-1">
          21+3 is the only side bet with a defensible use case. Everything else is a donation dressed up in flashing lights.
        </p>
      </figcaption>

      {/* 21+3 payout schedule */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-tertiary font-semibold mb-2">
          21+3 payout schedule (standard ruleset)
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[360px]">
            <thead>
              <tr className="text-left text-tertiary uppercase tracking-widest text-[10px] font-semibold">
                <th className="pb-2 pr-3">Combination</th>
                <th className="pb-2 pr-3 text-right">Pays</th>
              </tr>
            </thead>
            <tbody>
              {PAYOUT_21_3.map((r, i) => (
                <tr key={i} className="border-t" style={{ borderColor: 'rgb(var(--border-subtle))' }}>
                  <td className="py-2 pr-3 text-secondary">{r.combination}</td>
                  <td className="py-2 pr-3 text-right text-primary font-semibold tabular-nums">{r.payout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edge comparison */}
      <div>
        <p className="text-xs uppercase tracking-widest text-tertiary font-semibold mb-2">
          House edge by side bet
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="text-left text-tertiary uppercase tracking-widest text-[10px] font-semibold">
                <th className="pb-2 pr-3">Bet</th>
                <th className="pb-2 pr-3">House edge</th>
                <th className="pb-2 pr-3 text-right">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {EDGES.map((row, i) => {
                const style = RULING_STYLE[row.ruling];
                return (
                  <>
                    <tr
                      key={i}
                      className="border-t"
                      style={{
                        borderColor: 'rgb(var(--border-subtle))',
                        backgroundColor: style.bg,
                      }}
                    >
                      <td className="py-2 pr-3 text-primary font-semibold">{row.game}</td>
                      <td className="py-2 pr-3 text-secondary tabular-nums">{row.edge}</td>
                      <td className="py-2 pr-3 text-right">
                        <span className={style.tagClass}>{style.label}</span>
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: style.bg }}>
                      <td colSpan={3} className="pb-2 text-tertiary text-xs italic px-0">{row.note}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </figure>
  );
}
