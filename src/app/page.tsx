import Link from 'next/link';
import { SUBJECTS } from '@/lib/subjects';
import SubjectCard from '@/components/SubjectCard';
import Header from '@/components/Header';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Header />

      <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto flex-1 w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 p-8 border border-white/10 shadow-2xl">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold rounded-full uppercase tracking-wider">
                  ⚡ Student Operating System
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-cyan-200 mt-2 mb-1">
                  Chemical Engineering Command Center
                </h1>
                <p className="text-gray-400 text-sm md:text-base">
                  Diploma V Semester • Govt. Polytechnic Bikaner • BTER Examination & PSU Placement Platform
                </p>
              </div>
            </div>

            {/* Quick Action Matrix */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/mock-tests" className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-900/30 flex items-center gap-2">
                <span>📝</span> Take CBT Mock Test
              </Link>
              <Link href="/simulations" className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-900/30 flex items-center gap-2">
                <span>🧪</span> Open Simulation Lab
              </Link>
              <Link href="/flashcards" className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                <span>🎴</span> Spaced Flashcards
              </Link>
              <Link href="/code-arena" className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                <span>💻</span> Code & DSA Arena
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
        </section>

        {/* Diagnostic Weak Topic Alert Banner */}
        <section className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="text-sm font-bold text-amber-300">Recommended Topic Revision</h3>
              <p className="text-xs text-gray-400">High-yield board exam topic: <span className="text-gray-200 font-semibold">Mass Transfer-II • McCabe-Thiele Stage Stepping (8 Marks guaranteed)</span></p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/notes/ch5002" className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-xl transition-all">
              Open Master Notes
            </Link>
            <Link href="/simulations" className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-bold rounded-xl transition-all">
              Simulate in Lab
            </Link>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Core Subjects', value: '6', detail: '100% BTER Syllabus', color: 'text-indigo-400' },
            { label: 'Master Notes', value: '368 pp', detail: 'Verified Lecture Notes', color: 'text-purple-400' },
            { label: 'PYQ Papers', value: '24', detail: '2022–2025 Board Archive', color: 'text-rose-400' },
            { label: 'PSU Questions', value: '63 Papers', detail: 'IOCL/HPCL/BARC Mapped', color: 'text-cyan-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 hover:bg-gray-900/60 transition-colors">
              <span className={`text-2xl font-extrabold mb-0.5 block ${stat.color}`}>{stat.value}</span>
              <span className="text-xs font-bold text-gray-200 block">{stat.label}</span>
              <span className="text-[10px] text-gray-500 mt-1 block">{stat.detail}</span>
            </div>
          ))}
        </section>

        {/* Core Subjects Grid */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-100">Semester Curriculum & Master Notes</h2>
              <p className="text-xs text-gray-400">Click any subject to open its verified lecture notes and page-anchored reader</p>
            </div>
            <Link href="/notes" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
              View All in Notes Hub →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUBJECTS.map((subject) => (
              <SubjectCard key={subject.code} subject={subject} />
            ))}
          </div>
        </section>

        {/* Engineering Tool Suite Banner */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/simulations" className="group bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 transition-all">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform origin-left">🧪</div>
            <h3 className="text-base font-bold text-blue-300">Interactive Simulation Lab</h3>
            <p className="text-xs text-gray-400 mt-1">Live SVG McCabe-Thiele stage stepper, CSTR/PFR reactor volume comparison, and PID tuner.</p>
          </Link>
          <Link href="/mock-tests" className="group bg-gradient-to-br from-purple-900/20 to-rose-900/20 border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform origin-left">📝</div>
            <h3 className="text-base font-bold text-purple-300">CBT Mock Examination Engine</h3>
            <p className="text-xs text-gray-400 mt-1">Real examination simulator with timer, question palette, negative marking, and diagnostic scorecard.</p>
          </Link>
          <Link href="/code-arena" className="group bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/40 transition-all">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform origin-left">💻</div>
            <h3 className="text-base font-bold text-emerald-300">Chemical Computing & Code</h3>
            <p className="text-xs text-gray-400 mt-1">Python, C++, Java, and DSA algorithms for chemical process calculations and placement coding rounds.</p>
          </Link>
        </section>
      </main>
    </div>
  );
}
