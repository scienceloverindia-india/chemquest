export interface StudyUnit {
  id: string;
  subjectCode: string;
  unitNumber: number;
  unitName: string;
  topics: { id: string; name: string; pages: string }[];
}

export const STUDY_UNITS: StudyUnit[] = [
  // CH 5001: CRE
  { id: 'ch5001-u1', subjectCode: 'ch5001', unitNumber: 1, unitName: 'Kinetics of Homogeneous Reactions', topics: [
    { id: 'ch5001-u1-t1', name: 'Rate of Reaction', pages: '1-5' },
    { id: 'ch5001-u1-t2', name: 'Elementary and Non-elementary Reactions', pages: '6-10' },
    { id: 'ch5001-u1-t3', name: 'Molecularity and Order of Reaction', pages: '11-15' },
    { id: 'ch5001-u1-t4', name: 'Rate Constant & Temperature Dependence (Arrhenius Equation)', pages: '16-22' }
  ]},
  { id: 'ch5001-u2', subjectCode: 'ch5001', unitNumber: 2, unitName: 'Interpretation of Batch Reactor Data', topics: [
    { id: 'ch5001-u2-t1', name: 'Constant Volume Batch Reactor', pages: '23-28' },
    { id: 'ch5001-u2-t2', name: 'Integral Method of Analysis of Data', pages: '29-35' },
    { id: 'ch5001-u2-t3', name: 'Differential Method of Analysis of Data', pages: '36-40' },
    { id: 'ch5001-u2-t4', name: 'Variable Volume Batch Reactor', pages: '41-45' }
  ]},
  { id: 'ch5001-u3', subjectCode: 'ch5001', unitNumber: 3, unitName: 'Ideal Reactors', topics: [
    { id: 'ch5001-u3-t1', name: 'Ideal Batch Reactor', pages: '46-52' },
    { id: 'ch5001-u3-t2', name: 'Space Time and Space Velocity', pages: '53-56' },
    { id: 'ch5001-u3-t3', name: 'Steady State Mixed Flow Reactor (CSTR)', pages: '57-65' },
    { id: 'ch5001-u3-t4', name: 'Steady State Plug Flow Reactor (PFR)', pages: '66-75' }
  ]},
  { id: 'ch5001-u4', subjectCode: 'ch5001', unitNumber: 4, unitName: 'Non-Ideal Reactors', topics: [
    { id: 'ch5001-u4-t1', name: 'Residence Time Distribution (RTD)', pages: '76-85' },
    { id: 'ch5001-u4-t2', name: 'E and F Curves', pages: '86-92' },
    { id: 'ch5001-u4-t3', name: 'Mean Residence Time & Variance', pages: '93-98' }
  ]},
  { id: 'ch5001-u5', subjectCode: 'ch5001', unitNumber: 5, unitName: 'Heterogeneous Catalysis', topics: [
    { id: 'ch5001-u5-t1', name: 'Catalysts and their properties', pages: '99-105' },
    { id: 'ch5001-u5-t2', name: 'Steps in Catalytic Reactions', pages: '106-112' },
    { id: 'ch5001-u5-t3', name: 'Thiele Modulus & Internal Effectiveness Factor', pages: '113-118' }
  ]},

  // CH 5002: MT-II
  { id: 'ch5002-u1', subjectCode: 'ch5002', unitNumber: 1, unitName: 'Distillation Fundamentals', topics: [
    { id: 'ch5002-u1-t1', name: 'Vapor Liquid Equilibrium (VLE)', pages: '1-8' },
    { id: 'ch5002-u1-t2', name: 'Raoult\'s Law & Relative Volatility', pages: '9-14' },
    { id: 'ch5002-u1-t3', name: 'Flash Distillation', pages: '15-20' },
    { id: 'ch5002-u1-t4', name: 'Differential (Rayleigh) Distillation', pages: '21-25' }
  ]},
  { id: 'ch5002-u2', subjectCode: 'ch5002', unitNumber: 2, unitName: 'Continuous Distillation', topics: [
    { id: 'ch5002-u2-t1', name: 'Fractionation & Bubble Cap Column', pages: '26-32' },
    { id: 'ch5002-u2-t2', name: 'McCabe-Thiele Method', pages: '33-40' },
    { id: 'ch5002-u2-t3', name: 'Feed Line (q-line) & Thermal Conditions', pages: '41-48' },
    { id: 'ch5002-u2-t4', name: 'Reflux Ratio (Total, Minimum, Optimum)', pages: '49-55' }
  ]},
  { id: 'ch5002-u3', subjectCode: 'ch5002', unitNumber: 3, unitName: 'Liquid-Liquid Extraction', topics: [
    { id: 'ch5002-u3-t1', name: 'Ternary Liquid Equilibrium', pages: '56-60' },
    { id: 'ch5002-u3-t2', name: 'Triangular Coordinates', pages: '61-65' },
    { id: 'ch5002-u3-t3', name: 'Single Stage Extraction', pages: '66-70' }
  ]},
  { id: 'ch5002-u4', subjectCode: 'ch5002', unitNumber: 4, unitName: 'Solid-Liquid Extraction (Leaching)', topics: [
    { id: 'ch5002-u4-t1', name: 'Principles of Leaching', pages: '71-73' },
    { id: 'ch5002-u4-t2', name: 'Leaching Equipments (Rotocel, Kennedy)', pages: '74-78' }
  ]},

  // CH 5003: PC&I
  { id: 'ch5003-u1', subjectCode: 'ch5003', unitNumber: 1, unitName: 'Laplace Transforms', topics: [
    { id: 'ch5003-u1-t1', name: 'Definition and Properties', pages: '1-8' },
    { id: 'ch5003-u1-t2', name: 'Transforms of Standard Functions', pages: '9-15' },
    { id: 'ch5003-u1-t3', name: 'Inverse Laplace Transforms', pages: '16-20' }
  ]},
  { id: 'ch5003-u2', subjectCode: 'ch5003', unitNumber: 2, unitName: 'First Order Systems', topics: [
    { id: 'ch5003-u2-t1', name: 'Transfer Function Concept', pages: '21-25' },
    { id: 'ch5003-u2-t2', name: 'Liquid Level & Thermal Systems', pages: '26-32' },
    { id: 'ch5003-u2-t3', name: 'Response to Step, Ramp & Impulse Inputs', pages: '33-40' }
  ]},
  { id: 'ch5003-u3', subjectCode: 'ch5003', unitNumber: 3, unitName: 'Second Order Systems', topics: [
    { id: 'ch5003-u3-t1', name: 'Interacting & Non-Interacting Systems', pages: '41-48' },
    { id: 'ch5003-u3-t2', name: 'Overdamped, Underdamped & Critically Damped Responses', pages: '49-55' },
    { id: 'ch5003-u3-t3', name: 'Response characteristics (Overshoot, Decay Ratio)', pages: '56-62' }
  ]},
  { id: 'ch5003-u4', subjectCode: 'ch5003', unitNumber: 4, unitName: 'Controllers', topics: [
    { id: 'ch5003-u4-t1', name: 'P, I, D, PI, PD and PID Control', pages: '63-70' },
    { id: 'ch5003-u4-t2', name: 'Pneumatic and Electronic Controllers', pages: '71-76' }
  ]},
  { id: 'ch5003-u5', subjectCode: 'ch5003', unitNumber: 5, unitName: 'Closed Loop Systems & Stability', topics: [
    { id: 'ch5003-u5-t1', name: 'Block Diagram Reduction', pages: '77-80' },
    { id: 'ch5003-u5-t2', name: 'Servo & Regulatory Problems', pages: '81-84' }
  ]},

  // CH 50042: Energy Engineering
  { id: 'ch50042-u1', subjectCode: 'ch50042', unitNumber: 1, unitName: 'Energy Resources', topics: [
    { id: 'ch50042-u1-t1', name: 'Conventional & Non-Conventional Sources', pages: '1-8' },
    { id: 'ch50042-u1-t2', name: 'Energy Scenario in India', pages: '9-15' }
  ]},
  { id: 'ch50042-u2', subjectCode: 'ch50042', unitNumber: 2, unitName: 'Solid Fuels', topics: [
    { id: 'ch50042-u2-t1', name: 'Coal Origin, Ranking & Classification', pages: '16-22' },
    { id: 'ch50042-u2-t2', name: 'Proximate & Ultimate Analysis', pages: '23-30' },
    { id: 'ch50042-u2-t3', name: 'Carbonization of Coal', pages: '31-36' }
  ]},
  { id: 'ch50042-u3', subjectCode: 'ch50042', unitNumber: 3, unitName: 'Liquid Fuels', topics: [
    { id: 'ch50042-u3-t1', name: 'Petroleum Cracking (Thermal & Catalytic)', pages: '37-45' },
    { id: 'ch50042-u3-t2', name: 'Octane & Cetane Numbers', pages: '46-52' }
  ]},
  { id: 'ch50042-u4', subjectCode: 'ch50042', unitNumber: 4, unitName: 'Gaseous Fuels', topics: [
    { id: 'ch50042-u4-t1', name: 'Natural Gas, CNG, LPG', pages: '53-58' },
    { id: 'ch50042-u4-t2', name: 'Producer Gas & Water Gas', pages: '59-64' }
  ]},
  { id: 'ch50042-u5', subjectCode: 'ch50042', unitNumber: 5, unitName: 'Combustion Calculations', topics: [
    { id: 'ch50042-u5-t1', name: 'Calorific Values (GCV, NCV)', pages: '65-67' },
    { id: 'ch50042-u5-t2', name: 'Air Requirements & Flue Gas Analysis', pages: '68-70' }
  ]},

  // CH 50052: Safety
  { id: 'ch50052-u1', subjectCode: 'ch50052', unitNumber: 1, unitName: 'Introduction to Safety', topics: [
    { id: 'ch50052-u1-t1', name: 'Importance of Safety', pages: '1-3' },
    { id: 'ch50052-u1-t2', name: 'Accident and Loss Statistics', pages: '4-7' }
  ]},
  { id: 'ch50052-u2', subjectCode: 'ch50052', unitNumber: 2, unitName: 'Toxicology', topics: [
    { id: 'ch50052-u2-t1', name: 'Toxicants Entry Routes', pages: '8-10' },
    { id: 'ch50052-u2-t2', name: 'TLV, TWA, STEL Definitions', pages: '11-13' }
  ]},
  { id: 'ch50052-u3', subjectCode: 'ch50052', unitNumber: 3, unitName: 'Fires & Explosions', topics: [
    { id: 'ch50052-u3-t1', name: 'Fire Triangle, LFL & UFL', pages: '14-17' },
    { id: 'ch50052-u3-t2', name: 'BLEVE, VCE Definitions', pages: '18-19' }
  ]},
  { id: 'ch50052-u4', subjectCode: 'ch50052', unitNumber: 4, unitName: 'Hazard Identification', topics: [
    { id: 'ch50052-u4-t1', name: 'HAZOP Study Basics', pages: '20-21' },
    { id: 'ch50052-u4-t2', name: 'Personal Protective Equipment (PPE)', pages: '22-23' }
  ]},

  // CH 51001: Economic Policies
  { id: 'ch51001-u1', subjectCode: 'ch51001', unitNumber: 1, unitName: 'Features of Indian Economy', topics: [
    { id: 'ch51001-u1-t1', name: 'Developing Economy Characteristics', pages: '1-5' },
    { id: 'ch51001-u1-t2', name: 'National Income Concepts (GDP, GNP)', pages: '6-10' }
  ]},
  { id: 'ch51001-u2', subjectCode: 'ch51001', unitNumber: 2, unitName: 'Planning in India', topics: [
    { id: 'ch51001-u2-t1', name: 'Five Year Plans Objectives', pages: '11-14' },
    { id: 'ch51001-u2-t2', name: 'NITI Aayog vs Planning Commission', pages: '15-18' }
  ]},
  { id: 'ch51001-u3', subjectCode: 'ch51001', unitNumber: 3, unitName: 'Industrial Development', topics: [
    { id: 'ch51001-u3-t1', name: 'Industrial Policies (1991)', pages: '19-22' }
  ]},
  { id: 'ch51001-u4', subjectCode: 'ch51001', unitNumber: 4, unitName: 'Foreign Trade', topics: [
    { id: 'ch51001-u4-t1', name: 'FDI and FII', pages: '23-26' }
  ]}
];
