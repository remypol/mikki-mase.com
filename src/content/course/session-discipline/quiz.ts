import type { Quiz } from '../../../config/course/types';

/**
 * Module 10 Quiz: Session Discipline & Bankroll Management
 */
export const quiz: Quiz = {
  id: 'mod10-quiz-session-discipline',
  passingScore: 80,
  questions: [
    {
      id: 'mod10-q1',
      type: 'multiple-choice',
      question:
        'When should you set your stop-win and stop-loss limits?',
      options: [
        'After your first few hands to see how the session is going',
        'Before you enter the casino -- never at the table',
        'When the pit boss asks you to rate your play',
        'At the end of the session when you\'re ready to leave',
      ],
      correctIndex: 1,
      explanation:
        'Win/loss limits must be set BEFORE you enter the casino. Once you\'re at the table, emotions take over -- the lights, sounds, adrenaline, and social pressure make it nearly impossible to set rational limits. Decide your numbers in advance, write them down, and honor them without exception.',
    },
    {
      id: 'mod10-q2',
      type: 'true-false',
      question:
        'Playing 500 hands at $100 per hand is safer than playing 100 hands at $500 per hand, because the individual bet size is smaller.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation:
        'False. Both scenarios involve $50,000 in total action, so the expected mathematical loss is the same. However, 500 hands takes much longer, giving the house edge more time to compound and the law of large numbers more opportunity to push your results toward the expected loss. 100 hands at $500 keeps you in a higher-variance zone where positive outcomes are more likely, and you\'re out before the math catches up.',
    },
    {
      id: 'mod10-q3',
      type: 'multiple-choice',
      question:
        'Why does Mikki recommend playing for only 30-45 minutes per session?',
      options: [
        'Casino rules limit high-roller sessions to 45 minutes',
        'Shorter sessions minimize exposure to the house edge, which compounds over time and number of hands',
        'It takes 30 minutes for the casino to start tracking your play',
        'Dealers change every 30 minutes and new dealers are harder to read',
      ],
      correctIndex: 1,
      explanation:
        'The house edge is a mathematical grind that compounds with every hand played. In a short 30-45 minute session, variance (randomness) dominates and you have a real chance of a positive outcome. Over longer sessions, the law of large numbers takes over and your results converge toward the expected loss. Short sessions keep you in the variance zone where winning is more probable.',
    },
    {
      id: 'mod10-q4',
      type: 'scenario',
      question:
        'You\'re 25 minutes into a session with a $20,000 buy-in. You\'re currently up $7,000 (your stop-win was $6,000). You feel great and the table is "hot." What should you do?',
      options: [
        'Keep playing -- you\'re past your stop-win, so ride the momentum for bigger gains',
        'Increase your bet size since you\'re playing with "house money"',
        'You should have left when you hit $6,000. Leave immediately -- don\'t negotiate with the voice telling you to stay',
        'Switch tables to lock in the $7,000 and start fresh',
      ],
      correctIndex: 2,
      explanation:
        'You should have already left when your profit hit $6,000 (your pre-set stop-win). The fact that you\'re at $7,000 means you already broke your own rule. There\'s no such thing as a "hot table" in mathematics -- every hand is independent. Leave immediately. The voice telling you to stay is exactly what the casino is counting on. Honor your limits every time, no exceptions.',
    },
    {
      id: 'mod10-q5',
      type: 'multiple-choice',
      question:
        'What is the maximum percentage of your session bankroll you should risk on a single hand?',
      options: [
        '10% -- you need room for big bets to maximize comp value',
        '25% -- aggressive play means big individual bets',
        '5% -- never risk more than 5% of your session bankroll per hand',
        '50% -- go big or go home is the philosophy',
      ],
      correctIndex: 2,
      explanation:
        'The 5% rule means never risking more than 5% of your session bankroll on a single hand. With a $20,000 session bankroll, your maximum bet is $1,000. This ensures you have enough bankroll to absorb normal variance without going bust. Aggressive play means big bets within a disciplined framework -- not reckless all-in wagers.',
    },
    {
      id: 'mod10-q6',
      type: 'scenario',
      question:
        'A player combines all the strategies from this course: they play optimal strategy at a 1% house edge game, have a 15% loss rebate, get full comps (rooms, food, airfare), play 30-45 minute sessions, and rotate across 4 casinos. Which statement best describes their position?',
      options: [
        'They\'re still at a mathematical disadvantage because the house always wins',
        'They\'ve eliminated risk entirely and are guaranteed to profit',
        'They\'ve created a system where the effective house edge is minimal, losses are partially rebated, living expenses are comped, and short sessions maximize variance -- giving them a realistic edge over time',
        'They\'re cheating the system and will eventually get caught and prosecuted',
      ],
      correctIndex: 2,
      explanation:
        'By combining optimal strategy (minimizing house edge), loss rebates (recovering a portion of losses), comps (eliminating living expenses), and session discipline (maximizing favorable variance), a player creates a comprehensive system that can produce a realistic edge over time. It\'s not guaranteed profit and it\'s not cheating -- it\'s disciplined, mathematical play using every tool the casino makes available. This is exactly how advantage players operate.',
    },
  ],
};
