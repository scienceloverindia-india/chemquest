'use client';

import { useState, useEffect } from 'react';
import PDFViewer from './PDFViewer';

interface PYQBrowserProps {
  subjectCode: string;
}

export default function PYQBrowser({ subjectCode }: PYQBrowserProps) {
  const years = [2024, 2023, 2022, 2021];
  const [activeYear, setActiveYear] = useState<number>(years[0]);
  const [solvedStatus, setSolvedStatus] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Load solved status from localStorage
    const saved = localStorage.getItem(`pyq_solved_${subjectCode}`);
    if (saved) {
      try {
        setSolvedStatus(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse solved status', e);
      }
    }
  }, [subjectCode]);

  const toggleSolved = (year: number) => {
    const updated = { ...solvedStatus, [year]: !solvedStatus[year] };
    setSolvedStatus(updated);
    localStorage.setItem(`pyq_solved_${subjectCode}`, JSON.stringify(updated));
  };

  const pdfUrl = `/pyqs/${subjectCode.toLowerCase()}/${activeYear}.pdf`;

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 p-1 bg-gray-900/60 p-2 rounded-2xl border border-gray-800">
        <div className="flex gap-1 overflow-x-auto p-1">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeYear === year
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              {year} Paper
              {solvedStatus[year] && (
                <span className="ml-2 inline-flex items-center text-emerald-400">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
        
        <div className="flex items-center px-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={!!solvedStatus[activeYear]}
                onChange={() => toggleSolved(activeYear)}
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${solvedStatus[activeYear] ? 'bg-emerald-500' : 'bg-gray-700'}`}></div>
              <div className={`absolute w-4 h-4 rounded-full bg-white top-1 transition-transform ${solvedStatus[activeYear] ? 'translate-x-5' : 'translate-x-1'}`}></div>
            </div>
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              Mark as Solved
            </span>
          </label>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <PDFViewer src={pdfUrl} title={`${subjectCode} - ${activeYear} Previous Year Paper`} />
      </div>
    </div>
  );
}
