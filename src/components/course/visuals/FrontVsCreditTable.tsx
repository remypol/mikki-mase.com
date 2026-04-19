/**
 * FrontVsCreditTable — side-by-side comparison for Module 10 L2 "Front Money
 * vs Credit Lines". Currently taught in prose; table makes the pros/cons
 * legible at a glance.
 */

const ROWS: Array<{
  feature: string;
  front: string;
  credit: string;
  winner: 'front' | 'credit' | 'tie';
}> = [
  { feature: 'What it is', front: 'Cash wired or deposited at the cage', credit: 'Pre-approved loan drawn via markers', winner: 'tie' },
  { feature: 'How you look to the casino', front: 'Liquid (cash in hand)', credit: 'Bankable (creditworthy)', winner: 'tie' },
  { feature: 'Unlocks top comp tiers', front: 'Partial', credit: 'Yes — often required', winner: 'credit' },
  { feature: 'Risk at checkout', front: 'None — you leave with what\'s left', credit: 'Debt owed (30–90 day terms)', winner: 'front' },
  { feature: 'Paperwork / credit check', front: 'None', credit: 'Application + bank reference', winner: 'front' },
  { feature: 'Loss-rebate negotiation leverage', front: 'Limited', credit: 'Strong — larger ticket', winner: 'credit' },
  { feature: 'Interest or fees', front: 'None', credit: 'Typically 0% if paid inside terms', winner: 'front' },
  { feature: 'Recovery if session goes well', front: 'Bring cash home', credit: 'No balance owed, rating still booked', winner: 'tie' },
  { feature: 'Best for', front: 'Single trip, moderate stakes', credit: 'Year-round play at regular property', winner: 'tie' },
];

const STYLE = {
  front:  { bg: 'rgba(27,107,63,0.12)',   color: '#6EE7A8' },
  credit: { bg: 'rgba(92,115,196,0.12)',  color: '#9FB6F2' },
  tie:    { bg: 'transparent',            color: 'rgb(var(--text-tertiary))' },
};

export default function FrontVsCreditTable() {
  return (
    <figure className="stake-card">
      <figcaption className="mb-5">
        <p className="text-xs uppercase tracking-widest text-tertiary font-semibold mb-1">
          Comparison
        </p>
        <h3 className="display-h3">Front money vs credit line</h3>
        <p className="text-secondary text-sm mt-1">
          Front money pays for the trip. A credit line pays for the year. Pick the one that matches how often you play that property.
        </p>
      </figcaption>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[620px]">
          <thead>
            <tr className="text-left text-tertiary uppercase tracking-widest text-[10px] font-semibold">
              <th className="pb-3 pr-3 w-1/3">Feature</th>
              <th className="pb-3 pr-3">Front money</th>
              <th className="pb-3 pr-3">Credit line</th>
              <th className="pb-3 pr-3 text-right">Edge</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => {
              const s = STYLE[r.winner];
              return (
                <tr
                  key={i}
                  className="border-t"
                  style={{ borderColor: 'rgb(var(--border-subtle))' }}
                >
                  <td className="py-3 pr-3 text-secondary">{r.feature}</td>
                  <td
                    className="py-3 pr-3 text-primary"
                    style={{ backgroundColor: r.winner === 'front' ? s.bg : 'transparent' }}
                  >
                    {r.front}
                  </td>
                  <td
                    className="py-3 pr-3 text-primary"
                    style={{ backgroundColor: r.winner === 'credit' ? s.bg : 'transparent' }}
                  >
                    {r.credit}
                  </td>
                  <td className="py-3 pr-3 text-right text-xs font-semibold" style={{ color: s.color }}>
                    {r.winner === 'tie' ? '—' : r.winner === 'front' ? 'Front' : 'Credit'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
