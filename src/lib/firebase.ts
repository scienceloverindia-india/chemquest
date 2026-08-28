// Firebase Configuration & Offline-First Sync Layer for ChemQuest

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  college: string;
  semester: string;
  targetPsu: string;
  streakDays: number;
  completedTopics: string[];
  solvedPyqs: string[];
  mockTestScores: {
    testId: string;
    testName: string;
    score: number;
    total: number;
    date: string;
  }[];
  bookmarkedFormulas: string[];
}

export const DEFAULT_PROFILE: UserProfile = {
  uid: 'student-local',
  name: 'Diploma Chemical Engineer',
  email: 'student@polytechnic.bikaner.ac.in',
  college: 'Government Polytechnic College, Bikaner',
  semester: 'V Semester (Session 2025-26)',
  targetPsu: 'IOCL / HPCL / BARC',
  streakDays: 7,
  completedTopics: ['ch5002-u1-t1', 'ch5002-u1-t2'],
  solvedPyqs: ['ch5002-2024', 'ch5001-2025'],
  mockTestScores: [
    { testId: 'psu-1', testName: 'IOCL Junior Engineer Speed Test', score: 42, total: 50, date: '2026-08-28' }
  ],
  bookmarkedFormulas: ['Arrhenius Equation', 'Relative Volatility', 'q-line Equation']
};

export const getStoredProfile = (): UserProfile => {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  const data = localStorage.getItem('chemquest_user_profile');
  if (!data) return DEFAULT_PROFILE;
  try {
    return JSON.parse(data);
  } catch {
    return DEFAULT_PROFILE;
  }
};

export const saveStoredProfile = (profile: UserProfile): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('chemquest_user_profile', JSON.stringify(profile));
};
