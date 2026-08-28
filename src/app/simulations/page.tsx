'use client';

import React, { useState, useEffect } from 'react';

// Math helpers
const linspace = (start: number, end: number, num: number) => {
  const arr = [];
  const step = (end - start) / (num - 1);
  for (let i = 0; i < num; i++) arr.push(start + step * i);
  return arr;
};

// Simulation 1: McCabe-Thiele
function McCabeThiele() {
  const [alpha, setAlpha] = useState(2.5);
  const [R, setR] = useState(2.0);
  const [xF, setXf] = useState(0.5);
  const [xD, setXd] = useState(0.95);
  const [xB, setXb] = useState(0.05);
  const [q, setQ] = useState(1.0); // saturated liquid

  // Scale variables
  const size = 400;
  const padding = 40;
  const plotSize = size - 2 * padding;
  
  const mapX = (x: number) => padding + x * plotSize;
  const mapY = (y: number) => size - padding - y * plotSize;

  // Equilibrium curve y = (alpha * x) / (1 + (alpha-1)*x)
  const eqPoints = linspace(0, 1, 50).map(x => ({
    x, y: (alpha * x) / (1 + (alpha - 1) * x)
  }));
  const eqPath = eqPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${mapX(p.x)} ${mapY(p.y)}`).join(' ');

  // q-line intersection with equilibrium curve
  // We'll simplify the intersection math for visual purposes or solve numerically
  // q-line: y = (q/(q-1))*x - (1/(q-1))*xF (if q != 1)
  // If q=1, x = xF
  let xInt = xF, yInt = (alpha * xF) / (1 + (alpha - 1) * xF); // approximate intersection
  // ROL: y = (R/(R+1))x + xD/(R+1)
  // Intersection of ROL and q-line:
  if (Math.abs(q - 1) < 0.01) {
    xInt = xF;
    yInt = (R / (R + 1)) * xF + xD / (R + 1);
  } else {
    // Solve linear system ROL & q-line
    const m1 = R / (R + 1), c1 = xD / (R + 1);
    const m2 = q / (q - 1), c2 = -xF / (q - 1);
    xInt = (c2 - c1) / (m1 - m2);
    yInt = m1 * xInt + c1;
  }

  // Stepping calculation
  const steps = [];
  let currX = xD;
  let currY = xD;
  let stageCount = 0;
  
  while (currX > xB && stageCount < 25) {
    stageCount++;
    // go horizontally to equilibrium curve: x_new = y / (alpha - (alpha-1)*y)
    const nextX = currY / (alpha - (alpha - 1) * currY);
    steps.push({ x1: currX, y1: currY, x2: nextX, y2: currY });
    currX = nextX;
    
    // go vertically to operating line
    let nextY = currX;
    if (currX > xInt) {
      // ROL
      nextY = (R / (R + 1)) * currX + xD / (R + 1);
    } else {
      // SOL
      // slope = (yInt - xB) / (xInt - xB)
      const mSol = (yInt - xB) / (xInt - xB);
      nextY = mSol * (currX - xB) + xB;
    }
    steps.push({ x1: currX, y1: currY, x2: currX, y2: nextY });
    currY = nextY;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-indigo-500 pl-4">Parameters</h3>
        <div className="space-y-4">
          <div>
            <label className="flex justify-between text-sm text-neutral-400 mb-1">
              <span>Rel. Volatility (α)</span> <span>{alpha.toFixed(2)}</span>
            </label>
            <input type="range" min="1.1" max="5.0" step="0.1" value={alpha} onChange={e => setAlpha(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
          </div>
          <div>
            <label className="flex justify-between text-sm text-neutral-400 mb-1">
              <span>Reflux Ratio (R)</span> <span>{R.toFixed(2)}</span>
            </label>
            <input type="range" min="0.5" max="10.0" step="0.1" value={R} onChange={e => setR(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
          </div>
          <div>
            <label className="flex justify-between text-sm text-neutral-400 mb-1">
              <span>Feed Composition (xF)</span> <span>{xF.toFixed(2)}</span>
            </label>
            <input type="range" min={xB+0.05} max={xD-0.05} step="0.05" value={xF} onChange={e => setXf(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
          </div>
          <div>
            <label className="flex justify-between text-sm text-neutral-400 mb-1">
              <span>Thermal Cond. (q)</span> <span>{q.toFixed(2)}</span>
            </label>
            <input type="range" min="0.0" max="1.5" step="0.1" value={q} onChange={e => setQ(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
          </div>
        </div>
        <div className="mt-8 bg-neutral-950 rounded-xl p-4 border border-neutral-800">
          <p className="text-sm text-neutral-400 flex justify-between mb-2"><span>Theoretical Stages (N):</span> <span className="font-bold text-indigo-400">{stageCount}</span></p>
          <p className="text-xs text-neutral-500 italic">Notice how stage count changes with R and α.</p>
        </div>
      </div>
      
      <div className="flex-1 bg-white rounded-2xl p-4 flex items-center justify-center">
        <svg width={size} height={size} className="text-neutral-900">
          {/* Axes */}
          <line x1={padding} y1={size-padding} x2={size-padding} y2={size-padding} stroke="#000" strokeWidth="2" />
          <line x1={padding} y1={size-padding} x2={padding} y2={padding} stroke="#000" strokeWidth="2" />
          
          {/* 45 degree line */}
          <line x1={mapX(0)} y1={mapY(0)} x2={mapX(1)} y2={mapY(1)} stroke="#666" strokeWidth="1" strokeDasharray="4 4" />
          
          {/* Equilibrium Curve */}
          <path d={eqPath} fill="none" stroke="#6366f1" strokeWidth="2" />
          
          {/* q-line */}
          <line x1={mapX(xF)} y1={mapY(xF)} x2={mapX(xInt)} y2={mapY(yInt)} stroke="#ef4444" strokeWidth="2" />
          
          {/* ROL */}
          <line x1={mapX(xD)} y1={mapY(xD)} x2={mapX(xInt)} y2={mapY(yInt)} stroke="#10b981" strokeWidth="2" />
          
          {/* SOL */}
          <line x1={mapX(xInt)} y1={mapY(yInt)} x2={mapX(xB)} y2={mapY(xB)} stroke="#f59e0b" strokeWidth="2" />
          
          {/* Steps */}
          {steps.map((step, i) => (
            <line key={i} x1={mapX(step.x1)} y1={mapY(step.y1)} x2={mapX(step.x2)} y2={mapY(step.y2)} stroke="#a855f7" strokeWidth="1.5" />
          ))}

          {/* Labels */}
          <text x={size/2} y={size-5} textAnchor="middle" fontSize="12" fill="#000">Liquid Mole Fraction (x)</text>
          <text x={10} y={size/2} textAnchor="middle" fontSize="12" fill="#000" transform={`rotate(-90 15 ${size/2})`}>Vapor Mole Fraction (y)</text>
        </svg>
      </div>
    </div>
  );
}

// Simulation 2: Reactor
function ReactorSim() {
  const [order, setOrder] = useState(1);
  const [k, setK] = useState(0.1);
  const [CA0, setCA0] = useState(1.0);
  const [v0, setV0] = useState(10);
  const [XA, setXA] = useState(0.9);

  // Math
  let vCSTR = 0;
  let vPFR = 0;

  if (order === 0) {
    vCSTR = (v0 * CA0 * XA) / k;
    vPFR = vCSTR;
  } else if (order === 1) {
    vCSTR = (v0 * XA) / (k * (1 - XA));
    vPFR = (v0 * -Math.log(1 - XA)) / k;
  } else {
    vCSTR = (v0 * XA) / (k * CA0 * Math.pow(1 - XA, 2));
    vPFR = (v0 * XA) / (k * CA0 * (1 - XA));
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-rose-500 pl-4">Reactor Kinetics</h3>
        <div className="space-y-4">
          <div>
            <label className="flex justify-between text-sm text-neutral-400 mb-1">
              <span>Reaction Order (n)</span> <span>{order}</span>
            </label>
            <input type="range" min="0" max="2" step="1" value={order} onChange={e => setOrder(parseInt(e.target.value))} className="w-full accent-rose-500" />
          </div>
          <div>
            <label className="flex justify-between text-sm text-neutral-400 mb-1">
              <span>Rate Constant (k)</span> <span>{k.toFixed(2)}</span>
            </label>
            <input type="range" min="0.01" max="0.5" step="0.01" value={k} onChange={e => setK(parseFloat(e.target.value))} className="w-full accent-rose-500" />
          </div>
          <div>
            <label className="flex justify-between text-sm text-neutral-400 mb-1">
              <span>Target Conversion (XA)</span> <span>{(XA * 100).toFixed(0)}%</span>
            </label>
            <input type="range" min="0.1" max="0.99" step="0.01" value={XA} onChange={e => setXA(parseFloat(e.target.value))} className="w-full accent-rose-500" />
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-center">
        <h3 className="text-lg font-bold text-white mb-6 text-center">Volume Comparison</h3>
        <div className="flex items-end justify-center gap-8 h-48 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-sm text-neutral-400 mb-2">{vCSTR.toFixed(1)} L</span>
            <div className="w-20 bg-blue-500 rounded-t-lg transition-all duration-500" style={{ height: `${Math.min(vCSTR / Math.max(vCSTR, vPFR) * 100, 100)}%` }}></div>
            <span className="mt-2 font-bold text-white">CSTR</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-neutral-400 mb-2">{vPFR.toFixed(1)} L</span>
            <div className="w-20 bg-emerald-500 rounded-t-lg transition-all duration-500" style={{ height: `${Math.min(vPFR / Math.max(vCSTR, vPFR) * 100, 100)}%` }}></div>
            <span className="mt-2 font-bold text-white">PFR</span>
          </div>
        </div>
        <p className="text-xs text-neutral-500 text-center">For positive orders &gt; 0, PFR requires less volume than CSTR for the same conversion.</p>
      </div>
    </div>
  );
}

// Simulation 3: PID
function PIDSim() {
  const [Kp, setKp] = useState(2.0);
  const [tauI, setTauI] = useState(5.0);
  const [tauD, setTauD] = useState(1.0);
  
  // Dummy step response based on a simple second order characteristic
  // y(t) = 1 - e^(-zeta * w * t) * (cos(wd * t) + ...)
  // We'll map Kp, tauI, tauD to w, zeta roughly for visual effect
  
  const size = 400;
  const padding = 30;
  const plotWidth = size - 2 * padding;
  const plotHeight = size - 2 * padding;
  
  const points = [];
  const dt = 0.5;
  const maxT = 50;
  
  // Very rough heuristic mapping to show typical PID behavior visually
  // Kp increases speed and oscillation
  // tauI decreases steady state error, decreases stability
  // tauD increases damping
  const w = Math.sqrt(Kp);
  const zeta = 0.1 + (tauD / 5) + (1 / tauI) - (Kp / 20); // rough heuristic
  
  for (let t = 0; t <= maxT; t += dt) {
    let y = 0;
    if (zeta >= 1) {
      // overdamped
      y = 1 - Math.exp(-w * t);
    } else if (zeta > 0) {
      // underdamped
      const wd = w * Math.sqrt(1 - zeta * zeta);
      y = 1 - Math.exp(-zeta * w * t) * (Math.cos(wd * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(wd * t));
    } else {
      // unstable
      y = 1 - Math.exp(0.1 * t) * Math.cos(w * t);
    }
    
    // limit y to reasonable drawing bounds
    y = Math.min(Math.max(y, -0.5), 2.5);
    points.push({ t, y });
  }

  const mapX = (t: number) => padding + (t / maxT) * plotWidth;
  const mapY = (y: number) => size - padding - (y / 2) * plotHeight; // scale y=2 to top

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${mapX(p.t)} ${mapY(p.y)}`).join(' ');

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-amber-500 pl-4">Controller Tuning</h3>
        <div className="space-y-4">
          <div>
            <label className="flex justify-between text-sm text-neutral-400 mb-1">
              <span>Proportional Gain (Kp)</span> <span>{Kp.toFixed(1)}</span>
            </label>
            <input type="range" min="0.5" max="5.0" step="0.1" value={Kp} onChange={e => setKp(parseFloat(e.target.value))} className="w-full accent-amber-500" />
          </div>
          <div>
            <label className="flex justify-between text-sm text-neutral-400 mb-1">
              <span>Integral Time (τI)</span> <span>{tauI.toFixed(1)}</span>
            </label>
            <input type="range" min="1.0" max="20.0" step="0.5" value={tauI} onChange={e => setTauI(parseFloat(e.target.value))} className="w-full accent-amber-500" />
          </div>
          <div>
            <label className="flex justify-between text-sm text-neutral-400 mb-1">
              <span>Derivative Time (τD)</span> <span>{tauD.toFixed(1)}</span>
            </label>
            <input type="range" min="0.0" max="5.0" step="0.1" value={tauD} onChange={e => setTauD(parseFloat(e.target.value))} className="w-full accent-amber-500" />
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-neutral-950 rounded-2xl p-4 flex items-center justify-center border border-neutral-800">
        <svg width={size} height={size} className="text-neutral-100">
          {/* Axes */}
          <line x1={padding} y1={size-padding} x2={size-padding} y2={size-padding} stroke="#444" strokeWidth="1" />
          <line x1={padding} y1={padding} x2={padding} y2={size-padding} stroke="#444" strokeWidth="1" />
          
          {/* Setpoint (y=1) */}
          <line x1={padding} y1={mapY(1)} x2={size-padding} y2={mapY(1)} stroke="#10b981" strokeWidth="1.5" strokeDasharray="5 5" />
          
          {/* Response */}
          <path d={path} fill="none" stroke="#fbbf24" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

export default function SimulationsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['McCabe-Thiele Distillation', 'CSTR vs PFR', 'PID Controller'];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Interactive Simulators
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Real-time chemical engineering mathematical models & visualizations.
          </p>
        </div>

        <div className="flex justify-center space-x-2 border-b border-neutral-800 pb-2 flex-wrap gap-y-2">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-t-xl font-medium text-sm transition-colors ${
                activeTab === i
                  ? 'bg-neutral-900 text-indigo-400 border-t border-x border-neutral-800'
                  : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 0 && <McCabeThiele />}
          {activeTab === 1 && <ReactorSim />}
          {activeTab === 2 && <PIDSim />}
        </div>
      </div>
    </div>
  );
}
