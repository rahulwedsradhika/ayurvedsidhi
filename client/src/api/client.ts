import {
  Course,
  Samhita,
  Question,
  Quiz,
  ScorecardData,
  WalletData,
  DiagnosticsData,
  User
} from '../types';

export const API_BASE = '/api';

export const api = {
  async getDashboard(): Promise<{
    user: User;
    stats: any;
    featuredCourses: any[];
  }> {
    const res = await fetch(`${API_BASE}/dashboard`);
    if (!res.ok) throw new Error('Failed to load dashboard');
    return res.json();
  },

  async getCourses(type?: string): Promise<Course[]> {
    const url = type ? `${API_BASE}/courses?type=${type}` : `${API_BASE}/courses`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load courses');
    return res.json();
  },

  async getCourse(id: string): Promise<Course> {
    const res = await fetch(`${API_BASE}/courses/${id}`);
    if (!res.ok) throw new Error('Failed to load course details');
    return res.json();
  },

  async getSamhitas(): Promise<Samhita[]> {
    const res = await fetch(`${API_BASE}/samhitas`);
    if (!res.ok) throw new Error('Failed to load samhitas');
    return res.json();
  },

  async getSamhita(id: number): Promise<Samhita> {
    const res = await fetch(`${API_BASE}/samhitas/${id}`);
    if (!res.ok) throw new Error('Failed to load samhita details');
    return res.json();
  },

  async getQuestions(params?: {
    sam_id?: number;
    samhita_name?: string;
    sth_id?: number;
    sub_id?: number;
    subject_name?: string;
    tag?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<Question[]> {
    const query = new URLSearchParams();
    if (params?.sam_id) query.set('sam_id', params.sam_id.toString());
    if (params?.samhita_name) query.set('samhita_name', params.samhita_name);
    if (params?.sth_id) query.set('sth_id', params.sth_id.toString());
    if (params?.sub_id) query.set('sub_id', params.sub_id.toString());
    if (params?.subject_name) query.set('subject_name', params.subject_name);
    if (params?.tag) query.set('tag', params.tag);
    if (params?.search) query.set('search', params.search);
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.offset) query.set('offset', params.offset.toString());

    const res = await fetch(`${API_BASE}/questions?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to load questions');
    return res.json();
  },

  async getSubjectStats(): Promise<{ subject_name: string; count: number; subject_id: number }[]> {
    const res = await fetch(`${API_BASE}/stats/subjects`);
    if (!res.ok) throw new Error('Failed to load subject stats');
    return res.json();
  },

  async getSamhitaStats(): Promise<{ samhita_name: string; count: number; samhita_id: number }[]> {
    const res = await fetch(`${API_BASE}/stats/samhitas`);
    if (!res.ok) throw new Error('Failed to load samhita stats');
    return res.json();
  },

  async solveQuestion(
    quesId: number,
    selectedAnswer: number,
    time = '10s',
    guess = false
  ): Promise<{
    quesId: number;
    selectedAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
    explanation: string;
    samhita: string;
    sthana: string;
    subject: string;
  }> {
    const res = await fetch(`${API_BASE}/questions/${quesId}/solve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedAnswer, time, guess }),
    });
    if (!res.ok) throw new Error('Failed to solve question');
    return res.json();
  },

  async toggleBookmark(quesId: number): Promise<boolean> {
    const res = await fetch(`${API_BASE}/bookmarks/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quesId }),
    });
    if (!res.ok) throw new Error('Failed to toggle bookmark');
    const data = await res.json();
    return data.isBookmarked;
  },

  async getBookmarks(): Promise<{ count: number; questions: Question[] }> {
    const res = await fetch(`${API_BASE}/bookmarks`);
    if (!res.ok) throw new Error('Failed to load bookmarks');
    return res.json();
  },

  async getNotes(): Promise<{ quesId: number; question: Question; notes: string[] }[]> {
    const res = await fetch(`${API_BASE}/notes`);
    if (!res.ok) throw new Error('Failed to load notes');
    return res.json();
  },

  async addNote(quesId: number, noteText: string): Promise<{ success: boolean; notes: string[] }> {
    const res = await fetch(`${API_BASE}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quesId, noteText }),
    });
    if (!res.ok) throw new Error('Failed to add note');
    return res.json();
  },

  async getQuizzes(mode?: string): Promise<Quiz[]> {
    const url = mode ? `${API_BASE}/quizzes?mode=${mode}` : `${API_BASE}/quizzes`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load quizzes');
    return res.json();
  },

  async getQuiz(id: number): Promise<Quiz> {
    const res = await fetch(`${API_BASE}/quizzes/${id}`);
    if (!res.ok) throw new Error('Failed to load quiz');
    return res.json();
  },

  async submitQuiz(
    id: number,
    answers: Record<number, number>
  ): Promise<{
    success: boolean;
    uuid: string;
    quizId: number;
    totalQuestions: number;
    correctCount: number;
    wrongCount: number;
    unattemptedCount: number;
    score: number;
    maxMarks: number;
    percentage: number;
    pointsAwarded: number;
  }> {
    const res = await fetch(`${API_BASE}/quizzes/${id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    });
    if (!res.ok) throw new Error('Failed to submit quiz');
    return res.json();
  },

  async getScorecard(): Promise<ScorecardData> {
    const res = await fetch(`${API_BASE}/scorecard`);
    if (!res.ok) throw new Error('Failed to load scorecard');
    return res.json();
  },

  async getWallet(): Promise<WalletData> {
    const res = await fetch(`${API_BASE}/wallet`);
    if (!res.ok) throw new Error('Failed to load wallet');
    return res.json();
  },

  async getDiagnostics(): Promise<DiagnosticsData> {
    const res = await fetch(`${API_BASE}/diagnostics`);
    if (!res.ok) throw new Error('Failed to load diagnostics');
    return res.json();
  },

  // Legacy PHP AJAX bridge calls (verifies 1:1 parity with legacy forms)
  async callLegacyBookmark(queId: number): Promise<string> {
    const body = new URLSearchParams();
    body.set('que_id', queId.toString());
    const res = await fetch('/ajax_bookmark.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    return res.text();
  },

  async callLegacyCategoryMcq(quesId: number, answer: number): Promise<string> {
    const body = new URLSearchParams();
    body.set('ques_id', quesId.toString());
    body.set('answer', answer.toString());
    body.set('mcq_source_id', '1');
    body.set('time', '12');
    body.set('guess', '0');
    const res = await fetch('/ajax_category_mcq.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    return res.text();
  }
};

