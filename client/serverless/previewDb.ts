import { existsSync } from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

let connection: DatabaseSync | null = null;

export function previewDb(): DatabaseSync {
  if (connection) return connection;
  const file = path.join(process.cwd(), 'api', '_data', 'ayurquest.db');
  if (!existsSync(file)) {
    throw new Error('The packaged AyurQuest SQLite database was not found at ' + file);
  }
  connection = new DatabaseSync(file, { readOnly: true });
  return connection;
}

export function sendJson(res: any, status: number, data: unknown): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(data));
}

export function previewGet(req: any, res: any, handler: () => unknown): void {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }
  // Never serve licensed question data from the production domain by accident.
  // This is a temporary, protected preview adapter until dedicated Supabase
  // storage, licensing/access control, and per-user auth are configured.
  if (process.env.VERCEL_ENV === 'production') {
    sendJson(res, 404, { error: 'Developer test data API is preview-only' });
    return;
  }
  try {
    const result = handler();
    if (result === null || result === undefined) {
      sendJson(res, 404, { error: 'Test not found in repository database' });
    } else {
      sendJson(res, 200, result);
    }
  } catch (error) {
    console.error('Read-only preview database error', error);
    sendJson(res, 503, { error: 'Preview test database unavailable. Verify function file tracing and SQLite packaging.' });
  }
}

export function testRows(category?: string): unknown[] {
  const db = previewDb();
  const sql = 'SELECT id, name, subject, total_questions, duration_minutes, total_marks, negative_marks, category, created_at FROM tests';
  const rows = category
    ? db.prepare(sql + ' WHERE category = ? ORDER BY id ASC').all(category)
    : db.prepare(sql + ' ORDER BY id ASC').all();
  return rows.map((t: any) => ({
    id: t.id,
    name: t.name,
    sub: t.subject,
    q: t.total_questions,
    qt: t.duration_minutes,
    m: t.total_marks,
    w: '5',
    pm: t.total_marks / (t.total_questions || 50),
    nm: t.negative_marks,
    category: t.category,
    date: t.created_at,
  }));
}

function frontQuestion(q: any): Record<string, unknown> {
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
    B: '0',
    UA: 'AQ_quiz',
    note: [],
  };
}

export function fullTest(id: number): unknown | null {
  if (!Number.isSafeInteger(id) || id < 1) return null;
  const db = previewDb();
  const t: any = db.prepare('SELECT * FROM tests WHERE id = ?').get(id);
  if (!t) return null;
  const questions: any[] = db.prepare(
    'SELECT q.* FROM test_questions AS tq JOIN questions AS q ON q.id = tq.question_id WHERE tq.test_id = ? ORDER BY tq.question_order ASC'
  ).all(id);
  return {
    id: t.id,
    name: t.name,
    sub: t.subject,
    q: t.total_questions,
    qt: t.duration_minutes,
    m: t.total_marks,
    pm: t.total_marks / (t.total_questions || 50),
    nm: t.negative_marks,
    category: t.category,
    questionIds: questions.map(q => q.id),
    questions: questions.map(frontQuestion),
  };
}

export function dataCounts(): Record<string, number | string> {
  const db = previewDb();
  const count = (sql: string) => Number((db.prepare(sql).get() as any).n);
  return {
    status: 'ok',
    source: 'bundled-read-only-sqlite',
    tests: count('SELECT COUNT(*) AS n FROM tests'),
    questions: count('SELECT COUNT(*) AS n FROM questions'),
    testLinks: count('SELECT COUNT(*) AS n FROM test_questions'),
    seriesTests: count('SELECT COUNT(*) AS n FROM tests WHERE id BETWEEN 10001 AND 10035'),
    seriesQuestionLinks: count('SELECT COUNT(*) AS n FROM test_questions WHERE test_id BETWEEN 10001 AND 10035'),
  };
}
