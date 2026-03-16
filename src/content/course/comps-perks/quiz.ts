import type { Quiz } from '../../../config/course/types';

/**
 * Module 9 Quiz: Comps & Perks Maximization
 */
export const quiz: Quiz = {
  id: 'mod9-quiz-comps-perks',
  passingScore: 80,
  questions: [
    {
      id: 'mod9-q1',
      type: 'multiple-choice',
      question:
        'Why are comp slips always better than charging meals to your room?',
      options: [
        'Comp slips give you higher-quality food options',
        'Comp slips are truly free and pre-approved, while room charges may or may not get comped at checkout',
        'Room charges have a 15% service fee that comp slips don\'t',
        'Comp slips earn you additional player\'s card points',
      ],
      correctIndex: 1,
      explanation:
        'Comp slips are pre-approved by your host -- the meal is 100% free with no surprises. Room charges are a gamble: they go on your bill and may not get comped, leaving you stuck paying full casino restaurant prices out of pocket. Always get comp slips before you eat.',
    },
    {
      id: 'mod9-q2',
      type: 'true-false',
      question:
        'Casino credit lines do not appear on your credit report because they are gambling-related, not traditional loans.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation:
        'False. Casino credit lines are reported to credit bureaus just like any other line of credit. They show up on your credit report and can be seen by mortgage lenders, banks, and business partners. This is one of the key reasons Mikki prefers front money over credit lines.',
    },
    {
      id: 'mod9-q3',
      type: 'multiple-choice',
      question:
        'What is "rate matching" in the context of casino comps?',
      options: [
        'Asking a casino to match the interest rate on your credit line with another bank',
        'Telling Casino B what Casino A gives you in comps and asking them to match or beat it',
        'Requesting that your comp rate match the house edge of the game you play',
        'Having multiple player\'s cards at the same casino to double your points',
      ],
      correctIndex: 1,
      explanation:
        'Rate matching means leveraging your comp package at one casino to negotiate equal or better treatment at another. Casinos compete for player action, so telling a new property "the Wynn gives me a suite and all meals comped" creates pressure for them to match that offer to win your business.',
    },
    {
      id: 'mod9-q4',
      type: 'scenario',
      question:
        'You\'re a regular player with a good host relationship. It\'s the last week of the quarter and you want to ask for an airfare reimbursement for your next trip. When should you make this request?',
      options: [
        'Wait until the beginning of next quarter when the host has a fresh budget',
        'Ask right now -- end of quarter is when hosts are under the most pressure to hit numbers and are most generous with comps',
        'Ask at the table while you\'re playing so the host can see your action in real-time',
        'Send a formal letter to the casino\'s corporate office instead of asking your host',
      ],
      correctIndex: 1,
      explanation:
        'End of quarter is the ideal time to make big comp requests. Hosts have quotas and budgets they need to meet, and they\'re more generous during these periods to keep players happy and generate action. Timing your asks strategically -- end of month, quarter, or year -- significantly increases your chances of getting approved.',
    },
    {
      id: 'mod9-q5',
      type: 'multiple-choice',
      question:
        'What is the primary advantage of using front money instead of a casino credit line?',
      options: [
        'Front money earns interest while sitting in the casino cage',
        'Front money gives you a higher table limit than credit lines',
        'Front money keeps you in control of your bankroll with no debt, no credit impact, and a built-in loss limit',
        'Front money is required for VIP status at most casinos',
      ],
      correctIndex: 2,
      explanation:
        'Front money is your own cash deposited with the casino. You control the bankroll, there\'s no debt or credit report impact, and you can\'t lose more than you deposited. Credit lines create temptation to chase losses with borrowed money and appear on your credit report. Front money enforces the discipline that advantage players need.',
    },
    {
      id: 'mod9-q6',
      type: 'true-false',
      question:
        'If your comp rate (total comps / total theoretical loss) is below 20%, you are likely leaving significant comp value on the table.',
      options: ['True', 'False'],
      correctIndex: 0,
      explanation:
        'True. A comp rate below 20% of your theoretical loss means the casino is keeping more of your expected losses without adequately compensating you. A well-negotiated comp package should return 25-40% of your theoretical loss. If you\'re below 20%, you need to negotiate harder or move your play to a property that values it more.',
    },
  ],
};
