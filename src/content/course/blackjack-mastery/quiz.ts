import type { Quiz } from '../../../config/course/types';

/**
 * Module 3 Quiz: Blackjack Mastery
 */
export const quiz: Quiz = {
  id: 'mod3-quiz-blackjack-mastery',
  passingScore: 80,
  questions: [
    {
      id: 'mod3-q1',
      type: 'multiple-choice',
      question:
        'Which blackjack variant is BEST for advantage players?',
      options: [
        'Single deck (6:5 payout)',
        'Double deck (3:2 payout)',
        '8-Deck shoe',
        'Continuous Shuffle Machine',
      ],
      correctIndex: 1,
      explanation:
        'Double deck with 3:2 payouts is the gold standard. It has only 104 cards (manageable information), always pays 3:2, and offers the best combination of low house edge and advantage play opportunity. Single deck sounds better but almost always pays 6:5, which adds ~1.4% to the house edge.',
    },
    {
      id: 'mod3-q2',
      type: 'scenario',
      question:
        'You have a hard 16 and the dealer is showing a 10. What is the correct play?',
      options: [
        'Stand -- 16 is risky to hit and you might bust',
        'Hit -- you will lose more often by standing than by hitting',
        'Double down -- maximize your bet when the dealer is strong',
        'Split -- break it into two hands for better odds',
      ],
      correctIndex: 1,
      explanation:
        'Always hit 16 against a dealer 7 or higher. Yes, you will bust about 62% of the time. But if you stand, you lose about 74% of the time because the dealer will make a hand that beats 16. Hitting is the less bad option. If surrender is available, surrendering 16 vs 10 is even better.',
    },
    {
      id: 'mod3-q3',
      type: 'true-false',
      question:
        'Taking insurance when the dealer shows an Ace is a smart way to protect a strong hand like 20.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation:
        'False. Insurance has a 7.7% house edge regardless of what hand you hold. It is a separate side bet that pays 2:1, but the dealer only has a 10-value card underneath about 30.8% of the time. Never take insurance -- not with 20, not with blackjack, not ever.',
    },
    {
      id: 'mod3-q4',
      type: 'multiple-choice',
      question:
        'You have A-7 (soft 18) and the dealer shows a 9. What should you do?',
      options: [
        'Stand -- 18 is a good hand',
        'Hit -- your 18 will likely lose to the dealer\'s probable 19-21',
        'Double down -- get more money on the table',
        'Surrender -- cut your losses',
      ],
      correctIndex: 1,
      explanation:
        'Soft 18 against a dealer 9, 10, or Ace should be hit. Your 18 is going to lose to the dealer\'s likely strong hand. Because it is a soft hand (contains an Ace counting as 11), you cannot bust by hitting. Standing on soft 18 vs dealer 9 costs you about 3.5% on that hand compared to the correct play.',
    },
    {
      id: 'mod3-q5',
      type: 'multiple-choice',
      question:
        'Why does a 6:5 blackjack payout make a game significantly worse than 3:2?',
      options: [
        'It only affects the payout on rare hands, so the impact is minimal',
        'On a $100 bet, you receive $120 instead of $150 for blackjack -- adding roughly 1.4% to the house edge',
        'It changes the rules for splitting and doubling',
        'It only matters if you are counting cards',
      ],
      correctIndex: 1,
      explanation:
        'A 6:5 payout gives you $120 on a $100 blackjack instead of $150 at 3:2 -- that is $30 less every time you hit blackjack. This adds approximately 1.4% to the house edge, which completely destroys any advantage from fewer decks or good rules. Never play 6:5 blackjack.',
    },
    {
      id: 'mod3-q6',
      type: 'multiple-choice',
      question:
        'What is Mikki\'s controversial stance on splitting 8s against a dealer 10?',
      options: [
        'Always split -- the standard strategy is always correct',
        'Double down on the 16 for maximum value',
        'Surrender if available, or hit -- don\'t pay double to put yourself in a bad situation twice',
        'Stand on 16 and hope the dealer busts',
      ],
      correctIndex: 2,
      explanation:
        'While most basic strategy charts say to always split 8s, Mikki argues against splitting 8s vs a dealer 10 or Ace. Splitting doubles your exposure in a situation where you are the underdog on both hands. Surrendering (losing half your bet) or hitting loses less money in this specific situation.',
    },
    {
      id: 'mod3-q7',
      type: 'true-false',
      question:
        'Splitting 10s against a dealer 6 is a good idea because the dealer is likely to bust.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation:
        'False. Never split 10s. You already have 20 -- one of the strongest hands in blackjack. Even though the dealer is likely to bust with a 6, you win the same amount whether the dealer busts against your 20 or against two lesser hands. Breaking up a 20 to gamble on two uncertain hands is pure greed, not strategy.',
    },
    {
      id: 'mod3-q8',
      type: 'multiple-choice',
      question:
        'Why are high limit blackjack rooms mathematically better for players?',
      options: [
        'The dealers are less skilled and make more mistakes',
        'Better rules (3:2 payouts, S17, surrender, better penetration) and fewer players at the table',
        'The cards are shuffled less frequently, making them easier to predict',
        'High limit rooms use special decks with more face cards',
      ],
      correctIndex: 1,
      explanation:
        'High limit rooms consistently offer better rules: guaranteed 3:2 payouts, dealer stands on soft 17, surrender available, better deck penetration, and double after split. Combined with fewer players (faster play), these advantages can reduce the house edge by 0.5% or more compared to main floor tables.',
    },
    {
      id: 'mod3-q9',
      type: 'multiple-choice',
      question:
        'How can you identify a Continuous Shuffle Machine at a blackjack table?',
      options: [
        'The table will have a sign that says "CSM" posted visibly',
        'Watch whether used cards are fed back into the dealing machine after each round instead of going into a discard tray',
        'CSM tables always have higher minimum bets',
        'The dealer will announce it is a CSM before you sit down',
      ],
      correctIndex: 1,
      explanation:
        'The key identifier is watching the discard process. In a normal game, used cards go into a separate discard tray. With a CSM, used cards are fed right back into the dealing machine after each round. You can also ask the dealer directly -- they are required to tell you the truth about the equipment being used.',
    },
    {
      id: 'mod3-q10',
      type: 'scenario',
      question:
        'You walk into a casino and the only open blackjack seats are at a 6:5 single deck table and a Continuous Shuffle Machine table. Both have $25 minimums. What do you do?',
      options: [
        'Play at the single deck table -- fewer decks is always better',
        'Play at the CSM table -- at least it is not 6:5',
        'Alternate between both tables to diversify your risk',
        'Play neither -- wait for a better table to open or leave the casino entirely',
      ],
      correctIndex: 3,
      explanation:
        'Both options are terrible. The 6:5 single deck adds ~1.4% to the house edge, and the CSM eliminates all possibility of advantage play. The correct move is to play neither. Wait for a proper table to open, find another casino, or walk away entirely. Your bankroll is better served by not playing than by playing a bad game.',
    },
  ],
};
