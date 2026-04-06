/**
 * SupportChat — Inline AI support chat + email form
 * Embedded on /support page (not a floating widget)
 */

import { useState, useRef, useEffect, type FormEvent } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type Tab = 'chat' | 'form';

export default function SupportChat() {
  const [tab, setTab] = useState<Tab>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hey! How can I help you today? I can answer questions about the Masterclass, your account, or anything else.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (tab === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [tab]);

  async function sendMessage(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/support/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages.slice(-8) }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: "Sorry, I'm having trouble right now. Please use the email form to reach our team." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Something went wrong. Please use the email form or contact hugo@cc-community.com." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function sendQuickMessage(q: string) {
    const userMsg: Message = { role: 'user', content: q };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    fetch('/api/support/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: q, history: messages.slice(-8) }),
    })
      .then((r) => r.json())
      .then((data) => setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]))
      .catch(() => setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }]))
      .finally(() => setLoading(false));
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/support/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });

      if (res.ok) {
        setFormSent(true);
      } else {
        alert('Failed to send. Please email hugo@cc-community.com directly.');
      }
    } catch {
      alert('Failed to send. Please email hugo@cc-community.com directly.');
    } finally {
      setFormLoading(false);
    }
  }

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 600,
    color: active ? '#000' : '#999',
    backgroundColor: active ? '#CFB53B' : 'transparent',
    border: active ? 'none' : '1px solid #333',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.15s',
  });

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#111',
    border: '1px solid #2a2a2a',
    borderRadius: '10px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button onClick={() => setTab('chat')} style={tabStyle(tab === 'chat')}>
          AI Chat
        </button>
        <button onClick={() => { setTab('form'); setFormSent(false); }} style={tabStyle(tab === 'form')}>
          Email Us
        </button>
      </div>

      {/* ===== CHAT TAB ===== */}
      {tab === 'chat' && (
        <div
          style={{
            backgroundColor: '#0a0a0a',
            borderRadius: '16px',
            border: '1px solid #1e1e1e',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '500px',
          }}
        >
          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    backgroundColor: msg.role === 'user' ? '#CFB53B' : '#1a1a1a',
                    color: msg.role === 'user' ? '#000' : '#e5e5e5',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.content.split('\n').map((line, j) => (
                    <span key={j}>
                      {j > 0 && <br />}
                      {line || '\u00A0'}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '12px 18px', borderRadius: '14px 14px 14px 4px', backgroundColor: '#1a1a1a', display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <span className="support-dot" style={{ animationDelay: '0s' }} />
                  <span className="support-dot" style={{ animationDelay: '0.2s' }} />
                  <span className="support-dot" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && !loading && (
            <div style={{ padding: '0 20px 12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                'How do I access the Masterclass?',
                "I paid but can't log in",
                'Can I get a refund?',
                'What plans are available?',
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => sendQuickMessage(q)}
                  className="support-quick-btn"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={sendMessage} style={{ padding: '12px 20px 20px', display: 'flex', gap: '8px', borderTop: '1px solid #1a1a1a' }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              disabled={loading}
              maxLength={1000}
              style={{ ...inputStyle, flex: 1, width: 'auto' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#CFB53B')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                backgroundColor: '#CFB53B',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 16px',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !input.trim() ? 0.4 : 1,
                display: 'flex',
                alignItems: 'center',
                transition: 'opacity 0.15s',
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* ===== EMAIL FORM TAB ===== */}
      {tab === 'form' && !formSent && (
        <form
          onSubmit={handleFormSubmit}
          style={{
            backgroundColor: '#0a0a0a',
            borderRadius: '16px',
            border: '1px solid #1e1e1e',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <p style={{ color: '#999', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
            Send us a message and we'll get back to you as soon as possible.
          </p>

          <div>
            <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Name
            </label>
            <input name="name" type="text" required placeholder="Your name" style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#CFB53B')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Email
            </label>
            <input name="email" type="email" required placeholder="your@email.com" style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#CFB53B')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Message
            </label>
            <textarea name="message" required placeholder="How can we help?" maxLength={5000}
              style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#CFB53B')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
            />
          </div>

          <button
            type="submit"
            disabled={formLoading}
            style={{
              backgroundColor: '#CFB53B',
              color: '#000',
              border: 'none',
              borderRadius: '10px',
              padding: '14px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: formLoading ? 'not-allowed' : 'pointer',
              opacity: formLoading ? 0.7 : 1,
              transition: 'opacity 0.15s, transform 0.1s',
            }}
          >
            {formLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}

      {/* Form Sent */}
      {tab === 'form' && formSent && (
        <div
          style={{
            backgroundColor: '#0a0a0a',
            borderRadius: '16px',
            border: '1px solid #1e1e1e',
            padding: '48px 28px',
            textAlign: 'center',
          }}
        >
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#0a2a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>Message Sent!</h3>
          <p style={{ color: '#999', fontSize: '14px', margin: '0 0 24px', lineHeight: '1.6' }}>
            We'll get back to you as soon as possible.
          </p>
          <button
            onClick={() => setFormSent(false)}
            style={{
              background: 'none',
              border: '1px solid #333',
              borderRadius: '10px',
              padding: '10px 24px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Send Another
          </button>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .support-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #555;
          animation: supportDotPulse 1.4s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes supportDotPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        .support-quick-btn {
          background: none;
          border: 1px solid #2a2a2a;
          border-radius: 20px;
          padding: 6px 14px;
          color: #888;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .support-quick-btn:hover {
          border-color: #CFB53B;
          color: #CFB53B;
        }
      `}</style>
    </div>
  );
}
