import type { Quiz } from '../../../config/course/types';

/**
 * Module 2 Quiz: Casino Psychology
 */
export const quiz: Quiz = {
  id: 'mod2-quiz-casino-psychology',
  passingScore: 80,
  questions: [
    {
      id: 'mod2-q1',
      type: 'multiple-choice',
      question:
        'Why do casinos pump custom scents through their ventilation systems?',
      options: [
        'To mask the smell of cigarette smoke',
        'Because studies show certain scents can increase gambling spend by up to 45%',
        'It is a legal requirement for public buildings',
        'To make the casino feel more like a luxury hotel',
      ],
      correctIndex: 1,
      explanation:
        'Casinos use custom scents as a psychological manipulation tool. Research has demonstrated that specific scents can increase gambling activity by up to 45%. The pleasant, comforting smell is designed to keep you relaxed, comfortable, and playing longer.',
    },
    {
      id: 'mod2-q2',
      type: 'true-false',
      question:
        'Near-misses on slot machines are random occurrences that indicate you are close to winning.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation:
        'False. Near-misses are deliberately programmed into slot machine software. The outcome is determined by a random number generator the instant you press the button -- the spinning reels are pure theater. Near-misses are designed to activate the same reward pathways as actual wins, tricking your brain into continuing to play.',
    },
    {
      id: 'mod2-q3',
      type: 'multiple-choice',
      question:
        'How is your "theoretical loss" calculated by the casino?',
      options: [
        'Total buy-in minus cash-out amount',
        'Average bet × hands per hour × house edge × hours played',
        'Number of hands lost × average bet size',
        'Total amount wagered × house edge',
      ],
      correctIndex: 1,
      explanation:
        'Theoretical loss is calculated as: average bet × hands per hour × house edge × hours played. This is the amount the casino mathematically expects you to lose, and it is the basis for all comp calculations -- regardless of whether you actually won or lost that session.',
    },
    {
      id: 'mod2-q4',
      type: 'scenario',
      question:
        'You are playing blackjack with perfect basic strategy and have won $8,000 over 3 sessions. The pit boss approaches and says, "You are a really sharp player." What is the best response?',
      options: [
        'Thank him and explain your strategy',
        'Say "Thanks! I just go with my gut -- tonight is my lucky night!" and order a drink',
        'Ignore him and focus on the cards',
        'Tell him you took a blackjack class online',
      ],
      correctIndex: 1,
      explanation:
        'The pit boss is probing to see if you are an advantage player. The best response is to deflect with casual, recreational-player behavior -- attributing wins to luck, ordering a drink, and showing zero strategic awareness. Acknowledging strategy, ignoring them (suspicious), or mentioning education all raise red flags.',
    },
    {
      id: 'mod2-q5',
      type: 'multiple-choice',
      question:
        'A casino offers you a "free" hotel room (costs them $30 to provide). Roughly how much did you likely lose in theoretical play to earn that comp?',
      options: [
        '$100-200',
        '$500-1,000',
        '$3,000 or more',
        'Nothing -- it is a genuine gift for loyal customers',
      ],
      correctIndex: 2,
      explanation:
        'Casinos typically return 10-30% of your theoretical loss as comps. A room that costs them $30 to provide usually requires around $3,000 in theoretical losses to earn. You are paying roughly 60-100x the actual cost of the perk. Understanding this math is essential before you can learn to flip the system.',
    },
    {
      id: 'mod2-q6',
      type: 'multiple-choice',
      question:
        'Which of the following behaviors would MOST likely trigger increased casino surveillance?',
      options: [
        'Tipping the dealer generously and chatting about sports',
        'Dramatically increasing your bet size from $25 to $500 over a few hands',
        'Ordering a cocktail and celebrating a big win loudly',
        'Using your players card and asking the pit boss about dinner reservations',
      ],
      correctIndex: 1,
      explanation:
        'Dramatic bet spreading -- going from small bets to large bets in a short period -- is the number one red flag for card counting and advantage play. All other options describe typical recreational player behavior that helps you fly under the radar.',
    },
  ],
};
