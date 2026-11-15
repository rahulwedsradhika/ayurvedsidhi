export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  examTarget: string;
  membershipPlan: string;
  isPremium: boolean;
}

export interface Lecture {
  id: number;
  title: string;
  hindiTitle?: string;
  duration: string;
  durationSeconds: number;
  speaker: string;
  mediaType: "video" | "audio";
  mediaUrl: string;
  thumbnail: string;
  subject: string;
  chapter: string;
  isDemo: boolean;
  notesPdf?: string;
  overview?: string;
}

export interface CourseModule {
  name: string;
  description: string;
  icon: string;
  lectureCount: number;
  lectures: Lecture[];
}

export interface Course {
  id: string;
  title: string;
  subTitle: string;
  targetExam: "aiapget" | "upsc" | "state_psc" | "revision";
  year: string;
  badge: string;
  banner: string;
  coverImage: string;
  totalLectures: number;
  totalAudio: number;
  totalQuestions: number;
  totalTests: number;
  description: string;
  features: string[];
  modules: CourseModule[];
}

export interface Sthana {
  id: number;
  name: string;
  chapters: number;
  description: string;
}

export interface Samhita {
  id: number;
  name: string;
  hindiName: string;
  author: string;
  icon: string;
  totalChapters: number;
  totalQuestions: number;
  sthanas: Sthana[];
  questions?: Question[];
}

export interface Question {
  id: number;
  Q: string;
  O1: string;
  O2: string;
  O3: string;
  O4: string;
  A: number;
  UA?: number | string;
  B: string;
  sam_id: number;
  sam: string;
  sth_id: number;
  sth: string;
  sub_id: number;
  sub: string;
  com: string;
  note?: { notes: string }[];
}

export interface Quiz {
  id: number;
  name: string;
  sub: string;
  m: number;
  q: number;
  qt: number;
  w: number;
  p: boolean;
  d: string;
  pt: string;
  uuid: string | null;
  r: boolean;
  pm: number;
  nm: number;
  mode: "daily" | "mock" | "rapid" | "pre_entrance";
  category?: string;
  questionIds: number[];
  questions?: Question[];
}

export interface QuizResult {
  uuid: string;
  quizId: number;
  quizName: string;
  score: number;
  total: number;
  percentage: number;
  solvedAt: string;
  userAnswers: Record<number, number>;
}

export interface WalletData {
  points: number;
  history: { date: string; description: string; points: number }[];
}

export interface ScorecardData {
  totalAttempted: number;
  correctCount: number;
  incorrectCount: number;
  accuracy: number;
  walletPoints: number;
  recentAttempts: {
    questionId: number;
    questionText: string;
    samhita: string;
    isCorrect: boolean;
    timeTaken: string;
    timestamp: number;
  }[];
  testHistory: QuizResult[];
}

export interface DiagnosticsData {
  environment: {
    mode: string;
    localDevNoLogin: boolean;
    port: number | string;
    timestamp: string;
  };
  services: {
    frontend: { status: string; host: string; kind: string };
    localBackendAdapter: { status: string; host: string; kind: string };
    upstreamAyurQuest: { status: string; origin: string; baseApp: string; kind: string };
    mediaDelivery: { status: string; provider: string; embedUrl: string; kind: string };
  };
  catalogStatus: {
    courses: { total: number; kind: string };
    samhitas: { total: number; kind: string };
    questions: { total: number; kind: string };
    quizzes: { total: number; kind: string };
  };
  userState: {
    localIdentity: User;
    bookmarksCount: number;
    notesCount: number;
    attemptsCount: number;
    completedTests: number;
  };
}

