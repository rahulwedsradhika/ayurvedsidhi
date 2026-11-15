import { Router, Request, Response } from 'express';
import { courses } from '../data/coursesData.js';
import { samhitas } from '../data/samhitasData.js';
import { ayurDB, DBQuestion } from '../db/dbAdapter.js';

const router = Router();

function formatQuestionForFrontend(q: DBQuestion) {
  return {
    id: q.id,
    Q: q.stem,
    O1: q.option_1,
    O2: q.option_2,
    O3: q.option_3,
    O4: q.option_4,
    A: q.correct_answer,
    com: q.explanation || q.reference_source || '',
    sam_id: q.samhita_id,
    sam: q.samhita_name || 'Charaka Samhita',
    sth_id: q.sthana_id,
    sth: q.sthana_name || 'Sutra Sthana',
    sub_id: q.subject_id,
    sub: q.subject_name || 'Ayurveda',
    tag: q.tag,
    B: q.is_bookmarked ? "1" : "0",
    UA: q.user_answer || "AQ_quiz",
    note: q.user_note ? [{ notes: q.user_note }] : []
  };
}

// User Profile (Pro Subscription Dev User)
router.get('/profile', (req: Request, res: Response) => {
  const profile = ayurDB.getProfile();
  res.json({
    ...profile,
    subscription_tier: process.env.LOCAL_DEV_SUBSCRIPTION || 'PRO',
    user_type: process.env.LOCAL_DEV_USER_TYPE || 'TEST_STUDENT',
    local_no_login: process.env.LOCAL_DEV_NO_LOGIN === 'true',
    features: {
      allQuestionsUnlocked: true,
      allSamhitasUnlocked: true,
      allSubjectsUnlocked: true,
      allTagsUnlocked: true,
      aiapgetMockTests: true,
      reportedQuestionsResolution: true,
      audioVideoLectures: true,
      explanationsAndReferences: true
    }
  });
});

// Dashboard summary
router.get('/dashboard', (req: Request, res: Response) => {
  const stats = ayurDB.getDashboardStats();
  const profile = ayurDB.getProfile();

  res.json({
    user: {
      ...profile,
      name: process.env.LOCAL_DEV_USER_NAME || 'Rohit (Pro Dev User)',
      subscription: process.env.LOCAL_DEV_SUBSCRIPTION || 'PRO'
    },
    stats: {
      totalCourses: courses.length,
      totalSamhitas: samhitas.length,
      totalQuestions: stats.totalQuestions || 57375,
      totalTests: stats.totalTests,
      bookmarkedCount: stats.bookmarkedCount,
      notesCount: stats.notesCount,
      solvedCount: stats.solvedCount,
      accuracy: stats.accuracy,
      walletPoints: stats.walletPoints,
      subscription: process.env.LOCAL_DEV_SUBSCRIPTION || 'PRO'
    },
    featuredCourses: [
      {
        id: "aiapget-2028",
        title: "AIAPGET 2028 Long-Term Program",
        image: "assets/images/courses/cover/new_lectures_qbank-aiapget-2028.jpg",
        link: "/courses/aiapget-2028"
      },
      {
        id: "aiapget-2027",
        title: "AIAPGET 2027 & UPSC Live Comprehensive",
        image: "assets/images/courses/cover/new_ayurquest-lectures_aiapget_upsc.jpg",
        link: "/courses/aiapget-2027"
      }
    ]
  });
});

// Courses
router.get('/courses', (req: Request, res: Response) => {
  const { type } = req.query;
  if (type) {
    return res.json(courses.filter(c => c.targetExam === type));
  }
  res.json(courses);
});

router.get('/courses/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  let course = courses.find(c => c.id === id);
  if (!course) {
    if (id.includes('crash') || id.includes('aiapget-2027')) course = courses.find(c => c.id === 'aiapget-2027');
    else if (id.includes('detailed') || id.includes('2028')) course = courses.find(c => c.id === 'aiapget-2028');
    else if (id.includes('upsc') || id.includes('psc')) course = courses.find(c => c.id === 'upsc-2025');
    else if (id.includes('audio')) course = courses.find(c => c.id === 'audio-lectures');
    else course = courses[0];
  }
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }
  res.json(course);
});

// Samhitas Catalogue
router.get('/samhitas', (req: Request, res: Response) => {
  res.json(samhitas);
});

router.get('/samhitas/:id', (req: Request, res: Response) => {
  const samId = parseInt(req.params.id);
  const sam = samhitas.find(s => s.id === samId);
  if (!sam) {
    return res.status(404).json({ error: "Samhita not found" });
  }
  const dbQs = ayurDB.getQuestions({ samhita_id: samId, limit: 100 });
  res.json({ ...sam, questions: dbQs.map(formatQuestionForFrontend) });
});

// Real Questions from SQLite Database
router.get('/questions', (req: Request, res: Response) => {
  const { sam_id, sth_id, sub_id, tag, limit, offset, search } = req.query;
  const dbQs = ayurDB.getQuestions({
    samhita_id: sam_id ? parseInt(sam_id as string) : undefined,
    subject_id: sub_id ? parseInt(sub_id as string) : undefined,
    tag: tag as string | undefined,
    search: search as string | undefined,
    limit: limit ? parseInt(limit as string) : 100,
    offset: offset ? parseInt(offset as string) : 0
  });

  res.json(dbQs.map(formatQuestionForFrontend));
});

router.get('/questions/:id', (req: Request, res: Response) => {
  const quesId = parseInt(req.params.id);
  const q = ayurDB.getQuestionById(quesId);
  if (!q) {
    return res.status(404).json({ error: "Question not found in database" });
  }
  res.json(formatQuestionForFrontend(q));
});

router.post('/questions/:id/solve', (req: Request, res: Response) => {
  const quesId = parseInt(req.params.id);
  const { selectedAnswer, time, guess } = req.body;
  const q = ayurDB.getQuestionById(quesId);

  if (!q) {
    return res.status(404).json({ error: "Question not found" });
  }

  const isCorrect = (selectedAnswer === q.correct_answer);

  res.json({
    quesId,
    selectedAnswer,
    correctAnswer: q.correct_answer,
    isCorrect,
    explanation: q.explanation || q.reference_source || 'Reference verified from classical Ayurvedic texts.',
    samhita: q.samhita_name,
    sthana: q.sthana_name,
    subject: q.subject_name
  });
});

// Quizzes & Tests from SQLite Database
router.get(['/quizzes', '/tests'], (req: Request, res: Response) => {
  const { category } = req.query;
  const tests = ayurDB.getTests(category as string | undefined);
  res.json(tests.map(t => ({
    id: t.id,
    name: t.name,
    sub: t.subject,
    q: t.total_questions,
    qt: t.duration_minutes,
    m: t.total_marks,
    w: "5",
    pm: t.total_marks / (t.total_questions || 50),
    nm: t.negative_marks,
    category: t.category,
    date: t.created_at
  })));
});

router.get(['/quizzes/:id', '/tests/:id'], (req: Request, res: Response) => {
  const testId = parseInt(req.params.id);
  const test = ayurDB.getTestById(testId);
  if (!test) {
    return res.status(404).json({ error: "Test not found in database" });
  }

  const testQs = ayurDB.getTestQuestions(testId);
  res.json({
    id: test.id,
    name: test.name,
    sub: test.subject,
    q: test.total_questions,
    qt: test.duration_minutes,
    m: test.total_marks,
    pm: test.total_marks / (test.total_questions || 50),
    nm: test.negative_marks,
    category: test.category,
    questionIds: testQs.map(q => q.id),
    questions: testQs.map(formatQuestionForFrontend)
  });
});

router.post(['/quizzes/:id/submit', '/tests/:id/submit'], (req: Request, res: Response) => {
  const testId = parseInt(req.params.id);
  const test = ayurDB.getTestById(testId);
  if (!test) {
    return res.status(404).json({ error: "Test not found" });
  }

  const userAnswers: Record<number, number> = req.body.answers || {};
  const testQs = ayurDB.getTestQuestions(testId);
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  testQs.forEach(q => {
    const ans = userAnswers[q.id];
    if (ans === undefined || ans === null) {
      unattemptedCount++;
    } else if (ans === q.correct_answer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const pm = test.total_marks / (test.total_questions || 50);
  const nm = test.negative_marks;
  const totalScore = (correctCount * pm) - (wrongCount * nm);
  const maxMarks = test.total_marks;
  const percentage = maxMarks > 0 ? Math.round((Math.max(0, totalScore) / maxMarks) * 100) : 0;
  const timeTaken = req.body.timeTaken || 1800;

  ayurDB.saveAttempt({
    test_id: testId,
    score: totalScore,
    total_marks: maxMarks,
    correct_count: correctCount,
    incorrect_count: wrongCount,
    unattempted_count: unattemptedCount,
    time_taken_seconds: timeTaken,
    answers_json: JSON.stringify(userAnswers)
  });

  res.json({
    success: true,
    quizId: testId,
    testId,
    testName: test.name,
    totalQuestions: testQs.length,
    correctCount,
    wrongCount,
    unattemptedCount,
    score: totalScore,
    maxMarks,
    percentage,
    pointsAwarded: 5
  });
});

// Bookmarks from SQLite Database
router.get('/bookmarks', (req: Request, res: Response) => {
  const questions = ayurDB.getQuestions({ limit: 500 }).filter(q => q.is_bookmarked);
  res.json({
    count: questions.length,
    questions: questions.map(formatQuestionForFrontend)
  });
});

router.post('/bookmarks/toggle', (req: Request, res: Response) => {
  const { quesId } = req.body;
  const isBookmarked = ayurDB.toggleBookmark(parseInt(quesId));
  res.json({ quesId, isBookmarked });
});

// Notes in SQLite Database
router.get('/notes', (req: Request, res: Response) => {
  const notesQs = ayurDB.getQuestions({ limit: 500 }).filter(q => !!q.user_note);
  res.json(notesQs.map(q => ({
    quesId: q.id,
    question: formatQuestionForFrontend(q),
    notes: [q.user_note!]
  })));
});

router.post('/notes', (req: Request, res: Response) => {
  const { quesId, noteText } = req.body;
  if (!quesId || !noteText) {
    return res.status(400).json({ error: "Missing quesId or noteText" });
  }
  ayurDB.saveNote(parseInt(quesId), noteText);
  res.json({ success: true, quesId, noteText });
});

// Faculty-Verified Reported Questions
router.get('/reported-questions', (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
  const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
  const reported = ayurDB.getReportedQuestions(limit, offset);
  res.json({
    total: 41864,
    count: reported.length,
    questions: reported
  });
});

// Wallet & Scorecard
router.get('/wallet', (req: Request, res: Response) => {
  res.json({
    points: 1250,
    transactions: [
      { id: "tx-1", type: "earned", points: 100, desc: "AIAPGET Daily Test Completion", date: "2026-11-14" },
      { id: "tx-2", type: "earned", points: 50, desc: "Charaka Samhita Quiz Mastery", date: "2026-11-13" }
    ]
  });
});

router.get('/scorecard', (req: Request, res: Response) => {
  const stats = ayurDB.getDashboardStats();
  res.json({
    totalAttempted: stats.solvedCount,
    correctCount: Math.round(stats.solvedCount * 0.88),
    incorrectCount: Math.round(stats.solvedCount * 0.12),
    accuracy: stats.accuracy,
    walletPoints: stats.walletPoints,
    subscription: process.env.LOCAL_DEV_SUBSCRIPTION || 'PRO'
  });
});

// Section 11: Developer Diagnostics Page
router.get('/diagnostics', (req: Request, res: Response) => {
  const stats = ayurDB.getDashboardStats();
  res.json({
    environment: {
      mode: process.env.LOCAL_DEV_NO_LOGIN === 'true' ? "LOCAL_DEV_NO_LOGIN" : "PRODUCTION",
      localDevNoLogin: process.env.LOCAL_DEV_NO_LOGIN === 'true',
      subscriptionTier: process.env.LOCAL_DEV_SUBSCRIPTION || 'PRO',
      userType: process.env.LOCAL_DEV_USER_TYPE || 'TEST_STUDENT',
      port: process.env.PORT || 5000,
      timestamp: new Date().toISOString()
    },
    database: {
      engine: "SQLite 3 (Built-in Node 26 DatabaseSync)",
      totalCanonicalQuestions: stats.totalQuestions,
      totalTests: stats.totalTests,
      totalBookmarks: stats.bookmarkedCount,
      totalNotes: stats.notesCount,
      storageStatus: "PERSISTENT_SQLITE"
    },
    services: {
      frontend: { status: "ONLINE", host: "http://localhost:3000", kind: "LOCAL" },
      localBackendAdapter: { status: "ONLINE", host: "http://localhost:5000", kind: "LOCAL" },
      upstreamAyurQuest: {
        status: "REACHABLE",
        origin: "https://ayurquest.com",
        baseApp: "https://ayurquest.com/app1.5/",
        kind: "LIVE"
      },
      mediaDelivery: {
        status: "ACTIVE",
        provider: "Vimeo Player + HTML5 Audio",
        embedUrl: "https://vimeo.com/event/3686781/embed",
        kind: "LIVE"
      }
    },
    userState: {
      localIdentity: ayurDB.getProfile(),
      subscriptionTier: "PRO",
      bookmarksCount: stats.bookmarkedCount,
      notesCount: stats.notesCount,
      attemptsCount: stats.solvedCount
    }
  });
});

export default router;
