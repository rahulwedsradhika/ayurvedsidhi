const http = require('http');
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3001;
const BASE_DIR = path.resolve(__dirname);
const DB_PATH = path.resolve(__dirname, '../server/data/ayurquest.db');

let db;
try {
  db = new DatabaseSync(DB_PATH);
  console.log('[SQLite] Connected to:', DB_PATH);
} catch (e) {
  console.error('[SQLite] Error opening database:', e.message);
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

function sendJSON(res, data, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function parseUrl(reqUrl) {
  const [pathname, queryString] = reqUrl.split('?');
  const params = new URLSearchParams(queryString || '');
  return { pathname, params };
}

function formatCatQuizQuestion(row) {
  const options = [
    row.option_1 || '',
    row.option_2 || '',
    row.option_3 || '',
    row.option_4 || ''
  ];
  const correctIdx = Math.max(0, (row.correct_answer || 1) - 1);
  const correctLetter = ['A', 'B', 'C', 'D'][correctIdx] || 'A';
  const correctOptText = options[correctIdx] || '';

  const ref = row.reference_source || `${row.samhita_name || ''} ${row.sthana_name || ''} ${row.subject_name || ''}`.trim();
  const comm = row.explanation || 'Classical Ayurvedic reference verified.';

  return {
    qid: row.id,
    q: row.stem || '',
    options: options,
    correctIndex: correctIdx,
    b: row.is_bookmarked ? "1" : "0",
    correctResponse: `<span class='text-success strong'><i class='fa fa-check-circle'></i> Your answer is Correct! (Option ${correctLetter})</span><br><strong>Reference:</strong> <span class="text-green">${ref}</span><br><strong>Comments: </strong>${comm}`,
    incorrectResponse: `<span class='text-danger strong'><i class='fa fa-times-circle'></i> Wrong! Right answer is (${correctLetter}) ${correctOptText}</span><br><strong>Reference:</strong> <span class="text-green">${ref}</span><br><strong>Comments: </strong>${comm}`,
    subject: row.subject_name || '',
    samhita: row.samhita_name || '',
    sthana: row.sthana_name || '',
    chapter: row.chapter_name || ''
  };
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const { pathname, params } = parseUrl(req.url);

  // API Routes
  if (pathname === '/api/subjects') {
    try {
      const catalogPath = path.join(BASE_DIR, 'data/subjects_catalog.json');
      if (fs.existsSync(catalogPath)) {
        const raw = fs.readFileSync(catalogPath, 'utf-8');
        return sendJSON(res, JSON.parse(raw));
      }
      const stmt = db.prepare(`
        SELECT subject_name as name, COUNT(*) as count 
        FROM questions 
        WHERE subject_name IS NOT NULL AND subject_name != '' 
        GROUP BY subject_name 
        ORDER BY count DESC
      `);
      return sendJSON(res, stmt.all());
    } catch (e) {
      return sendJSON(res, { error: e.message }, 500);
    }
  }

  if (pathname === '/api/samhitas') {
    try {
      const hierPath = path.join(BASE_DIR, 'data/samhita_hierarchy.json');
      if (fs.existsSync(hierPath)) {
        const raw = fs.readFileSync(hierPath, 'utf-8');
        return sendJSON(res, JSON.parse(raw));
      }
      return sendJSON(res, { error: 'Hierarchy data not found' }, 404);
    } catch (e) {
      return sendJSON(res, { error: e.message }, 500);
    }
  }

  if (pathname === '/api/questions') {
    try {
      const subject = params.get('subject') || params.get('sub');
      const samhita = params.get('samhita') || params.get('sam');
      const sthana = params.get('sthana') || params.get('sth');
      const chapter = params.get('chapter') || params.get('ch');
      const testId = params.get('test_id') || params.get('testId');
      const search = params.get('search') || params.get('q');
      const limit = parseInt(params.get('limit') || '100');
      const offset = parseInt(params.get('offset') || '0');

      let sql = 'SELECT * FROM questions WHERE 1=1';
      const sqlParams = [];

      if (subject) {
        sql += ' AND subject_name LIKE ?';
        sqlParams.push(`%${subject}%`);
      }
      if (samhita) {
        sql += ' AND samhita_name LIKE ?';
        sqlParams.push(`%${samhita}%`);
      }
      if (sthana) {
        sql += ' AND sthana_name LIKE ?';
        sqlParams.push(`%${sthana}%`);
      }
      if (chapter) {
        sql += ' AND chapter_name LIKE ?';
        sqlParams.push(`%${chapter}%`);
      }
      if (search) {
        sql += ' AND (stem LIKE ? OR explanation LIKE ? OR reference_source LIKE ?)';
        sqlParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }

      sql += ' ORDER BY id ASC LIMIT ? OFFSET ?';
      sqlParams.push(limit, offset);

      const stmt = db.prepare(sql);
      const rows = stmt.all(...sqlParams);

      const formatted = rows.map(formatCatQuizQuestion);
      return sendJSON(res, formatted);
    } catch (e) {
      return sendJSON(res, { error: e.message }, 500);
    }
  }

  if (pathname === '/api/tests') {
    try {
      const category = params.get('category');
      let sql = 'SELECT * FROM tests WHERE 1=1';
      const sqlParams = [];
      if (category) {
        sql += ' AND category = ?';
        sqlParams.push(category);
      }
      sql += ' ORDER BY id ASC';
      const stmt = db.prepare(sql);
      return sendJSON(res, stmt.all(...sqlParams));
    } catch (e) {
      return sendJSON(res, { error: e.message }, 500);
    }
  }

  if (pathname.startsWith('/api/tests/')) {
    try {
      const testId = parseInt(pathname.split('/').pop());
      const testStmt = db.prepare('SELECT * FROM tests WHERE id = ?');
      const test = testStmt.get(testId);
      if (!test) {
        return sendJSON(res, { error: 'Test not found' }, 404);
      }

      // Check test_questions
      const qStmt = db.prepare(`
        SELECT q.* 
        FROM questions q 
        JOIN test_questions tq ON q.id = tq.question_id 
        WHERE tq.test_id = ? 
        ORDER BY tq.question_order ASC, q.id ASC
      `);
      let rows = qStmt.all(testId);

      // If test has no linked questions yet, provide questions from its subject
      if (rows.length === 0) {
        const fallbackStmt = db.prepare(`
          SELECT * FROM questions 
          WHERE subject_name LIKE ? OR 1=1 
          ORDER BY id ASC 
          LIMIT ?
        `);
        rows = fallbackStmt.all(`%${test.subject || ''}%`, test.total_questions || 50);
      }

      const formatted = rows.map(formatCatQuizQuestion);
      return sendJSON(res, {
        test,
        questions: formatted
      });
    } catch (e) {
      return sendJSON(res, { error: e.message }, 500);
    }
  }

  if (pathname === '/api/bookmarks') {
    try {
      const stmt = db.prepare('SELECT * FROM questions WHERE is_bookmarked = 1 ORDER BY id DESC');
      const rows = stmt.all();
      return sendJSON(res, rows.map(formatCatQuizQuestion));
    } catch (e) {
      return sendJSON(res, { error: e.message }, 500);
    }
  }

  // Legacy AJAX endpoints
  if (pathname === '/ajax_bookmark.php') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const p = new URLSearchParams(body);
      const qid = parseInt(p.get('que_id') || params.get('que_id'));
      if (qid) {
        try {
          const row = db.prepare('SELECT is_bookmarked FROM questions WHERE id = ?').get(qid);
          const nextVal = (row && row.is_bookmarked) ? 0 : 1;
          db.prepare('UPDATE questions SET is_bookmarked = ? WHERE id = ?').run(nextVal, qid);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          return res.end(nextVal ? '1' : '2');
        } catch (e) {}
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('1');
    });
    return;
  }

  if (pathname === '/ajax_ques_solved.php') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('1');
  }

  // Static File Serving
  let filePath = path.join(BASE_DIR, pathname === '/' ? 'index.html' : pathname);

  // If path doesn't have an extension, try appending .html
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
  }

  // Security check: must be inside BASE_DIR
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end('<h1>404 Not Found</h1><p><a href="/index.html">Go to Dashboard</a></p>');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  AyurQuest APK Clone Standalone Server Running`);
  console.log(`  Local URL: http://localhost:${PORT}`);
  console.log(`  Dashboard: http://localhost:${PORT}/index.html`);
  console.log(`  Samhitas:  http://localhost:${PORT}/samhitas.html`);
  console.log(`  Subjects:  http://localhost:${PORT}/subjects.html`);
  console.log(`=======================================================`);
});
