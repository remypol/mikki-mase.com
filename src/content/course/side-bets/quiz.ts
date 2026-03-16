import type { Quiz } from '../../../config/course/types';

/**
 * Module 4 Quiz: Side Bets That Actually Work
 */
export const quiz: Quiz = {
  id: 'mod4-quiz-side-bets',
  passingScore: 80,
  questions: [
    {
      id: 'mod4-q1',
      type: 'multiple-choice',
      question:
        'What makes the 21+3 side bet different from most other side bets?',
      options: [
        'It has the highest payout of any side bet',
        'It can approach a player-favorable edge when combined with card information from the main game',
        'It is only available at high limit tables',
        'It has no house edge at all',
      ],
      correctIndex: 1,
      explanation:
        'Unlike most side bets that carry enormous house edges regardless of conditions, the 21+3 can approach a player-favorable edge because it uses cards from the main blackjack game. As the shoe composition changes, the probability of qualifying hands can shift in the player\'s favor, especially when you are already tracking card information for your main game.',
    },
    {
      id: 'mod4-q2',
      type: 'multiple-choice',
      question:
        'What is the recommended bet size for the 21+3 side bet relative to your main blackjack bet?',
      options: [
        '50% of your main bet',
        '25% of your main bet',
        '10% of your main bet',
        'Equal to your main bet',
      ],
      correctIndex: 2,
      explanation:
        'The sweet spot is approximately 10% of your main blackjack bet. This level allows you to capture value when the side bet hits (9:1 payout) without significantly draining your bankroll when it misses. On a $100 main bet, your 21+3 bet should be around $10.',
    },
    {
      id: 'mod4-q3',
      type: 'true-false',
      question:
        'Taking "even money" when you have blackjack and the dealer shows an Ace is a smart way to guarantee a profit.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation:
        'False. "Even money" is mathematically identical to taking insurance. The dealer only has a 10 underneath about 30.8% of the time, which means 69.2% of the time you would have won the full 3:2 payout. By taking even money, you are giving up expected value. Decline it every time.',
    },
    {
      id: 'mod4-q4',
      type: 'scenario',
      question:
        'You sit down at a blackjack table that has three side bets available: Perfect Pairs, Lucky Ladies, and 21+3 (flat 9:1 payout). Your main bet is $200. How should you handle the side bets?',
      options: [
        'Play all three at the minimum to diversify your action',
        'Play Perfect Pairs and 21+3 since they have the best payouts',
        'Play only the 21+3 at $20 (10% of main bet) and ignore the other two',
        'Skip all side bets -- they are all equally bad',
      ],
      correctIndex: 2,
      explanation:
        'The 21+3 with a flat 9:1 payout is the only side bet worth playing. Bet it at 10% of your main bet ($20 on a $200 main bet). Perfect Pairs carries a 5.8-7.9% house edge and Lucky Ladies carries a 17-25% house edge -- both are traps. Playing bad side bets alongside a good one still costs you money.',
    },
    {
      id: 'mod4-q5',
      type: 'multiple-choice',
      question:
        'Why do casinos continue to add more side bets to blackjack tables over time?',
      options: [
        'To give players more ways to win and improve the player experience',
        'Because side bets carry dramatically higher house edges (5-25%) than the base game (0.5%), generating far more revenue per dollar wagered',
        'Because government regulations require casinos to offer a minimum number of betting options',
        'To slow down the game and reduce the number of hands per hour',
      ],
      correctIndex: 1,
      explanation:
        'Side bets are significantly more profitable for casinos than the base blackjack game. While basic strategy blackjack has roughly a 0.5% house edge, side bets carry edges of 5-25%. Every dollar a player moves from the base game to a side bet generates 10-50x more revenue for the casino. Adding more side bets is a pure revenue optimization strategy.',
    },
  ],
};
