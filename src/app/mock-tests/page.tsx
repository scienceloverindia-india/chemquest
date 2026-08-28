'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// --- Types ---
type Subject = 'All' | 'CRE' | 'MT-II' | 'PC&I' | 'Energy' | 'Safety' | 'Economics';

interface Question {
  id: string;
  subject: Subject;
  text: string;
  options: string[];
  correctAnswer: number; // index of correct option
  solution: string;
}

type Mode = 'A' | 'B' | 'C' | null;

// --- Mock Data ---
const questionsDb: Question[] = [
  { id: 'q1', subject: 'CRE', text: 'For a first order reaction, the half-life is independent of:', options: ['Initial concentration', 'Rate constant', 'Temperature', 'Activation energy'], correctAnswer: 0, solution: 't_1/2 = ln(2)/k. It does not depend on initial concentration.' },
  { id: 'q2', subject: 'MT-II', text: 'In distillation, the line connecting the origin to the operating point on the x-y diagram is called:', options: ['Equilibrium line', 'q-line', 'Operating line', 'Tie line'], correctAnswer: 2, solution: 'The operating line relates passing streams in a stage.' },
  { id: 'q3', subject: 'PC&I', text: 'Which controller mode is used to eliminate offset?', options: ['Proportional', 'Integral', 'Derivative', 'On-Off'], correctAnswer: 1, solution: 'Integral action integrates error over time to eliminate steady-state offset.' },
  { id: 'q4', subject: 'Safety', text: 'What is the color of a flammability hazard in the NFPA 704 diamond?', options: ['Blue', 'Red', 'Yellow', 'White'], correctAnswer: 1, solution: 'Red indicates flammability.' },
  { id: 'q5', subject: 'Energy', text: 'Higher heating value (HHV) differs from lower heating value (LHV) by the heat of:', options: ['Vaporization of water', 'Sublimation of carbon', 'Formation of CO2', 'Reaction of sulfur'], correctAnswer: 0, solution: 'HHV assumes water in products condenses, LHV assumes it remains vapor.' },
  { id: 'q6', subject: 'Economics', text: 'Break-even point is where:', options: ['Total revenue = Total cost', 'Fixed cost = Variable cost', 'Profit is maximized', 'Sales are maximum'], correctAnswer: 0, solution: 'At break-even, no profit or loss occurs.' },
  { id: 'q7', subject: 'CRE', text: 'A CSTR is characterized by:', options: ['Plug flow', 'Spatial variation', 'Complete mixing', 'Batch operation'], correctAnswer: 2, solution: 'CSTR implies perfectly mixed contents, uniform throughout.' },
  { id: 'q8', subject: 'MT-II', text: 'Fick\'s first law relates:', options: ['Mass flux to concentration gradient', 'Heat flux to temperature gradient', 'Momentum flux to velocity gradient', 'Mass to volume'], correctAnswer: 0, solution: 'J = -D(dc/dx)' },
  { id: 'q9', subject: 'PC&I', text: 'A thermocouple measures temperature based on:', options: ['Seebeck effect', 'Peltier effect', 'Thomson effect', 'Joule heating'], correctAnswer: 0, solution: 'Seebeck effect generates voltage proportional to temperature difference.' },
  { id: 'q10', subject: 'Energy', text: 'The main combustible component in biogas is:', options: ['Carbon dioxide', 'Methane', 'Hydrogen sulfide', 'Ammonia'], correctAnswer: 1, solution: 'Biogas is primarily methane (CH4) and CO2.' },
];

export default function MockTests() {
  const [mode, setMode] = useState<Mode>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [status, setStatus] = useState<Record<number, 'answered' | 'marked' | 'visited' | 'unvisited'>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (mode && !isSubmitted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && mode && !isSubmitted) {
      handleSubmit();
    }
  }, [mode, isSubmitted, timeLeft]);

  const startTest = (selectedMode: Mode) => {
    setMode(selectedMode);
    let selectedQs = [];
    if (selectedMode === 'A') {
      selectedQs = [...questionsDb, ...questionsDb, ...questionsDb].slice(0, 30); // Simulate 60 marks
      setTimeLeft(3 * 60 * 60); // 3 hours
    } else if (selectedMode === 'B') {
      selectedQs = [...questionsDb, ...questionsDb].slice(0, 20); // Simulate 50 MCQs
      setTimeLeft(60 * 60); // 60 mins
    } else {
      selectedQs = questionsDb.slice(0, 10);
      setTimeLeft(15 * 60); // 15 mins
    }
    setQuestions(selectedQs);
    setCurrentQIndex(0);
    setAnswers({});
    const initialStatus: Record<number, 'unvisited' | 'visited' | 'answered' | 'marked'> = {};
    selectedQs.forEach((_, i) => (initialStatus[i] = 'unvisited'));
    initialStatus[0] = 'visited';
    setStatus(initialStatus);
    setIsSubmitted(false);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQIndex]: optIndex }));
    setStatus((prev) => ({ ...prev, [currentQIndex]: 'answered' }));
  };

  const clearResponse = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQIndex];
    setAnswers(newAnswers);
    setStatus((prev) => ({ ...prev, [currentQIndex]: 'visited' }));
  };

  const markForReview = () => {
    setStatus((prev) => ({ ...prev, [currentQIndex]: 'marked' }));
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      const nextIdx = currentQIndex + 1;
      setCurrentQIndex(nextIdx);
      if (status[nextIdx] === 'unvisited' || !status[nextIdx]) {
        setStatus((prev) => ({ ...prev, [nextIdx]: 'visited' }));
      }
    }
  };

  const prevQuestion = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    let correct = 0;
    let wrong = 0;
    Object.keys(answers).forEach((k) => {
      const idx = Number(k);
      if (answers[idx] === questions[idx].correctAnswer) {
        score += mode === 'B' ? 1 : 2; // PSU Mode +1, BTER +2 per MCQ approx
        correct++;
      } else {
        score -= mode === 'B' ? 0.25 : 0; // Negative marking in PSU
        wrong++;
      }
    });
    return { score, correct, wrong, total: questions.length };
  };

  if (!mode) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-8 text-center">ChemQuest Mock Examination Platform</h1>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg hover:border-indigo-500 transition-colors">
            <h2 className="text-xl font-semibold text-indigo-400 mb-2">Mode A: BTER Board Model</h2>
            <p className="text-sm text-slate-400 mb-4">Full 60 Marks, 3 Hours, Section A+B+C simulation.</p>
            <button onClick={() => startTest('A')} className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium">Start Mode A</button>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg hover:border-purple-500 transition-colors">
            <h2 className="text-xl font-semibold text-purple-400 mb-2">Mode B: PSU Speed Test</h2>
            <p className="text-sm text-slate-400 mb-4">50 Technical MCQs, 60 Mins, +1/-0.25 marking.</p>
            <button onClick={() => startTest('B')} className="w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-medium">Start Mode B</button>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg hover:border-cyan-500 transition-colors">
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">Mode C: Quick Quiz</h2>
            <p className="text-sm text-slate-400 mb-4">10 Subject-wise MCQs for quick revision.</p>
            <button onClick={() => startTest('C')} className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-medium">Start Mode C</button>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    const { score, correct, wrong, total } = calculateScore();
    const accuracy = total > 0 ? ((correct / (correct + wrong || 1)) * 100).toFixed(1) : 0;
    
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-slate-200">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">
          <h2 className="text-3xl font-bold text-emerald-400 mb-6 text-center">Scorecard & Analytics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800 p-4 rounded-xl text-center">
              <div className="text-sm text-slate-400">Total Score</div>
              <div className="text-3xl font-bold text-white">{score.toFixed(2)}</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl text-center">
              <div className="text-sm text-slate-400">Accuracy</div>
              <div className="text-3xl font-bold text-cyan-400">{accuracy}%</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl text-center">
              <div className="text-sm text-slate-400">Correct</div>
              <div className="text-3xl font-bold text-emerald-500">{correct}</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl text-center">
              <div className="text-sm text-slate-400">Incorrect</div>
              <div className="text-3xl font-bold text-rose-500">{wrong}</div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-indigo-300 mb-4">Detailed Solutions</h3>
          <div className="space-y-6">
            {questions.map((q, i) => {
              const userAns = answers[i];
              const isCorrect = userAns === q.correctAnswer;
              return (
                <div key={i} className={`p-4 rounded-lg border ${isCorrect ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-rose-500/30 bg-rose-500/10'}`}>
                  <p className="font-medium mb-2">Q{i + 1}: {q.text}</p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className={`px-3 py-1 rounded text-sm ${optIdx === q.correctAnswer ? 'bg-emerald-600 text-white' : userAns === optIdx ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        {opt}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 bg-slate-950/50 p-2 rounded"><span className="font-semibold text-amber-400">Solution:</span> {q.solution}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button onClick={() => setMode(null)} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors">Return to Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
      {/* Top Bar */}
      <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
        <div className="font-bold text-lg text-indigo-400">Mode {mode} Test</div>
        <div className="text-2xl font-mono text-amber-400 bg-slate-800 px-4 py-1 rounded-md">{formatTime(timeLeft)}</div>
        <button onClick={handleSubmit} className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-md font-medium text-sm">Submit Exam</button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Question Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Question {currentQIndex + 1}</h2>
              <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-sm">{currentQ?.subject}</span>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6 min-h-[200px]">
              <p className="text-lg mb-8">{currentQ?.text}</p>
              <div className="space-y-3">
                {currentQ?.options.map((opt, i) => (
                  <label key={i} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${answers[currentQIndex] === i ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 bg-slate-800 hover:bg-slate-700'}`}>
                    <input type="radio" name={`q${currentQIndex}`} checked={answers[currentQIndex] === i} onChange={() => handleOptionSelect(i)} className="w-4 h-4 text-indigo-600 bg-slate-900 border-slate-600 focus:ring-indigo-500" />
                    <span className="ml-3">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="space-x-3">
                <button onClick={markForReview} className="px-4 py-2 bg-purple-600/20 text-purple-400 border border-purple-600/50 hover:bg-purple-600/30 rounded-lg text-sm font-medium">Mark for Review</button>
                <button onClick={clearResponse} className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg text-sm font-medium">Clear Response</button>
              </div>
              <div className="space-x-3">
                <button onClick={prevQuestion} disabled={currentQIndex === 0} className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg text-sm font-medium disabled:opacity-50">Previous</button>
                <button onClick={nextQuestion} disabled={currentQIndex === questions.length - 1} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium disabled:opacity-50">Save & Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Palette */}
        <div className="w-80 bg-slate-900 border-l border-slate-800 p-4 flex flex-col shrink-0">
          <h3 className="font-semibold text-slate-300 mb-4">Question Palette</h3>
          
          <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-slate-400">
            <div className="flex items-center"><div className="w-3 h-3 rounded bg-emerald-500 mr-2"></div> Answered</div>
            <div className="flex items-center"><div className="w-3 h-3 rounded bg-rose-500 mr-2"></div> Not Answered</div>
            <div className="flex items-center"><div className="w-3 h-3 rounded bg-purple-500 mr-2"></div> Marked</div>
            <div className="flex items-center"><div className="w-3 h-3 rounded bg-slate-700 mr-2"></div> Not Visited</div>
          </div>

          <div className="grid grid-cols-5 gap-2 overflow-y-auto">
            {questions.map((_, i) => {
              const stat = status[i] || 'unvisited';
              let bgColor = 'bg-slate-700'; // unvisited
              if (stat === 'answered') bgColor = 'bg-emerald-500';
              if (stat === 'visited') bgColor = 'bg-rose-500';
              if (stat === 'marked') bgColor = 'bg-purple-500';
              
              return (
                <button
                  key={i}
                  onClick={() => setCurrentQIndex(i)}
                  className={`w-10 h-10 rounded-md flex items-center justify-center font-medium text-sm text-white ${bgColor} ${currentQIndex === i ? 'ring-2 ring-white scale-110' : 'opacity-80 hover:opacity-100'}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
