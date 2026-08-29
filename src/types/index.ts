// ChemQuest Master Domain Models

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

export interface Topic {
  id: string;
  subjectCode: string;
  unitNumber: number;
  unitName: string;
  name: string;
  pages: string;
  masterNotesSummary?: string;
  keyFormulas?: string[];
  psuRelevance?: 'Critical' | 'High' | 'Medium';
  pyqAppearances?: string[];
}

export interface MockQuestion {
  id: string;
  subjectCode: string;
  unitNumber: number;
  topicId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  examTag: 'BTER' | 'IOCL' | 'HPCL' | 'BARC' | 'ONGC' | 'GENERAL_PSU';
  yearTag?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Flashcard {
  id: string;
  subjectCode: string;
  unitNumber: number;
  topicName: string;
  front: string;
  back: string;
  formula?: string;
  importance: 'high' | 'medium' | 'low';
}

export interface TestAttempt {
  id: string;
  testId: string;
  testName: string;
  timestamp: string;
  mode: 'BTER' | 'PSU_SPEED' | 'SUBJECT_QUIZ';
  score: number;
  totalMarks: number;
  accuracy: number;
  timeSpentSeconds: number;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  weakTopics: { topicId: string; topicName: string; subjectCode: string }[];
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  college: string;
  semester: string;
  targetPsu: string;
  streakDays: number;
  lastActiveDate: string;
  completedTopicIds: string[];
  solvedPyqIds: string[];
  testAttempts: TestAttempt[];
  flashcardReviewDates: Record<string, string>; // cardId -> nextReviewDate
  bookmarkedTopicIds: string[];
}
