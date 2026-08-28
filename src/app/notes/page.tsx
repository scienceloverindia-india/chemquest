'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const SUBJECTS = [
  {
    code: 'ch5001',
    title: 'Chemical Reaction Engineering (CRE)',
    color: 'rose',
    colorClasses: 'from-rose-500 to-rose-700 text-rose-400 bg-rose-500/10 border-rose-500/20',
    masterPages: 118,
    masterPath: '/notes/ch5001/master.pdf',
    secondary: [{ title: 'Essential Graphical Methods', path: '/notes/ch5001/graphical.pdf' }],
    units: ['Unit 1: Introduction to CRE', 'Unit 2: Kinetics of Homogeneous Reactions', 'Unit 3: Interpretation of Batch Reactor Data', 'Unit 4: Ideal Reactors', 'Unit 5: Non-Ideal Flow'],
    topics: ['Rate equation', 'Order and Molecularity', 'Constant & Variable volume batch reactor', 'CSTR', 'PFR', 'RTD']
  },
  {
    code: 'ch5002',
    title: 'Mass Transfer-II (MT-II)',
    color: 'blue',
    colorClasses: 'from-blue-500 to-blue-700 text-blue-400 bg-blue-500/10 border-blue-500/20',
    masterPages: 78,
    masterPath: '/notes/ch5002/master.pdf',
    secondary: [{ title: 'Karan Meghwal Notes', path: '/notes/ch5002/karan.pdf' }],
    units: ['Unit 1: Distillation', 'Unit 2: Extraction', 'Unit 3: Leaching', 'Unit 4: Adsorption', 'Unit 5: Crystallization'],
    topics: ['McCabe-Thiele', 'VLE', 'Ternary diagrams', 'Freundlich Isotherm', 'Miers Supersaturation']
  },
  {
    code: 'ch5003',
    title: 'Process Control & Instrumentation (PC&I)',
    color: 'amber',
    colorClasses: 'from-amber-500 to-amber-700 text-amber-400 bg-amber-500/10 border-amber-500/20',
    masterPages: 84,
    masterPath: '/notes/ch5003/master.pdf',
    secondary: [{ title: 'Digital Text', path: '/notes/ch5003/digital.pdf' }],
    units: ['Unit 1: Intro to Process Control', 'Unit 2: First Order Systems', 'Unit 3: Second Order Systems', 'Unit 4: Controllers (PID)', 'Unit 5: Measuring Instruments'],
    topics: ['Transfer functions', 'Thermocouples', 'Manometers', 'P, PI, PID control', 'Bode stability']
  },
  {
    code: 'ch50042',
    title: 'Energy Engineering (EE)',
    color: 'orange',
    colorClasses: 'from-orange-500 to-orange-700 text-orange-400 bg-orange-500/10 border-orange-500/20',
    masterPages: 70,
    masterPath: '/notes/ch50042/master.pdf',
    secondary: [],
    units: ['Unit 1: Solid Fuels', 'Unit 2: Liquid Fuels', 'Unit 3: Gaseous Fuels', 'Unit 4: Combustion Calculation', 'Unit 5: Non-Conventional Energy'],
    topics: ['Coal analysis', 'Petroleum refining', 'Natural gas', 'Flue gas analysis', 'Solar & Wind energy']
  },
  {
    code: 'ch50052',
    title: 'Safety in Chemical Process Industries',
    color: 'red',
    colorClasses: 'from-red-500 to-red-700 text-red-400 bg-red-500/10 border-red-500/20',
    masterPages: 23,
    masterPath: '/notes/ch50052/master.pdf',
    secondary: [],
    units: ['Unit 1: Industrial Safety Intro', 'Unit 2: Fire and Explosion', 'Unit 3: Toxic Release', 'Unit 4: Hazard Identification', 'Unit 5: Safety Management'],
    topics: ['HAZOP', 'Fault Tree Analysis', 'Flash point', 'Toxicity', 'PPE']
  },
  {
    code: 'ch51001',
    title: 'Economic Policies in India',
    color: 'teal',
    colorClasses: 'from-teal-500 to-teal-700 text-teal-400 bg-teal-500/10 border-teal-500/20',
    masterPages: 26,
    masterPath: '/notes/ch51001/master.pdf',
    secondary: [],
    units: ['Unit 1: Intro to Indian Economy', 'Unit 2: Agriculture', 'Unit 3: Industry', 'Unit 4: Foreign Trade', 'Unit 5: Economic Reforms'],
    topics: ['GDP', 'Five Year Plans', 'LPG Reforms', 'FDI', 'RBI functions']
  }
];

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSyllabus, setExpandedSyllabus] = useState<string | null>(null);

  const filteredSubjects = SUBJECTS.filter(sub =>
    sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Study Material Hub
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            V Semester Chemical Engineering Notes, Handouts & Secondary Materials.
          </p>
          <div className="max-w-md mx-auto pt-4">
            <input
              type="text"
              placeholder="Search by subject or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map(sub => (
            <div key={sub.code} className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800/80 rounded-2xl p-6 flex flex-col shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${sub.colorClasses}`}>
                  {sub.code.toUpperCase()}
                </span>
                <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded-md">
                  {sub.masterPages} Pages
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-2 leading-tight">{sub.title}</h2>
              <p className="text-sm text-neutral-400 mb-6 flex-grow">
                {sub.units.length} Units • {sub.topics.slice(0,3).join(', ')}...
              </p>

              <div className="space-y-3 mt-auto">
                {/* Master Notes Actions */}
                <div className="flex gap-2">
                  <Link href={`/notes/${sub.code}`} className="flex-grow bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2 px-4 rounded-xl text-center transition-colors shadow-sm">
                    Open PDF Reader
                  </Link>
                  <a href={sub.masterPath} download className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-2 px-4 rounded-xl flex items-center justify-center transition-colors shadow-sm" title="Download PDF">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </a>
                </div>

                {/* Secondary Materials */}
                {sub.secondary.length > 0 && (
                  <div className="pt-3 border-t border-neutral-800/50 space-y-2">
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Secondary Material</p>
                    {sub.secondary.map((sec, idx) => (
                      <a key={idx} href={sec.path} target="_blank" rel="noreferrer" className="block w-full text-left bg-neutral-800/50 hover:bg-neutral-800 text-sm text-neutral-300 py-2 px-3 rounded-lg transition-colors border border-neutral-700/50 flex justify-between items-center">
                        <span className="truncate">{sec.title}</span>
                        <svg className="w-4 h-4 text-neutral-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    ))}
                  </div>
                )}

                {/* Quick Syllabus Accordion */}
                <div className="pt-3 border-t border-neutral-800/50">
                  <button 
                    onClick={() => setExpandedSyllabus(expandedSyllabus === sub.code ? null : sub.code)}
                    className="w-full flex items-center justify-between text-sm text-neutral-400 hover:text-white transition-colors py-1"
                  >
                    <span>Quick Syllabus View</span>
                    <svg className={`w-4 h-4 transition-transform ${expandedSyllabus === sub.code ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {expandedSyllabus === sub.code && (
                    <div className="mt-3 space-y-2 text-xs text-neutral-300 bg-neutral-950/50 p-3 rounded-xl border border-neutral-800/50">
                      <ul className="space-y-1.5 list-disc list-inside">
                        {sub.units.map((unit, idx) => (
                          <li key={idx} className="truncate">{unit}</li>
                        ))}
                      </ul>
                      <div className="mt-2 pt-2 border-t border-neutral-800/50">
                        <p className="text-indigo-400 font-medium mb-1">Key BTER Topics:</p>
                        <p className="leading-relaxed">{sub.topics.join(' • ')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredSubjects.length === 0 && (
            <div className="col-span-full py-12 text-center text-neutral-500">
              No subjects found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
