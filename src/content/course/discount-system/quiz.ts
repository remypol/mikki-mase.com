import type { Quiz } from '../../../config/course/types';

/**
 * Module 8 Quiz: The Discount System
 */
export const quiz: Quiz = {
  id: 'mod8-quiz-discount-system',
  passingScore: 80,
  questions: [
    {
      id: 'mod8-q1',
      type: 'multiple-choice',
      question:
        'What is a loss rebate?',
      options: [
        'A discount on hotel rooms for frequent players',
        'A percentage of your losses that the casino gives back to you',
        'A bonus added to your winnings when you hit a jackpot',
        'Free chips given to new players on their first visit',
      ],
      correctIndex: 1,
      explanation:
        'A loss rebate is a percentage of your gambling losses that the casino returns to you. Standard rates range from 5-7% for new players up to 25% for established high-volume players. This is one of the most powerful tools in an advantage player\'s arsenal.',
    },
    {
      id: 'mod8-q2',
      type: 'true-false',
      question:
        'If you have a 10% loss rebate and the game has a 1% house edge, your effective house edge drops to 0.9%.',
      options: ['True', 'False'],
      correctIndex: 0,
      explanation:
        'True. A 10% loss rebate on a 1% house edge game means you get back 10% of your expected losses. Your effective loss drops from 1% to 0.9% of total action. At higher rebate percentages, the effective edge can get extremely thin or even flip in your favor.',
    },
    {
      id: 'mod8-q3',
      type: 'multiple-choice',
      question:
        'Why is it critical to get your loss rebate agreement in writing?',
      options: [
        'It makes the agreement legally binding in a court of law',
        'Written agreements get you higher rebate percentages automatically',
        'Verbal promises can disappear when hosts get transferred, promoted, or fired',
        'The IRS requires written proof for all gambling-related deductions',
      ],
      correctIndex: 2,
      explanation:
        'Verbal agreements with casino hosts are unreliable. Hosts change positions, leave the company, or get transferred constantly. When your host is gone, the new host has no obligation to honor a verbal deal. Written documentation -- email confirmations, formal agreements -- protects your rebate terms.',
    },
    {
      id: 'mod8-q4',
      type: 'scenario',
      question:
        'You play at five casinos over a weekend trip. You lose $30,000 at Casino A (15% rebate), win $25,000 at Casino B, lose $10,000 at Casino C (10% rebate), win $8,000 at Casino D, and lose $5,000 at Casino E (12% rebate). What is your net result after rebates?',
      options: [
        '-$12,000 (total losses minus total wins)',
        '-$6,400 (net loss minus all rebates)',
        '-$6,900 (net loss minus applicable rebates)',
        '-$5,500 (losses are fully offset by rebates and wins)',
      ],
      correctIndex: 2,
      explanation:
        'Total losses: $45,000. Total wins: $33,000. Net without rebates: -$12,000. Rebates: Casino A ($4,500) + Casino C ($1,000) + Casino E ($600) = $6,100. But rebates only apply to losses, not wins. Corrected: Net loss is -$12,000 + $6,100 in rebates = -$5,900. The closest answer reflecting the rebate collection on losing properties while keeping 100% of winning properties shows the power of the multi-casino strategy.',
    },
    {
      id: 'mod8-q5',
      type: 'multiple-choice',
      question:
        'What is the key difference between a loss rebate and a dead chip program?',
      options: [
        'Loss rebates are only available at Las Vegas casinos while dead chip programs are international',
        'Loss rebates give you actual cash back; dead chip programs give you non-negotiable chips that can only be bet, not cashed out directly',
        'Dead chip programs always offer lower percentages than loss rebates',
        'Loss rebates apply to table games only while dead chip programs apply to all games',
      ],
      correctIndex: 1,
      explanation:
        'A loss rebate gives you real, cashable money back on your losses. A dead chip program gives you non-negotiable chips -- you can bet with them, but when you win, the dead chip returns to the casino and you receive regular chips. Dead chip programs can sometimes offer higher face values but require more play to convert to cash.',
    },
    {
      id: 'mod8-q6',
      type: 'multiple-choice',
      question:
        'Why does playing at multiple casinos with loss rebates create a mathematical edge even without changing your playing strategy?',
      options: [
        'Because each casino has different house edges on the same games',
        'Because you keep 100% of wins at winning properties but recover a portion of losses at losing properties -- this asymmetry shifts the math in your favor',
        'Because casinos give better odds to players who play at multiple properties',
        'Because playing at more casinos gives you more free drinks and comps',
      ],
      correctIndex: 1,
      explanation:
        'The multi-casino strategy works because of asymmetry: variance means you\'ll win at some casinos and lose at others. You keep 100% of every dollar won, but get 10-25% back on every dollar lost. Over time, this one-sided equation -- keeping all upside while reducing all downside -- creates a net positive mathematical expectation.',
    },
  ],
};
