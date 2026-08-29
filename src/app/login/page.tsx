'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getStoredProfile, saveStoredProfile, UserProfile } from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('Govt. Polytechnic College, Bikaner');
  const [targetPsu, setTargetPsu] = useState('IOCL / HPCL / BARC');
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const p = getStoredProfile();
      p.name = 'Diploma Chemical Engineer';
      saveStoredProfile(p);
      router.push('/');
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const p = getStoredProfile();
      if (name.trim()) p.name = name;
      if (email.trim()) p.email = email;
      if (college.trim()) p.college = college;
      if (targetPsu.trim()) p.targetPsu = targetPsu;
      saveStoredProfile(p);
      router.push('/');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient Liquid Motion Background Mesh */}
      <div className="absolute top-[-15%] left-[-10%] w-[550px] h-[550px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[550px] h-[550px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[100px] pointer-events-none animate-float" />

      {/* Floating Animated Chemical Icons / Molecules */}
      <div className="absolute top-12 left-16 text-3xl opacity-30 animate-float hidden md:block">🧪</div>
      <div className="absolute bottom-20 left-24 text-3xl opacity-30 animate-float-slow hidden md:block">⚛️</div>
      <div className="absolute top-24 right-20 text-3xl opacity-30 animate-float hidden md:block">🔥</div>
      <div className="absolute bottom-16 right-32 text-3xl opacity-30 animate-float-slow hidden md:block">📐</div>

      {/* Main Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Side: Brand Visuals & Interactive Chemical Orbital */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            Diploma Chemical Engineering Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
            Welcome to <br />
            <span className="animated-gradient-text">ChemQuest OS</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
            The next-generation learning operating system for BTER Diploma V Semester students & PSU aspirants. Master Notes, CBT Exams, and Interactive Simulations in one unified platform.
          </p>

          {/* Faux-3D Chemical Molecule Visual */}
          <div className="relative w-48 h-48 mx-auto lg:mx-0 my-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/30 animate-spin-slow" />
            <div className="absolute w-36 h-36 rounded-full border-2 border-purple-500/40 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '14s' }} />
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-indigo-500/40 animate-float">
              ⚗️
            </div>
            <div className="absolute top-2 left-6 w-5 h-5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 text-[10px] font-bold flex items-center justify-center text-gray-950">
              $H_2$
            </div>
            <div className="absolute bottom-3 right-5 w-5 h-5 rounded-full bg-rose-400 shadow-lg shadow-rose-400/50 text-[10px] font-bold flex items-center justify-center text-gray-950">
              $O_2$
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 text-center">
            <div className="bg-gray-900/60 border border-gray-800/80 rounded-2xl p-3">
              <span className="text-lg font-black text-indigo-400 block">6</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Core Subjects</span>
            </div>
            <div className="bg-gray-900/60 border border-gray-800/80 rounded-2xl p-3">
              <span className="text-lg font-black text-purple-400 block">24</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">PYQ Papers</span>
            </div>
            <div className="bg-gray-900/60 border border-gray-800/80 rounded-2xl p-3">
              <span className="text-lg font-black text-cyan-400 block">8</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Target PSUs</span>
            </div>
          </div>
        </div>

        {/* Right Side: Glassmorphic Auth Card */}
        <div className="lg:col-span-6">
          <div className="glass-panel rounded-3xl p-8 space-y-6 glow-indigo relative overflow-hidden">
            {/* Top Tabs */}
            <div className="flex bg-gray-900/80 p-1.5 rounded-2xl border border-gray-800">
              <button
                onClick={() => setTab('login')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  tab === 'login'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Student Sign In
              </button>
              <button
                onClick={() => setTab('register')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  tab === 'register'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Candidate Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@polytechnic.ac.in"
                  className="w-full bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                  required
                />
              </div>

              {tab === 'register' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Polytechnic College</label>
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full bg-gray-950/80 border border-gray-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Target PSU</label>
                    <input
                      type="text"
                      value={targetPsu}
                      onChange={(e) => setTargetPsu(e.target.value)}
                      className="w-full bg-gray-950/80 border border-gray-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-indigo-900/30 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {loading ? 'Authenticating...' : tab === 'login' ? 'Sign In to ChemQuest' : 'Register Candidate Profile'}
              </button>
            </form>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-gray-800 w-full" />
              <span className="bg-gray-900 px-3 text-[11px] text-gray-500 font-bold uppercase tracking-wider absolute">Or Instant Access</span>
            </div>

            {/* Quick 1-Click Guest Access */}
            <button
              onClick={handleGuestLogin}
              disabled={loading}
              className="w-full py-3 bg-gray-900/80 hover:bg-gray-800/90 text-gray-300 hover:text-white border border-gray-700/60 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>⚡</span> Enter Directly as Guest Student (No Login Required)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
