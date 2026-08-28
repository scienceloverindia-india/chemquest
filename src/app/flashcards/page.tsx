'use client';

import React, { useState } from 'react';

type Subject = 'All' | 'CRE' | 'MT-II' | 'PC&I' | 'Energy' | 'Safety' | 'Economics';

interface Flashcard {
  id: number;
  subject: Subject;
  front: string;
  back: string;
}

const flashcardsData: Flashcard[] = [
  { id: 1, subject: 'CRE', front: 'Space Time (τ)', back: 'Time required to process one reactor volume of fluid. τ = V/v0' },
  { id: 2, subject: 'MT-II', front: 'Reflux Ratio (R)', back: 'Ratio of liquid returned to the column to the distillate product. R = L/D' },
  { id: 3, subject: 'PC&I', front: 'Proportional Band', back: 'Percent change in error required to move the valve full stroke. PB = 100/Kc' },
  { id: 4, subject: 'Energy', front: 'Calorific Value', back: 'Heat liberated by complete combustion of unit mass or volume of fuel.' },
  { id: 5, subject: 'Safety', front: 'LEL & UEL', back: 'Lower and Upper Explosive Limits. The concentration range in which a flammable substance can produce a fire or explosion.' },
  { id: 6, subject: 'CRE', front: 'Damköhler Number (Da)', back: 'Ratio of reaction rate to convective transport rate.' },
  { id: 7, subject: 'MT-II', front: 'McCabe-Thiele Assumptions', back: 'Constant molar overflow, negligible heat of mixing, no heat loss.' },
  { id: 8, subject: 'PC&I', front: 'Cascade Control', back: 'Output of one controller (master) acts as the setpoint for another controller (slave).' },
];

export default function Flashcards() {
  const [activeSubject, setActiveSubject] = useState<Subject>('All');
  const [cards, setCards] = useState<Flashcard[]>(flashcardsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState({ known: 0, review: 0 });

  const filteredCards = cards.filter(c => activeSubject === 'All' || c.subject === activeSubject);
  const currentCard = filteredCards[currentIndex];

  const handleSubjectChange = (subj: Subject) => {
    setActiveSubject(subj);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const nextCard = (status: 'known' | 'review') => {
    if (status === 'known') setProgress(p => ({ ...p, known: p.known + 1 }));
    else setProgress(p => ({ ...p, review: p.review + 1 }));
    
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < filteredCards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0); // loop back or show completion
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Flashcard Revision</h1>
        <div className="flex space-x-4 bg-slate-900 p-2 rounded-xl border border-slate-800">
          <div className="px-4 py-1 rounded bg-emerald-500/20 text-emerald-400 font-medium">Known: {progress.known}</div>
          <div className="px-4 py-1 rounded bg-rose-500/20 text-rose-400 font-medium">Review: {progress.review}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {(['All', 'CRE', 'MT-II', 'PC&I', 'Energy', 'Safety', 'Economics'] as Subject[]).map(subj => (
          <button
            key={subj}
            onClick={() => handleSubjectChange(subj)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeSubject === subj ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800'}`}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* Flashcard Area */}
      {filteredCards.length > 0 ? (
        <div className="w-full max-w-2xl">
          <div className="text-center text-slate-500 mb-4">Card {currentIndex + 1} of {filteredCards.length}</div>
          
          {/* Card 3D Container */}
          <div 
            className="relative w-full aspect-video cursor-pointer perspective-[1000px] group"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className={`w-full h-full absolute transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              {/* Front */}
              <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-xl flex flex-col items-center justify-center p-10">
                <div className="absolute top-4 left-4 px-3 py-1 bg-slate-950/50 rounded-full text-xs font-semibold text-indigo-400">{currentCard.subject}</div>
                <h2 className="text-3xl font-bold text-center text-white">{currentCard.front}</h2>
                <div className="absolute bottom-6 text-sm text-slate-500">Click to flip</div>
              </div>
              
              {/* Back */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-900/40 to-slate-900 rounded-2xl border border-indigo-500/30 shadow-xl flex flex-col items-center justify-center p-10">
                <div className="absolute top-4 left-4 px-3 py-1 bg-indigo-500/20 rounded-full text-xs font-semibold text-indigo-300">Answer</div>
                <p className="text-2xl font-medium text-center text-indigo-100">{currentCard.back}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`flex justify-center gap-6 mt-12 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button onClick={(e) => { e.stopPropagation(); nextCard('review'); }} className="px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-rose-600/20 transition-all hover:scale-105 flex items-center">
              Needs Review
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextCard('known'); }} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 flex items-center">
              I Know This
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-slate-500 mt-20">No flashcards found for this subject.</div>
      )}

      {/* Global CSS for 3D flip (if not in tailwind config) */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-\\[1000px\\] { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
}
