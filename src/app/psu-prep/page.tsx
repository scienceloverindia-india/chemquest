'use client';

import React, { useState } from 'react';

const TARGET_PSUS = [
  { name: 'IOCL', role: 'Engineering Assistant', logo: '🛢️' },
  { name: 'HPCL', role: 'Operations Technician', logo: '⛽' },
  { name: 'ONGC', role: 'Junior Engineering Assistant', logo: '🌊' },
  { name: 'BARC', role: 'Stipendiary Trainee Cat-1', logo: '☢️' },
  { name: 'GAIL', role: 'Foreman (Chemical)', logo: '🔥' },
  { name: 'BPCL', role: 'Process Technician', logo: '🏭' },
  { name: 'Coal India', role: 'Management Trainee', logo: '⛏️' },
  { name: 'RCFL', role: 'Operator Trainee', logo: '🌾' },
];

const HIGH_YIELD_QUESTIONS = [
  { q: "What is the difference between weeping and flooding in a distillation column?", a: "Weeping occurs at low vapor velocities where liquid drops through tray holes. Flooding occurs at high vapor velocities where liquid backs up, filling the column." },
  { q: "Explain NPSH (Net Positive Suction Head).", a: "NPSH is the difference between the absolute pressure at the pump suction and the vapor pressure of the liquid. Required to prevent cavitation." },
  { q: "What is the significance of the McCabe-Thiele q-line?", a: "It represents the thermal condition of the feed. Slope = q/(q-1), where q is the fraction of feed that is liquid." },
  { q: "Why is a PID controller preferred over PI in some processes?", a: "Derivative action anticipates future errors based on rate of change, reducing overshoot and improving stability for processes with large dead times." },
  { q: "Identify common P&ID symbols for a control valve and a flow transmitter.", a: "Control valve: Bowtie with a stem and actuator cap. FT: Circle with 'FT' written inside, connected by a dashed line to the process." }
];

const SELECTION_PROCESS = [
  { step: '1', title: 'Computer Based Test (CBT)', desc: 'Technical domain + General Aptitude (Reasoning, Quant, English)' },
  { step: '2', title: 'Skill Test', desc: 'Practical knowledge, trade test, identifying equipment, PFD reading (Usually qualifying)' },
  { step: '3', title: 'Technical Interview', desc: 'In-depth domain knowledge, final year project, industrial training' },
  { step: '4', title: 'Medical Examination', desc: 'Pre-employment medical standards (vision, color blindness, general fitness)' }
];

export default function PsuPrepPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
            PSU Placement Prep
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Strategic preparation for core Chemical Engineering PSU exams.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-2 border-b border-neutral-800 pb-2">
          {['overview', 'questions', 'process'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-t-xl font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'bg-neutral-900 text-emerald-400 border-t border-x border-neutral-800'
                  : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900/50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Target PSUs Grid */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-emerald-500 pl-4">Target PSU Organizations</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {TARGET_PSUS.map((psu, i) => (
                  <div key={i} className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 hover:border-emerald-500/50 transition-colors flex flex-col items-center text-center group">
                    <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{psu.logo}</span>
                    <h3 className="font-bold text-lg text-white">{psu.name}</h3>
                    <p className="text-xs text-neutral-400 mt-1">{psu.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Exam Topic Frequency (63 Papers)</h3>
                <div className="space-y-4">
                  {[
                    { topic: 'Heat Transfer', val: 18 },
                    { topic: 'Mass Transfer', val: 16 },
                    { topic: 'Fluid Mechanics', val: 15 },
                    { topic: 'Thermodynamics', val: 12 },
                    { topic: 'CRE', val: 10 },
                    { topic: 'Process Control', val: 9 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-neutral-300">{item.topic}</span>
                        <span className="text-emerald-400">{item.val}%</span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${item.val}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Eligibility & Syllabus</h3>
                <div className="prose prose-invert text-sm text-neutral-400">
                  <p><strong className="text-white">Qualification:</strong> 3-Year Diploma in Chemical Engineering with minimum 60% marks (55% for reserved categories).</p>
                  <p><strong className="text-white">Age Limit:</strong> Typically 18-25 years for UR. Relaxations apply for OBC (3 yrs) and SC/ST (5 yrs).</p>
                  <p><strong className="text-white">Syllabus Core:</strong> BTER / AICTE standard diploma curriculum.</p>
                  <ul className="list-disc pl-4 mt-2 space-y-1">
                    <li>Core Chemical subjects weightage: 70-80%</li>
                    <li>General Aptitude weightage: 20-30%</li>
                    <li>Negative marking is usually 0.25 per wrong answer.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-emerald-500 pl-4">High-Yield Technical Interview Questions</h2>
            <div className="space-y-4">
              {HIGH_YIELD_QUESTIONS.map((item, i) => (
                <div key={i} className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 shadow-sm">
                  <h4 className="font-semibold text-emerald-400 mb-2 flex items-start">
                    <span className="mr-2 mt-0.5 text-neutral-500">Q.</span>
                    {item.q}
                  </h4>
                  <p className="text-neutral-300 text-sm leading-relaxed border-t border-neutral-800 pt-2 mt-2">
                    <span className="font-medium text-neutral-500 mr-2">Ans.</span>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process Tab */}
        {activeTab === 'process' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Standard Selection Flow</h2>
            <div className="relative border-l-2 border-emerald-500/30 ml-4 md:ml-0 md:border-none">
              <div className="md:flex justify-between items-start space-y-8 md:space-y-0 relative">
                {/* Connecting Line for Desktop */}
                <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-emerald-500/30 -z-10"></div>
                
                {SELECTION_PROCESS.map((step, i) => (
                  <div key={i} className="flex md:flex-col items-start md:items-center relative pl-8 md:pl-0 w-full">
                    {/* Circle */}
                    <div className="absolute left-[-9px] md:left-auto md:relative w-5 h-5 bg-emerald-500 rounded-full border-4 border-neutral-950 flex-shrink-0 z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                    
                    <div className="md:mt-6 md:text-center">
                      <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest block mb-1">Step {step.step}</span>
                      <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-sm text-neutral-400 max-w-[200px] md:mx-auto">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
