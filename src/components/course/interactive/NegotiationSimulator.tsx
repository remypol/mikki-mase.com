import { useState } from 'react';
import type { NegotiationNode, NegotiationOption } from '../../../config/course/types';

const DEFAULT_TREE: NegotiationNode[] = [
  {
    id: 'start',
    speaker: 'host',
    text: "Welcome! I'm your casino host. How can I help you today?",
    options: [
      { text: "Hey, I'm a big player from out of town. Just moved here. What kind of offers do you have?", nextNodeId: 'good-intro', isOptimal: true },
      { text: "I want free stuff. What can you give me?", nextNodeId: 'bad-intro', isOptimal: false },
      { text: "I heard your competitor offers better deals. Convince me to play here.", nextNodeId: 'ok-intro', isOptimal: false },
    ],
  },
  {
    id: 'good-intro',
    speaker: 'host',
    text: "Great to have you! What kind of action are you looking for? What games do you play and what's your typical buy-in?",
    options: [
      { text: "I usually buy in for $100K. I play double deck blackjack and baccarat. My average bet is $5K a hand. I heard you guys are the best, but a friend told me Venetian might be better.", nextNodeId: 'leverage', isOptimal: true },
      { text: "I play $25 blackjack tables mostly.", nextNodeId: 'low-reveal', isOptimal: false },
    ],
  },
  {
    id: 'bad-intro',
    speaker: 'host',
    text: "Well, we have our players club. You can sign up for a card and earn points as you play. We have different tier levels...",
    options: [
      { text: "No, I mean real perks. Rooms, food, limits. I play big. What can you actually do for me?", nextNodeId: 'recover', isOptimal: true },
      { text: "Okay, I'll just sign up for the card then.", nextNodeId: 'lost-leverage', isOptimal: false },
    ],
  },
  {
    id: 'ok-intro',
    speaker: 'host',
    text: "We pride ourselves on treating our players right. What are they offering you? Maybe I can match or beat it.",
    options: [
      { text: "They offered me 20% discount, a suite, and higher limits on double deck. Can you do better?", nextNodeId: 'negotiate-discount', isOptimal: true },
      { text: "I don't remember the exact details.", nextNodeId: 'weak-position', isOptimal: false },
    ],
  },
  {
    id: 'leverage',
    speaker: 'host',
    text: "With that kind of action, I can definitely set you up. We can offer a 10% discount on losses, a complimentary suite, and our standard table limits. Let me call my boss to see about higher limits.",
    options: [
      { text: "10%? Don't disrespect me. The other casino offered 20%. I need at least 15% and negotiated limits. I'm walking if you can't do better.", nextNodeId: 'push-harder', isOptimal: true },
      { text: "10% sounds fair. When can I start?", nextNodeId: 'accepted-low', isOptimal: false },
    ],
  },
  {
    id: 'push-harder',
    speaker: 'host',
    text: "Let me talk to my VP... Okay, I can do 15% discount. And I can get you up to $10K limits on double deck. We'll also comp your suite and meals.",
    options: [
      { text: "15% is getting there. And I want comp slips, not room charges. Drop the slips directly. Also, what about a welcome offer?", nextNodeId: 'comp-slips', isOptimal: true },
      { text: "Deal. Let's get started.", nextNodeId: 'good-deal', isOptimal: false },
    ],
  },
  {
    id: 'comp-slips',
    speaker: 'host',
    text: "Comp slips, sure — I can do $500 for dinner tonight. And for a welcome offer, I can put $2,000 in promo chips on the table for your first session.",
    options: [
      { text: "Make the dinner slip $1,500 — I'm bringing friends. And make the promo chips cash-convertible if possible. If not, I'll take whatever you got. When can we start?", nextNodeId: 'final-push', isOptimal: true },
      { text: "Perfect, that works.", nextNodeId: 'great-deal', isOptimal: false },
    ],
  },
  {
    id: 'final-push',
    speaker: 'host',
    text: "I can do $1,000 on the dinner slip, and the promo chips are play-through only, but they're yours. Let me get everything set up.",
    isEnd: true,
    score: 95,
  },
  {
    id: 'great-deal',
    speaker: 'host',
    text: "Excellent! Let me get everything set up for you. Welcome aboard!",
    isEnd: true,
    score: 80,
  },
  {
    id: 'good-deal',
    speaker: 'host',
    text: "Welcome! Let me get your suite ready and set up your limits.",
    isEnd: true,
    score: 70,
  },
  {
    id: 'accepted-low',
    speaker: 'host',
    text: "Great, I'll set everything up right away. Let me know when you're ready to play.",
    isEnd: true,
    score: 40,
  },
  {
    id: 'recover',
    speaker: 'host',
    text: "Of course. Tell me about your play and I can put together a real package for you.",
    options: [
      { text: "I buy in for $100K minimum. I want a discount, higher limits, and a suite. My buddy told me to check out Venetian, but I wanted to give you first shot.", nextNodeId: 'leverage', isOptimal: true },
      { text: "I just want to know what you have available.", nextNodeId: 'weak-position', isOptimal: false },
    ],
  },
  {
    id: 'negotiate-discount',
    speaker: 'host',
    text: "Let me check with my VP... We can match the 20% discount and the suite. For limits, I can do $8K on double deck.",
    options: [
      { text: "I need $10K minimum on double deck. And I want comp slips, not room charges. Drop the slips directly.", nextNodeId: 'comp-slips', isOptimal: true },
      { text: "That works for me.", nextNodeId: 'great-deal', isOptimal: false },
    ],
  },
  {
    id: 'low-reveal',
    speaker: 'host',
    text: "Sure! You can sign up for our players card at the desk. We have some nice promotions for new members.",
    isEnd: true,
    score: 15,
  },
  {
    id: 'lost-leverage',
    speaker: 'host',
    text: "Great! Head over to the players club desk and they'll get you set up.",
    isEnd: true,
    score: 10,
  },
  {
    id: 'weak-position',
    speaker: 'host',
    text: "Well, we have standard packages. I can offer 7% discount and a comped room based on your play.",
    isEnd: true,
    score: 30,
  },
];

interface Props {
  tree?: NegotiationNode[];
  onComplete?: (score: number) => void;
}

export default function NegotiationSimulator({ tree = DEFAULT_TREE, onComplete }: Props) {
  const [history, setHistory] = useState<string[]>(['start']);
  const [optimalChoices, setOptimalChoices] = useState(0);
  const [totalChoices, setTotalChoices] = useState(0);

  const currentNode = tree.find((n) => n.id === history[history.length - 1]);

  const handleChoice = (option: NegotiationOption) => {
    setHistory((prev) => [...prev, option.nextNodeId]);
    setTotalChoices((prev) => prev + 1);
    if (option.isOptimal) setOptimalChoices((prev) => prev + 1);

    const nextNode = tree.find((n) => n.id === option.nextNodeId);
    if (nextNode?.isEnd) {
      onComplete?.(nextNode.score ?? 0);
    }
  };

  const handleRestart = () => {
    setHistory(['start']);
    setOptimalChoices(0);
    setTotalChoices(0);
  };

  if (!currentNode) {
    return (
      <div className="text-center py-10">
        <h3 className="text-white text-xl font-bold mb-2">Scenario unavailable</h3>
        <p className="text-sm" style={{ color: '#9A9A9A' }}>This negotiation scenario could not be loaded.</p>
      </div>
    );
  }

  if (currentNode.isEnd) {
    const score = currentNode.score ?? 0;
    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <div className="text-6xl mb-4">
          {score >= 80 ? '🎩' : score >= 50 ? '🤔' : '😬'}
        </div>
        <div className="text-5xl font-black mb-4" style={{ color: score >= 80 ? '#CFB53B' : score >= 50 ? '#D97706' : '#A8001E' }}>
          {score}/100
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {score >= 80 ? 'Smooth Operator!' : score >= 50 ? 'Decent Negotiator' : 'Room for Improvement'}
        </h3>
        <p className="mb-2" style={{ color: '#BEBEBE' }}>
          Optimal choices: {optimalChoices}/{totalChoices}
        </p>
        <p className="mb-6 text-sm" style={{ color: '#9A9A9A' }}>
          {score >= 80
            ? 'You used leverage, pushed back on lowballs, and demanded comp slips. Mikki would be proud.'
            : score >= 50
              ? 'You left money on the table. Remember: always push harder and use competitor leverage.'
              : 'You lost your leverage early. Never reveal weakness and always name a competitor.'}
        </p>
        <button
          onClick={handleRestart}
          className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 min-h-[44px]"
          style={{ backgroundColor: '#CFB53B', color: '#000000' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Chat history */}
      <div className="space-y-4 mb-6">
        {history.map((nodeId, idx) => {
          const node = tree.find((n) => n.id === nodeId);
          if (!node) return null;
          const isHost = node.speaker === 'host';
          return (
            <div key={idx} className={`flex ${isHost ? 'justify-start' : 'justify-end'}`}>
              <div
                className="max-w-[85%] p-4 rounded-2xl"
                style={{
                  backgroundColor: isHost ? '#2D2D2D' : 'rgba(207, 181, 59, 0.15)',
                  borderColor: isHost ? '#3A3A3A' : '#CFB53B',
                  border: '1px solid',
                }}
              >
                <span className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: isHost ? '#9A9A9A' : '#CFB53B' }}>
                  {isHost ? '🎰 Casino Host' : '🎯 You'}
                </span>
                <p className="text-white text-sm leading-relaxed">{node.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Current options */}
      {currentNode.options && (
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9A9A9A' }}>
            Choose your response:
          </span>
          {currentNode.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleChoice(option)}
              className="w-full text-left p-4 rounded-xl border-2 transition-all duration-200 min-h-[44px] hover:border-[#CFB53B]"
              style={{ borderColor: '#3A3A3A', backgroundColor: '#1A1A1A', color: '#E8E8E8' }}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
