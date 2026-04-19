/**
 * BasicStrategyChart — full 3:2 / H17 basic-strategy chart as an SVG table.
 *
 * Single biggest audit finding: M4 L2 "Basic Strategy Decoded" is the flagship
 * failure of the course because it teaches a chart with zero chart present.
 * This component fixes that.
 *
 * Convention: 3:2 payout, dealer hits soft 17 (H17), double after split (DAS)
 * allowed, no surrender (we show a separate surrender note). This matches the
 * Strip-standard high-limit ruleset Mikki recommends in M4 L4.
 *
 * Rendered as a semantic <table> with SVG-style visual treatment so it stays
 * accessible (screen readers read the cells) and prints well.
 */

type Action = 'H' | 'S' | 'D' | 'P' | 'Ds' | 'R';

// Dealer up-card columns: 2 3 4 5 6 7 8 9 T A
const DEALER: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'A'];

// Hard totals (no ace or ace counted as 1). Rows 5..21.
const HARD: Record<string, Action[]> = {
  '17+': ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
  '16':  ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'R', 'R', 'R'],
  '15':  ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'R', 'R'],
  '14':  ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  '13':  ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  '12':  ['H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  '11':  ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H'],
  '10':  ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'],
  '9':   ['H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
  '8-':  ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
};

// Soft totals (Ace counted as 11). A,X notation.
const SOFT: Record<string, Action[]> = {
  'A,9':  ['S',  'S',  'S',  'S',  'S',  'S',  'S', 'S', 'S', 'S'],
  'A,8':  ['S',  'S',  'S',  'S',  'Ds', 'S',  'S', 'S', 'S', 'S'],
  'A,7':  ['Ds', 'Ds', 'Ds', 'Ds', 'Ds', 'S',  'S', 'H', 'H', 'H'],
  'A,6':  ['H',  'D',  'D',  'D',  'D',  'H',  'H', 'H', 'H', 'H'],
  'A,5':  ['H',  'H',  'D',  'D',  'D',  'H',  'H', 'H', 'H', 'H'],
  'A,4':  ['H',  'H',  'D',  'D',  'D',  'H',  'H', 'H', 'H', 'H'],
  'A,3':  ['H',  'H',  'H',  'D',  'D',  'H',  'H', 'H', 'H', 'H'],
  'A,2':  ['H',  'H',  'H',  'D',  'D',  'H',  'H', 'H', 'H', 'H'],
};

// Pair splits.
const PAIRS: Record<string, Action[]> = {
  'A,A': ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  'T,T': ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
  '9,9': ['P', 'P', 'P', 'P', 'P', 'S', 'P', 'P', 'S', 'S'],
  '8,8': ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  '7,7': ['P', 'P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'],
  '6,6': ['P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H', 'H'],
  '5,5': ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'],
  '4,4': ['H', 'H', 'H', 'P', 'P', 'H', 'H', 'H', 'H', 'H'],
  '3,3': ['P', 'P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'],
  '2,2': ['P', 'P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'],
};

// Color coding per action (single source of truth).
const ACTION_STYLE: Record<Action, { bg: string; fg: string; label: string }> = {
  H:  { bg: '#C41E3A', fg: '#FFFFFF', label: 'Hit' },
  S:  { bg: '#1B6B3F', fg: '#FFFFFF', label: 'Stand' },
  D:  { bg: '#CFB53B', fg: '#1A1A1A', label: 'Double (else hit)' },
  Ds: { bg: '#D4A94E', fg: '#1A1A1A', label: 'Double (else stand)' },
  P:  { bg: '#5C73C4', fg: '#FFFFFF', label: 'Split' },
  R:  { bg: '#7A7A7A', fg: '#FFFFFF', label: 'Surrender (else hit)' },
};

function Cell({ action }: { action: Action }) {
  const s = ACTION_STYLE[action];
  return (
    <td
      className="text-center font-bold text-[11px] md:text-xs px-0 py-1.5 border border-black/20"
      style={{ backgroundColor: s.bg, color: s.fg }}
      title={s.label}
    >
      {action}
    </td>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <tr>
      <th
        colSpan={DEALER.length + 1}
        className="text-left text-[11px] uppercase tracking-widest font-semibold py-2"
        style={{ color: 'rgb(var(--accent-gold))' }}
      >
        {label}
      </th>
    </tr>
  );
}

export default function BasicStrategyChart() {
  return (
    <figure className="stake-card overflow-x-auto">
      <figcaption className="mb-4">
        <p className="text-xs uppercase tracking-widest text-tertiary font-semibold mb-1">
          Reference chart
        </p>
        <h3 className="display-h3 mb-1">Basic strategy — 3:2, H17, DAS</h3>
        <p className="text-secondary text-sm">
          Dealer up-card across the top. Your hand down the left. Cell = the correct play. Memorise it, then drill it until it fires before you think.
        </p>
      </figcaption>

      <table className="w-full min-w-[520px] border-collapse">
        <thead>
          <tr>
            <th className="text-[10px] uppercase tracking-widest text-tertiary font-semibold text-left pb-2 pr-2">
              Your hand ↓ · Dealer →
            </th>
            {DEALER.map((d) => (
              <th
                key={d}
                className="text-center text-xs font-bold text-primary pb-2 px-0 tabular-nums"
                style={{ width: `${80 / DEALER.length}%` }}
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <SectionHeader label="Hard totals" />
          {Object.entries(HARD).map(([total, row]) => (
            <tr key={`h-${total}`}>
              <th
                className="text-left text-xs font-semibold text-secondary pr-2 py-1.5 border-r border-black/20 bg-white/[0.02]"
                scope="row"
              >
                {total}
              </th>
              {row.map((a, i) => (
                <Cell key={i} action={a} />
              ))}
            </tr>
          ))}

          <SectionHeader label="Soft totals (ace counted as 11)" />
          {Object.entries(SOFT).map(([total, row]) => (
            <tr key={`s-${total}`}>
              <th
                className="text-left text-xs font-semibold text-secondary pr-2 py-1.5 border-r border-black/20 bg-white/[0.02]"
                scope="row"
              >
                {total}
              </th>
              {row.map((a, i) => (
                <Cell key={i} action={a} />
              ))}
            </tr>
          ))}

          <SectionHeader label="Pairs" />
          {Object.entries(PAIRS).map(([total, row]) => (
            <tr key={`p-${total}`}>
              <th
                className="text-left text-xs font-semibold text-secondary pr-2 py-1.5 border-r border-black/20 bg-white/[0.02]"
                scope="row"
              >
                {total}
              </th>
              {row.map((a, i) => (
                <Cell key={i} action={a} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-secondary">
        {(Object.keys(ACTION_STYLE) as Action[]).map((a) => (
          <span key={a} className="flex items-center gap-2">
            <span
              className="inline-block w-4 h-4 rounded"
              style={{ backgroundColor: ACTION_STYLE[a].bg }}
              aria-hidden="true"
            />
            <span>
              <strong className="text-primary">{a}</strong> — {ACTION_STYLE[a].label}
            </span>
          </span>
        ))}
      </div>

      <p className="text-tertiary text-xs mt-4">
        Optimised for 3:2 payout, dealer hits soft 17, double after split allowed. If your table uses 6:5 payout or has a continuous shuffle machine, walk away first — no chart saves those games.
      </p>
    </figure>
  );
}
