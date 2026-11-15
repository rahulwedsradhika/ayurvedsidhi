import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../api/client';
import { Quiz, Question } from '../types';

export const TestingViewerPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quizLoading, setQuizLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [revealAll, setRevealAll] = useState<boolean>(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  // 1. Fetch all tests on mount
  useEffect(() => {
    setLoading(true);
    api.getQuizzes()
      .then((data) => {
        // Filter tests that have questions (or sort by question count descending)
        const testsWithQuestions = data.filter((t) => (t.q || 0) > 0);
        setQuizzes(testsWithQuestions);
        if (testsWithQuestions.length > 0) {
          setSelectedQuizId(testsWithQuestions[0].id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load quizzes:', err);
        setLoading(false);
      });
  }, []);

  // 2. Fetch selected test with all questions
  useEffect(() => {
    if (!selectedQuizId) return;
    setQuizLoading(true);
    api.getQuiz(selectedQuizId)
      .then((data) => {
        setCurrentQuiz(data);
        setQuizLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch((err) => {
        console.error(`Failed to load quiz ${selectedQuizId}:`, err);
        setQuizLoading(false);
      });
  }, [selectedQuizId]);

  // Filtered questions based on search term
  const filteredQuestions = useMemo(() => {
    if (!currentQuiz?.questions) return [];
    if (!searchTerm.trim()) return currentQuiz.questions;
    const term = searchTerm.toLowerCase();
    return currentQuiz.questions.filter((q) =>
      q.Q.toLowerCase().includes(term) ||
      (q.com && q.com.toLowerCase().includes(term)) ||
      (q.O1 && q.O1.toLowerCase().includes(term)) ||
      (q.O2 && q.O2.toLowerCase().includes(term)) ||
      (q.O3 && q.O3.toLowerCase().includes(term)) ||
      (q.O4 && q.O4.toLowerCase().includes(term)) ||
      q.id.toString().includes(term)
    );
  }, [currentQuiz, searchTerm]);

  const handleSelectOption = (questionId: number, optIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optIndex,
    }));
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px', fontFamily: 'inherit' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1a2a3a 0%, #2c3e50 100%)',
          color: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span
                style={{
                  backgroundColor: '#f39c12',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                PRO LOCAL DB VIEWER
              </span>
              <span
                style={{
                  backgroundColor: '#27ae60',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '4px',
                }}
              >
                SQLite Connected
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>
              AyurQuest Extracted Question Bank Explorer
            </h1>
            <p style={{ margin: '6px 0 0 0', opacity: 0.85, fontSize: '14px' }}>
              Inspecting real verified test datasets with Sanskrit/Hindi bilingual stems, 4 options, verified answer keys, and classical commentaries.
            </p>
          </div>

          <div style={{ textAlign: 'right', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: '8px', minWidth: '110px' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#f1c40f' }}>{quizzes.length}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Available Tests</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: '8px', minWidth: '110px' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#2ecc71' }}>
                {quizzes.reduce((acc, q) => acc + (q.q || 0), 0)}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Total Questions</div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#7f8c8d' }}>
          <div style={{ fontSize: '18px', fontWeight: 600 }}>Loading Test Datasets from Local Database...</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Left Column: Test Selector Sidebar */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #e2e8f0',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
              position: 'sticky',
              top: '80px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#2c3e50' }}>
                Extracted Tests ({quizzes.length})
              </h3>
              <span style={{ fontSize: '11px', color: '#7f8c8d', backgroundColor: '#edf2f7', padding: '2px 6px', borderRadius: '4px' }}>
                50 Qs / Test
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {quizzes.map((q, idx) => {
                const isSelected = q.id === selectedQuizId;
                return (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuizId(q.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'left',
                      padding: '12px',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #3498db' : '1px solid #e2e8f0',
                      backgroundColor: isSelected ? '#ebf5fb' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: isSelected ? '#2980b9' : '#7f8c8d' }}>
                        #{idx + 1} &bull; ID: {q.id}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: isSelected ? '#3498db' : '#27ae60',
                          color: '#ffffff',
                          padding: '1px 6px',
                          borderRadius: '10px',
                        }}
                      >
                        {q.q} Qs
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: isSelected ? '#1b4f72' : '#2d3748',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {q.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#718096', marginTop: '4px' }}>
                      Subject: {q.sub || 'Ayurveda'} &bull; Marks: {q.m || 200}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Questions Display Viewport */}
          <div>
            {quizLoading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', backgroundColor: '#ffffff', borderRadius: '10px' }}>
                <div style={{ fontSize: '16px', color: '#7f8c8d' }}>Fetching test questions...</div>
              </div>
            ) : currentQuiz ? (
              <div>
                {/* Active Test Card Info */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    padding: '20px',
                    marginBottom: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ backgroundColor: '#3498db', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                          TEST ID: {currentQuiz.id}
                        </span>
                        <span style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px' }}>
                          {currentQuiz.category || 'Daily Free Revision'}
                        </span>
                      </div>
                      <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#1a202c' }}>
                        {currentQuiz.name}
                      </h2>
                      <div style={{ fontSize: '13px', color: '#718096', marginTop: '4px' }}>
                        Subject: <strong>{currentQuiz.sub}</strong> &bull; Total Questions: <strong>{currentQuiz.questions?.length || currentQuiz.q}</strong> &bull; Duration: <strong>{currentQuiz.qt} mins</strong> &bull; Max Marks: <strong>{currentQuiz.m}</strong>
                      </div>
                    </div>

                    {/* View Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => setRevealAll(!revealAll)}
                        style={{
                          backgroundColor: revealAll ? '#27ae60' : '#7f8c8d',
                          color: '#ffffff',
                          border: 'none',
                          padding: '8px 14px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        {revealAll ? '✓ Answers & Notes Visible' : '👁️ Reveal Mode: On Click'}
                      </button>
                    </div>
                  </div>

                  {/* Search Bar & Quick Jump */}
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #edf2f7' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
                      <input
                        type="text"
                        placeholder="Search within this test (e.g., Sanskrit term, commentary, question ID)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          fontSize: '13px',
                          outline: 'none',
                        }}
                      />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          style={{
                            padding: '8px 12px',
                            background: '#e2e8f0',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Question quick jump palette */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxHeight: '72px', overflowY: 'auto' }}>
                      {currentQuiz.questions?.map((_, qIdx) => (
                        <a
                          key={qIdx}
                          href={`#question-${qIdx + 1}`}
                          style={{
                            width: '28px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: 700,
                            backgroundColor: '#f1f5f9',
                            color: '#334155',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            border: '1px solid #e2e8f0',
                          }}
                        >
                          {qIdx + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Questions List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredQuestions.map((q: Question, idx: number) => {
                    const isRevealed = revealAll || selectedAnswers[q.id] !== undefined;
                    const correctOption = q.A; // 1, 2, 3, or 4

                    return (
                      <div
                        key={q.id}
                        id={`question-${idx + 1}`}
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '10px',
                          padding: '20px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                        }}
                      >
                        {/* Question Metadata Header */}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #f1f5f9',
                            paddingBottom: '10px',
                            marginBottom: '14px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                              style={{
                                backgroundColor: '#2c3e50',
                                color: '#ffffff',
                                fontWeight: 800,
                                fontSize: '12px',
                                padding: '3px 8px',
                                borderRadius: '4px',
                              }}
                            >
                              Q.{idx + 1}
                            </span>
                            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                              DB ID: #{q.id}
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            {q.sam && (
                              <span style={{ fontSize: '11px', backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                                {q.sam}
                              </span>
                            )}
                            {q.sub && (
                              <span style={{ fontSize: '11px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                                {q.sub}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Question Stem (Bilingual Sanskrit / Hindi / English) */}
                        <div
                          style={{
                            fontSize: '15px',
                            fontWeight: 600,
                            lineHeight: 1.6,
                            color: '#1e293b',
                            marginBottom: '16px',
                          }}
                          dangerouslySetInnerHTML={{ __html: q.Q }}
                        />

                        {/* 4 Options Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: '14px' }}>
                          {[
                            { optNum: 1, text: q.O1, label: 'A' },
                            { optNum: 2, text: q.O2, label: 'B' },
                            { optNum: 3, text: q.O3, label: 'C' },
                            { optNum: 4, text: q.O4, label: 'D' },
                          ].map((opt) => {
                            const isCorrect = opt.optNum === correctOption;
                            const isSelected = selectedAnswers[q.id] === opt.optNum;

                            let bgColor = '#f8fafc';
                            let borderColor = '#e2e8f0';
                            let textColor = '#334155';

                            if (isRevealed && isCorrect) {
                              bgColor = '#e8f8f0';
                              borderColor = '#27ae60';
                              textColor = '#1e7e44';
                            } else if (isRevealed && isSelected && !isCorrect) {
                              bgColor = '#fde8e8';
                              borderColor = '#e74c3c';
                              textColor = '#c0392b';
                            }

                            return (
                              <div
                                key={opt.optNum}
                                onClick={() => handleSelectOption(q.id, opt.optNum)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '10px 14px',
                                  borderRadius: '8px',
                                  border: `1.5px solid ${borderColor}`,
                                  backgroundColor: bgColor,
                                  cursor: 'pointer',
                                  transition: 'background-color 0.1s ease',
                                }}
                              >
                                <span
                                  style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: isRevealed && isCorrect ? '#27ae60' : isSelected ? '#3498db' : '#cbd5e1',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    marginRight: '12px',
                                    flexShrink: 0,
                                  }}
                                >
                                  {opt.label}
                                </span>
                                <div
                                  style={{ fontSize: '14px', color: textColor, fontWeight: isRevealed && isCorrect ? 700 : 500, flex: 1 }}
                                  dangerouslySetInnerHTML={{ __html: opt.text }}
                                />
                                {isRevealed && isCorrect && (
                                  <span
                                    style={{
                                      fontSize: '11px',
                                      fontWeight: 800,
                                      color: '#27ae60',
                                      backgroundColor: '#ffffff',
                                      border: '1px solid #27ae60',
                                      padding: '2px 8px',
                                      borderRadius: '4px',
                                      marginLeft: '10px',
                                    }}
                                  >
                                    ✓ Correct
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Classical Commentary & Answer Key Box */}
                        {isRevealed && (
                          <div
                            style={{
                              backgroundColor: '#f0fdf4',
                              borderLeft: '4px solid #22c55e',
                              borderRadius: '0 8px 8px 0',
                              padding: '12px 16px',
                              marginTop: '12px',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <span style={{ fontSize: '12px', fontWeight: 800, color: '#15803d' }}>
                                Correct Option: {correctOption === 1 ? 'A' : correctOption === 2 ? 'B' : correctOption === 3 ? 'C' : 'D'}
                              </span>
                              <span style={{ fontSize: '11px', color: '#16a34a' }}>
                                (Option #{correctOption})
                              </span>
                            </div>
                            <div style={{ fontSize: '13px', color: '#14532d', lineHeight: 1.5 }}>
                              <strong>Classical Reference &amp; Commentary:</strong>{' '}
                              <span dangerouslySetInnerHTML={{ __html: q.com || 'Classical commentary and Samhita reference verified in AyurQuest database.' }} />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0', backgroundColor: '#ffffff', borderRadius: '10px' }}>
                <div style={{ fontSize: '16px', color: '#7f8c8d' }}>Please select a test from the left column to view questions.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

