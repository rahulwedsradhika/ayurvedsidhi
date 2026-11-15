import { Router, Request, Response } from 'express';
import { questions } from '../data/questionsData.js';
import { quizzes } from '../data/quizzesData.js';
import { localDB } from '../data/database.js';

const router = Router();

// 1. ajax_bookmark.php
// Returns '1' (bookmarked), '2' (unbookmarked), '3' (limit reached)
export const handleBookmark = (req: Request, res: Response) => {
  const que_id = parseInt(req.body.que_id || req.query.que_id as string);
  if (!que_id) {
    return res.status(400).send("Invalid Question ID");
  }
  const isNowBookmarked = localDB.toggleBookmark(que_id);
  res.send(isNowBookmarked ? "1" : "2");
};

router.post('/ajax_bookmark.php', handleBookmark);
router.get('/ajax_bookmark.php', handleBookmark);

// 2. ajax_category_mcq.php
// Returns HTML block containing answer confirmation, correct/wrong indicator, explanation & references
export const handleCategoryMcq = (req: Request, res: Response) => {
  const ques_id = parseInt(req.body.ques_id || req.query.ques_id as string);
  const user_ans = parseInt(req.body.answer || req.query.answer as string);
  const time = (req.body.time || "00:15") as string;
  const guess = req.body.guess === "1";

  const q = questions.find(item => item.id === ques_id);
  if (!q) {
    return res.send('<div class="text-red strong"><i class="fa fa-info-circle"></i> Question not found</div>');
  }

  const isCorrect = (user_ans === q.A);
  localDB.recordAttempt(ques_id, user_ans, isCorrect, time, guess);

  const optionLetters = ["A", "B", "C", "D"];
  const correctLetter = optionLetters[q.A - 1];
  const userLetter = optionLetters[user_ans - 1];

  let html = `<div class="list-group-item lb-justify ${isCorrect ? 'list-group-item-success' : 'list-group-item-danger'}" style="margin-top: 10px; border-radius: 4px;">`;
  if (isCorrect) {
    html += `<div class="strong text-green"><i class="fa fa-check-circle fa-lg"></i> Correct Answer! (Option ${correctLetter})</div>`;
  } else {
    html += `<div class="strong text-red"><i class="fa fa-times-circle fa-lg"></i> Incorrect. You selected (${userLetter}), Correct is (${correctLetter}).</div>`;
  }
  html += `<div style="margin-top: 8px; color: #333;"><strong>Explanation / संदर्भ:</strong> ${q.com}</div>`;
  html += `<div style="margin-top: 6px; font-size: 11px; color: #666;">
    <span class="label label-info"><i class="flaticon-samhitas"></i> ${q.sam}</span> 
    <span class="label label-primary"><i class="fa fa-book"></i> ${q.sth}</span> 
    <span class="label label-success"><i class="flaticon-subjects"></i> ${q.sub}</span>
    <span class="pull-right text-gray"><i class="fa fa-clock-o"></i> Time: ${time}</span>
  </div>`;
  html += `</div>`;

  res.send(html);
};

router.post('/ajax_category_mcq.php', handleCategoryMcq);
router.get('/ajax_category_mcq.php', handleCategoryMcq);

// 3. ajax_ques_solved.php (used by student.jquery.catquiz.js)
router.get('/ajax_ques_solved.php', (req: Request, res: Response) => {
  const qid = parseInt(req.query.qid as string);
  const user_ans = parseInt(req.query.user_ans as string);
  const q = questions.find(item => item.id === qid);
  if (q) {
    const isCorrect = (user_ans === q.A);
    localDB.recordAttempt(qid, user_ans, isCorrect);
  }
  res.send("1");
});

// 4. ajax_sticky_note.php
router.post('/ajax_sticky_note.php', (req: Request, res: Response) => {
  // If check_ques_id provided: return existing notes HTML form
  if (req.body.check_ques_id) {
    const qid = parseInt(req.body.check_ques_id);
    const existing = localDB.getNotes(qid);
    let html = `<div class="notes-wrapper">`;
    if (existing.length > 0) {
      html += `<h5><strong>Existing Sticky Notes:</strong></h5><ul class="list-group">`;
      existing.forEach((n, idx) => {
        html += `<li class="list-group-item"><i class="fa fa-thumb-tack text-yellow"></i> ${idx + 1}. ${n}</li>`;
      });
      html += `</ul>`;
    }
    html += `<form class="notesform" id="notesform">
      <input type="hidden" name="ques_id" value="${qid}">
      <div class="form-group">
        <label for="notes">Add Personal Note:</label>
        <textarea name="notes" id="notes" class="form-control" rows="3" placeholder="Write key memory points or references..."></textarea>
      </div>
    </form>
    <button type="button" id="submit_note" class="btn btn-navy btn-sm"><i class="fa fa-check"></i> Save Sticky Note</button>
    </div>`;
    return res.send(html);
  }

  // If submitting note:
  const qid = parseInt(req.body.ques_id);
  const noteText = req.body.notes;
  if (!noteText || noteText.trim().length === 0) {
    return res.send("2"); // Please add notes
  }
  localDB.addNote(qid, noteText.trim());
  res.send("1"); // Success
});

// 5. ajax_report.php
router.post('/ajax_report.php', (req: Request, res: Response) => {
  if (req.body.check_ques_id) {
    const qid = parseInt(req.body.check_ques_id);
    const html = `<form class="reportform" id="reportform">
      <input type="hidden" name="ques_id" value="${qid}">
      <div class="form-group">
        <label for="comment">Reason for Reporting Question #${qid}:</label>
        <textarea name="comment" id="comment" class="form-control" rows="3" placeholder="Explain discrepancy or typo..."></textarea>
      </div>
    </form>
    <button type="button" id="submit_report" class="btn btn-maroon btn-sm"><i class="fa fa-flag"></i> Submit Report</button>`;
    return res.send(html);
  }

  const qid = parseInt(req.body.ques_id);
  const comment = req.body.comment;
  if (!comment || comment.trim().length === 0) {
    return res.send("2");
  }
  localDB.addReport(qid, comment.trim());
  res.send("1");
});

// 6. ajax.php
router.get('/ajax.php', (req: Request, res: Response) => {
  const type = req.query.type as string;

  if (type === 'free_daily_quiz') {
    const dailyQuizzes = quizzes.filter(q => q.mode === 'daily').map(q => ({
      id: q.id,
      name: q.name,
      sub: q.sub,
      m: q.m,
      q: q.q,
      qt: q.qt,
      w: q.w,
      p: q.p,
      d: q.d,
      pt: q.pt,
      uuid: q.uuid,
      r: q.r
    }));
    return res.json(dailyQuizzes);
  }

  if (type === 'pre_entrance' || type === 'curofy_mock') {
    const mockQuizzes = quizzes.filter(q => q.mode === 'mock').map(q => ({
      id: q.id,
      name: q.name,
      sub: q.sub,
      m: q.m,
      q: q.q,
      qt: q.qt,
      w: q.w,
      p: q.p,
      d: q.d,
      pt: q.pt,
      uuid: q.uuid,
      r: q.r,
      pm: q.pm,
      nm: q.nm
    }));
    return res.json(mockQuizzes);
  }

  res.json([]);
});

// 7. ajax_daily_mcq.php
router.get('/ajax_daily_mcq.php', (req: Request, res: Response) => {
  // Returns list of questions with explanation and options
  const list = questions.map(q => ({
    id: q.id,
    Q: q.Q,
    O1: q.O1,
    O2: q.O2,
    O3: q.O3,
    O4: q.O4,
    A: q.A,
    UA: localDB.getState().attempts[q.id]?.selectedAnswer || "AQ_quiz",
    B: localDB.isBookmarked(q.id) ? "1" : "0",
    sam_id: q.sam_id,
    sam: q.sam,
    sth_id: q.sth_id,
    sth: q.sth,
    sub_id: q.sub_id,
    sub: q.sub,
    com: q.com,
    note: localDB.getNotes(q.id).map(n => ({ notes: n }))
  }));
  res.json(list);
});

// 8. ajax_daily.php (Question of the day / Rapid fire challenges)
router.post('/ajax_daily.php', (req: Request, res: Response) => {
  const type = req.body.type;
  if (type === 'ques_of_day') {
    const q = questions[0];
    const isBookmarked = localDB.isBookmarked(q.id);
    const html = `<div class="question-container" style="background:#fff; padding:15px; border-radius:4px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <h4 class="text-navy strong">Question of the Day</h4>
      <p class="strong" style="font-size:14px; margin-top:10px;">${q.Q}</p>
      <div class="list-group" style="margin-top:15px;">
        <label class="list-group-item"><input type="radio" class="ques_ans" name="qod" data-ques_id="${q.id}" data-answer="1"> (A) ${q.O1}</label>
        <label class="list-group-item"><input type="radio" class="ques_ans" name="qod" data-ques_id="${q.id}" data-answer="2"> (B) ${q.O2}</label>
        <label class="list-group-item"><input type="radio" class="ques_ans" name="qod" data-ques_id="${q.id}" data-answer="3"> (C) ${q.O3}</label>
        <label class="list-group-item"><input type="radio" class="ques_ans" name="qod" data-ques_id="${q.id}" data-answer="4"> (D) ${q.O4}</label>
      </div>
      <div id="qr_${q.id}" style="display:none;"></div>
      <div class="btn-group btn-group-justified" style="margin-top:10px;">
        <div class="btn-group" id="S${q.id}"><a id="bookmark" data-id="${q.id}" class="btn btn-default btn-xs text-${isBookmarked ? 'green' : 'yellow'}"><i class="fa fa-bookmark"></i> ${isBookmarked ? 'Bookmarked' : 'Bookmark'}</a></div>
        <div class="btn-group"><a id="sticky_note" data-id="${q.id}" data-title="Notes" data-toggle="modal" data-target="#ques_actions" class="btn btn-default btn-xs text-blue"><i class="fa fa-pencil"></i> Notes</a></div>
        <div class="btn-group"><a id="report" data-id="${q.id}" data-title="Report" data-toggle="modal" data-target="#ques_actions" class="btn btn-default btn-xs text-maroon"><i class="fa fa-flag"></i> Report</a></div>
      </div>
    </div>`;
    return res.send(html);
  }

  res.send('<div>Challenge preview loaded</div>');
});

// 9. ajax_quiz.php (Quiz options modal)
router.post('/ajax_quiz.php', (req: Request, res: Response) => {
  const quizId = req.body.quiz_id;
  const q = quizzes.find(item => item.id == quizId) || quizzes[0];
  const html = `<div class="quiz-modal-inner">
    <h3 class="text-center text-navy strong" style="margin-top:0;">${q.name}</h3>
    <p class="text-center text-gray"><i class="fa fa-info-circle"></i> ${q.sub} | <strong>${q.q} MCQs | ${q.qt} Minutes</strong></p>
    <hr/>
    <div class="row">
      <div class="col-sm-6 text-center" style="margin-bottom:15px;">
        <div class="panel panel-default" style="padding:15px; border-color:#00c0ef;">
          <h4 class="strong text-blue"><i class="fa fa-bolt"></i> Practice Mode</h4>
          <p><small>Immediate answer reveal, instant explanations, timer per question, and sound effects.</small></p>
          <a href="/quiz/${q.id}?mode=practice" class="btn btn-aq2 btn-block strong"><i class="fa fa-play"></i> Start Practice Mode</a>
        </div>
      </div>
      <div class="col-sm-6 text-center" style="margin-bottom:15px;">
        <div class="panel panel-default" style="padding:15px; border-color:#00a65a;">
          <h4 class="strong text-green"><i class="fa fa-graduation-cap"></i> AIAPGET Exam Mode</h4>
          <p><small>Full exam simulation with overall timer, question palette, negative marking (-0.25), review at end.</small></p>
          <a href="/quiz/${q.id}?mode=exam" class="btn btn-success btn-block strong"><i class="fa fa-desktop"></i> Start Exam Simulation</a>
        </div>
      </div>
    </div>
  </div>`;
  res.send(html);
});

export default router;

