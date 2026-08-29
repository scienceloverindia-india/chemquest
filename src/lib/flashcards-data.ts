import { Flashcard } from '@/types';

export const FLASHCARDS: Flashcard[] = [
  // CRE
  {
    id: 'fc-1',
    subjectCode: 'ch5001',
    unitNumber: 1,
    topicName: 'Arrhenius Equation',
    front: 'What is the Arrhenius Equation and what does it signify?',
    back: 'It describes temperature dependency of reaction rate constant k.',
    formula: 'k = A * e^(-Ea / RT)',
    importance: 'high'
  },
  {
    id: 'fc-2',
    subjectCode: 'ch5001',
    unitNumber: 3,
    topicName: 'CSTR Design Equation',
    front: 'State the design equation for a Continuous Stirred Tank Reactor (CSTR).',
    back: 'Volume V relates to molar feed rate FA0, conversion XA, and rate at exit -rA.',
    formula: 'V = (F_A0 * X_A) / (-r_A)',
    importance: 'high'
  },
  {
    id: 'fc-3',
    subjectCode: 'ch5001',
    unitNumber: 3,
    topicName: 'PFR Design Equation',
    front: 'State the performance equation for a Plug Flow Reactor (PFR).',
    back: 'Volume V is obtained by integrating dXA / -rA from 0 to XA.',
    formula: 'V = F_A0 * \\int_0^{X_A} \\frac{dX_A}{-r_A}',
    importance: 'high'
  },
  {
    id: 'fc-4',
    subjectCode: 'ch5001',
    unitNumber: 4,
    topicName: 'RTD Mean Residence Time',
    front: 'How is mean residence time (t_mean) computed from RTD curve E(t)?',
    back: 'First moment of E(t) curve.',
    formula: '\\bar{t} = \\int_0^{\\infty} t \\cdot E(t) dt',
    importance: 'medium'
  },

  // MT-II
  {
    id: 'fc-5',
    subjectCode: 'ch5002',
    unitNumber: 1,
    topicName: 'Relative Volatility',
    front: 'What is Relative Volatility (alpha) and its equilibrium relation with x and y?',
    back: 'Ratio of vapor-liquid distribution ratios of MVC to LVC.',
    formula: 'y = \\frac{\\alpha x}{1 + (\\alpha - 1)x}',
    importance: 'high'
  },
  {
    id: 'fc-6',
    subjectCode: 'ch5002',
    unitNumber: 1,
    topicName: 'Rayleigh Equation',
    front: 'State the Rayleigh equation for differential batch distillation.',
    back: 'Relates initial and final pot charge (W0, W) to liquid compositions (xF, xW).',
    formula: '\\ln\\left(\\frac{W}{W_0}\\right) = \\int_{x_F}^{x_W} \\frac{dx}{y^* - x}',
    importance: 'high'
  },
  {
    id: 'fc-7',
    subjectCode: 'ch5002',
    unitNumber: 2,
    topicName: 'q-line Equation',
    front: 'State the equation for the feed condition line (q-line) in McCabe-Thiele method.',
    back: 'q = heat to vaporize 1 mole of feed / molar latent heat.',
    formula: 'y = \\frac{q}{q-1}x - \\frac{z_F}{q-1}',
    importance: 'high'
  },
  {
    id: 'fc-8',
    subjectCode: 'ch5002',
    unitNumber: 2,
    topicName: 'Rectifying Operating Line',
    front: 'State the operating line equation for the rectifying (enriching) section.',
    back: 'Slope is R/(R+1), y-intercept is xD/(R+1).',
    formula: 'y_{n+1} = \\frac{R}{R+1}x_n + \\frac{x_D}{R+1}',
    importance: 'high'
  },

  // PC&I
  {
    id: 'fc-9',
    subjectCode: 'ch5003',
    unitNumber: 4,
    topicName: 'PID Controller Equation',
    front: 'What is the standard ideal PID controller transfer function Gc(s)?',
    back: 'Combines proportional gain Kc, integral time tau_I, and derivative time tau_D.',
    formula: 'G_c(s) = K_c \\left(1 + \\frac{1}{\\tau_I s} + \\tau_D s\\right)',
    importance: 'high'
  },
  {
    id: 'fc-10',
    subjectCode: 'ch5003',
    unitNumber: 2,
    topicName: 'First Order Time Constant',
    front: 'What is the physical meaning of time constant (tau) in a first-order system?',
    back: 'Time required for the system output to reach 63.2% of its total ultimate steady-state change following a step input.',
    formula: 'y(\\tau) = K_p (1 - e^{-1}) \\approx 0.632 K_p',
    importance: 'high'
  },

  // Safety
  {
    id: 'fc-11',
    subjectCode: 'ch50052',
    unitNumber: 1,
    topicName: 'HAZOP Guide Words',
    front: 'List the 7 standard guide words used in HAZOP study.',
    back: '1. NO (None) 2. MORE (High) 3. LESS (Low) 4. AS WELL AS 5. PART OF 6. REVERSE 7. OTHER THAN',
    importance: 'high'
  },
  {
    id: 'fc-12',
    subjectCode: 'ch50052',
    unitNumber: 3,
    topicName: 'Flammability Limits (LEL & UEL)',
    front: 'What are Lower Explosive Limit (LEL) and Upper Explosive Limit (UEL)?',
    back: 'LEL: Minimum volume % of vapor in air below which flame cannot ignite (too lean). UEL: Maximum volume % above which mixture cannot ignite (too rich).',
    importance: 'high'
  }
];
