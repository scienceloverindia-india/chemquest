'use client';

import Link from 'next/link';
import ProgressRing from './ProgressRing';
import { Subject } from '@/lib/subjects';

interface SubjectCardProps {
  subject: Subject & { progress?: number };
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const { code, name, shortName, color, masterPages, units, pyqYears, psuHits, keyTopics, progress = 0 } = subject;
  const pyqCount = Array.isArray(pyqYears) ? pyqYears.length : pyqYears;
  
  const bgColors: Record<string, string> = {
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    teal: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  };

  const badgeColor = bgColors[color] || 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';

  return (
    <Link href={`/notes/${code.toLowerCase()}`} className="block h-full group">
      <div className="h-full bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:bg-gray-800/60 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-gray-700 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor} mb-3`}>
              {code}
            </span>
            <h3 className="text-xl font-bold text-white mb-1 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
              {name}
            </h3>
            <p className="text-gray-400 text-sm font-medium">{shortName}</p>
          </div>
          <div className="shrink-0 ml-4">
            <ProgressRing progress={progress} color={color} size={54} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6 mt-2">
          <div className="bg-gray-950/50 rounded-xl p-3 border border-gray-800/50">
            <div className="text-gray-500 text-xs mb-1">Master Source</div>
            <div className="text-gray-200 font-semibold">{masterPages} <span className="text-gray-500 text-xs font-normal">pages</span></div>
          </div>
          <div className="bg-gray-950/50 rounded-xl p-3 border border-gray-800/50">
            <div className="text-gray-500 text-xs mb-1">Units covered</div>
            <div className="text-gray-200 font-semibold">{units} <span className="text-gray-500 text-xs font-normal">units</span></div>
          </div>
          <div className="bg-gray-950/50 rounded-xl p-3 border border-gray-800/50">
            <div className="text-gray-500 text-xs mb-1">PYQ Archive</div>
            <div className="text-gray-200 font-semibold">{pyqCount} <span className="text-gray-500 text-xs font-normal">years</span></div>
          </div>
          <div className="bg-gray-950/50 rounded-xl p-3 border border-gray-800/50">
            <div className="text-gray-500 text-xs mb-1">PSU Hits</div>
            <div className="text-gray-200 font-semibold">{psuHits} <span className="text-gray-500 text-xs font-normal">topics</span></div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-800/50">
          <div className="flex flex-wrap gap-2">
            {keyTopics.map((topic, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-gray-800/50 text-gray-300 rounded-md">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
