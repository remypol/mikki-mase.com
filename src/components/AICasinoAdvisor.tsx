/**
 * AICasinoAdvisor — Chat UI for the AI Casino Strategy Advisor
 */

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  isVip: boolean;
}

export default function AICasinoAdvisor({ isVip }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading || limitReached) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-10),
        }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setLimitReached(true);
        setError(data.error);
        return;
      }

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setError('Failed to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleQuickQuestion(q: string) {
    setInput(q);
  }

  const quickQuestions = [
    'What bankroll should I bring to a $25 table?',
    'How do I find a good casino host?',
    'When should I walk away from a session?',
    'Is the 21+3 side bet worth it?',
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span style={{ fontSize: '24px' }}>&#x1F916;</span>
          <h1 className="text-xl font-bold text-white">AI Casino Strategy Advisor</h1>
        </div>
        <p className="text-xs" style={{ color: '#9A9A9A' }}>
          {isVip ? (
            <span>Unlimited questions</span>
          ) : (
            'Ask about casino strategy'
          )}
        </p>
      </div>

      {/* Chat area */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: '#111', border: '1px solid #2D2D2D', minHeight: '400px', maxHeight: '60vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: '300px' }}>
          {messages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm mb-4" style={{ color: '#6B6B6B' }}>
                Ask anything about casino strategy and the math behind the games.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs px-3 py-1.5 rounded-full transition-colors hover:bg-white/10"
                    style={{ background: 'rgba(207, 181, 59, 0.08)', color: '#CFB53B', border: '1px solid rgba(207, 181, 59, 0.15)' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-[80%] rounded-xl px-4 py-2.5 text-sm"
                style={{
                  background: msg.role === 'user' ? 'rgba(207, 181, 59, 0.15)' : '#1A1A1A',
                  color: '#fff',
                  border: msg.role === 'user' ? '1px solid rgba(207, 181, 59, 0.2)' : '1px solid #2D2D2D',
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className="rounded-xl px-4 py-2.5 text-sm"
                style={{ background: '#1A1A1A', border: '1px solid #2D2D2D', color: '#9A9A9A' }}
              >
                <span className="inline-flex items-center gap-1">
                  <span className="animate-pulse">Thinking</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>.</span>
                </span>
              </div>
            </div>
          )}

          {error && (
            <div
              className="rounded-xl px-4 py-2.5 text-sm text-center"
              style={{ background: 'rgba(168, 0, 30, 0.1)', border: '1px solid rgba(168, 0, 30, 0.3)', color: '#ff6b6b' }}
            >
              {error}
              {limitReached && !isVip && (
                <a href="/join" className="block mt-2 text-xs font-bold" style={{ color: '#CFB53B' }}>
                  Join the Mikki Mase Fan Community
                </a>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3" style={{ borderTop: '1px solid #2D2D2D' }}>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={limitReached ? 'Daily limit reached' : 'Ask about casino strategy...'}
              disabled={loading || limitReached}
              className="flex-1 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors disabled:opacity-50"
              style={{ background: '#1A1A1A', border: '1px solid #2D2D2D' }}
              onFocus={(e) => (e.target.style.borderColor = '#CFB53B')}
              onBlur={(e) => (e.target.style.borderColor = '#2D2D2D')}
              maxLength={2000}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading || limitReached}
              className="rounded-xl px-4 py-2.5 font-bold text-sm transition-all hover:brightness-110 disabled:opacity-30"
              style={{ background: '#CFB53B', color: '#000' }}
            >
              Send
            </button>
          </div>
        </form>
      </div>

      <p className="text-center text-[11px] mt-3" style={{ color: '#4A4A4A' }}>
        AI advice is for educational purposes only. Never guarantee casino outcomes.
      </p>
    </div>
  );
}
