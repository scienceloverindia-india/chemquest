import Image from 'next/image';

const COMPANIES = [
  { id: 'iocl', name: 'IOCL', fullName: 'Indian Oil Corporation', post: 'Engineering Assistant', logo: '⛽' },
  { id: 'hpcl', name: 'HPCL', fullName: 'Hindustan Petroleum', post: 'Operations Technician', logo: '🛢️' },
  { id: 'ongc', name: 'ONGC', fullName: 'Oil and Natural Gas Corp', post: 'Junior Engineering Assistant', logo: '🌊' },
  { id: 'barc', name: 'BARC', fullName: 'Bhabha Atomic Research', post: 'Stipendiary Trainee Cat-1', logo: '⚛️' },
  { id: 'gail', name: 'GAIL', fullName: 'Gas Authority of India', post: 'Foreman (Chemical)', logo: '🔥' },
  { id: 'bpcl', name: 'BPCL', fullName: 'Bharat Petroleum', post: 'Process Technician', logo: '🏭' },
  { id: 'cil', name: 'Coal India', fullName: 'Coal India Limited', post: 'Management Trainee', logo: '⛏️' },
  { id: 'rcfl', name: 'RCFL', fullName: 'Rashtriya Chemicals', post: 'Operator Trainee', logo: '🌱' }
];

export default function PsuPage() {
  return (
    <div className="p-6 md:p-8 space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">PSU Placement Prep</h1>
        <p className="text-gray-400 text-lg">Targeted preparation for top Chemical Engineering PSUs based on analysis of 63 past papers.</p>
      </section>

      {/* Target Companies */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Target Companies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COMPANIES.map(company => (
            <div key={company.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-cyan-500/50 hover:bg-gray-800/50 transition-all group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform origin-left">{company.logo}</div>
              <h3 className="text-lg font-bold text-white">{company.name}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{company.fullName}</p>
              <div className="mt-4 inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded-full">
                {company.post}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selection Process Flow */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-950/30 border border-gray-800 rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white mb-8 text-center">Standard Selection Process</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10 -translate-y-1/2 rounded"></div>
          {[
            { phase: '1', title: 'Written Test (CBT)', desc: 'Domain + Aptitude' },
            { phase: '2', title: 'Skill Test', desc: 'Trade/Plant simulation' },
            { phase: '3', title: 'Interview', desc: 'Technical + HR' },
            { phase: '4', title: 'Medical', desc: 'Fitness clearing' }
          ].map((step, idx) => (
            <div key={idx} className="bg-gray-950 border border-gray-700 w-full md:w-56 p-5 rounded-2xl text-center relative z-10 shadow-xl">
              <div className="w-10 h-10 mx-auto bg-cyan-600 rounded-full flex items-center justify-center font-bold text-white mb-3 shadow-lg shadow-cyan-900/50">
                {step.phase}
              </div>
              <h4 className="font-bold text-gray-200">{step.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* High-Yield Topics */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">High-Yield PSU Topics</h2>
          <span className="text-sm text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">From 63 Papers</span>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-800/50 text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Topic</th>
                <th className="px-6 py-4 font-medium">Subject</th>
                <th className="px-6 py-4 font-medium text-right">Frequency (Hits)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                { topic: 'Catalyst & Deactivation', sub: 'CRE', hits: 305 },
                { topic: 'HAZOP/PHA Analysis', sub: 'Safety', hits: 286 },
                { topic: 'Distillation Design', sub: 'Mass Transfer', hits: 170 },
                { topic: 'CSTR Design Eq', sub: 'CRE', hits: 122 },
                { topic: 'PID Controllers', sub: 'Process Control', hits: 98 },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-800/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-200">{row.topic}</td>
                  <td className="px-6 py-4 text-gray-400">{row.sub}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-gray-800 text-cyan-400 font-bold min-w-[3rem]">
                      {row.hits}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tips */}
      <section className="bg-blue-900/20 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-blue-400 mb-3">Interview Pro-Tips</h3>
        <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
          <li>Always mention safety and environmental norms when proposing solutions.</li>
          <li>Be thorough with your Industrial Training / Summer Internship report.</li>
          <li>Memorize dimensionless numbers (Re, Pr, Nu, Sc) and their physical significance.</li>
          <li>Revise P&ID symbols and basic instrumentation diagrams.</li>
        </ul>
      </section>
    </div>
  );
}
