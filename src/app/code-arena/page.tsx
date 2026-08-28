'use client';

import React, { useState } from 'react';

type Language = 'Python' | 'C++' | 'Java';

interface Algorithm {
  id: string;
  name: string;
  description: string;
  code: Record<Language, string>;
  runner?: React.FC;
}

const algorithms: Algorithm[] = [
  {
    id: 'mccabe',
    name: 'McCabe-Thiele Stage Solver',
    description: 'Calculates the theoretical number of stages required for distillation of a binary mixture.',
    code: {
      Python: `def mccabe_thiele(xf, xd, xw, q, alpha):
    # Calculate equilibrium curve
    def y_eq(x):
        return (alpha * x) / (1 + (alpha - 1) * x)
    
    # Calculate q-line intersection
    # ... computation ...
    return stages`,
      'C++': `int mccabeThiele(double xf, double xd, double xw, double q, double alpha) {
    auto y_eq = [alpha](double x) { return (alpha * x) / (1 + (alpha - 1) * x); };
    // ... computation ...
    return stages;
}`,
      Java: `public int mccabeThiele(double xf, double xd, double xw, double q, double alpha) {
    // ... computation ...
    return stages;
}`
    },
    runner: () => {
      const [alpha, setAlpha] = useState(2.5);
      const [xd, setXd] = useState(0.9);
      const [xw, setXw] = useState(0.1);
      const [result, setResult] = useState<number | null>(null);

      const run = () => {
        // Dummy simplified calculation for UI purposes
        setResult(Math.ceil(Math.log((xd / (1 - xd)) / (xw / (1 - xw))) / Math.log(alpha)));
      };

      return (
        <div className="p-4 bg-slate-800 rounded-lg space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-slate-400">Relative Volatility (α)</label><input type="number" value={alpha} onChange={e=>setAlpha(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" /></div>
            <div><label className="text-sm text-slate-400">Distillate (xd)</label><input type="number" value={xd} onChange={e=>setXd(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" /></div>
            <div><label className="text-sm text-slate-400">Bottoms (xw)</label><input type="number" value={xw} onChange={e=>setXw(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" /></div>
          </div>
          <button onClick={run} className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-white font-medium">Calculate Minimum Stages (N_min)</button>
          {result !== null && <div className="p-3 bg-emerald-900/30 text-emerald-400 rounded border border-emerald-500/50">Minimum Theoretical Stages: {result}</div>}
        </div>
      );
    }
  },
  {
    id: 'arrhenius',
    name: 'Arrhenius Kinetics',
    description: 'Calculate Activation Energy and pre-exponential factor from rate constants at different temperatures.',
    code: {
      Python: `import numpy as np

def calculate_arrhenius(T_list, k_list):
    R = 8.314
    inv_T = 1 / np.array(T_list)
    ln_k = np.log(k_list)
    
    slope, intercept = np.polyfit(inv_T, ln_k, 1)
    
    Ea = -slope * R
    A = np.exp(intercept)
    return Ea, A`,
      'C++': `// C++ implementation using least squares regression`,
      Java: `// Java implementation`
    }
  },
  {
    id: 'ergun',
    name: 'Ergun Equation',
    description: 'Calculates pressure drop in packed beds considering both viscous and inertial energy losses.',
    code: {
      Python: `def ergun_dp_dl(L, dp, epsilon, mu, rho, v):
    term1 = 150 * mu * (1 - epsilon)**2 * v / (dp**2 * epsilon**3)
    term2 = 1.75 * rho * (1 - epsilon) * v**2 / (dp * epsilon**3)
    return term1 + term2`,
      'C++': `double ergunEquation(double L, double dp, double epsilon, double mu, double rho, double v) {
    // C++ logic
}`,
      Java: `// Java logic`
    }
  }
];

export default function CodeArena() {
  const [activeAlgoId, setActiveAlgoId] = useState(algorithms[0].id);
  const [activeLang, setActiveLang] = useState<Language>('Python');
  const [copied, setCopied] = useState(false);

  const activeAlgo = algorithms.find(a => a.id === activeAlgoId)!;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeAlgo.code[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-80 bg-slate-900 border-r border-slate-800 p-6 flex flex-col h-screen md:sticky top-0 overflow-y-auto">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-8">Code Arena</h1>
        
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Algorithms</h2>
        <div className="space-y-2">
          {algorithms.map(algo => (
            <button
              key={algo.id}
              onClick={() => setActiveAlgoId(algo.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeAlgoId === algo.id ? 'bg-indigo-600/20 border border-indigo-500/50 text-indigo-300' : 'bg-slate-800 border border-transparent text-slate-400 hover:bg-slate-800/80 hover:text-slate-300'}`}
            >
              {algo.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 h-screen overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{activeAlgo.name}</h2>
            <p className="text-slate-400">{activeAlgo.description}</p>
          </div>

          {/* Code Viewer */}
          <div className="bg-[#1e1e2e] rounded-xl border border-slate-800 overflow-hidden shadow-2xl mb-8">
            <div className="flex items-center justify-between px-4 py-3 bg-[#181825] border-b border-slate-800">
              <div className="flex space-x-2">
                {(['Python', 'C++', 'Java'] as Language[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeLang === lang ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <button onClick={handleCopy} className="text-slate-400 hover:text-white flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-md text-sm">
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm font-mono text-[#cdd6f4]">
                <code>{activeAlgo.code[activeLang]}</code>
              </pre>
            </div>
          </div>

          {/* Interactive Runner */}
          {activeAlgo.runner && (
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4">Interactive Runner</h3>
              <activeAlgo.runner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
