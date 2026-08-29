'use client';

import { useState } from 'react';
import { SUBJECTS } from '@/lib/subjects';
import { MOCK_QUESTIONS } from '@/lib/mock-questions';
import { FLASHCARDS } from '@/lib/flashcards-data';
import { MockQuestion, Flashcard } from '@/types';

export default function AdminCMSPage() {
  const [tab, setTab] = useState<'questions' | 'flashcards'>('questions');
  const [questions, setQuestions] = useState<MockQuestion[]>(MOCK_QUESTIONS);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(FLASHCARDS);

  // New question form state
  const [qSubject, setQSubject] = useState('ch5001');
  const [qUnit, setQUnit] = useState(1);
  const [qText, setQText] = useState('');
  const [qOptions, setQOptions] = useState(['', '', '', '']);
  const [qCorrect, setQCorrect] = useState(0);
  const [qExplanation, setQExplanation] = useState('');
  const [qExamTag, setQExamTag] = useState<'BTER' | 'IOCL' | 'HPCL' | 'BARC' | 'ONGC' | 'GENERAL_PSU'>('BTER');
  const [qDifficulty, setQDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [alertMsg, setAlertMsg] = useState('');

  // New flashcard form state
  const [fcSubject, setFcSubject] = useState('ch5001');
  const [fcUnit, setFcUnit] = useState(1);
  const [fcTopic, setFcTopic] = useState('');
  const [fcFront, setFcFront] = useState('');
  const [fcBack, setFcBack] = useState('');
  const [fcFormula, setFcFormula] = useState('');

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || qOptions.some(o => !o.trim())) {
      alert('Please fill out question text and all 4 options.');
      return;
    }

    const newQ: MockQuestion = {
      id: `custom-q-${Date.now()}`,
      subjectCode: qSubject,
      unitNumber: Number(qUnit),
      topicId: `${qSubject}-u${qUnit}-custom`,
      question: qText,
      options: [...qOptions],
      correctIndex: Number(qCorrect),
      explanation: qExplanation,
      examTag: qExamTag,
      difficulty: qDifficulty,
    };

    setQuestions([newQ, ...questions]);
    setQText('');
    setQOptions(['', '', '', '']);
    setQExplanation('');
    setAlertMsg('✓ Question added successfully to Mock Question Bank!');
    setTimeout(() => setAlertMsg(''), 3000);
  };

  const handleAddFlashcard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fcFront.trim() || !fcBack.trim()) {
      alert('Please provide front question and back answer.');
      return;
    }

    const newFc: Flashcard = {
      id: `custom-fc-${Date.now()}`,
      subjectCode: fcSubject,
      unitNumber: Number(fcUnit),
      topicName: fcTopic || 'Key Revision Point',
      front: fcFront,
      back: fcBack,
      formula: fcFormula,
      importance: 'high',
    };

    setFlashcards([newFc, ...flashcards]);
    setFcFront('');
    setFcBack('');
    setFcFormula('');
    setFcTopic('');
    setAlertMsg('✓ Flashcard added to Spaced Revision system!');
    setTimeout(() => setAlertMsg(''), 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold rounded-full uppercase tracking-wider">
              ⚙️ Admin & Content CMS
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300">
            Content Management Hub
          </h1>
          <p className="text-gray-400 text-sm mt-1">Dynamically publish and manage CBT exam questions, revision flashcards, and syllabus topics</p>
        </div>

        {alertMsg && (
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-medium animate-pulse">
            {alertMsg}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-800 pb-3">
        <button
          onClick={() => setTab('questions')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === 'questions' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/30' : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          📝 Manage CBT Questions ({questions.length})
        </button>
        <button
          onClick={() => setTab('flashcards')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === 'flashcards' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30' : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          🎴 Manage Flashcards ({flashcards.length})
        </button>
      </div>

      {/* Question Form */}
      {tab === 'questions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-gray-900/60 border border-gray-800 rounded-3xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-white mb-2">Add New CBT Question</h2>
            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Subject</label>
                  <select
                    value={qSubject}
                    onChange={(e) => setQSubject(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs focus:border-indigo-500 focus:outline-none"
                  >
                    {SUBJECTS.map(s => <option key={s.code} value={s.code}>{s.shortName} ({s.number})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Unit #</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={qUnit}
                    onChange={(e) => setQUnit(Number(e.target.value))}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Question Statement</label>
                <textarea
                  rows={3}
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                  placeholder="Enter question statement with variables..."
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white text-xs focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-400">Options (A, B, C, D)</label>
                {qOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correct"
                      checked={qCorrect === i}
                      onChange={() => setQCorrect(i)}
                      className="text-indigo-600 focus:ring-0"
                    />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const next = [...qOptions];
                        next[i] = e.target.value;
                        setQOptions(next);
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                      className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5 text-white text-xs focus:border-indigo-500 focus:outline-none"
                      required
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Detailed Solution / Explanation</label>
                <textarea
                  rows={2}
                  value={qExplanation}
                  onChange={(e) => setQExplanation(e.target.value)}
                  placeholder="Step-by-step chemical engineering solution..."
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white text-xs focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Exam Tag</label>
                  <select
                    value={qExamTag}
                    onChange={(e: any) => setQExamTag(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="BTER">BTER Board</option>
                    <option value="IOCL">IOCL</option>
                    <option value="HPCL">HPCL</option>
                    <option value="BARC">BARC</option>
                    <option value="ONGC">ONGC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Difficulty</label>
                  <select
                    value={qDifficulty}
                    onChange={(e: any) => setQDifficulty(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors shadow-lg shadow-indigo-900/30"
              >
                + Publish Question
              </button>
            </form>
          </div>

          {/* Question List View */}
          <div className="lg:col-span-2 space-y-4 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
            <h2 className="text-xl font-bold text-white mb-2">Live Question Bank ({questions.length} Questions)</h2>
            {questions.map((q, idx) => (
              <div key={q.id || idx} className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
                    {q.subjectCode.toUpperCase()} • Unit {q.unitNumber} • {q.examTag}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    q.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' : q.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-200">{idx + 1}. {q.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-2.5 rounded-xl border ${
                        oIdx === q.correctIndex
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-medium'
                          : 'bg-gray-950/60 border-gray-800/60 text-gray-400'
                      }`}
                    >
                      <span className="font-bold mr-1">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                    </div>
                  ))}
                </div>
                {q.explanation && (
                  <p className="text-xs text-gray-400 bg-gray-950 p-2.5 rounded-xl border border-gray-800/40">
                    <span className="text-indigo-400 font-bold">Solution:</span> {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flashcard Form */}
      {tab === 'flashcards' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-gray-900/60 border border-gray-800 rounded-3xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-white mb-2">Add New Flashcard</h2>
            <form onSubmit={handleAddFlashcard} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Subject</label>
                  <select
                    value={fcSubject}
                    onChange={(e) => setFcSubject(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs focus:border-purple-500 focus:outline-none"
                  >
                    {SUBJECTS.map(s => <option key={s.code} value={s.code}>{s.shortName}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Topic Name</label>
                  <input
                    type="text"
                    value={fcTopic}
                    onChange={(e) => setFcTopic(e.target.value)}
                    placeholder="e.g. Rayleigh Eq"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Front Side (Prompt / Question)</label>
                <textarea
                  rows={2}
                  value={fcFront}
                  onChange={(e) => setFcFront(e.target.value)}
                  placeholder="What is the equation for...?"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white text-xs focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Back Side (Answer / Concept)</label>
                <textarea
                  rows={3}
                  value={fcBack}
                  onChange={(e) => setFcBack(e.target.value)}
                  placeholder="Concise concept definition..."
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white text-xs focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Key Formula</label>
                <input
                  type="text"
                  value={fcFormula}
                  onChange={(e) => setFcFormula(e.target.value)}
                  placeholder="e.g. k = A * exp(-Ea/RT)"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white text-xs focus:border-purple-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-colors shadow-lg shadow-purple-900/30"
              >
                + Publish Flashcard
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
            <h2 className="text-xl font-bold text-white mb-2">Live Flashcards ({flashcards.length} Cards)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flashcards.map((fc, idx) => (
                <div key={fc.id || idx} className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-md">
                      {fc.subjectCode.toUpperCase()} • {fc.topicName}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-200">{fc.front}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-800/60 pt-2">{fc.back}</p>
                  {fc.formula && (
                    <div className="bg-gray-950 px-3 py-2 rounded-xl text-xs text-indigo-300 font-mono text-center">
                      {fc.formula}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
