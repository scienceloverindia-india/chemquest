'use client';

import { useState, useEffect } from 'react';
import { SUBJECTS } from '@/lib/subjects';
import { STUDY_UNITS } from '@/lib/study-data';

export default function TrackerPage() {
  const [activeSubject, setActiveSubject] = useState(SUBJECTS[0]?.code || 'ch5001');
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('study-tracker');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    const next = { ...progress, [topicId]: !progress[topicId] };
    setProgress(next);
    localStorage.setItem('study-tracker', JSON.stringify(next));
  };

  const units = STUDY_UNITS.filter(u => u.subjectCode === activeSubject);

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress for this subject?')) {
      const next = { ...progress };
      units.forEach(unit => {
        unit.topics.forEach(topic => {
          delete next[topic.id];
        });
      });
      setProgress(next);
      localStorage.setItem('study-tracker', JSON.stringify(next));
    }
  };

  let totalTopics = 0;
  let completedTopics = 0;
  units.forEach(unit => {
    unit.topics.forEach(t => {
      totalTopics++;
      if (progress[t.id]) completedTopics++;
    });
  });
  const subjectPercent = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);
  const currentSub = SUBJECTS.find(s => s.code === activeSubject);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">Study Tracker</h1>
          <p className="text-gray-400">Track your BTER syllabus completion for {currentSub?.name}</p>
        </div>
        
        <div className="flex items-center gap-6 bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="text-gray-800" strokeWidth="8" stroke="currentColor" fill="transparent" />
              <circle cx="50" cy="50" r="40" className="text-emerald-500" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * subjectPercent) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
            </svg>
            <div className="absolute text-sm font-bold text-white">{subjectPercent}%</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-400">Subject Progress</div>
            <div className="text-lg font-bold text-white">{completedTopics} / {totalTopics} Topics</div>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2 custom-scrollbar gap-2">
        {SUBJECTS.map((sub) => (
          <button
            key={sub.code}
            onClick={() => setActiveSubject(sub.code)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeSubject === sub.code ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-900 border border-transparent'}`}
          >
            {sub.shortName} ({sub.number})
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button onClick={resetProgress} className="text-xs text-rose-400 hover:text-rose-300 transition-colors">
          Reset Progress for {currentSub?.shortName}
        </button>
      </div>

      <div className="space-y-6">
        {units.map((unit, uIdx) => {
          const uCompleted = unit.topics.filter(t => progress[t.id]).length;
          const uTotal = unit.topics.length;
          const uPercent = uTotal === 0 ? 0 : Math.round((uCompleted / uTotal) * 100);

          return (
            <div key={unit.id || uIdx} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-gray-800 bg-gray-900/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Unit {unit.unitNumber}: {unit.unitName}</h3>
                </div>
                <div className="flex items-center gap-4 w-full md:w-64">
                  <div className="text-sm text-gray-400 w-12 text-right">{uPercent}%</div>
                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${uPercent}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="p-2">
                {unit.topics.map((topic) => (
                  <label key={topic.id} onClick={() => toggleTopic(topic.id)} className="flex items-start gap-4 p-3 hover:bg-gray-800/50 rounded-xl cursor-pointer transition-colors group">
                    <div className="pt-1">
                      <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${progress[topic.id] ? 'bg-emerald-500 border-emerald-500' : 'bg-gray-950 border-gray-700 group-hover:border-emerald-500/50'}`}>
                        {progress[topic.id] && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <div className={`text-sm font-medium transition-colors ${progress[topic.id] ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                        {topic.name}
                      </div>
                      <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-800 rounded">
                        pp. {topic.pages}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
        {units.length === 0 && (
          <div className="text-center py-12 text-gray-500 border border-dashed border-gray-800 rounded-2xl">
            No study units found for this subject.
          </div>
        )}
      </div>
    </div>
  );
}
