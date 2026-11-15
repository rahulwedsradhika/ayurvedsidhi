import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../../data/ayurquest.db');

export interface DBQuestion {
  id: number;
  stem: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  correct_answer: number;
  explanation: string | null;
  reference_source: string | null;
  samhita_id: number | null;
  samhita_name: string | null;
  sthana_id: number | null;
  sthana_name: string | null;
  subject_id: number | null;
  subject_name: string | null;
  chapter_id: number | null;
  chapter_name: string | null;
  tag: string;
  image_url: string | null;
  difficulty: string;
  language: string;
  created_at: string;
  is_bookmarked?: boolean;
  user_answer?: string;
  user_note?: string;
}

export interface DBTest {
  id: number;
  name: string;
  subject: string;
  total_questions: number;
  duration_minutes: number;
  total_marks: number;
  negative_marks: number;
  category: string;
  uuid: string | null;
  created_at: string;
}

class AyurQuestDatabase {
  private db: DatabaseSync | null = null;

  constructor() {
    this.init();
  }

  private init() {
    try {
      this.db = new DatabaseSync(DB_PATH);
      console.log(`[Database] SQLite connected: ${DB_PATH}`);
    } catch (err) {
      console.error(`[Database] Failed to connect to ${DB_PATH}:`, err);
    }
  }

  private getDB(): DatabaseSync {
    if (!this.db) {
      this.init();
    }
    if (!this.db) {
      throw new Error("Database not initialized");
    }
    return this.db;
  }

  public getProfile() {
    const db = this.getDB();
    const row = db.prepare(`SELECT * FROM user_profile LIMIT 1`).get() as any;
    if (!row) {
      return {
        id: 'local_dev_user',
        name: 'Rohit (Pro Dev User)',
        email: 'rohit@ayurquest.local',
        phone: '+917006923314',
        subscription_tier: 'PRO',
        user_type: 'TEST_STUDENT',
        is_pro: 1
      };
    }
    return row;
  }

  public getDashboardStats() {
    const db = this.getDB();
    const qCount = (db.prepare(`SELECT COUNT(*) as count FROM questions`).get() as any)?.count || 0;
    const tCount = (db.prepare(`SELECT COUNT(*) as count FROM tests`).get() as any)?.count || 0;
    const bCount = (db.prepare(`SELECT COUNT(*) as count FROM bookmarks`).get() as any)?.count || 0;
    const nCount = (db.prepare(`SELECT COUNT(*) as count FROM user_notes`).get() as any)?.count || 0;
    const aCount = (db.prepare(`SELECT COUNT(*) as count FROM test_attempts`).get() as any)?.count || 0;

    return {
      totalQuestions: qCount,
      totalTests: tCount,
      bookmarkedCount: bCount,
      notesCount: nCount,
      solvedCount: aCount,
      accuracy: 88,
      walletPoints: 1250,
      subscription: 'PRO'
    };
  }

  public getQuestions(filters: {
    samhita_id?: number;
    samhita_name?: string;
    subject_id?: number;
    subject_name?: string;
    tag?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const db = this.getDB();
    let query = `
      SELECT q.*, 
        CASE WHEN b.id IS NOT NULL THEN 1 ELSE 0 END as is_bookmarked,
        n.note_text as user_note
      FROM questions q
      LEFT JOIN bookmarks b ON q.id = b.question_id AND b.user_id = 'local_dev_user'
      LEFT JOIN user_notes n ON q.id = n.question_id AND n.user_id = 'local_dev_user'
      WHERE 1=1
    `;
    const params: any[] = [];

    if (filters.samhita_id) {
      query += ` AND q.samhita_id = ?`;
      params.push(filters.samhita_id);
    }
    if (filters.samhita_name) {
      query += ` AND q.samhita_name LIKE ?`;
      params.push(`%${filters.samhita_name}%`);
    }
    if (filters.subject_id) {
      query += ` AND q.subject_id = ?`;
      params.push(filters.subject_id);
    }
    if (filters.subject_name) {
      query += ` AND q.subject_name LIKE ?`;
      params.push(`%${filters.subject_name}%`);
    }
    if (filters.tag) {
      query += ` AND q.tag = ?`;
      params.push(filters.tag);
    }
    if (filters.search) {
      query += ` AND (q.stem LIKE ? OR q.option_1 LIKE ? OR q.option_2 LIKE ? OR q.explanation LIKE ?)`;
      const term = `%${filters.search}%`;
      params.push(term, term, term, term);
    }

    query += ` ORDER BY q.id ASC LIMIT ? OFFSET ?`;
    params.push(filters.limit || 100, filters.offset || 0);

    return db.prepare(query).all(...params) as unknown as DBQuestion[];
  }

  public getSubjectStats() {
    const db = this.getDB();
    return db.prepare(`
      SELECT subject_name, COUNT(*) as count, MIN(subject_id) as subject_id
      FROM questions
      WHERE subject_name IS NOT NULL AND subject_name != ''
      GROUP BY subject_name
      ORDER BY count DESC
    `).all() as { subject_name: string; count: number; subject_id: number }[];
  }

  public getSamhitaStats() {
    const db = this.getDB();
    return db.prepare(`
      SELECT samhita_name, COUNT(*) as count, MIN(samhita_id) as samhita_id
      FROM questions
      WHERE samhita_name IS NOT NULL AND samhita_name != ''
      GROUP BY samhita_name
      ORDER BY count DESC
    `).all() as { samhita_name: string; count: number; samhita_id: number }[];
  }

  public getQuestionById(id: number): DBQuestion | null {
    const db = this.getDB();
    const row = db.prepare(`
      SELECT q.*, 
        CASE WHEN b.id IS NOT NULL THEN 1 ELSE 0 END as is_bookmarked,
        n.note_text as user_note
      FROM questions q
      LEFT JOIN bookmarks b ON q.id = b.question_id AND b.user_id = 'local_dev_user'
      LEFT JOIN user_notes n ON q.id = n.question_id AND n.user_id = 'local_dev_user'
      WHERE q.id = ?
    `).get(id) as unknown as DBQuestion | undefined;
    return row || null;
  }

  public getTests(category?: string) {
    const db = this.getDB();
    let query = `SELECT * FROM tests WHERE 1=1`;
    const params: any[] = [];
    if (category) {
      query += ` AND category = ?`;
      params.push(category);
    }
    query += ` ORDER BY id ASC`;
    return db.prepare(query).all(...params) as unknown as DBTest[];
  }

  public getTestById(id: number): DBTest | null {
    const db = this.getDB();
    const row = db.prepare(`SELECT * FROM tests WHERE id = ?`).get(id) as unknown as DBTest | undefined;
    return row || null;
  }

  public getTestQuestions(testId: number): DBQuestion[] {
    const db = this.getDB();
    return db.prepare(`
      SELECT q.*, tq.question_order,
        CASE WHEN b.id IS NOT NULL THEN 1 ELSE 0 END as is_bookmarked,
        n.note_text as user_note
      FROM test_questions tq
      JOIN questions q ON tq.question_id = q.id
      LEFT JOIN bookmarks b ON q.id = b.question_id AND b.user_id = 'local_dev_user'
      LEFT JOIN user_notes n ON q.id = n.question_id AND n.user_id = 'local_dev_user'
      WHERE tq.test_id = ?
      ORDER BY tq.question_order ASC
    `).all(testId) as unknown as DBQuestion[];
  }

  public toggleBookmark(questionId: number): boolean {
    const db = this.getDB();
    const existing = db.prepare(`SELECT id FROM bookmarks WHERE user_id = 'local_dev_user' AND question_id = ?`).get(questionId);
    if (existing) {
      db.prepare(`DELETE FROM bookmarks WHERE user_id = 'local_dev_user' AND question_id = ?`).run(questionId);
      return false;
    } else {
      db.prepare(`INSERT INTO bookmarks (user_id, question_id) VALUES ('local_dev_user', ?)`).run(questionId);
      return true;
    }
  }

  public saveNote(questionId: number, noteText: string): void {
    const db = this.getDB();
    db.prepare(`
      INSERT OR REPLACE INTO user_notes (user_id, question_id, note_text, updated_at)
      VALUES ('local_dev_user', ?, ?, CURRENT_TIMESTAMP)
    `).run(questionId, noteText);
  }

  public getReportedQuestions(limit = 50, offset = 0) {
    const db = this.getDB();
    return db.prepare(`
      SELECT rq.*, q.stem, q.option_1, q.option_2, q.option_3, q.option_4, q.correct_answer, q.reference_source
      FROM reported_questions rq
      JOIN questions q ON rq.question_id = q.id
      ORDER BY rq.id ASC
      LIMIT ? OFFSET ?
    `).all(limit, offset);
  }

  public saveAttempt(data: {
    test_id: number;
    score: number;
    total_marks: number;
    correct_count: number;
    incorrect_count: number;
    unattempted_count: number;
    time_taken_seconds: number;
    answers_json: string;
  }) {
    const db = this.getDB();
    return db.prepare(`
      INSERT INTO test_attempts (user_id, test_id, score, total_marks, correct_count, incorrect_count, unattempted_count, time_taken_seconds, answers_json)
      VALUES ('local_dev_user', ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      data.test_id,
      data.score,
      data.total_marks,
      data.correct_count,
      data.incorrect_count,
      data.unattempted_count,
      data.time_taken_seconds,
      data.answers_json
    );
  }
}

export const ayurDB = new AyurQuestDatabase();

