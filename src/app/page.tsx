import Link from 'next/link';
import { SUBJECTS } from '@/lib/subjects';
import SubjectCard from '@/components/SubjectCard';

export default function Dashboard() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 p-8 border border-white/10 shadow-2xl">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 mb-2">
                ChemQuest
              </h1>
              <p className="text-gray-300 text-lg">Diploma Chemical Engg • V Semester • Govt. Polytechnic Bikaner</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2">
              <span className="text-sm font-medium text-emerald-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                PSU Placement Ready
              </span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </section>

      {/* Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Subjects', value: '6', color: 'text-indigo-400' },
          { label: 'Core Pages', value: '368', color: 'text-purple-400' },
          { label: 'PYQ Papers', value: '24', color: 'text-rose-400' },
          { label: 'PSU Papers', value: '63', color: 'text-cyan-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-800 transition-colors">
            <span className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</span>
            <span className="text-sm text-gray-400 font-medium">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Current Focus */}
      <section className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-800/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-lg font-semibold text-blue-300 mb-1">Current Focus</h2>
          <p className="text-gray-300 text-sm">Mass Transfer-II • Unit 1: Distillation</p>
        </div>
        <div className="flex gap-3">
          <Link href="/notes/ch5002" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-900/20 text-sm">
            Resume Study
          </Link>
          <Link href="/tracker" className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 rounded-xl font-medium transition-colors text-sm">
            View Progress
          </Link>
        </div>
      </section>

      {/* Subjects Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Core Subjects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECTS.map((subject) => (
            <SubjectCard key={subject.code} subject={subject} />
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/chat" className="group bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 rounded-2xl p-6 hover:border-indigo-500/50 transition-all block">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl group-hover:scale-110 transition-transform">
              🤖
            </div>
            <div>
              <h3 className="text-lg font-bold text-indigo-300">AI Study Assistant</h3>
              <p className="text-sm text-gray-400">Ask questions, get explanations</p>
            </div>
          </div>
        </Link>
        <Link href="/pyqs" className="group bg-gradient-to-br from-rose-900/30 to-orange-900/30 border border-rose-500/20 rounded-2xl p-6 hover:border-rose-500/50 transition-all block">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 text-2xl group-hover:scale-110 transition-transform">
              📄
            </div>
            <div>
              <h3 className="text-lg font-bold text-rose-300">PYQ Archive</h3>
              <p className="text-sm text-gray-400">Past year papers & solutions</p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
