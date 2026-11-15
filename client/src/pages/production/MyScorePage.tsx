import React, { useState } from 'react';
import { PageHeroIllustration } from '../../components/PageHeroIllustration';

export const MyScorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const testAttempts = [
    {
      id: 1,
      testName: 'AIAPGET 2026 Full Syllabus Mega Mock Test 1',
      totalQuestions: 120,
      attempted: 112,
      correct: 96,
      incorrect: 16,
      score: 368,
      accuracy: '85.7%',
      date: '12 Nov 2026',
      status: 'Completed'
    },
    {
      id: 2,
      testName: 'Charaka Samhita Sutrasthana Ch 1-10 Sectional Test',
      totalQuestions: 50,
      attempted: 48,
      correct: 44,
      incorrect: 4,
      score: 172,
      accuracy: '91.6%',
      date: '08 Nov 2026',
      status: 'Completed'
    },
    {
      id: 3,
      testName: 'Dravyaguna & Rasa Shastra Clinical Pharmacology Mock',
      totalQuestions: 60,
      attempted: 58,
      correct: 50,
      incorrect: 8,
      score: 192,
      accuracy: '86.2%',
      date: '04 Nov 2026',
      status: 'Completed'
    }
  ];

  const filteredAttempts = testAttempts.filter(t =>
    t.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '16px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Open Sans", Arial, sans-serif' }}>
      {/* Hero Header Box matching Screenshot 2026-11-14 192616.png */}
      <div
        style={{
          backgroundColor: '#eef9fb',
          borderRadius: '12px',
          padding: '24px 30px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #d9f0f5',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <PageHeroIllustration type="scorecard" width={110} height={100} />
          <div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#2c3e50', letterSpacing: '0.5px' }}>
              SCORE CARD
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#6c757d' }}>
              Review your test attempts, accuracy percentages and ranking reports
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href="/app1.5/membership.php"
            style={{
              backgroundColor: '#e83e8c',
              color: '#ffffff',
              padding: '9px 18px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 4px rgba(232,62,140,0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Subscription Plans
          </a>
          <a
            href="https://wa.me/919172000000"
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: '#ffffff',
              color: '#2c3e50',
              border: '1px solid #ced4da',
              padding: '9px 18px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Support Helpline
          </a>
        </div>
      </div>

      {/* Main DataTable Card matching Screenshot 2026-11-14 192616.png */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e1e8ed', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', padding: '20px' }}>
        {/* Controls row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '13px', color: '#495057' }}>
            Show{' '}
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ced4da', margin: '0 4px', fontSize: '13px' }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>{' '}
            entries
          </div>

          <div style={{ fontSize: '13px', color: '#495057', display: 'flex', alignItems: 'center', gap: '6px' }}>
            Search:
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search mock tests..."
              style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #ced4da', fontSize: '13px', width: '220px' }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '12px 14px' }}>#</th>
                <th style={{ padding: '12px 14px' }}>Test Name</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Total Qs</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Attempted</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Correct</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Incorrect</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Score</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Accuracy</th>
                <th style={{ padding: '12px 14px' }}>Date</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttempts.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ padding: '30px', textAlign: 'center', color: '#8c9ba5' }}>
                    No data available in table
                  </td>
                </tr>
              ) : (
                filteredAttempts.map((row) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #eef2f6', transition: 'background-color 0.15s' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>{row.id}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#2c3e50' }}>{row.testName}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'center' }}>{row.totalQuestions}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'center' }}>{row.attempted}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'center', color: '#28a745', fontWeight: 700 }}>{row.correct}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'center', color: '#dc3545', fontWeight: 700 }}>{row.incorrect}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 800, color: '#2aacdd' }}>{row.score}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 700 }}>{row.accuracy}</td>
                    <td style={{ padding: '12px 14px', color: '#6c757d' }}>{row.date}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                      <a
                        href="/quiz/1/results"
                        style={{
                          backgroundColor: '#2aacdd',
                          color: '#ffffff',
                          padding: '5px 12px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-block'
                        }}
                      >
                        Analysis
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info & pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px', fontSize: '13px', color: '#6c757d' }}>
          <div>
            Showing 1 to {filteredAttempts.length} of {filteredAttempts.length} entries
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              disabled
              style={{
                padding: '5px 12px',
                border: '1px solid #ced4da',
                backgroundColor: '#f8f9fa',
                color: '#6c757d',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'not-allowed'
              }}
            >
              Previous
            </button>
            <button
              style={{
                padding: '5px 12px',
                border: '1px solid #2aacdd',
                backgroundColor: '#2aacdd',
                color: '#ffffff',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              1
            </button>
            <button
              disabled
              style={{
                padding: '5px 12px',
                border: '1px solid #ced4da',
                backgroundColor: '#f8f9fa',
                color: '#6c757d',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'not-allowed'
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

