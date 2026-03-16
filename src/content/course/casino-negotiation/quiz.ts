import type { Quiz } from '../../../config/course/types';

/**
 * Module 7 Quiz: Casino Negotiation & Hosts
 */
export const quiz: Quiz = {
  id: 'mod7-quiz-casino-negotiation',
  passingScore: 80,
  questions: [
    {
      id: 'mod7-q1',
      type: 'multiple-choice',
      question:
        'What is the primary incentive for a casino host to give you comps and perks?',
      options: [
        'They genuinely want you to have a good time',
        'Their compensation is tied to how much action their players generate -- they need you to keep playing',
        'It\'s required by gaming regulations',
        'They\'re spending the casino owner\'s personal money',
      ],
      correctIndex: 1,
      explanation:
        'Casino hosts are compensated based on the total action (money wagered) their players generate. Every comp they give you is a calculated investment to keep you coming back and playing. Understanding this incentive structure is the foundation of effective negotiation -- they need you as much as you want their perks.',
    },
    {
      id: 'mod7-q2',
      type: 'true-false',
      question:
        'A casino host can easily verify how much you bet at a competing casino.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation:
        'False. Casinos do not share player data with competitors. When you tell your MGM host that you bet $500 a hand at Wynn, they cannot verify this. This creates an opportunity for strategic negotiation -- your claimed action at other properties sets the anchor for how they perceive your value.',
    },
    {
      id: 'mod7-q3',
      type: 'multiple-choice',
      question:
        'What is the formula casinos use to calculate your "theoretical" value?',
      options: [
        'Total money lost x number of visits',
        'Average bet x hands per hour x house edge x hours played x days',
        'Total chips purchased minus total chips cashed',
        'Room cost + food cost + entertainment cost',
      ],
      correctIndex: 1,
      explanation:
        'The theoretical loss formula is: Average Bet x Hands Per Hour x House Edge x Hours Played x Days. This is how the casino calculates how much they expect to win from you. Understanding this formula lets you strategically influence how they perceive your value, especially by inflating your reported average bet at competing properties.',
    },
    {
      id: 'mod7-q4',
      type: 'multiple-choice',
      question:
        'When is the BEST time to make a big ask to your casino host?',
      options: [
        'On a Friday night when the casino is packed',
        'The first time you meet them',
        'Near the end of a quarter when hosts are trying to hit their quotas',
        'Right after you\'ve had a big winning session',
      ],
      correctIndex: 2,
      explanation:
        'End of quarter (March, June, September, December) is the best time for big asks. Hosts have quarterly quotas and if they\'re behind, they\'ll be significantly more generous to lock in your action before the quarter closes. This timing advantage can be the difference between getting a standard offer and getting an exceptional one.',
    },
    {
      id: 'mod7-q5',
      type: 'scenario',
      question:
        'Your host at Casino A offers you 2 comped nights in a standard room with $100 food credit. You know Casino B recently offered a friend better terms. What is the optimal negotiation approach?',
      options: [
        'Accept the offer gratefully -- any free comp is a good comp',
        'Reject the offer angrily and demand a suite immediately',
        'Thank them, counter-ask for a suite upgrade and $200 food credit, and mention that a competing property has offered you a stronger package',
        'Accept this offer and quietly take your action to Casino B instead',
      ],
      correctIndex: 2,
      explanation:
        'Never accept the first offer, and never be aggressive about it. The optimal approach is to counter politely while introducing competitive pressure. Asking for specific upgrades (suite, higher food credit) gives the host clear targets, and mentioning competing offers creates urgency. Hosts expect negotiation and have discretionary budgets to work with.',
    },
    {
      id: 'mod7-q6',
      type: 'multiple-choice',
      question:
        'What loss rebate percentage should a well-negotiated mid-level player target?',
      options: [
        '1-3%',
        '5-7% (the standard entry-level offer)',
        '15-25% (achievable with leverage and persistence)',
        '50%+ (anything less is a bad deal)',
      ],
      correctIndex: 2,
      explanation:
        '15-25% is the target range for a mid-level player who negotiates effectively. The standard entry-level offer of 5-7% is what you get if you don\'t push. With competing casino leverage, strategic timing, and persistent negotiation, 15-25% is achievable. This level of rebate can significantly reduce the effective house edge on your play.',
    },
    {
      id: 'mod7-q7',
      type: 'scenario',
      question:
        'You\'ve been negotiating with your host for a better loss rebate for weeks. They say they\'ve gone as high as they can at 10%. You want 20%. What is the most effective next move?',
      options: [
        'Accept 10% -- pushing further will damage the relationship',
        'Threaten to call corporate and complain about the host',
        'Tell the host you appreciate their effort, but based on what a competing property is offering, you\'ll need to move your action there unless they can revisit the number',
        'Stop playing at the casino entirely without telling anyone',
      ],
      correctIndex: 2,
      explanation:
        'The "nuclear option" -- politely threatening to move all your action to a competitor -- is the most powerful escalation tool. It must be done respectfully and you must be willing to follow through. This forces the host to go back to their manager one more time. Use it sparingly so it doesn\'t lose its power, but in a stalled negotiation, it\'s often the only way to break through.',
    },
  ],
};
