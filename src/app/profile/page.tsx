'use client';

import { useState, useEffect } from 'react';
import { getStoredProfile, saveStoredProfile, UserProfile } from '@/lib/firebase';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile());
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [college, setCollege] = useState(profile.college);
  const [targetPsu, setTargetPsu] = useState(profile.targetPsu);
  const [savedAlert, setSavedAlert] = useState(false);

  useEffect(() => {
    const p = getStoredProfile();
    setProfile(p);
    setName(p.name);
    setCollege(p.college);
    setTargetPsu(p.targetPsu);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      name,
      college,
      targetPsu,
    };
    setProfile(updated);
    saveStoredProfile(updated);
    setIsEditing(false);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 mb-2">
            Student Profile & Cloud Sync
          </h1>
          <p className="text-gray-400">Manage your account, track study streaks, and sync data</p>
        </div>
        {savedAlert && (
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm">
            ✓ Profile saved successfully!
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 z-10 relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-indigo-500/30">
            {profile.name.charAt(0)}
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-semibold">
                BTER V Semester
              </span>
            </div>
            <p className="text-gray-400 text-sm">{profile.college}</p>
            <p className="text-cyan-400 text-xs font-medium flex items-center justify-center md:justify-start gap-1">
              🎯 Target PSUs: <span className="text-gray-200">{profile.targetPsu}</span>
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-xl border border-gray-700 transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSave} className="mt-8 pt-6 border-t border-gray-800 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white text-sm focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">College / Polytechnic</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white text-sm focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Target Companies / PSUs</label>
                <input
                  type="text"
                  value={targetPsu}
                  onChange={(e) => setTargetPsu(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-white text-sm focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-indigo-900/20"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 text-center">
          <div className="text-3xl font-extrabold text-amber-400 mb-1">🔥 {profile.streakDays} Days</div>
          <div className="text-xs text-gray-400 font-medium">Active Study Streak</div>
        </div>
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 text-center">
          <div className="text-3xl font-extrabold text-indigo-400 mb-1">{profile.completedTopics.length}</div>
          <div className="text-xs text-gray-400 font-medium">Topics Mastered</div>
        </div>
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 text-center">
          <div className="text-3xl font-extrabold text-rose-400 mb-1">{profile.solvedPyqs.length}</div>
          <div className="text-xs text-gray-400 font-medium">PYQs Solved</div>
        </div>
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 text-center">
          <div className="text-3xl font-extrabold text-emerald-400 mb-1">{profile.mockTestScores.length}</div>
          <div className="text-xs text-gray-400 font-medium">Mock Tests Taken</div>
        </div>
      </div>
    </div>
  );
}
