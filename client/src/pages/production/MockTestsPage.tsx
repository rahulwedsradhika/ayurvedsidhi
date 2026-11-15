import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeroIllustration } from '../../components/PageHeroIllustration';

export const MockTestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<'2027' | '2026' | '2025' | '2024'>('2027');
  const [filterStatus, setFilterStatus] = useState<'all' | 'solved' | 'unsolved'>('unsolved');

  const tests = [
    {
      id: 1,
      year: '2027',
      num: 1,
      name: "MOCK TEST-1",
      date: "16 May 2027",
      marks: 480,
      mcq: 120,
      time: "120 min.",
      wallet: "30 pts.",
      isFuture: true,
      availableOn: "TEST WILL BE AVAILABLE ON 16 May 2027"
    },
    {
      id: 501,
      year: '2026',
      num: 1,
      name: "AIAPGET ALL INDIA FULL MOCK TEST - 1",
      date: "14 Nov 2026",
      marks: 480,
      mcq: 120,
      time: "120 min.",
      wallet: "50 pts.",
      isFuture: false,
      availableOn: null
    },
    {
      id: 502,
      year: '2026',
      num: 2,
      name: "AIAPGET ALL INDIA FULL MOCK TEST - 2",
      date: "07 Nov 2026",
      marks: 480,
      mcq: 120,
      time: "120 min.",
      wallet: "50 pts.",
      isFuture: false,
      availableOn: null
    }
  ];

  const filteredTests = tests.filter(t => t.year === selectedYear);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
      {/* Top Hero Illustration */}
      <PageHeroIllustration type="mock_test" />

      {/* Title */}
      <div style={{ textAlign: 'center', padding: '16px 0 10px 0', borderBottom: '1px solid #eee' }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2c3e50', letterSpacing: 0.5 }}>
          MOCK TESTS
        </h3>
      </div>

      {/* Year Filter Strip */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        borderBottom: '1px solid #eee',
        textAlign: 'center'
      }}>
        {(['2027', '2026', '2025', '2024'] as const).map(year => (
          <button
            key={year}
            type="button"
            onClick={() => setSelectedYear(year)}
            style={{
              flex: 1,
              padding: '12px 10px',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: selectedYear === year ? '2px solid #d81b60' : '2px solid transparent',
              cursor: 'pointer',
              color: selectedYear === year ? '#d81b60' : '#2c3e50',
              fontWeight: 700,
              fontSize: 14
            }}
          >
            <div style={{ fontSize: 11, color: '#888', fontWeight: 400 }}>YEAR</div>
            {year}
          </button>
        ))}
      </div>

      {/* Filter Tabs: All | Solved | Un Solved */}
      <div style={{
        maxWidth: 1100,
        margin: '15px auto',
        display: 'flex',
        border: '1px solid #eee',
        borderRadius: 4,
        overflow: 'hidden'
      }}>
        <button
          type="button"
          onClick={() => setFilterStatus('all')}
          style={{
            flex: 1,
            padding: '10px 15px',
            backgroundColor: filterStatus === 'all' ? '#f8fbfc' : '#fff',
            border: 'none',
            borderRight: '1px solid #eee',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
            color: '#555',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }}
        >
          <i className="fa fa-list"></i> All
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus('solved')}
          style={{
            flex: 1,
            padding: '10px 15px',
            backgroundColor: filterStatus === 'solved' ? '#f8fbfc' : '#fff',
            border: 'none',
            borderRight: '1px solid #eee',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
            color: '#555',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }}
        >
          <i className="fa fa-check-circle"></i> Solved
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus('unsolved')}
          style={{
            flex: 1,
            padding: '10px 15px',
            backgroundColor: filterStatus === 'unsolved' ? '#f8fbfc' : '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
            color: '#d81b60',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }}
        >
          <i className="fa fa-times-circle"></i> Un Solved
        </button>
      </div>

      {/* Test Cards List */}
      <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 15px' }}>
        {filteredTests.map(t => (
          <div
            key={t.id}
            style={{
              border: '1px solid #e1edf2',
              borderRadius: 6,
              overflow: 'hidden',
              backgroundColor: '#fff',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              marginBottom: 20
            }}
          >
            {/* Header: Circular Badge with Lines */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 15,
              paddingTop: 18
            }}>
              <div style={{ height: 1, backgroundColor: '#d81b60', width: 60 }}></div>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: '#d81b60',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 13
              }}>
                {t.num}
              </div>
              <div style={{ height: 1, backgroundColor: '#d81b60', width: 60 }}></div>
            </div>

            {/* Date */}
            <div style={{ textAlign: 'center', fontSize: 13, color: '#555', marginTop: 6 }}>
              {t.date}
            </div>

            {/* Name */}
            <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 700, color: '#e74c3c', marginTop: 4 }}>
              {t.name}
            </div>

            {/* 4 Metadata Columns */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              textAlign: 'center',
              padding: '16px 10px',
              borderTop: '1px solid #f4f4f4',
              marginTop: 15
            }}>
              <div>
                <div style={{ fontSize: 12, color: '#777', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <i className="fa fa-sun-o"></i> Marks
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{t.marks}</div>
              </div>

              <div>
                <div style={{ fontSize: 12, color: '#777', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <i className="fa fa-question-circle"></i> MCQ
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{t.mcq}</div>
              </div>

              <div>
                <div style={{ fontSize: 12, color: '#777', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <i className="fa fa-clock-o"></i> Time
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{t.time}</div>
              </div>

              <div>
                <div style={{ fontSize: 12, color: '#777', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <i className="fa fa-money"></i> Wallet
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{t.wallet}</div>
              </div>
            </div>

            {/* Bottom Bar: Availability or Action button */}
            {t.isFuture ? (
              <div style={{
                backgroundColor: '#fef9e7',
                padding: '10px 15px',
                textAlign: 'center',
                fontSize: 12,
                fontWeight: 600,
                color: '#7c5417',
                borderTop: '1px solid #fae8a4'
              }}>
                {t.availableOn}
              </div>
            ) : (
              <div style={{
                backgroundColor: '#f8fafc',
                padding: '10px 15px',
                textAlign: 'center',
                borderTop: '1px solid #eef2f5'
              }}>
                <button
                  type="button"
                  onClick={() => navigate(`/quiz/${t.id}?mode=exam`)}
                  className="btn btn-sm btn-info"
                  style={{ fontWeight: 600, padding: '6px 20px' }}
                >
                  <i className="fa fa-pencil" style={{ marginRight: 6 }}></i> Start Exam Simulation
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

