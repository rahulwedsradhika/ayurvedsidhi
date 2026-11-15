import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { PageHeroIllustration } from '../../components/PageHeroIllustration';
import { QBANK_SUBJECTS, QBANK_SAMHITAS, TOTAL_QBANK_COUNT } from '../../data/qbankCatalog';
import { api } from '../../api/client';
import { Question } from '../../types';

export const CategoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const action = searchParams.get('action');
  const subjectParam = searchParams.get('subject') || searchParams.get('subject_name') || '';
  const samhitaParam = searchParams.get('samhita') || searchParams.get('samhita_name') || '';

  // Live database stats
  const [subjectDbStats, setSubjectDbStats] = useState<Record<string, number>>({});
  const [samhitaDbStats, setSamhitaDbStats] = useState<Record<string, number>>({});
  const [filterQuery, setFilterQuery] = useState('');

  // Questions viewer state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [qSearchTerm, setQSearchTerm] = useState('');
  const [revealAllAnswers, setRevealAllAnswers] = useState(true);
  const [pageOffset, setPageOffset] = useState(0);
  const pageSize = 50;

  // Fetch DB stats once
  useEffect(() => {
    api.getSubjectStats()
      .then((stats) => {
        const map: Record<string, number> = {};
        stats.forEach((s) => {
          map[s.subject_name.toLowerCase()] = s.count;
        });
        setSubjectDbStats(map);
      })
      .catch((err) => console.warn('Could not load subject stats:', err));

    api.getSamhitaStats()
      .then((stats) => {
        const map: Record<string, number> = {};
        stats.forEach((s) => {
          map[s.samhita_name.toLowerCase()] = s.count;
        });
        setSamhitaDbStats(map);
      })
      .catch((err) => console.warn('Could not load samhita stats:', err));
  }, []);

  // Fetch real questions when action === 'questions'
  useEffect(() => {
    if (action === 'questions') {
      setLoadingQuestions(true);
      api.getQuestions({
        subject_name: subjectParam || undefined,
        samhita_name: samhitaParam || undefined,
        search: qSearchTerm.trim() || undefined,
        limit: pageSize,
        offset: pageOffset
      })
        .then((data) => {
          setQuestions(data);
          setLoadingQuestions(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch((err) => {
          console.error('Failed to load questions:', err);
          setLoadingQuestions(false);
        });
    }
  }, [action, subjectParam, samhitaParam, pageOffset, qSearchTerm]);

  // ==========================================
  // VIEW: REAL QUESTIONS VIEWER (?action=questions)
  // ==========================================
  if (action === 'questions') {
    const title = subjectParam || samhitaParam || 'All Questions';
    const activeType = subjectParam ? 'Subject' : 'Samhita';

    return (
      <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 50px)', paddingBottom: 60 }}>
        {/* Header Banner */}
        <div style={{
          backgroundColor: '#1b3a57',
          color: '#fff',
          padding: '24px 20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <button
                  onClick={() => navigate(subjectParam ? '/app1.5/category.php?action=subjects' : '/app1.5/category.php?action=samhitas')}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.3)',
                    padding: '6px 14px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 13,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 8
                  }}
                >
                  <i className="fa fa-arrow-left"></i> Back to {activeType}s
                </button>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
                  <i className="fa fa-book-open" style={{ marginRight: 10, color: '#00c0ef' }}></i>
                  {title}
                </h2>
                <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>
                  Displaying Real Bilingual Questions with Answer Keys & Classical Commentary
                </div>
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <button
                  onClick={() => setRevealAllAnswers(!revealAllAnswers)}
                  style={{
                    backgroundColor: revealAllAnswers ? '#00a65a' : '#f39c12',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <i className={`fa ${revealAllAnswers ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                  {revealAllAnswers ? 'Answers Revealed' : 'Answers Hidden'}
                </button>
              </div>
            </div>

            {/* Search within questions */}
            <div style={{ marginTop: 16 }}>
              <input
                type="text"
                placeholder="Search question stem, Sanskrit/Hindi text, options, or classical reference..."
                value={qSearchTerm}
                onChange={(e) => {
                  setQSearchTerm(e.target.value);
                  setPageOffset(0);
                }}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: 6,
                  border: '1px solid #ced4da',
                  fontSize: 14,
                  backgroundColor: '#fff',
                  color: '#333'
                }}
              />
            </div>
          </div>
        </div>

        {/* Question Deck Container */}
        <div style={{ maxWidth: 1100, margin: '24px auto', padding: '0 15px' }}>
          {loadingQuestions ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <i className="fa fa-spinner fa-spin fa-3x" style={{ color: '#00c0ef' }}></i>
              <div style={{ marginTop: 12, fontSize: 16, fontWeight: 600, color: '#555' }}>
                Loading questions from SQLite database...
              </div>
            </div>
          ) : questions.length === 0 ? (
            <div style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              padding: '50px 20px',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
            }}>
              <i className="fa fa-info-circle fa-3x text-muted" style={{ marginBottom: 15 }}></i>
              <h3 style={{ fontSize: 18, color: '#333', marginBottom: 8 }}>No questions found in this filter yet</h3>
              <p style={{ color: '#666', fontSize: 14, maxWidth: 500, margin: '0 auto 20px auto' }}>
                Run the extractor script <code>python scripts/extract_question_bank.py --subject &lt;id&gt;</code> to ingest more questions directly from the AyurQuest Question Bank.
              </p>
              <button
                onClick={() => {
                  setQSearchTerm('');
                  setPageOffset(0);
                }}
                className="btn btn-primary"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div>
              {/* Pagination Top Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
                backgroundColor: '#fff',
                padding: '12px 18px',
                borderRadius: 8,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#555' }}>
                  Showing questions {pageOffset + 1} - {pageOffset + questions.length}
                </span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    disabled={pageOffset === 0}
                    onClick={() => setPageOffset(Math.max(0, pageOffset - pageSize))}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 4,
                      border: '1px solid #ccc',
                      backgroundColor: pageOffset === 0 ? '#f5f5f5' : '#fff',
                      cursor: pageOffset === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    &laquo; Previous
                  </button>
                  <button
                    disabled={questions.length < pageSize}
                    onClick={() => setPageOffset(pageOffset + pageSize)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 4,
                      border: '1px solid #ccc',
                      backgroundColor: questions.length < pageSize ? '#f5f5f5' : '#fff',
                      cursor: questions.length < pageSize ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Next &raquo;
                  </button>
                </div>
              </div>

              {/* Questions List */}
              {questions.map((q, idx) => {
                const qNum = pageOffset + idx + 1;
                const options = [
                  { label: 'A', text: q.O1, num: 1 },
                  { label: 'B', text: q.O2, num: 2 },
                  { label: 'C', text: q.O3, num: 3 },
                  { label: 'D', text: q.O4, num: 4 }
                ];
                const correctAns = typeof q.A === 'string' ? parseInt(q.A) : q.A;

                return (
                  <div
                    key={q.id || idx}
                    id={`q-${qNum}`}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 8,
                      marginBottom: 20,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                      border: '1px solid #e2e8f0',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Card Header */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      padding: '12px 18px',
                      borderBottom: '1px solid #edf2f7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 8
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          backgroundColor: '#1b3a57',
                          color: '#fff',
                          padding: '3px 10px',
                          borderRadius: 4,
                          fontSize: 13,
                          fontWeight: 700
                        }}>
                          Q {qNum}
                        </span>
                        <span style={{ fontSize: 12, color: '#718096' }}>
                          ID: #{q.id}
                        </span>
                        {q.sub && (
                          <span style={{
                            backgroundColor: '#e6fffa',
                            color: '#234e52',
                            padding: '2px 8px',
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 600
                          }}>
                            {q.sub}
                          </span>
                        )}
                        {q.sam && q.sam !== 'Charaka Samhita' && (
                          <span style={{
                            backgroundColor: '#feebc8',
                            color: '#7b341e',
                            padding: '2px 8px',
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 600
                          }}>
                            {q.sam}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: '#4a5568' }}>
                        {revealAllAnswers && (
                          <span style={{
                            backgroundColor: '#c6f6d5',
                            color: '#22543d',
                            padding: '3px 10px',
                            borderRadius: 12,
                            fontWeight: 700
                          }}>
                            Correct: Option {String.fromCharCode(64 + correctAns)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question Stem */}
                    <div style={{ padding: '18px 20px' }}>
                      <div
                        style={{ fontSize: 16, lineHeight: 1.6, color: '#2d3748', fontWeight: 600 }}
                        dangerouslySetInnerHTML={{ __html: q.Q }}
                      />

                      {/* 4 Options Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginTop: 16 }}>
                        {options.map((opt) => {
                          const isCorrect = opt.num === correctAns;
                          const showHighlight = revealAllAnswers && isCorrect;

                          return (
                            <div
                              key={opt.num}
                              style={{
                                padding: '12px 14px',
                                borderRadius: 6,
                                border: showHighlight ? '2px solid #38a169' : '1px solid #e2e8f0',
                                backgroundColor: showHighlight ? '#f0fff4' : '#fff',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 10,
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <span style={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                backgroundColor: showHighlight ? '#38a169' : '#edf2f7',
                                color: showHighlight ? '#fff' : '#4a5568',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 12,
                                fontWeight: 700,
                                flexShrink: 0
                              }}>
                                {showHighlight ? '✓' : opt.label}
                              </span>
                              <div
                                style={{
                                  fontSize: 14,
                                  color: showHighlight ? '#22543d' : '#4a5568',
                                  fontWeight: showHighlight ? 600 : 400
                                }}
                                dangerouslySetInnerHTML={{ __html: opt.text }}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation & Classical Reference Source */}
                      {revealAllAnswers && q.com && (
                        <div style={{
                          marginTop: 18,
                          padding: '12px 16px',
                          borderRadius: 6,
                          backgroundColor: '#ebf8ff',
                          borderLeft: '4px solid #3182ce',
                          fontSize: 13,
                          color: '#2b6cb0'
                        }}>
                          <div style={{ fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <i className="fa fa-info-circle"></i> Classical Commentary & Verified Reference:
                          </div>
                          <div dangerouslySetInnerHTML={{ __html: q.com }} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Bottom Pagination */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 12,
                marginTop: 24,
                marginBottom: 30
              }}>
                <button
                  disabled={pageOffset === 0}
                  onClick={() => setPageOffset(Math.max(0, pageOffset - pageSize))}
                  className="btn btn-default"
                  style={{ minWidth: 120 }}
                >
                  &laquo; Previous 50
                </button>
                <button
                  disabled={questions.length < pageSize}
                  onClick={() => setPageOffset(pageOffset + pageSize)}
                  className="btn btn-primary"
                  style={{ minWidth: 120 }}
                >
                  Next 50 &raquo;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 1: Samhitawise Questions List (?action=samhitas)
  // ==========================================
  if (action === 'samhitas') {
    const filteredSamhitas = QBANK_SAMHITAS.filter(s =>
      !filterQuery.trim() ||
      s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      (s.hindiName && s.hindiName.includes(filterQuery))
    );

    return (
      <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
        <PageHeroIllustration type="samhitas" />
        <div style={{ textAlign: 'center', padding: '16px 0 12px 0', borderBottom: '1px solid #eee' }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2c3e50', letterSpacing: 0.5 }}>
            SAMHITA WISE QUESTIONS ({QBANK_SAMHITAS.length} Classical Texts)
          </h3>
        </div>

        {/* Search */}
        <div style={{ maxWidth: 1100, margin: '16px auto', padding: '0 15px' }}>
          <input
            type="text"
            placeholder="Search Samhita (e.g. Charaka, Sushruta, Ashtanga, Madhava)..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 6,
              border: '1px solid #ddd',
              fontSize: 14
            }}
          />
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {filteredSamhitas.map(item => {
            const dbCount = samhitaDbStats[item.name.toLowerCase()] || 0;
            return (
              <div
                key={item.id}
                onClick={() => navigate(`/app1.5/category.php?action=questions&samhita=${encodeURIComponent(item.name)}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px 20px',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  gap: 20,
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafcfe')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ textAlign: 'center', width: 65, flexShrink: 0 }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: '#d81b60',
                    color: '#fff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 14
                  }}>
                    ?
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#333', marginTop: 4 }}>
                    {item.count}
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, color: '#2c3e50' }}>
                    <i className="fa fa-book text-aqua"></i>
                    <span>{item.name} {item.hindiName ? `(${item.hindiName})` : ''}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#777', marginTop: 4, display: 'flex', gap: 12 }}>
                    <span>
                      <i className="fa fa-question-circle" style={{ color: '#d81b60', marginRight: 4 }}></i>
                      Catalog Total: <strong>{item.count} MCQs</strong>
                    </span>
                    {dbCount > 0 && (
                      <span style={{ color: '#00a65a', fontWeight: 600 }}>
                        <i className="fa fa-check-circle" style={{ marginRight: 4 }}></i>
                        {dbCount} In Local SQLite
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <button
                    className="btn btn-sm btn-primary"
                    style={{ fontSize: 12, fontWeight: 600 }}
                  >
                    Explore MCQs &raquo;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: Subjectwise Questions List (?action=subjects)
  // ==========================================
  if (action === 'subjects') {
    const filteredSubjects = QBANK_SUBJECTS.filter(s =>
      !filterQuery.trim() ||
      s.name.toLowerCase().includes(filterQuery.toLowerCase())
    );

    return (
      <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
        <PageHeroIllustration type="subjects" />
        <div style={{ textAlign: 'center', padding: '16px 0 12px 0', borderBottom: '1px solid #eee' }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2c3e50', letterSpacing: 0.5 }}>
            SUBJECTWISE QUESTIONS ({QBANK_SUBJECTS.length} Subjects, {TOTAL_QBANK_COUNT.toLocaleString()} MCQs)
          </h3>
        </div>

        {/* Search */}
        <div style={{ maxWidth: 1100, margin: '16px auto', padding: '0 15px' }}>
          <input
            type="text"
            placeholder="Search Subject (e.g. Kayachikitsa, Rog Nidana, Dravyaguna, Shalya Tantra)..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 6,
              border: '1px solid #ddd',
              fontSize: 14
            }}
          />
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {filteredSubjects.map(item => {
            const dbCount = subjectDbStats[item.name.toLowerCase()] || 0;
            return (
              <div
                key={item.id}
                onClick={() => navigate(`/app1.5/category.php?action=questions&subject=${encodeURIComponent(item.name)}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafcfe')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    width: 28,
                    height: 28,
                    borderRadius: 4,
                    backgroundColor: '#eaf4fd',
                    color: '#2980b9',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 12
                  }}>
                    {item.id}
                  </span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#2c3e50' }}>
                      {item.name}
                    </div>
                    {dbCount > 0 && (
                      <div style={{ fontSize: 11, color: '#00a65a', fontWeight: 600, marginTop: 2 }}>
                        <i className="fa fa-database" style={{ marginRight: 4 }}></i>
                        {dbCount} Extracted in Local SQLite
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    backgroundColor: '#1b3a57',
                    color: '#fff',
                    padding: '4px 14px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 700
                  }}>
                    {item.count.toLocaleString()} MCQs
                  </span>
                  <i className="fa fa-chevron-right text-muted" style={{ fontSize: 12 }}></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: Tagwise Questions List (?action=tags)
  // ==========================================
  if (action === 'tags') {
    const tagsList = [
      { id: 'statement', name: "Statement MCQs", count: 5070 },
      { id: 'reason_assertion', name: "Reason Assertion MCQs", count: 416 },
      { id: 'match_making', name: "Match Making MCQs", count: 208 },
      { id: 'numerical', name: "Numerical MCQs", count: 1740 },
      { id: 'fill_blank', name: "Fill in blank MCQs", count: 2120 },
      { id: 'image', name: "Image MCQs", count: 199 }
    ];

    return (
      <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
        <PageHeroIllustration type="tags" />
        <div style={{ textAlign: 'center', padding: '16px 0 12px 0', borderBottom: '1px solid #eee' }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2c3e50', letterSpacing: 0.5 }}>
            TAG WISE QUESTIONS
          </h3>
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {tagsList.map(item => (
            <div
              key={item.id}
              onClick={() => navigate(`/quiz/practice?tag=${item.id}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafcfe')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, color: '#2c3e50' }}>
                <i className="fa fa-book text-aqua"></i>
                <span>{item.name}</span>
              </div>
              <span style={{
                backgroundColor: '#1b3a57',
                color: '#fff',
                padding: '4px 14px',
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 700
              }}>
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 4: Default Question Bank Home (/app1.5/category.php)
  // ==========================================
  return (
    <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
      {/* Top Graphic */}
      <div style={{
        backgroundColor: '#eef9fb',
        padding: '24px 15px',
        textAlign: 'center',
        borderBottom: '1px solid #d8edf3'
      }}>
        <h2 style={{ margin: '0 0 6px 0', color: '#1b3a57', fontWeight: 700 }}>
          AYURQUEST MCQ QUESTION BANK
        </h2>
        <p style={{ margin: 0, color: '#555', fontSize: 14 }}>
          Comprehensive Repository of 57,375 Bilingual Ayurvedic MCQs with Official Citations
        </p>
      </div>

      {/* 3 Stats Columns */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        borderBottom: '1px solid #eee',
        padding: '16px 0',
        textAlign: 'center'
      }}>
        <div style={{ flex: 1, borderRight: '1px solid #eee' }}>
          <div style={{ fontSize: 12, color: '#888' }}>Total Question Bank</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#1b3a57' }}>{TOTAL_QBANK_COUNT.toLocaleString()}</div>
        </div>
        <div style={{ flex: 1, borderRight: '1px solid #eee' }}>
          <div style={{ fontSize: 12, color: '#888' }}>Available in Local SQLite</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#00a65a' }}>
            {Object.values(subjectDbStats).reduce((a, b) => a + b, 0).toLocaleString()}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: '#888' }}>Total Subjects</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#2980b9' }}>{QBANK_SUBJECTS.length}</div>
        </div>
      </div>

      {/* 2 Main Action Cards: Subjects & Samhitas */}
      <div style={{
        maxWidth: 1100,
        margin: '24px auto',
        padding: '0 15px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20
      }}>
        {/* Subjectwise Questions Card */}
        <div
          onClick={() => navigate('/app1.5/category.php?action=subjects')}
          style={{
            backgroundColor: '#fff',
            borderRadius: 8,
            border: '2px solid #2980b9',
            padding: 24,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(41, 128, 185, 0.1)',
            transition: 'transform 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <div style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              backgroundColor: '#eaf4fd',
              color: '#2980b9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24
            }}>
              <i className="fa fa-folder-open"></i>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1b3a57' }}>
                Subjectwise MCQs
              </h3>
              <div style={{ fontSize: 13, color: '#777' }}>
                38 Ayurvedic & Modern Subjects
              </div>
            </div>
          </div>
          <p style={{ color: '#555', fontSize: 13, lineHeight: 1.5 }}>
            Browse 57,375 questions organized by Kayachikitsa, Rog Nidana, Dravyaguna Vigyan, Shalya, Shalakya, Panchkarma, and 32 more subjects.
          </p>
          <div style={{ marginTop: 16, fontWeight: 700, color: '#2980b9', fontSize: 14 }}>
            Explore 38 Subjects &raquo;
          </div>
        </div>

        {/* Samhitawise Questions Card */}
        <div
          onClick={() => navigate('/app1.5/category.php?action=samhitas')}
          style={{
            backgroundColor: '#fff',
            borderRadius: 8,
            border: '2px solid #d81b60',
            padding: 24,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(216, 27, 96, 0.1)',
            transition: 'transform 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <div style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              backgroundColor: '#fde8ef',
              color: '#d81b60',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24
            }}>
              <i className="fa fa-book"></i>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1b3a57' }}>
                Samhitawise MCQs
              </h3>
              <div style={{ fontSize: 13, color: '#777' }}>
                16 Classical Ayurvedic Texts
              </div>
            </div>
          </div>
          <p style={{ color: '#555', fontSize: 13, lineHeight: 1.5 }}>
            Practice questions chapter-by-chapter from Charaka (11,175 Qs), Sushruta (8,709 Qs), Ashtanga Hridaya (6,229 Qs), Madhava Nidana, and other Brihatrayi/Laghutrayi texts.
          </p>
          <div style={{ marginTop: 16, fontWeight: 700, color: '#d81b60', fontSize: 14 }}>
            Explore 16 Samhitas &raquo;
          </div>
        </div>
      </div>
    </div>
  );
};
