import type { Quiz } from '../../../config/course/types';

/**
 * Module 1 Quiz: Mindset & Disclaimer
 */
export const quiz: Quiz = {
  id: 'mod1-quiz-mindset-disclaimer',
  passingScore: 80,
  questions: [
    {
      id: 'mod1-q1',
      type: 'multiple-choice',
      question:
        "According to Mikki Mase, what is his #1 piece of gambling advice?",
      options: [
        'Always bet big on blackjack',
        'Do not gamble',
        'Find a casino with the best comps',
        'Play slots when they\'re "hot"',
      ],
      correctIndex: 1,
      explanation:
        'Mikki\'s #1 advice is literally "do not gamble." This paradox underscores the core mindset: if you treat gambling like entertainment or a get-rich-quick scheme, you will lose. Advantage play is a discipline, not a game.',
    },
    {
      id: 'mod1-q2',
      type: 'true-false',
      question:
        'Casinos remove clocks and windows from their floors to help guests relax and enjoy their experience.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation:
        'False. The absence of clocks and windows is a deliberate psychological tactic to make players lose track of time. The longer you play, the more the house edge grinds down your bankroll. It has nothing to do with guest comfort -- it\'s about maximizing time on the floor.',
    },
    {
      id: 'mod1-q3',
      type: 'multiple-choice',
      question:
        'You\'re up $4,000 at the blackjack table and feeling great. Your original stop-win was $3,000. What should you do?',
      options: [
        'Keep playing -- you\'re on a hot streak and the cards are in your favor',
        'Increase your bets since you\'re playing with "house money"',
        'You should have already left at $3,000. Leave immediately.',
        'Move to a different table to change your luck dynamics',
      ],
      correctIndex: 2,
      explanation:
        'You should have walked away when you hit your $3,000 stop-win. The fact that you\'re at $4,000 means you already broke your own rule. There\'s no such thing as a "hot streak" in mathematics -- every hand is independent. Discipline means honoring your limits with zero exceptions.',
    },
    {
      id: 'mod1-q4',
      type: 'true-false',
      question:
        'Casino loyalty programs are designed to give players a net positive return on their gambling spending.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation:
        'False. Loyalty programs typically return only 10-30% of a player\'s losses in the form of comps. That "free" hotel room that cost the casino $30 to provide likely required you to lose thousands of dollars. The programs are calculated investments to keep you coming back -- not gifts.',
    },
    {
      id: 'mod1-q5',
      type: 'scenario',
      question:
        'A friend invites you to a casino for a "fun night out." He says he\'s budgeted $500 for entertainment and plans to play whatever looks exciting, have some free drinks, and "see what happens." Based on what you\'ve learned, which statement best describes the problem with his approach?',
      options: [
        'He should budget more than $500 to have a proper night out',
        'He should only play one game instead of jumping around',
        'He\'s treating gambling as entertainment instead of a math-based business -- no plan, no game selection strategy, and alcohol will impair his decisions',
        'He should skip the free drinks and focus on the games',
      ],
      correctIndex: 2,
      explanation:
        'Your friend\'s approach combines almost every mistake in the book: no specific game plan, no stop-win/stop-loss limits, emotional rather than mathematical decision-making, alcohol impairing judgment, and treating the casino as entertainment. The free drinks alone are among the casino\'s most effective tools -- they reduce inhibition and increase bet sizes. An advantage player walks in with a plan, plays a specific game with known math, stays sober, and leaves on schedule.',
    },
  ],
};
