'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const suggestedQuestions = [
  'How should I price a TikTok integration?',
  'Review my contract for red flags',
  'Help me negotiate a higher rate',
];

export default function AiSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hey! I\'m your Haus AI. I can help with negotiations, contracts, rate calculations, and creator advice. What can I help with?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        'price': 'For TikTok integrations:\n\n• 10K-50K followers: $200-500\n• 50K-100K: $500-1,000\n• 100K-500K: $1,000-3,000\n• 500K+: $3,000+\n\nFactors that increase rates: niche expertise, high engagement (3%+), usage rights, and exclusivity.',
        'contract': 'Key contract red flags:\n\n🚩 "In perpetuity" usage rights\n🚩 Unlimited revisions\n🚩 Exclusivity without premium\n🚩 No kill fee clause\n🚩 60+ day payment terms\n\nWant me to review specific language?',
        'negotiate': 'My negotiation framework:\n\n1. Always counter (they expect it)\n2. Ask 40-50% above your target\n3. Add value before adding cost\n4. Use "Based on my metrics..."\n5. Know your walk-away number\n\nWhat deal are you negotiating?',
      };

      let response = 'Great question! I\'d recommend researching similar creators in your niche. Would you like me to help with something more specific?';

      for (const [key, value] of Object.entries(responses)) {
        if (text.toLowerCase().includes(key)) {
          response = value;
          break;
        }
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Chat Header */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF385C] to-[#D70466] flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-[#222222]">Haus AI</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#008A05]"></div>
              <span className="text-xs text-[#717171]">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white rounded-br-md'
                  : 'bg-white border border-[#DDDDDD] text-[#484848] rounded-bl-md shadow-sm'
              }`}
            >
              <p className="text-[15px] whitespace-pre-line leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#DDDDDD] rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-[#B0B0B0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-[#B0B0B0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-[#B0B0B0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-5 py-3">
          <p className="text-xs text-[#717171] mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="px-3 py-2 bg-white border border-[#DDDDDD] rounded-xl text-sm text-[#484848] hover:border-[#FF385C] hover:text-[#FF385C] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-5 pt-3">
        <div className="flex items-center gap-2 bg-white border border-[#DDDDDD] rounded-2xl p-2 focus-within:border-[#FF385C] focus-within:ring-1 focus-within:ring-[#FF385C] transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 text-[15px] text-[#222222] placeholder-[#717171] focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
