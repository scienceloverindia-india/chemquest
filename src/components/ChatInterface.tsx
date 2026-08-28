'use client';

import { useState, useEffect, useRef } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am your AI study assistant for Diploma Chemical Engineering. Ask me anything about CRE, MT-II, PC&I, Energy Engineering, Safety, or Economics.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    'What is relative volatility?',
    'Explain McCabe-Thiele method',
    'Difference between CSTR and PFR',
    'What is HAZOP?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent, presetMessage?: string) => {
    if (e) e.preventDefault();
    
    const userMessageContent = presetMessage || input;
    if (!userMessageContent.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: userMessageContent };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          newMessages[lastIndex].content += chunk;
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '*Sorry, an error occurred while generating the response.*' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Basic formatting for standard markdown + LaTeX display
  const renderMessageContent = (content: string) => {
    // For a real app, you would use react-markdown with remark-math and rehype-katex
    // This is a basic fallback that safely renders text, preserving formatting somewhat
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-800 text-cyan-300 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\n/g, '<br />');

    // LaTeX pseudo-render for $math$ and $$math$$ if KaTeX script processes it later
    return <div dangerouslySetInnerHTML={{ __html: formatted }} className="prose prose-invert max-w-none text-sm md:text-base leading-relaxed" />;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-4 bg-gray-950 border-b border-gray-800 shrink-0">
        <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          ChemQuest AI Assistant
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-gray-950">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-indigo-500 text-white rounded-tr-sm'
                  : 'bg-gray-800/80 backdrop-blur-sm text-gray-200 rounded-tl-sm border border-gray-700/50'
              }`}
            >
              {renderMessageContent(msg.content)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800/80 backdrop-blur-sm text-gray-200 p-4 rounded-2xl rounded-tl-sm border border-gray-700/50">
              <div className="flex gap-1.5 items-center h-5">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-gray-950 border-t border-gray-800 shrink-0">
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSubmit(undefined, s)}
              className="text-xs px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-full text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about chemical engineering..."
            className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pl-4 pr-12 text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
