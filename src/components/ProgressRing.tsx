'use client';

import { useEffect, useState } from 'react';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export default function ProgressRing({
  progress,
  size = 60,
  strokeWidth = 4,
  color = 'indigo-500',
  label,
}: ProgressRingProps) {
  const [offset, setOffset] = useState(0);
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
  }, [setOffset, circumference, progress, offset]);

  // Map color prop to Tailwind hex values for inline styles if needed, but we'll use stroke-current
  // and classes
  const colorClassMap: Record<string, string> = {
    rose: 'text-rose-500',
    blue: 'text-blue-500',
    amber: 'text-amber-500',
    orange: 'text-orange-500',
    red: 'text-red-500',
    teal: 'text-teal-500',
    indigo: 'text-indigo-500',
    purple: 'text-purple-500',
    cyan: 'text-cyan-500',
    emerald: 'text-emerald-500',
  };

  const textClass = colorClassMap[color.replace('text-', '').replace('-500', '')] || 'text-indigo-500';

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90 w-full h-full"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle */}
          <circle
            className="text-gray-800"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={center}
            cy={center}
          />
          {/* Progress circle */}
          <circle
            className={`${textClass} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={center}
            cy={center}
          />
        </svg>
        <div className="absolute flex items-center justify-center text-xs font-bold text-gray-200">
          {Math.round(progress)}%
        </div>
      </div>
      {label && <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{label}</span>}
    </div>
  );
}
