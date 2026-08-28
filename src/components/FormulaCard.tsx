'use client';

import { useState } from 'react';
import { Formula } from '@/lib/formulas';

interface FormulaCardProps {
  formula: Formula & { id?: string };
}

export default function FormulaCard({ formula }: FormulaCardProps) {
  const [copied, setCopied] = useState(false);
  const { name, latex, description } = formula;
  const importance = formula.examImportance || 'medium';

  const importanceConfig = {
    high: { color: 'bg-red-500/10 text-red-400 border-red-500/20', label: 'High Yield' },
    medium: { color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', label: 'Medium Yield' },
    low: { color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', label: 'Low Yield' },
  };

  const badge = importanceConfig[importance];

  const handleCopy = () => {
    navigator.clipboard.writeText(`$$${latex}$$`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 hover:bg-gray-800/60 transition-colors flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-200 text-lg leading-tight pr-2">{name}</h3>
        <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${badge.color}`}>
          {badge.label}
        </span>
      </div>

      <div className="my-4 py-6 px-4 bg-gray-950 rounded-xl border border-gray-800/50 flex items-center justify-center relative overflow-x-auto min-h-[100px]">
        {/* We output the latex wrapped in $$ for KaTeX auto-render to pick up if used, 
            or basic display. In a full setup, window.katex.renderToString could be used here. */}
        <div className="text-lg text-indigo-300 font-serif whitespace-nowrap">
          {`$$${latex}$$`}
        </div>
        
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors border border-gray-700"
          title="Copy LaTeX"
        >
          {copied ? (
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>

      <p className="text-sm text-gray-400 mt-auto leading-relaxed">{description}</p>
    </div>
  );
}
