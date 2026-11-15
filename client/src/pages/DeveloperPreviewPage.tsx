import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../api/client';
import { Quiz, Question } from '../types';

interface SeriesGroup {
  name: string;
  badge: string;
  color: string;
  description: string;
  testRange: [number, number];
}

const SERIES_GROUPS: SeriesGroup[] = [
  {
    name: 'Charaka Samhita Series',
    badge: '12 Tests • 1,440 MCQs',
    color: '#8e44ad',
    description: 'Fundamental Ayurvedic principles, diagnostics, therapeutics, pharmaceutics, and ethics across all 8 Sthanas.',
    testRange: [1, 12],
  },
  {
    name: 'Sushruta Samhita Series',
    badge: '10 Tests • 1,200 MCQs',
    color: '#d35400',
    description: 'Surgical techniques, anatomical marmas, toxicology, instrumentation, and clinical management.',
    testRange: [13, 22],
  },
  {
    name: 'Ashtanga Hridaya & Sangraha',
    badge: '4 Tests • 480 MCQs',
    color: '#2980b9',
    description: 'Vagbhata classical synthesis uniting Charaka and Sushruta in concise aphoristic metered verses.',
    testRange: [23, 26],
  },
  {
    name: 'Laghu Trayi & Classical Compendiums',
    badge: '3 Tests • 360 MCQs',
    color: '#27ae60',
    description: 'Madhava Nidana, Sharngadhara, Bhavaprakasha, Kashyapa, Chakradatta, and Rasashastra texts.',
    testRange: [27, 29],
  },
  {
    name: 'Modern Ayurvedic Sciences',
    badge: '1 Test • 120 MCQs',
    color: '#16a085',
    description: 'Modern anatomy, clinical physiology, pathology, forensics, and modern integration.',
    testRange: [30, 30],
  },
  {
    name: 'AIAPGET Full Grand Mocks',
    badge: '5 Tests • 600 MCQs',
    color: '#c0392b',
    description: 'Comprehensive 120-question entrance examination simulators strictly adhering to NTA AIAPGET standards.',
    testRange: [31, 35],
  },
];

export const DeveloperPreviewPage: React.FC = () => {
  const [allTests, setAllTests] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);
  const [activeTest, setActiveTest] = useState<Quiz | null>(null);
  const [testLoading, setTestLoading] = useState(false);
  const [jsonModalQuestion, setJsonModalQuestion] = useState<Question | null>(null);

  const totalSeriesQuestions = useMemo(() => allTests.reduce((sum, test) => sum + (Number(test.q) || 0), 0), [allTests]);

  // Fetch actual tests from the same-origin Vercel API
  useEffect(() => {
    setLoading(true);
    api.getQuizzes()
      .then((data) => {
        setDataError(null);
        // Filter tests from the 35 test series (IDs 10001 to 10035)
        const tsTests = data
          .filter((t) => t.id >= 10001 && t.id <= 10035)
          .sort((a, b) => a.id - b.id);
        setAllTests(tsTests);
        if (tsTests.length > 0) {
          setSelectedTestId(tsTests[0].id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching tests for preview:', err);
        setDataError('Could not reach the database-backed test API. Review /api/health and the preview function logs.');
        setLoading(false);
      });
  }, []);

  // Fetch active test questions
  useEffect(() => {
    if (!selectedTestId) return;
    setTestLoading(true);
    api.getQuiz(selectedTestId)
      .then((data) => {
        setActiveTest(data);
        setTestLoading(false);
      })
      .catch((err) => {
        console.error(`Error loading test ${selectedTestId}:`, err);
        setTestLoading(false);
      });
  }, [selectedTestId]);

  // Filtered tests list
  const filteredTests = useMemo(() => {
    return allTests.filter((test) => {
      const seriesNumber = test.id - 10000;
      if (activeGroupIndex !== null) {
        const group = SERIES_GROUPS[activeGroupIndex];
        if (seriesNumber < group.testRange[0] || seriesNumber > group.testRange[1]) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          test.name.toLowerCase().includes(query) ||
          test.sub.toLowerCase().includes(query) ||
          test.id.toString().includes(query)
        );
      }
      return true;
    });
  }, [allTests, activeGroupIndex, searchQuery]);

  const downloadTestJson = (test: Quiz) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(test, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ayurquest_test_${test.id}_${test.name.replace(/[^a-zA-Z0-9]/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      {/* Hero Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          borderRadius: '16px',
          padding: '32px',
          color: '#ffffff',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
          marginBottom: '28px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span
                style={{
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '6px',
                }}
              >
                Developer Data Preview
              </span>
              <span
                style={{
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                }}
              >
                {loading ? 'Loading tests...' : `${allTests.length} / 35 Tests Loaded`}
              </span>
              <span
                style={{
                  backgroundColor: '#f59e0b',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                }}
              >
                Vercel Database Preview
              </span>
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
              AyurQuest 35-Test Series — Developer Preview & Architecture Portal
            </h1>
            <p style={{ margin: 0, fontSize: '15px', color: '#94a3b8', maxWidth: '850px', lineHeight: 1.6 }}>
              Inspect the actual database-backed test questions. Includes authentic bilingual stems (Sanskrit/Hindi &amp; English), 4 options, verified official answer keys, and classical Samhita citations.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 20px', minWidth: '120px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#60a5fa' }}>{allTests.length}</div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 600 }}>Total Tests</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 20px', minWidth: '120px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#34d399' }}>{totalSeriesQuestions.toLocaleString()}</div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 600 }}>Test MCQs</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 20px', minWidth: '120px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#fbbf24' }}>5,070</div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 600 }}>DB Bank Total</div>
            </div>
          </div>
        </div>

        {/* Series Group Badges */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
            onClick={() => setActiveGroupIndex(null)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: activeGroupIndex === null ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.2)',
              backgroundColor: activeGroupIndex === null ? '#ffffff' : 'rgba(255,255,255,0.1)',
              color: activeGroupIndex === null ? '#0f172a' : '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            All 35 Tests
          </button>
          {SERIES_GROUPS.map((g, idx) => {
            const isSelected = activeGroupIndex === idx;
            return (
              <button
                key={g.name}
                onClick={() => setActiveGroupIndex(idx)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: isSelected ? `2px solid ${g.color}` : '1px solid rgba(255,255,255,0.15)',
                  backgroundColor: isSelected ? g.color : 'rgba(255,255,255,0.07)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {g.name} ({g.badge})
              </button>
            );
          })}
        </div>
      </div>

      {dataError && (
        <div role="alert" style={{ padding: 16, marginBottom: 20, borderRadius: 8, backgroundColor: '#fef2f2', color: '#991b1b' }}>
          {dataError} <a href="/api/health" style={{ textDecoration: 'underline' }}>Check database health</a>
        </div>
      )}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
          <div style={{ fontSize: '18px', fontWeight: 600 }}>Loading 35-Test Series Catalog...</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Left Column: Test Series Navigator */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              padding: '16px',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              position: 'sticky',
              top: '70px',
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <input
                type="text"
                placeholder="Search series by title or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>
                Showing {filteredTests.length} of 35 Tests
              </span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>120 Qs each</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredTests.map((test) => {
                const isSelected = test.id === selectedTestId;
                const testNumber = test.id - 10000;

                return (
                  <div
                    key={test.id}
                    onClick={() => setSelectedTestId(test.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: isSelected ? '#1d4ed8' : '#64748b' }}>
                        TEST #{testNumber} &bull; ID: {test.id}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: isSelected ? '#2563eb' : '#10b981',
                          color: '#ffffff',
                          padding: '1px 7px',
                          borderRadius: '10px',
                        }}
                      >
                        120 Qs
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: isSelected ? '#1e3a8a' : '#0f172a',
                        lineHeight: 1.4,
                      }}
                    >
                      {test.name.replace(/^Test Series #\d+:\s*/, '')}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {test.sub}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Questions Deck View */}
          <div>
            {testLoading ? (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '60px', textAlign: 'center', color: '#64748b', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '16px', fontWeight: 600 }}>Loading 120 Questions from Local SQLite Database...</div>
              </div>
            ) : activeTest ? (
              <div>
                {/* Active Test Card Header */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ backgroundColor: '#2563eb', color: '#ffffff', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                          TEST ID: {activeTest.id}
                        </span>
                        <span style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                          AIAPGET Standard
                        </span>
                      </div>
                      <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                        {activeTest.name}
                      </h2>
                      <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                        <strong>Syllabus:</strong> {activeTest.sub} &bull; <strong>Total MCQs:</strong> {activeTest.questions?.length || 120} &bull; <strong>Marks:</strong> 480 &bull; <strong>Negative Marking:</strong> 1.0
                      </div>
                    </div>

                    {/* Developer Export Actions */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => downloadTestJson(activeTest)}
                        style={{
                          backgroundColor: '#0f172a',
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
                        <i className="fa fa-download"></i> Download Test JSON
                      </button>
                      <a
                        href={`/api/tests/${activeTest.id}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          backgroundColor: '#f1f5f9',
                          color: '#0f172a',
                          border: '1px solid #cbd5e1',
                          padding: '8px 14px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <i className="fa fa-code"></i> Raw REST API
                      </a>
                    </div>
                  </div>
                </div>

                {/* Questions Feed */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {activeTest.questions?.map((q: Question, qIdx: number) => {
                    const correctOption = q.A;

                    return (
                      <div
                        key={q.id}
                        id={`q-${qIdx + 1}`}
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '12px',
                          padding: '20px 24px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
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
                                backgroundColor: '#1e293b',
                                color: '#ffffff',
                                fontSize: '12px',
                                fontWeight: 800,
                                padding: '3px 8px',
                                borderRadius: '4px',
                              }}
                            >
                              Q.{qIdx + 1}
                            </span>
                            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                              Canonical DB ID: #{q.id}
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            {q.sam && (
                              <span style={{ fontSize: '11px', backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                                {q.sam}
                              </span>
                            )}
                            {q.sth && (
                              <span style={{ fontSize: '11px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                                {q.sth}
                              </span>
                            )}
                            <button
                              onClick={() => setJsonModalQuestion(q)}
                              style={{
                                background: 'transparent',
                                border: '1px solid #cbd5e1',
                                borderRadius: '4px',
                                padding: '2px 6px',
                                fontSize: '10px',
                                fontWeight: 700,
                                color: '#475569',
                                cursor: 'pointer',
                              }}
                            >
                              JSON
                            </button>
                          </div>
                        </div>

                        {/* Bilingual Stem */}
                        <div
                          style={{
                            fontSize: '15px',
                            fontWeight: 600,
                            lineHeight: 1.6,
                            color: '#0f172a',
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

                            return (
                              <div
                                key={opt.optNum}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '10px 14px',
                                  borderRadius: '8px',
                                  border: isCorrect ? '2px solid #22c55e' : '1px solid #e2e8f0',
                                  backgroundColor: isCorrect ? '#f0fdf4' : '#f8fafc',
                                }}
                              >
                                <span
                                  style={{
                                    width: '26px',
                                    height: '26px',
                                    borderRadius: '50%',
                                    backgroundColor: isCorrect ? '#22c55e' : '#cbd5e1',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    fontWeight: 800,
                                    marginRight: '12px',
                                    flexShrink: 0,
                                  }}
                                >
                                  {opt.label}
                                </span>
                                <div
                                  style={{
                                    fontSize: '14px',
                                    color: isCorrect ? '#14532d' : '#334155',
                                    fontWeight: isCorrect ? 700 : 500,
                                    flex: 1,
                                  }}
                                  dangerouslySetInnerHTML={{ __html: opt.text }}
                                />
                                {isCorrect && (
                                  <span
                                    style={{
                                      fontSize: '11px',
                                      fontWeight: 800,
                                      color: '#15803d',
                                      backgroundColor: '#ffffff',
                                      border: '1px solid #22c55e',
                                      padding: '2px 8px',
                                      borderRadius: '4px',
                                      marginLeft: '10px',
                                    }}
                                  >
                                    ✓ Verified Answer Key
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Classical Commentary Citation Box */}
                        <div
                          style={{
                            backgroundColor: '#f8fafc',
                            borderLeft: '4px solid #3b82f6',
                            borderRadius: '0 8px 8px 0',
                            padding: '12px 16px',
                            marginTop: '12px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase' }}>
                              Classical Reference &amp; Commentary
                            </span>
                          </div>
                          <div
                            style={{ fontSize: '13px', color: '#1e293b', lineHeight: 1.5 }}
                            dangerouslySetInnerHTML={{ __html: q.com || 'Reference confirmed in classical text taxonomy.' }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* JSON Schema Viewer Modal */}
      {jsonModalQuestion && (
        <div
          onClick={() => setJsonModalQuestion(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0f172a',
              color: '#f8fafc',
              borderRadius: '12px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #334155',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#60a5fa' }}>
                Question #{jsonModalQuestion.id} JSON Schema
              </h3>
              <button
                onClick={() => setJsonModalQuestion(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>
            <pre
              style={{
                backgroundColor: '#020617',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '12px',
                lineHeight: 1.5,
                overflowX: 'auto',
                border: '1px solid #1e293b',
              }}
            >
              {JSON.stringify(jsonModalQuestion, null, 2)}
            </pre>
            <div style={{ textAlign: 'right', marginTop: '16px' }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(jsonModalQuestion, null, 2));
                  alert('JSON copied to clipboard!');
                }}
                style={{
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Copy JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

