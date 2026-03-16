/**
 * Concept-based coaching explanations.
 * 3-layer tips: (1) correct move, (2) why, (3) pattern recognition.
 */
import type { Action, HandAnalysis, Card } from './types';
import { cardValue } from './cards';
import { handLabel } from './handEvaluator';

export interface Explanation {
  move: string;
  why: string;
  pattern: string;
}

/** Get a detailed explanation for a hand decision. */
export function getExplanation(
  optimalAction: Action,
  playerCards: Card[],
  dealerUpcard: Card,
  analysis: HandAnalysis,
): Explanation {
  const dv = cardValue(dealerUpcard);
  const label = handLabel(playerCards, analysis);
  const actionLabel = ACTION_LABELS[optimalAction];
  const dealerLabel = dv === 11 ? 'Ace' : String(dv);

  // Check for specific Mikki-referenced spots first
  const specific = getSpecificExplanation(optimalAction, playerCards, dealerUpcard, analysis);
  if (specific) return specific;

  // Generic explanations by category
  return getGenericExplanation(optimalAction, label, dealerLabel, dv, analysis);
}

const ACTION_LABELS: Record<Action, string> = {
  hit: 'Hit',
  stand: 'Stand',
  double: 'Double Down',
  split: 'Split',
};

function getSpecificExplanation(
  action: Action,
  playerCards: Card[],
  dealerUpcard: Card,
  analysis: HandAnalysis,
): Explanation | null {
  const dv = cardValue(dealerUpcard);

  // 8,8 vs 10 — Mikki's signature call
  if (analysis.isPair && playerCards[0].rank === '8' && dv === 10) {
    return {
      move: 'Hit your 16.',
      why: 'Mikki disagrees with "always split 8s." You have 16 (one losing hand). Splitting gives you two 18s against a dealer 10 — two losing hands that cost double.',
      pattern: 'When the dealer shows 10, splitting 8s doubles your exposure for marginal gain.',
    };
  }

  // A,7 vs 9 or 10 — hit
  if (analysis.isSoft && analysis.total === 18 && dv >= 9) {
    return {
      move: 'Hit your soft 18.',
      why: `Soft 18 vs dealer ${dv === 11 ? 'Ace' : dv}: 18 is a long-term loser here (you need 18.55+ to win). Hitting can\'t bust you since it\'s a soft hand.`,
      pattern: '"If the dealer has a 9, 10, or Ace, hit your soft 18." — Mikki. You can only improve or stay the same.',
    };
  }

  // A,7 vs 4,5,6 — double
  if (analysis.isSoft && analysis.total === 18 && dv >= 4 && dv <= 6) {
    return {
      move: 'Double down on soft 18.',
      why: `Dealer ${dv} is vulnerable to busting. Your soft 18 lets you take one card risk-free with doubled profit.`,
      pattern: '"If dealer has 6, 5, or 4, you\'re going to double your soft 18." — Mikki.',
    };
  }

  // A,8 — always stand
  if (analysis.isSoft && analysis.total === 19) {
    return {
      move: 'Stand on 19.',
      why: '"Ace 8 is a 19, you\'re going to stand 10 out of 10 times." 19 is a long-term winner.',
      pattern: 'Never mess with a 19 or 20. These are winning hands — don\'t get greedy.',
    };
  }

  // Hard 16 vs 7+
  if (!analysis.isSoft && analysis.total === 16 && dv >= 7 && action === 'hit') {
    return {
      move: 'Hit your 16.',
      why: `Standing on 16 vs dealer ${dv === 11 ? 'Ace' : dv} is the wrong play. The dealer will make 17+ most of the time.`,
      pattern: '"If you have 16 and dealer shows 7 or above, hit your 16. Go down swinging." — Mikki.',
    };
  }

  // Hard 16 vs 4,5,6
  if (!analysis.isSoft && analysis.total === 16 && dv >= 4 && dv <= 6) {
    return {
      move: 'Stand on 16.',
      why: `Dealer ${dv} is a bust card. Let the dealer take the risk of busting instead of you.`,
      pattern: 'When dealer shows 4, 5, or 6, stand on any stiff hand (12-16). Let the dealer bust.',
    };
  }

  // 11 — always double
  if (!analysis.isSoft && analysis.total === 11 && action === 'double') {
    return {
      move: 'Double down on 11.',
      why: '11 is the strongest doubling hand. You have the best chance of hitting 21 with one more card.',
      pattern: '"You always want to double down no matter what on an 11." — Mikki. This is the #1 double.',
    };
  }

  // Aces — always split
  if (analysis.isPair && playerCards[0].rank === 'A') {
    return {
      move: 'Split your Aces.',
      why: '"You have two chances to get a 10. You\'re guaranteed to break even, basically." It doesn\'t matter what the dealer shows.',
      pattern: 'Always split Aces. Period. Two chances at 21 beats one hand of 12.',
    };
  }

  // 9,9 vs 7 — stand
  if (analysis.isPair && playerCards[0].rank === '9' && dv === 7) {
    return {
      move: 'Stand on 18.',
      why: 'Dealer 7 likely makes 17. Your 18 already beats that. Splitting risks losing the edge.',
      pattern: '9,9 vs 7 is a stand — your 18 beats the dealer\'s likely 17. Don\'t fix what isn\'t broken.',
    };
  }

  return null;
}

function getGenericExplanation(
  action: Action,
  label: string,
  dealerLabel: string,
  dv: number,
  analysis: HandAnalysis,
): Explanation {
  const actionLabel = ACTION_LABELS[action];

  switch (action) {
    case 'hit':
      return {
        move: `${actionLabel} your ${label}.`,
        why: `Your total isn't strong enough to stand against dealer ${dealerLabel}. Taking another card gives you a better chance.`,
        pattern: dv >= 7
          ? 'Against a strong dealer upcard (7+), you need to improve weak hands.'
          : 'Even against a weak dealer, very low totals need improvement.',
      };

    case 'stand':
      return {
        move: `${actionLabel} on ${label}.`,
        why: dv <= 6
          ? `Dealer ${dealerLabel} is a bust card. Let the dealer take the risk.`
          : `Your ${label} is strong enough to win against dealer ${dealerLabel}.`,
        pattern: dv <= 6
          ? 'Against bust cards (2-6), stand on stiff hands and let the dealer bust.'
          : 'With a strong total (17+), always stand regardless of dealer card.',
      };

    case 'double':
      return {
        move: `${actionLabel} on ${label}.`,
        why: analysis.isSoft
          ? `Your soft total lets you take one card risk-free. Dealer ${dealerLabel} is vulnerable.`
          : `${label} is in the prime doubling range. Maximize profit against dealer ${dealerLabel}.`,
        pattern: 'Double when your hand is strong and the dealer is weak — this is where you make money.',
      };

    case 'split':
      return {
        move: `${actionLabel} your pair.`,
        why: `Two separate hands give you better odds than one combined hand against dealer ${dealerLabel}.`,
        pattern: 'Split when each new hand has better potential than the combined total.',
      };
  }
}
