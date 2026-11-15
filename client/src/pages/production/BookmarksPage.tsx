import React, { useState } from 'react';
import { PageHeroIllustration } from '../../components/PageHeroIllustration';

export const BookmarksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'samhitas' | 'subjects'>('all');

  const bookmarkedQuestions = [
    {
      id: 'BM-101',
      source: 'Charaka Samhita Sutrasthana Ch 1',
      type: 'Samhita',
      question: 'आयुर्वेद का प्रयोजन क्या है?',
      options: [
        'स्वास्थ्यस्य स्वास्थ्यरक्षणं आतुरस्य विकारप्रशमनं च',
        'केवल रोग मुक्ति',
        'केवल दीर्घायु की प्राप्ति',
        'उपर्युक्त सभी'
      ],
      correctAnswer: 0,
      explanation: 'प्रयोजनं चास्य स्वस्थस्य स्वास्थ्यरक्षणं आतुरस्य विकारप्रशमनं च। (च. सू. 30/26)'
    },
    {
      id: 'BM-102',
      source: 'Dravyaguna Vijnana',
      type: 'Subject',
      question: 'गुडूची का मुख्य कर्म क्या है?',
      options: [
        'ज्वरघ्न एवं रसायन',
        'विरेचन',
        'वमन',
        'लेखन'
      ],
      correctAnswer: 0,
      explanation: 'गुडूची तिक्ता कषाया च दीपनी वह्निदीपनी। ज्वरघ्नी च वयःस्था च त्रिदोषशमनी परा।। (भा. प्र.)'
    }
  ];

  return (
    <div style={{ padding: '16px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Open Sans", Arial, sans-serif' }}>
      {/* Hero Header Box matching Screenshot 2026-11-14 192625.png */}
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
          <PageHeroIllustration type="bookmarks" width={110} height={100} />
          <div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#2c3e50', letterSpacing: '0.5px' }}>
              BOOKMARKS
            </h1>
            <div style={{ marginTop: '8px', fontSize: '13px', fontWeight: 700, color: '#2aacdd', letterSpacing: '0.5px' }}>
              My Bookmarks {bookmarkedQuestions.length} &nbsp;&nbsp;|&nbsp;&nbsp; Bookmark Limit 3000 &nbsp;&nbsp;|&nbsp;&nbsp; Bookmarks Left {3000 - bookmarkedQuestions.length}
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

      {/* 2 Category Overview Cards matching Screenshot 2026-11-14 192625.png */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        {/* Samhitas Card */}
        <div
          onClick={() => setActiveTab(activeTab === 'samhitas' ? 'all' : 'samhitas')}
          style={{
            backgroundColor: '#d2f2fa',
            borderRadius: '12px',
            padding: '24px',
            border: activeTab === 'samhitas' ? '2px solid #2aacdd' : '1px solid #bce6f2',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: '#e83e8c',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}
          >
            🔖
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#1f4354' }}>
              1 in 1 Samhita
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#4a6572' }}>
              Charaka Samhita Sutrasthana bookmarked MCQs
            </p>
          </div>
        </div>

        {/* Subjects Card */}
        <div
          onClick={() => setActiveTab(activeTab === 'subjects' ? 'all' : 'subjects')}
          style={{
            backgroundColor: '#d2f2fa',
            borderRadius: '12px',
            padding: '24px',
            border: activeTab === 'subjects' ? '2px solid #2aacdd' : '1px solid #bce6f2',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: '#2aacdd',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}
          >
            📑
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#1f4354' }}>
              1 in 1 Subject
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#4a6572' }}>
              Dravyaguna Vijnana bookmarked MCQs
            </p>
          </div>
        </div>
      </div>

      {/* Bookmarked Questions List / Revision Engine */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e1e8ed', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #eef2f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#2c3e50' }}>
            Bookmarked Questions Revision List
          </h3>
          <a
            href="/quiz/practice"
            style={{
              backgroundColor: '#2aacdd',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '5px',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            ⚡ Practice All Bookmarks
          </a>
        </div>

        <div style={{ padding: '20px' }}>
          {bookmarkedQuestions
            .filter(q => (activeTab === 'all' ? true : activeTab === 'samhitas' ? q.type === 'Samhita' : q.type === 'Subject'))
            .map((item, idx) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '18px',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#2aacdd' }}>
                    Q{idx + 1}. [{item.source}]
                  </span>
                  <span style={{ backgroundColor: '#e2f0d9', color: '#385723', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
                    Saved
                  </span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#2c3e50', marginBottom: '12px' }}>
                  {item.question}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                  {item.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        backgroundColor: oIdx === item.correctAnswer ? '#d4edda' : '#ffffff',
                        border: oIdx === item.correctAnswer ? '1px solid #c3e6cb' : '1px solid #e1e8ed',
                        color: oIdx === item.correctAnswer ? '#155724' : '#495057',
                        fontWeight: oIdx === item.correctAnswer ? 700 : 400
                      }}
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt}
                    </div>
                  ))}
                </div>
                <div style={{ backgroundColor: '#eef9fb', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', color: '#1f4354', borderLeft: '4px solid #2aacdd' }}>
                  <strong>Reference / Shloka:</strong> {item.explanation}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

