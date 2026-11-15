import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../api/client';
import { Question, Quiz } from '../types';

export const QuizView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const requestedMode = searchParams.get('mode') || (id ? 'exam' : 'practice');
  const samId = searchParams.get('sam_id');
  const sthId = searchParams.get('sth_id');
  const subId = searchParams.get('sub_id');
  const tag = searchParams.get('tag');

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [solvedState, setSolvedState] = useState<Record<number, { isCorrect: boolean; correctAnswer: number; explanation: string }>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [bookmarks, setBookmarks] = useState<Record<number, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(900); // 15 mins default
  const [loading, setLoading] = useState(true);

  // Sticky Note Modal State
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [submittingNote, setSubmittingNote] = useState(false);

  // Load Quiz or Practice Questions
  useEffect(() => {
    setLoading(true);
    if (id && id !== 'practice') {
      api.getQuiz(parseInt(id))
        .then(q => {
          setQuiz(q);
          const qList = q.questions || [];
          setQuestions(qList);
          setTimeLeftSeconds(q.qt * 60);

          const bMap: Record<number, boolean> = {};
          qList.forEach(item => {
            if (item.B === "1") bMap[item.id] = true;
          });
          setBookmarks(bMap);
          setLoading(false);
        })
        .catch(err => {
          console.error("Quiz load error:", err);
          setLoading(false);
        });
    } else {
      // Practice mode by samhita, subject, tag or general
      api.getQuestions({
        sam_id: samId ? parseInt(samId) : undefined,
        sth_id: sthId ? parseInt(sthId) : undefined,
        sub_id: subId ? parseInt(subId) : undefined,
        tag: tag || undefined,
        limit: 50
      })
        .then(qList => {
          setQuestions(qList);
          const bMap: Record<number, boolean> = {};
          qList.forEach(item => {
            if (item.B === "1") bMap[item.id] = true;
          });
          setBookmarks(bMap);
          setLoading(false);
        })
        .catch(err => {
          console.error("Practice questions load error:", err);
          setLoading(false);
        });
    }
  }, [id, samId, sthId, subId, tag]);

  // Exam Countdown Timer
  useEffect(() => {
    if (requestedMode !== 'exam' || loading || timeLeftSeconds <= 0) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [requestedMode, loading, timeLeftSeconds]);

  // Audio Player helper
  const playSound = (isCorrect: boolean) => {
    try {
      const audio = new Audio(
        isCorrect
          ? '/assets/audio/correct-enhanced-v2-90p.mp3'
          : '/assets/audio/wrong-enhanced-v2-90p.mp3'
      );
      audio.volume = 0.7;
      audio.play().catch(e => console.warn("Audio auto-play prevented:", e));
    } catch (e) {
      console.warn("Audio play error:", e);
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    const q = questions[currentIndex];
    if (!q) return;

    if (requestedMode === 'practice') {
      // Practice Mode: Instant answer evaluation & sound
      if (solvedState[q.id]) return; // already solved

      const isCorrect = (optionIndex === q.A);
      playSound(isCorrect);

      setUserAnswers(prev => ({ ...prev, [q.id]: optionIndex }));
      setSolvedState(prev => ({
        ...prev,
        [q.id]: {
          isCorrect,
          correctAnswer: q.A,
          explanation: q.com
        }
      }));

      // Record in local store
      api.solveQuestion(q.id, optionIndex, '10s', false).catch(console.error);
    } else {
      // Exam Mode: select option without immediate evaluation
      setUserAnswers(prev => ({
        ...prev,
        [q.id]: prev[q.id] === optionIndex ? 0 : optionIndex // toggle
      }));
    }
  };

  const handleToggleBookmark = async () => {
    const q = questions[currentIndex];
    if (!q) return;
    try {
      const newState = await api.toggleBookmark(q.id);
      setBookmarks(prev => ({ ...prev, [q.id]: newState }));
    } catch (err) {
      console.error("Bookmark toggle error:", err);
    }
  };

  const handleAddNote = async () => {
    const q = questions[currentIndex];
    if (!q || !noteText.trim()) return;
    setSubmittingNote(true);
    try {
      await api.addNote(q.id, noteText.trim());
      setNoteText("");
      setNoteModalOpen(false);
      setSubmittingNote(false);
    } catch (err) {
      console.error("Note submit error:", err);
      setSubmittingNote(false);
    }
  };

  const handleSubmitExam = async () => {
    if (!quiz) return;
    const confirmed = window.confirm("Are you sure you want to submit your test?");
    if (!confirmed) return;

    try {
      const res = await api.submitQuiz(quiz.id, userAnswers);
      navigate(`/quiz/${quiz.id}/results`, { state: { result: res, quiz, userAnswers } });
    } catch (err) {
      console.error("Quiz submission error:", err);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <i className="fa fa-spinner fa-spin fa-2x text-aqua"></i>
        <p style={{ marginTop: 10 }}>Loading questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="content-wrapper" style={{ padding: '30px' }}>
        <div className="alert alert-warning">No questions found for this selection.</div>
        <Link to="/quizzes" className="btn btn-default">Back to Quizzes</Link>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const currentSolved = solvedState[currentQ.id];
  const selectedAns = userAnswers[currentQ.id];

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="content-wrapper" style={{ padding: '20px 25px', backgroundColor: '#f4f6f9', minHeight: 'calc(100vh - 100px)' }}>
      {/* Top Test Navigation Bar */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: '14px 20px',
        marginBottom: 20,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className={`label ${requestedMode === 'exam' ? 'label-warning' : 'label-info'}`} style={{ fontSize: 11, textTransform: 'uppercase' }}>
            {requestedMode === 'exam' ? 'AIAPGET Exam Mode' : 'Practice Mode'}
          </span>
          <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#2c3e50' }}>
            {quiz ? quiz.name : `${currentQ.sam} - ${currentQ.sth}`}
          </h4>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          {requestedMode === 'exam' && (
            <div style={{
              backgroundColor: timeLeftSeconds < 180 ? '#fde8e8' : '#eef8fc',
              color: timeLeftSeconds < 180 ? '#e74c3c' : '#2aacdd',
              padding: '6px 14px',
              borderRadius: 20,
              fontWeight: 700,
              fontSize: 15,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <i className="fa fa-clock-o"></i>
              <span>{formatTimer(timeLeftSeconds)}</span>
            </div>
          )}

          {requestedMode === 'exam' && (
            <button
              type="button"
              onClick={handleSubmitExam}
              className="btn btn-sm btn-danger"
              style={{ fontWeight: 600 }}
            >
              <i className="fa fa-check-square-o" style={{ marginRight: 6 }}></i>
              Submit Test
            </button>
          )}
        </div>
      </div>

      <div className="row">
        {/* Main Question Card Column */}
        <div className={requestedMode === 'exam' ? "col-lg-8 col-md-8" : "col-lg-9 col-md-12"}>
          <div className="box box-solid" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            {/* Question Header */}
            <div className="box-header with-border" style={{ padding: '16px 20px', backgroundColor: '#fcfcfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#2aacdd', marginRight: 10 }}>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="label label-default" style={{ fontSize: 11 }}>
                  ID: #{currentQ.id}
                </span>
              </div>

              {/* Action shortcuts: Bookmark, Sticky Note */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={handleToggleBookmark}
                  className={`btn btn-sm ${bookmarks[currentQ.id] ? 'btn-warning' : 'btn-default'}`}
                  title={bookmarks[currentQ.id] ? 'Remove Bookmark' : 'Add Bookmark'}
                >
                  <i className={`fa ${bookmarks[currentQ.id] ? 'fa-bookmark' : 'fa-bookmark-o'}`}></i>
                  <span className="hidden-xs" style={{ marginLeft: 6 }}>
                    {bookmarks[currentQ.id] ? 'Bookmarked' : 'Bookmark'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setNoteModalOpen(true)}
                  className="btn btn-sm btn-default"
                  title="Add Personal Sticky Note"
                >
                  <i className="fa fa-sticky-note-o text-aqua"></i>
                  <span className="hidden-xs" style={{ marginLeft: 6 }}>Notes</span>
                </button>

                {requestedMode === 'exam' && (
                  <button
                    type="button"
                    onClick={() => setMarkedForReview(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
                    className={`btn btn-sm ${markedForReview[currentQ.id] ? 'btn-primary' : 'btn-default'}`}
                    title="Mark for Review"
                  >
                    <i className="fa fa-flag"></i>
                    <span className="hidden-xs" style={{ marginLeft: 6 }}>
                      {markedForReview[currentQ.id] ? 'Marked' : 'Review Later'}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Question Body */}
            <div className="box-body" style={{ padding: '24px 22px' }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#2c3e50', lineHeight: 1.6, marginBottom: 25 }}>
                {currentQ.Q}
              </div>

              {/* Options List */}
              <div className="options-container" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[currentQ.O1, currentQ.O2, currentQ.O3, currentQ.O4].map((optText, oIdx) => {
                  const optNum = oIdx + 1;
                  const isSelected = selectedAns === optNum;

                  let optBg = '#fff';
                  let optBorder = '#d2d6de';
                  let optColor = '#333';

                  if (requestedMode === 'practice' && currentSolved) {
                    if (optNum === currentSolved.correctAnswer) {
                      optBg = '#e8f8f5';
                      optBorder = '#27ae60';
                      optColor = '#1e824c';
                    } else if (isSelected && !currentSolved.isCorrect) {
                      optBg = '#fde8e8';
                      optBorder = '#e74c3c';
                      optColor = '#c0392b';
                    }
                  } else if (requestedMode === 'exam' && isSelected) {
                    optBg = '#eaf5fc';
                    optBorder = '#2aacdd';
                    optColor = '#1b6ca8';
                  }

                  return (
                    <div
                      key={oIdx}
                      onClick={() => handleSelectOption(optNum)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: 6,
                        backgroundColor: optBg,
                        border: `2px solid ${optBorder}`,
                        color: optColor,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        backgroundColor: isSelected ? optBorder : '#f4f6f9',
                        color: isSelected ? '#fff' : '#555',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 13,
                        flexShrink: 0
                      }}>
                        {String.fromCharCode(65 + oIdx)}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: isSelected ? 600 : 400, flex: 1 }}>
                        {optText}
                      </div>
                      {requestedMode === 'practice' && currentSolved && optNum === currentSolved.correctAnswer && (
                        <i className="fa fa-check-circle text-green" style={{ fontSize: 20 }}></i>
                      )}
                      {requestedMode === 'practice' && currentSolved && isSelected && !currentSolved.isCorrect && (
                        <i className="fa fa-times-circle text-red" style={{ fontSize: 20 }}></i>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Commentary / Explanation Box in Practice Mode */}
              {requestedMode === 'practice' && currentSolved && (
                <div
                  id={`qr_${currentQ.id}`}
                  style={{
                    marginTop: 25,
                    padding: '18px 20px',
                    borderRadius: 6,
                    backgroundColor: currentSolved.isCorrect ? '#f0fdf4' : '#fff7ed',
                    borderLeft: `5px solid ${currentSolved.isCorrect ? '#27ae60' : '#f39c12'}`,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <i className={`fa ${currentSolved.isCorrect ? 'fa-check text-green' : 'fa-info-circle text-yellow'}`} style={{ fontSize: 16 }}></i>
                    <strong style={{ fontSize: 15, color: currentSolved.isCorrect ? '#27ae60' : '#b7791f' }}>
                      {currentSolved.isCorrect ? 'Correct Answer!' : `Incorrect - Correct is Option ${String.fromCharCode(64 + currentSolved.correctAnswer)}`}
                    </strong>
                  </div>
                  <div style={{ fontSize: 14, color: '#444', lineHeight: 1.6 }}>
                    <strong>Reference & Commentary: </strong>
                    {currentSolved.explanation}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
                    Source: {currentQ.sam} &bull; {currentQ.sth} &bull; {currentQ.sub}
                  </div>
                </div>
              )}

              {/* Bottom Navigation Buttons */}
              <div style={{
                marginTop: 30,
                paddingTop: 20,
                borderTop: '1px solid #f0f0f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  className="btn btn-default"
                  style={{ opacity: currentIndex === 0 ? 0.5 : 1, fontWeight: 600 }}
                >
                  <i className="fa fa-arrow-left" style={{ marginRight: 6 }}></i>
                  Previous
                </button>

                <button
                  type="button"
                  disabled={currentIndex === questions.length - 1}
                  onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  className="btn btn-info"
                  style={{ opacity: currentIndex === questions.length - 1 ? 0.5 : 1, fontWeight: 600 }}
                >
                  Next Question
                  <i className="fa fa-arrow-right" style={{ marginLeft: 6 }}></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Question Palette Sidebar (Exam Mode) */}
        {requestedMode === 'exam' && (
          <div className="col-lg-4 col-md-4">
            <div className="box box-solid" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div className="box-header with-border" style={{ padding: '14px 18px', backgroundColor: '#fcfcfc' }}>
                <h4 className="box-title" style={{ fontSize: 15, fontWeight: 700 }}>
                  <i className="fa fa-th text-aqua" style={{ marginRight: 6 }}></i>
                  Question Palette
                </h4>
              </div>
              <div className="box-body" style={{ padding: '16px' }}>
                {/* Palette Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 20 }}>
                  {questions.map((qItem, idx) => {
                    const isAnswered = !!userAnswers[qItem.id];
                    const isReview = !!markedForReview[qItem.id];
                    const isCurrent = idx === currentIndex;

                    let bg = '#eee';
                    let col = '#333';
                    if (isCurrent) {
                      bg = '#2aacdd';
                      col = '#fff';
                    } else if (isReview) {
                      bg = '#8e44ad';
                      col = '#fff';
                    } else if (isAnswered) {
                      bg = '#27ae60';
                      col = '#fff';
                    }

                    return (
                      <button
                        key={qItem.id}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        style={{
                          height: 38,
                          borderRadius: 6,
                          border: isCurrent ? '2px solid #000' : 'none',
                          backgroundColor: bg,
                          color: col,
                          fontWeight: 700,
                          fontSize: 13,
                          cursor: 'pointer'
                        }}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div style={{ fontSize: 12, color: '#666', display: 'flex', flexDirection: 'column', gap: 6, borderTop: '1px solid #eee', paddingTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: '#27ae60' }}></div>
                    <span>Answered ({Object.values(userAnswers).filter(Boolean).length})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: '#8e44ad' }}></div>
                    <span>Marked for Review ({Object.values(markedForReview).filter(Boolean).length})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: '#eee' }}></div>
                    <span>Unanswered ({questions.length - Object.values(userAnswers).filter(Boolean).length})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Notes Modal */}
      {noteModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 8,
            width: '100%',
            maxWidth: 500,
            padding: 24,
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
          }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: 18, fontWeight: 700, color: '#2c3e50' }}>
              <i className="fa fa-sticky-note-o text-aqua" style={{ marginRight: 8 }}></i>
              Add Sticky Note to Question #{currentQ.id}
            </h4>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
              {currentQ.Q.slice(0, 90)}...
            </p>
            <textarea
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your personal mnemonics, reference, or key points..."
              style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 13, marginBottom: 15 }}
            ></textarea>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                type="button"
                onClick={() => setNoteModalOpen(false)}
                className="btn btn-default"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submittingNote || !noteText.trim()}
                onClick={handleAddNote}
                className="btn btn-info"
              >
                {submittingNote ? 'Saving...' : 'Save Sticky Note'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

