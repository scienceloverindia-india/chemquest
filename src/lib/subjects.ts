export interface Subject {
  code: string;
  number: string;
  name: string;
  shortName: string;
  category: string;
  color: string;
  masterPages: number;
  units: number;
  masterFile: string;
  secondaryFiles: { name: string; path: string; description: string }[];
  pyqYears: number[];
  psuHits: number;
  keyTopics: string[];
  unitNames: string[];
}

export const SUBJECTS: Subject[] = [
  {
    code: 'ch5001',
    number: 'CH 5001',
    name: 'Chemical Reaction Engineering',
    shortName: 'CRE',
    category: 'Professional Core',
    color: 'rose',
    masterPages: 118,
    units: 5,
    masterFile: '/notes/ch5001/master.pdf',
    secondaryFiles: [
      { name: 'Graphical Methods', path: '/notes/ch5001/graphical.pdf', description: 'Graphical solutions for CRE problems' }
    ],
    pyqYears: [2022, 2023, 2024, 2025],
    psuHits: 305,
    keyTopics: ['Arrhenius', 'CSTR/PFR', 'RTD', 'Catalyst'],
    unitNames: ['Kinetics of Homogeneous Reactions', 'Interpretation of Batch Reactor Data', 'Ideal Reactors', 'Non-Ideal Reactors', 'Heterogeneous Catalysis']
  },
  {
    code: 'ch5002',
    number: 'CH 5002',
    name: 'Mass Transfer-II',
    shortName: 'MT-II',
    category: 'Professional Core',
    color: 'blue',
    masterPages: 78,
    units: 5,
    masterFile: '/notes/ch5002/master.pdf',
    secondaryFiles: [
      { name: 'Karan Notes', path: '/notes/ch5002/karan.pdf', description: 'Handwritten notes by Karan' }
    ],
    pyqYears: [2022, 2023, 2024, 2025],
    psuHits: 280,
    keyTopics: ['Distillation', 'McCabe-Thiele', 'Extraction', 'Adsorption'],
    unitNames: ['Distillation Fundamentals', 'Continuous Distillation', 'Liquid-Liquid Extraction', 'Solid-Liquid Extraction (Leaching)', 'Adsorption & Ion Exchange']
  },
  {
    code: 'ch5003',
    number: 'CH 5003',
    name: 'Process Control & Instrumentation',
    shortName: 'PC&I',
    category: 'Professional Core',
    color: 'amber',
    masterPages: 84,
    units: 5,
    masterFile: '/notes/ch5003/master.pdf',
    secondaryFiles: [
      { name: 'Digital Notes', path: '/notes/ch5003/digital.pdf', description: 'Typed digital notes with diagrams' }
    ],
    pyqYears: [2022, 2023, 2024, 2025],
    psuHits: 250,
    keyTopics: ['Laplace Transforms', 'Transfer Functions', 'PID Control', 'Stability'],
    unitNames: ['Laplace Transforms & Fundamentals', 'First Order Systems', 'Second Order & Complex Systems', 'Controllers & Final Control Elements', 'Closed Loop Systems & Stability']
  },
  {
    code: 'ch50042',
    number: 'CH 50042',
    name: 'Energy Engineering',
    shortName: 'EE',
    category: 'Professional Elective',
    color: 'orange',
    masterPages: 70,
    units: 5,
    masterFile: '/notes/ch50042/master.pdf',
    secondaryFiles: [],
    pyqYears: [2022, 2023, 2024, 2025],
    psuHits: 150,
    keyTopics: ['Solid Fuels', 'Liquid Fuels', 'Gaseous Fuels', 'Combustion Calculations'],
    unitNames: ['Introduction to Energy Resources', 'Solid Fuels', 'Liquid Fuels', 'Gaseous Fuels', 'Combustion Calculations']
  },
  {
    code: 'ch50052',
    number: 'CH 50052',
    name: 'Safety in Chemical Process Industries',
    shortName: 'Safety',
    category: 'Professional Elective',
    color: 'red',
    masterPages: 23,
    units: 5,
    masterFile: '/notes/ch50052/master.pdf',
    secondaryFiles: [],
    pyqYears: [2022, 2023, 2024, 2025],
    psuHits: 190,
    keyTopics: ['Hazards', 'Toxicology', 'Fire & Explosion', 'Relief Systems'],
    unitNames: ['Introduction to Safety & Hazards', 'Toxicology & Industrial Hygiene', 'Fires & Explosions', 'Designs to Prevent Fires & Explosions', 'Hazard Identification & Risk Assessment']
  },
  {
    code: 'ch51001',
    number: 'CH 51001',
    name: 'Economic Policies in India',
    shortName: 'Eco',
    category: 'Open Elective',
    color: 'teal',
    masterPages: 26,
    units: 5,
    masterFile: '/notes/ch51001/master.pdf',
    secondaryFiles: [],
    pyqYears: [2022, 2023, 2024, 2025],
    psuHits: 85,
    keyTopics: ['Indian Economy', 'Five Year Plans', 'Industrial Policies', 'FDI'],
    unitNames: ['Basic Features of Indian Economy', 'Planning in India', 'Agriculture & Rural Development', 'Industrial Development', 'Foreign Trade & Investment']
  }
];
