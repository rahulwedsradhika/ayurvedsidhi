import React, { useState } from 'react';
import { PageHeroIllustration } from '../../components/PageHeroIllustration';

export const ReportedQuestionsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'my'>('all');
  const [search, setSearch] = useState('');

  const reportedQuestions = [
    {
      id: 1,
      questionText: 'मांसगत शल्य को निकालने की विधि है',
      options: ['आहरण', 'भेदन', 'छेदन', 'पाटन'],
      correctAnswerIndex: 1,
      reference: 'Susruta Samhita Sutrasthana 27/5',
      userQuery: {
        author: 'Neha Kudale',
        date: '23-Oct-2026',
        text: 'Sir please explain why Bhedana is correct here instead of Aharana?'
      },
      facultyResolution: {
        doctor: 'Dr. Vandana (AyurQuest Senior Faculty)',
        date: '24-Oct-2026',
        text: "According to Sushruta Samhita Sutrasthana Chapter 27 (Shalyapanayaniya Adhyaya), shloka 5: 'तत्र मांसगते भेदनं...' When a foreign body is lodged deep within muscular tissue, an incision (Bhedana) is mandatory to expose and safely extract the shalya. Aharana is applied when shalya is visible and easily graspable. Hence Option (B) भेदन is verified and 100% accurate."
      }
    },
    {
      id: 2,
      questionText: 'रसरत्नसमुच्चय के अनुसार रसशाला की दिशा होनी चाहिए',
      options: ['पूर्व', 'ईशान (उत्तर-पूर्व)', 'आग्नेय', 'वायव्य'],
      correctAnswerIndex: 1,
      reference: 'Rasa Ratna Samucchaya 6/13',
      userQuery: {
        author: 'Vd. Amit Sharma',
        date: '10-Nov-2026',
        text: 'Please clarify between Ishan kon and Agneya kon for Rasashala.'
      },
      facultyResolution: {
        doctor: 'Dr. Shailesh (AyurQuest Faculty)',
        date: '11-Nov-2026',
        text: "Rasa Ratna Samucchaya explicitly states 'पूर्वोत्तरे भागे' (North-East / Ishan corner) for the overall Rasashala construction, whereas Agneya (South-East) is specified specifically for Koshthi and furnace setup. The question asks for Rasashala as a whole, so Option (B) ईशान is correct."
      }
    }
  ];

  return (
    <div style={{ padding: '16px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Open Sans", Arial, sans-serif' }}>
      {/* Hero Header Box matching Screenshot 2026-11-14 192641.png */}
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
          <PageHeroIllustration type="reported" width={110} height={100} />
          <div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#2c3e50', letterSpacing: '0.5px' }}>
              REPORTED QUESTIONS
            </h1>
            <div style={{ marginTop: '8px', fontSize: '13px', fontWeight: 700, color: '#2aacdd', letterSpacing: '0.5px' }}>
              Total Reported MCQs 41864 &nbsp;&nbsp;|&nbsp;&nbsp; My Reported MCQs 0
            </div>
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

      {/* Filter Tabs & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              backgroundColor: filter === 'all' ? '#2aacdd' : '#ffffff',
              color: filter === 'all' ? '#ffffff' : '#2c3e50',
              border: filter === 'all' ? 'none' : '1px solid #ced4da',
              padding: '8px 18px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            All Reported Questions (41,864)
          </button>
          <button
            onClick={() => setFilter('my')}
            style={{
              backgroundColor: filter === 'my' ? '#2aacdd' : '#ffffff',
              color: filter === 'my' ? '#ffffff' : '#2c3e50',
              border: filter === 'my' ? 'none' : '1px solid #ced4da',
              padding: '8px 18px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            My Reports (0)
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search reported question or keyword..."
          style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', width: '280px' }}
        />
      </div>

      {/* Question Cards matching Screenshot 2026-11-14 192641.png */}
      {filter === 'my' ? (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '40px', textAlign: 'center', border: '1px solid #e1e8ed', color: '#6c757d' }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>📋</div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#2c3e50' }}>No Questions Reported by You</h3>
          <p style={{ margin: '8px 0 0', fontSize: '13px' }}>
            While solving mock tests or practicing questions, if you find any typo, ambiguity or discrepancy, click "Report Question" to consult with our faculty.
          </p>
        </div>
      ) : (
        <div>
          {reportedQuestions.map((q) => (
            <div
              key={q.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #e1e8ed',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                padding: '24px',
                marginBottom: '20px'
              }}
            >
              {/* Question text */}
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#2c3e50', marginBottom: '16px', lineHeight: 1.5 }}>
                Q. {q.questionText}
              </div>

              {/* 4 Options */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                {q.options.map((opt, idx) => {
                  const isCorrect = idx === q.correctAnswerIndex;
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: isCorrect ? '#eaf8ed' : '#f8fafc',
                        border: isCorrect ? '2px solid #28a745' : '1px solid #e2e8f0',
                        color: isCorrect ? '#1e7e34' : '#495057',
                        fontWeight: isCorrect ? 700 : 500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>
                        ({String.fromCharCode(65 + idx)}) {opt}
                      </span>
                      {isCorrect && <span style={{ color: '#28a745', fontWeight: 800 }}>✓ Correct</span>}
                    </div>
                  );
                })}
              </div>

              {/* Reference */}
              <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '16px', fontStyle: 'italic' }}>
                <strong>Authentic Reference:</strong> {q.reference}
              </div>

              {/* User Query Box */}
              <div
                style={{
                  backgroundColor: '#fff5f5',
                  border: '1px solid #ffd8d8',
                  borderRadius: '8px',
                  padding: '14px 18px',
                  marginBottom: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px', color: '#c53030', fontWeight: 700 }}>
                  <span>🙋 Student Query — {q.userQuery.author}</span>
                  <span>{q.userQuery.date}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#2d3748' }}>
                  "{q.userQuery.text}"
                </div>
              </div>

              {/* AyurQuest Resolution Box */}
              <div
                style={{
                  backgroundColor: '#f0fbf4',
                  border: '1px solid #c6f6d5',
                  borderRadius: '8px',
                  padding: '14px 18px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px', color: '#22543d', fontWeight: 700 }}>
                  <span>👨‍⚕️ AyurQuest Faculty Resolution — {q.facultyResolution.doctor}</span>
                  <span>{q.facultyResolution.date}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#1a202c', lineHeight: 1.5 }}>
                  {q.facultyResolution.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

