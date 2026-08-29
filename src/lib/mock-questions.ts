import { MockQuestion } from '@/types';

export const MOCK_QUESTIONS: MockQuestion[] = [
  // CH5001 - Chemical Reaction Engineering
  {
    id: 'cre-1',
    subjectCode: 'ch5001',
    unitNumber: 1,
    topicId: 'ch5001-u1-t4',
    question: 'According to the Arrhenius law, the rate constant k varies with absolute temperature T as:',
    options: ['k = A * exp(-Ea / RT)', 'k = A * exp(+Ea / RT)', 'k = A * T^n', 'k = A * ln(Ea / RT)'],
    correctIndex: 0,
    explanation: 'Arrhenius equation is k = A * exp(-Ea / RT), where Ea is activation energy, R is universal gas constant, and A is pre-exponential frequency factor.',
    examTag: 'BTER',
    yearTag: '2024',
    difficulty: 'Easy'
  },
  {
    id: 'cre-2',
    subjectCode: 'ch5001',
    unitNumber: 3,
    topicId: 'ch5001-u3-t3',
    question: 'For the same conversion of a first-order positive reaction, the volume of a CSTR compared to a PFR is always:',
    options: ['Smaller', 'Larger', 'Equal', 'Cannot be determined'],
    correctIndex: 1,
    explanation: 'For reactions with positive order (n > 0), CSTR operates at the lowest reactant concentration (exit concentration), hence requires a larger volume than PFR.',
    examTag: 'IOCL',
    yearTag: '2023',
    difficulty: 'Medium'
  },
  {
    id: 'cre-3',
    subjectCode: 'ch5001',
    unitNumber: 2,
    topicId: 'ch5001-u2-t1',
    question: 'The half-life period (t1/2) for a first-order reaction is:',
    options: ['Independent of initial concentration', 'Directly proportional to initial concentration', 'Inversely proportional to initial concentration', 'Proportional to square of concentration'],
    correctIndex: 0,
    explanation: 'For first order: t1/2 = ln(2) / k = 0.693 / k. It is independent of CA0.',
    examTag: 'BTER',
    yearTag: '2023',
    difficulty: 'Easy'
  },
  {
    id: 'cre-4',
    subjectCode: 'ch5001',
    unitNumber: 4,
    topicId: 'ch5001-u4-t1',
    question: 'The area under the Exit Age Distribution curve E(t) versus time t is equal to:',
    options: ['0', '1', 'Mean residence time', 'Variance'],
    correctIndex: 1,
    explanation: 'By definition of the normalized RTD function, integral from 0 to infinity of E(t) dt = 1.',
    examTag: 'HPCL',
    yearTag: '2024',
    difficulty: 'Medium'
  },
  {
    id: 'cre-5',
    subjectCode: 'ch5001',
    unitNumber: 5,
    topicId: 'ch5001-u5-t3',
    question: 'When the Thiele Modulus is very large (phi >> 1), the rate of reaction is controlled by:',
    options: ['Surface chemical reaction', 'Internal pore diffusion', 'External mass transfer', 'Thermal conduction'],
    correctIndex: 1,
    explanation: 'Large Thiele modulus signifies strong diffusion resistance inside catalyst pores (pore diffusion limited).',
    examTag: 'BARC',
    yearTag: '2024',
    difficulty: 'Hard'
  },

  // CH5002 - Mass Transfer-II
  {
    id: 'mt2-1',
    subjectCode: 'ch5002',
    unitNumber: 1,
    topicId: 'ch5002-u1-t2',
    question: 'When the relative volatility (alpha_AB) of a binary mixture is equal to 1.0, separation by simple distillation is:',
    options: ['Extremely easy', 'Impossible (Azeotrope formed)', 'Possible only at high reflux', 'Requires packed column only'],
    correctIndex: 1,
    explanation: 'If alpha = 1, the vapor and liquid compositions are identical (y = x), forming an azeotrope where separation by simple distillation is impossible.',
    examTag: 'BTER',
    yearTag: '2025',
    difficulty: 'Easy'
  },
  {
    id: 'mt2-2',
    subjectCode: 'ch5002',
    unitNumber: 2,
    topicId: 'ch5002-u2-t2',
    question: 'For a saturated liquid feed (bubble point liquid), the value of the thermal condition parameter q is:',
    options: ['q = 0', 'q = 1', '0 < q < 1', 'q > 1'],
    correctIndex: 1,
    explanation: 'For saturated liquid feed, q = 1 and the q-line is vertical (parallel to y-axis). For saturated vapor, q = 0.',
    examTag: 'IOCL',
    yearTag: '2024',
    difficulty: 'Easy'
  },
  {
    id: 'mt2-3',
    subjectCode: 'ch5002',
    unitNumber: 2,
    topicId: 'ch5002-u2-t1',
    question: 'At total reflux (R = infinity), the number of theoretical stages required for a given separation is:',
    options: ['Maximum', 'Minimum (N_min)', 'Infinite', 'Zero'],
    correctIndex: 1,
    explanation: 'At total reflux, operating lines coincide with the 45-degree diagonal, requiring the minimum number of theoretical stages (N_min, calculated by Fenske equation).',
    examTag: 'BTER',
    yearTag: '2024',
    difficulty: 'Medium'
  },
  {
    id: 'mt2-4',
    subjectCode: 'ch5002',
    unitNumber: 3,
    topicId: 'ch5002-u3-t2',
    question: 'In liquid-liquid extraction, the selectivity (beta) of a solvent must be:',
    options: ['Less than 1', 'Equal to 1', 'Greater than 1', 'Zero'],
    correctIndex: 2,
    explanation: 'Selectivity beta = (yA/yB)/(xA/xB). For effective separation, beta must be greater than 1 (higher beta = easier separation).',
    examTag: 'HPCL',
    yearTag: '2023',
    difficulty: 'Medium'
  },
  {
    id: 'mt2-5',
    subjectCode: 'ch5002',
    unitNumber: 5,
    topicId: 'ch5002-u5-t2',
    question: 'The Langmuir adsorption isotherm is based on the fundamental assumption that:',
    options: ['Multilayer adsorption occurs', 'Monolayer adsorption on uniform energy sites', 'Pore condensation dominates', 'Heat of adsorption increases with coverage'],
    correctIndex: 1,
    explanation: 'Langmuir assumes localized monolayer coverage on identical, homogeneous adsorption sites with no lateral interactions.',
    examTag: 'ONGC',
    yearTag: '2024',
    difficulty: 'Medium'
  },

  // CH5003 - Process Control & Instrumentation
  {
    id: 'pci-1',
    subjectCode: 'ch5003',
    unitNumber: 4,
    topicId: 'ch5003-u4-t2',
    question: 'Which control action eliminates steady-state error (offset) completely?',
    options: ['Proportional (P) action', 'Integral (I) action', 'Derivative (D) action', 'Feedforward only'],
    correctIndex: 1,
    explanation: 'Integral action integrates error over time, continuously adjusting the manipulated variable until offset becomes exactly zero.',
    examTag: 'BTER',
    yearTag: '2025',
    difficulty: 'Easy'
  },
  {
    id: 'pci-2',
    subjectCode: 'ch5003',
    unitNumber: 2,
    topicId: 'ch5003-u2-t1',
    question: 'The time constant (tau) of a first-order thermometer system is the time taken to reach:',
    options: ['50% of final response', '63.2% of final response', '95% of final response', '100% of final response'],
    correctIndex: 1,
    explanation: 'For a step input, y(t) = K*(1 - exp(-t/tau)). At t = tau, y(tau) = K*(1 - exp(-1)) = 0.632*K (63.2%).',
    examTag: 'BARC',
    yearTag: '2023',
    difficulty: 'Medium'
  },
  {
    id: 'pci-3',
    subjectCode: 'ch5003',
    unitNumber: 3,
    topicId: 'ch5003-u3-t2',
    question: 'A second-order system is underdamped and exhibits oscillatory response when the damping ratio (zeta) is:',
    options: ['zeta > 1', 'zeta = 1', '0 < zeta < 1', 'zeta = 0'],
    correctIndex: 2,
    explanation: 'When 0 < zeta < 1, the roots of the characteristic equation are complex conjugates, producing underdamped oscillatory behavior.',
    examTag: 'IOCL',
    yearTag: '2024',
    difficulty: 'Medium'
  },

  // CH50052 - Safety in Chemical Process Industries
  {
    id: 'saf-1',
    subjectCode: 'ch50052',
    unitNumber: 1,
    topicId: 'ch50052-u1-t1',
    question: 'In HAZOP analysis, the guide word "MORE" applied to the parameter "FLOW" indicates:',
    options: ['No flow in the pipeline', 'Reverse flow in the line', 'Higher flow rate than normal design', 'Contaminated flow'],
    correctIndex: 2,
    explanation: 'Guide word + Parameter = Deviation. "MORE" + "FLOW" = High Flow deviation (e.g., pump overspeed, valve stuck open).',
    examTag: 'BTER',
    yearTag: '2024',
    difficulty: 'Easy'
  },
  {
    id: 'saf-2',
    subjectCode: 'ch50052',
    unitNumber: 3,
    topicId: 'ch50052-u3-t1',
    question: 'The minimum oxygen concentration (MOC) is defined as:',
    options: ['Maximum oxygen level for human breathing', 'Lowest oxygen concentration to support combustion of flammable vapor', 'Oxygen percentage in flue gas', 'Oxygen level in confined spaces'],
    correctIndex: 1,
    explanation: 'MOC is the minimum oxygen percentage in a gas mixture below which a flame cannot propagate, regardless of fuel concentration.',
    examTag: 'HPCL',
    yearTag: '2024',
    difficulty: 'Medium'
  },

  // CH50042 - Energy Engineering
  {
    id: 'ee-1',
    subjectCode: 'ch50042',
    unitNumber: 1,
    topicId: 'ch50042-u1-t2',
    question: 'Proximate analysis of coal determines the percentage of:',
    options: ['Carbon, Hydrogen, Nitrogen, Sulfur', 'Moisture, Volatile Matter, Fixed Carbon, Ash', 'Calorific value and density', 'Carbon monoxide and carbon dioxide'],
    correctIndex: 1,
    explanation: 'Proximate analysis determines Moisture (M), Volatile Matter (VM), Ash (A), and Fixed Carbon (FC). Ultimate analysis gives C, H, N, S, O.',
    examTag: 'BTER',
    yearTag: '2025',
    difficulty: 'Easy'
  },
  {
    id: 'ee-2',
    subjectCode: 'ch50042',
    unitNumber: 4,
    topicId: 'ch50042-u4-t1',
    question: 'Theoretical air requirement for complete combustion of 1 kg of carbon to CO2 is approximately:',
    options: ['2.67 kg', '11.5 kg', '8.0 kg', '34.5 kg'],
    correctIndex: 1,
    explanation: 'C + O2 -> CO2. 12 kg C needs 32 kg O2 => 1 kg C needs 2.67 kg O2. Air has 23.2% O2 by wt => 2.67 / 0.232 = 11.5 kg of air.',
    examTag: 'IOCL',
    yearTag: '2023',
    difficulty: 'Hard'
  }
];
