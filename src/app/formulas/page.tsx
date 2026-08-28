'use client';

import { useState } from 'react';
import { SUBJECTS } from '@/lib/subjects';
import { FORMULAS } from '@/lib/formulas';
import FormulaCard from '@/components/FormulaCard';

export default function FormulasPage() {
  const [activeSubject, setActiveSubject] = useState<string>('all');
  const [search, setSearch] = useState('');

  const allFormulas = Object.entries(FORMULAS).flatMap(([subjectId, list]) =>
    list.map((f) => ({ ...f, subjectId }))
  );

  const filteredFormulas = allFormulas.filter(f => 
    (activeSubject === 'all' || f.subjectId === activeSubject) &&
    (f.name.toLowerCase().includes(search.toLowerCase()) || f.unit.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-2">Formula Master</h1>
          <p className="text-gray-400">Quick revision of all important equations</p>
        </div>
        <div className="w-full md:w-72">
          <div className="relative">
            <input
              type="text"
              placeholder="Search formulas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <svg className="w-5 h-5 text-gray-500 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2 custom-scrollbar gap-2">
        <button
          onClick={() => setActiveSubject('all')}
          className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeSubject === 'all' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-900'}`}
        >
          All Subjects
        </button>
        {SUBJECTS.map((sub) => (
          <button
            key={sub.code}
            onClick={() => setActiveSubject(sub.code)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeSubject === sub.code ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-900 border border-transparent'}`}
          >
            {sub.shortName} ({sub.number})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFormulas.map((formula, idx) => (
          <FormulaCard key={idx} formula={formula} />
        ))}
        {filteredFormulas.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-gray-800 rounded-2xl">
            No formulas found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
