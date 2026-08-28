'use client';

import { useState, useEffect } from 'react';
import { SUBJECTS } from '@/lib/subjects';

const YEARS = [2025, 2024, 2023, 2022];

export default function PyqsPage() {
  const [activeSubject, setActiveSubject] = useState(SUBJECTS[0]?.code || 'ch5001');
  const [activeYear, setActiveYear] = useState<number | null>(2025);
  const [solvedState, setSolvedState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('pyq-solved');
    if (saved) {
      try {
        setSolvedState(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const toggleSolved = (id: string) => {
    const nextState = { ...solvedState, [id]: !solvedState[id] };
    setSolvedState(nextState);
    localStorage.setItem('pyq-solved', JSON.stringify(nextState));
  };

  const getPyqPath = (subjCode: string, year: number) => {
    const codeNum = subjCode.replace('ch', '');
    return `/pyqs/${subjCode}/${codeNum}(${year}).pdf`;
  };

  const solvedCount = Object.values(solvedState).filter(Boolean).length;
  const totalCount = SUBJECTS.length * YEARS.length;
  const currentSub = SUBJECTS.find(s => s.code === activeSubject);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-2">PYQ Archive</h1>
          <p className="text-gray-400">Past Year Board Examination Papers (2022–2025)</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 flex items-center gap-4">
          <div className="text-sm text-gray-400">Solved</div>
          <div className="text-2xl font-bold text-white">{solvedCount} <span className="text-gray-500 text-lg font-medium">/ 24</span></div>
          <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-rose-500 to-orange-500" style={{ width: `${(solvedCount / totalCount) * 100}%` }}></div>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2 custom-scrollbar gap-2">
        {SUBJECTS.map((sub) => (
          <button
            key={sub.code}
            onClick={() => { setActiveSubject(sub.code); }}
            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeSubject === sub.code ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/20' : 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-900 border border-transparent'}`}
          >
            {sub.shortName} ({sub.number})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-white mb-2">{currentSub?.name}</h2>
          <p className="text-xs text-gray-400 mb-4">Select an examination year to open the verified board paper.</p>
          <div className="grid grid-cols-2 gap-3">
            {YEARS.map(year => {
              const id = `${activeSubject}-${year}`;
              const isSolved = solvedState[id];
              return (
                <div key={year} className={`relative flex flex-col p-4 rounded-2xl border transition-all cursor-pointer ${activeYear === year ? 'border-rose-500 bg-rose-500/10' : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'}`} onClick={() => setActiveYear(year)}>
                  <div className="text-2xl font-bold text-gray-200 mb-1">{year}</div>
                  <div className="text-xs text-gray-500 font-medium">BTER Board Paper</div>
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!isSolved}
                      onChange={(e) => { e.stopPropagation(); toggleSolved(id); }}
                      className="w-4 h-4 rounded border-gray-700 text-rose-500 focus:ring-rose-500/50 bg-gray-800 cursor-pointer"
                    />
                    <span className="text-xs text-gray-400">Mark Solved</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="font-bold text-white mb-3 text-sm">Key Exam Focus for {currentSub?.shortName}</h3>
            <div className="flex flex-wrap gap-1.5">
              {currentSub?.keyTopics.map((topic, i) => (
                <span key={i} className="text-xs px-2.5 py-1 bg-rose-500/10 text-rose-300 rounded-lg border border-rose-500/20">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl min-h-[650px] overflow-hidden flex flex-col relative">
          {activeYear ? (
            <iframe src={getPyqPath(activeSubject, activeYear)} className="w-full h-full flex-1 border-0" title={`PYQ ${activeYear}`} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Select a year to view the board paper
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
