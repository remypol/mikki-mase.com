import type { Quiz } from '../../../config/course/types';

/**
 * Module 6 Quiz: Ultimate Texas Hold'em Group Strategy
 */
export const quiz: Quiz = {
  id: 'mod6-quiz-uth-group-play',
  passingScore: 80,
  questions: [
    {
      id: 'mod6-q1',
      type: 'multiple-choice',
      question:
        'If 5 players are at a UTH table, how many cards does the group collectively see before community cards are dealt?',
      options: [
        '5 cards (one per player)',
        '8 cards',
        '10 cards (2 per player)',
        '15 cards (3 per player)',
      ],
      correctIndex: 2,
      explanation:
        'Each player receives 2 cards face-up in UTH. With 5 players, the group sees 5 x 2 = 10 cards. That\'s almost 20% of the 52-card deck revealed before any community cards are dealt, creating a significant informational advantage.',
    },
    {
      id: 'mod6-q2',
      type: 'true-false',
      question:
        'Sharing information about face-up cards at a UTH table is illegal under gaming regulations.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation:
        'False. In UTH, all player cards are dealt face-up. This is publicly visible information in a public game. Discussing what everyone can already see is not against gaming regulations at most jurisdictions. The casino may not like it, but it is not cheating or illegal.',
    },
    {
      id: 'mod6-q3',
      type: 'multiple-choice',
      question:
        'You hold A-K and your group of 5 can see the other 3 Aces across the table. What does this tell you about the dealer?',
      options: [
        'The dealer definitely has a pair',
        'The dealer cannot have an Ace, making your Ace-high significantly stronger',
        'The dealer is more likely to have an Ace since they\'re "due"',
        'This information is not useful for betting decisions',
      ],
      correctIndex: 1,
      explanation:
        'With all 4 Aces accounted for (1 in your hand, 3 across other players\' hands), there is a 0% chance the dealer holds an Ace. This dramatically improves the value of your hand and is exactly the kind of elimination math that makes group play so powerful.',
    },
    {
      id: 'mod6-q4',
      type: 'multiple-choice',
      question:
        'What is the recommended minimum group size for a meaningful informational edge in UTH?',
      options: [
        '2 players',
        '3 players',
        '5 players',
        '7 players',
      ],
      correctIndex: 2,
      explanation:
        '5 players is the sweet spot. With 5 players you see 10 cards (nearly 20% of the deck), which provides a meaningful statistical edge. Fewer players don\'t reveal enough information, and more than 5 is harder to coordinate though even more powerful mathematically.',
    },
    {
      id: 'mod6-q5',
      type: 'scenario',
      question:
        'Your group is at a UTH table on a Saturday night. The table is full with 7 players, but only 3 of them are in your group. A pit boss is watching closely because the table is busy. What should you do?',
      options: [
        'Play the group strategy anyway -- more players means more information',
        'Use elaborate hand signals to communicate secretly with your 3 group members',
        'Recognize the conditions are not ideal -- only 3 members, casino scrutiny, and random players disrupting coordination -- and either wait for better conditions or play standard strategy',
        'Ask the other players to leave so your group can have the table',
      ],
      correctIndex: 2,
      explanation:
        'This scenario has multiple red flags: only 3 group members (below the 5-player minimum), high casino scrutiny on a busy night, and random players you can\'t coordinate with. The smart play is to recognize that conditions aren\'t right and either wait for an off-peak time or play standard strategy. Forcing the strategy in bad conditions draws heat without providing enough edge.',
    },
    {
      id: 'mod6-q6',
      type: 'multiple-choice',
      question:
        'When should a group player make the 4x pre-flop bet in UTH?',
      options: [
        'Only with pocket Aces or Kings, regardless of table information',
        'When you hold a strong hand AND group information confirms the dealer is unlikely to hold premium cards',
        'On every hand to maximize action and comps',
        'Never -- the 4x bet is too risky even with information sharing',
      ],
      correctIndex: 1,
      explanation:
        'The 4x bet should be made when your hand is strong AND your group\'s shared card knowledge confirms the dealer is statistically unlikely to hold premium cards. This is the most profitable play in UTH when you have the information advantage. Betting without group confirmation, or never betting 4x, both leave money on the table.',
    },
  ],
};
