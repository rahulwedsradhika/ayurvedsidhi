-- AyurQuest Production-Grade Local Database Schema
-- Supports Full Classical Question Bank, Tests, Attempts, Bookmarks, and Pro Local Profile

CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY,
    stem TEXT NOT NULL,
    option_1 TEXT NOT NULL,
    option_2 TEXT NOT NULL,
    option_3 TEXT NOT NULL,
    option_4 TEXT NOT NULL,
    correct_answer INTEGER NOT NULL,
    explanation TEXT,
    reference_source TEXT,
    samhita_id INTEGER,
    samhita_name TEXT,
    sthana_id INTEGER,
    sthana_name TEXT,
    subject_id INTEGER,
    subject_name TEXT,
    chapter_id INTEGER,
    chapter_name TEXT,
    tag TEXT DEFAULT 'single_choice',
    image_url TEXT,
    difficulty TEXT DEFAULT 'moderate',
    language TEXT DEFAULT 'sa/hi/en',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_questions_samhita ON questions(samhita_id);
CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject_id);
CREATE INDEX IF NOT EXISTS idx_questions_tag ON questions(tag);

CREATE TABLE IF NOT EXISTS tests (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    subject TEXT,
    total_questions INTEGER DEFAULT 50,
    duration_minutes INTEGER DEFAULT 45,
    total_marks INTEGER DEFAULT 200,
    negative_marks REAL DEFAULT 1.0,
    category TEXT DEFAULT 'Daily',
    uuid TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS test_questions (
    test_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    question_order INTEGER NOT NULL,
    PRIMARY KEY (test_id, question_id),
    FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_test_questions_test ON test_questions(test_id);
CREATE INDEX IF NOT EXISTS idx_test_questions_question ON test_questions(question_id);

CREATE TABLE IF NOT EXISTS user_profile (
    id TEXT PRIMARY KEY DEFAULT 'local_dev_user',
    name TEXT NOT NULL DEFAULT 'Rohit (Pro Dev)',
    email TEXT DEFAULT 'rohit@ayurquest.local',
    phone TEXT DEFAULT '+917006923314',
    subscription_tier TEXT NOT NULL DEFAULT 'PRO',
    user_type TEXT NOT NULL DEFAULT 'TEST_STUDENT',
    is_pro INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL DEFAULT 'local_dev_user',
    question_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, question_id),
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL DEFAULT 'local_dev_user',
    question_id INTEGER NOT NULL,
    note_text TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, question_id),
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS test_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL DEFAULT 'local_dev_user',
    test_id INTEGER NOT NULL,
    score REAL NOT NULL,
    total_marks REAL NOT NULL,
    correct_count INTEGER NOT NULL,
    incorrect_count INTEGER NOT NULL,
    unattempted_count INTEGER NOT NULL,
    time_taken_seconds INTEGER NOT NULL,
    answers_json TEXT NOT NULL,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reported_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    student_name TEXT,
    student_query TEXT,
    faculty_name TEXT,
    faculty_resolution TEXT,
    reported_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

