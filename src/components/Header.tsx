'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getStoredProfile, UserProfile } from '@/lib/firebase';

export default function Header() {
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile());

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/60 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-400 hidden sm:inline">
          🎓 Semester: <span className="text-gray-200 font-semibold">Diploma V Sem (BTER)</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Streak Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-bold text-amber-400 shadow-sm">
          <span>🔥</span>
          <span>{profile.streakDays} Day Streak</span>
        </div>

        {/* Target PSU Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-semibold text-cyan-300">
          <span>🎯</span>
          <span>{profile.targetPsu || 'IOCL / HPCL'}</span>
        </div>

        {/* Profile Link */}
        <Link
          href="/profile"
          className="flex items-center gap-2.5 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl transition-all"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            {profile.name.charAt(0)}
          </div>
          <span className="text-xs font-medium text-gray-200 hidden lg:inline">{profile.name}</span>
        </Link>
      </div>
    </header>
  );
}
