import type { Quiz } from '../../../config/course/types';

/**
 * Module 5 Quiz: Pai Gow Poker Strategy
 */
export const quiz: Quiz = {
  id: 'mod5-quiz-pai-gow',
  passingScore: 80,
  questions: [
    {
      id: 'mod5-q1',
      type: 'multiple-choice',
      question:
        'In Pai Gow Poker, how are your 7 cards split?',
      options: [
        'Into three hands: 3 cards, 2 cards, and 2 cards',
        'Into a 5-card hand and a 2-card hand',
        'Into a 4-card hand and a 3-card hand',
        'You play all 7 cards as one hand',
      ],
      correctIndex: 1,
      explanation:
        'In Pai Gow Poker, you split your 7 cards into a 5-card "high" hand and a 2-card "low" hand. Your 5-card hand must be stronger than your 2-card hand, or it\'s a foul.',
    },
    {
      id: 'mod5-q2',
      type: 'true-false',
      question:
        'In Face-Up Pai Gow, the dealer\'s hand is hidden face down just like in regular Pai Gow.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation:
        'False. In Face-Up Pai Gow, the dealer\'s entire hand is visible. This gives you perfect information to make mathematically optimal decisions when setting your hand. The tradeoff is that copies (ties) go to the dealer.',
    },
    {
      id: 'mod5-q3',
      type: 'multiple-choice',
      question:
        'What is the approximate push (tie) rate in Pai Gow Poker?',
      options: [
        'About 10% of hands',
        'About 25% of hands',
        'About 40% of hands',
        'About 60% of hands',
      ],
      correctIndex: 2,
      explanation:
        'Pai Gow Poker has an approximately 40% push rate. This is the highest push rate of any major table game and is the foundation of the break-even strategy -- you\'re essentially playing for free nearly half the time.',
    },
    {
      id: 'mod5-q4',
      type: 'multiple-choice',
      question:
        'The bonus bet in Pai Gow Poker pays based on:',
      options: [
        'Only your 5-card hand',
        'Only your 2-card hand',
        'The best possible hand from all 7 cards combined',
        'The dealer\'s hand compared to yours',
      ],
      correctIndex: 2,
      explanation:
        'The bonus bet pays based on the best possible poker hand you can make with all 7 of your cards, regardless of how you set your two hands. This is critical -- even if you lose the base game, your bonus can still pay out.',
    },
    {
      id: 'mod5-q5',
      type: 'scenario',
      question:
        'You\'re playing Pai Gow with a $100 base bet and $25 bonus bet. After 4 hours, you\'re down $150 on the base game but hit three of a kind four times and a flush once on the bonus. Your comp value for the session is approximately $300. Which statement best describes your session?',
      options: [
        'You lost money -- you should have quit after the first hour',
        'You\'re roughly breakeven or slightly positive when you factor in bonus payouts and comp value',
        'You should have bet more on the bonus to maximize your winnings',
        'You should have played blackjack instead for higher expected value',
      ],
      correctIndex: 1,
      explanation:
        'This is the break-even strategy in action. Your $150 base game loss is offset by bonus payouts (trips at 2:1 four times = $200, flush at 4:1 = $100, total $300 in bonus wins) plus $300 in comp value. You\'re actually net positive on the session. This is exactly how the strategy is designed to work.',
    },
    {
      id: 'mod5-q6',
      type: 'multiple-choice',
      question:
        'According to the break-even strategy, what is the priority order when setting your Pai Gow hand?',
      options: [
        'Win the base game > Protect bonus > Maximize pushes',
        'Protect bonus > Maximize pushes > Win when it\'s free',
        'Maximize pushes > Win the base game > Protect bonus',
        'Bet big on every hand > Play fast > Leave early',
      ],
      correctIndex: 1,
      explanation:
        'The correct priority is: (1) Protect your bonus-qualifying hand, (2) maximize push probability to preserve bankroll, and (3) win the base game when you can do so without sacrificing the first two priorities. The bonus is where the real money is, so you never break a bonus hand unnecessarily.',
    },
  ],
};
