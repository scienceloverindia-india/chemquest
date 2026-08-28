'use client';

import ChatInterface from '@/components/ChatInterface';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen p-4 md:p-6">
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 rounded-t-2xl p-6 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-3xl border border-indigo-500/30">
            🤖
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Study Assistant</h1>
            <p className="text-indigo-300 text-sm mt-1">Powered by Gemini - Ask anything about Chemical Engineering</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 -mt-4 bg-gray-950 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl z-10 flex flex-col">
        <ChatInterface />
      </div>
    </div>
  );
}
