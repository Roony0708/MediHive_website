import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { processQuery } from './chatEngine';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  suggestions?: string[];
};

const welcomeMessage: Message = {
  id: 'welcome',
  text: `👋 Hi! I'm MediHive assistant. I can help you find the right doctor, health package, or answer any questions about our services. How can I help you today?`,
  sender: 'bot',
  suggestions: ['Find a cardiologist', 'Best health checkup', 'Hospitals with emergency', 'Full body checkup package'],
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      toggleRef.current?.focus();
    }
  }, [open]);

  const handleWidgetKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key !== 'Tab') return;
    const nodes = widgetRef.current?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const handleSend = (text: string) => {
    const q = text.trim();
    if (!q || loading) return;

    const userMsg: Message = { id: Date.now().toString(), text: q, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const result = processQuery(q);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: result.response,
        sender: 'bot',
        suggestions: result.suggestions,
      };
      setMessages(prev => [...prev, botMsg]);
      setLoading(false);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <strong key={i}>{line.slice(2, -2)}</strong>;
      }
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} style={{ margin: 0 }}>
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j}>{part.slice(2, -2)}</strong>
              : part
          )}
        </p>
      );
    });
  };

  return (
    <>
      <style>{chatStyles}</style>

      <button
        ref={toggleRef}
        className={`cb-toggle${open ? ' cb-toggle-hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>

      <div
        ref={widgetRef}
        className={`cb-widget${open ? ' cb-open' : ''}`}
        role="dialog"
        aria-label="Chat assistant"
        aria-hidden={!open}
        onKeyDown={handleWidgetKeyDown}
      >
        <div className="cb-header">
          <div className="cb-header-left">
            <div className="cb-avatar"><Bot size={20} /></div>
            <div>
              <div className="cb-header-title">MediHive Assistant</div>
              <div className="cb-header-status">Online</div>
            </div>
          </div>
          <button className="cb-close" onClick={() => setOpen(false)} aria-label="Close chat">
            <X size={20} />
          </button>
        </div>

        <div className="cb-messages" ref={listRef} aria-live="polite">
          {messages.map(m => (
            <div key={m.id} className={`cb-msg ${m.sender === 'user' ? 'cb-msg-user' : 'cb-msg-bot'}`}>
              <div className={`cb-bubble ${m.sender === 'user' ? 'cb-bubble-user' : 'cb-bubble-bot'}`}>
                {formatMessage(m.text)}
              </div>
              {m.suggestions && m.sender === 'bot' && (
                <div className="cb-suggestions">
                  {m.suggestions.map(s => (
                    <button key={s} className="cb-chip" onClick={() => handleSend(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="cb-msg cb-msg-bot">
              <div className="cb-bubble cb-bubble-bot">
                <span className="cb-typing">Thinking</span>
              </div>
            </div>
          )}
        </div>

        <div className="cb-input-area">
          <input
            ref={inputRef}
            className="cb-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            aria-label="Type your message"
            disabled={loading}
          />
          <button
            className="cb-send"
            onClick={() => handleSend(input)}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
}

const chatStyles = `
.cb-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px color-mix(in oklch, var(--color-primary) 35%, transparent);
  transition: transform 0.25s ease, opacity 0.25s ease, box-shadow 0.25s ease;
  z-index: var(--z-toast);
}
.cb-toggle:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 28px color-mix(in oklch, var(--color-primary) 45%, transparent);
}
.cb-toggle-hidden {
  display: none;
}

.cb-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 380px;
  height: 580px;
  max-height: calc(100vh - 120px);
  background: var(--color-bg-secondary);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  z-index: var(--z-modal);
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  pointer-events: none;
  visibility: hidden;
  transition: transform 0.25s ease, opacity 0.25s ease, visibility 0.25s;
  overflow: hidden;
}
.cb-open {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
  visibility: visible;
}

.cb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  flex-shrink: 0;
}
.cb-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cb-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.cb-header-title {
  font-size: 0.938rem;
  font-weight: 700;
}
.cb-header-status {
  font-size: 0.75rem;
  opacity: 0.8;
}
.cb-close {
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.cb-close::before {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: inherit;
}
.cb-close:hover {
  background: rgba(255,255,255,0.25);
}

.cb-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cb-msg {
  display: flex;
  flex-direction: column;
  max-width: 85%;
}
.cb-msg-user {
  align-self: flex-end;
}
.cb-msg-bot {
  align-self: flex-start;
}
.cb-bubble {
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  line-height: 1.6;
  word-break: break-word;
}
.cb-bubble strong {
  font-weight: 700;
}
.cb-bubble p + p {
  margin-top: 4px !important;
}
.cb-bubble-user {
  background: var(--color-primary);
  color: var(--color-primary-foreground)fff;
  border-bottom-right-radius: 4px;
}
.cb-bubble-bot {
  background: var(--color-bg-tertiary);
  color: var(--color-text);
  border-bottom-left-radius: 4px;
}
.cb-typing::after {
  content: '';
  animation: cb-dots 1.2s steps(3,end) infinite;
}
@keyframes cb-dots {
  0% { content: '.'; }
  33% { content: '..'; }
  66% { content: '...'; }
}

.cb-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}
.cb-chip {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 8px 16px;
  font-size: 0.813rem;
  font-weight: 500;
  color: var(--color-primary);
  background: var(--color-bg);
  border: 1px solid var(--color-primary);
  border-radius: 24px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  white-space: nowrap;
}
.cb-chip:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
.cb-chip:hover {
  background: var(--color-primary);
  color: var(--color-primary-foreground);
}

.cb-input-area {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--color-border);
  flex-shrink: 0;
}
.cb-input {
  flex: 1;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  font-size: 0.875rem;
  outline: none;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: inherit;
}
.cb-input:focus {
  border-color: var(--color-primary);
}
.cb-input::placeholder {
  color: var(--color-text-tertiary);
}
.cb-send {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.2s;
}
.cb-send:hover:not(:disabled) {
  background: var(--color-primary-hover);
}
.cb-send:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .cb-widget {
    left: 12px;
    right: 12px;
    bottom: 12px;
    width: auto;
    height: calc(100vh - 100px);
    max-height: calc(100vh - 100px);
    border-radius: var(--radius-md);
  }
  .cb-toggle {
    bottom: 16px;
    right: 16px;
  }
}
`;
