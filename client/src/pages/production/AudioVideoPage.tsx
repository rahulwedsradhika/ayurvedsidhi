import React, { useState } from 'react';
import { PageHeroIllustration } from '../../components/PageHeroIllustration';

export const AudioVideoPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'samhitas' | 'subjects' | 'books'>('all');
  const [playingLecture, setPlayingLecture] = useState<{ id: string; title: string; category: string; duration: string; audioUrl: string } | null>(null);

  const sampleLectures = [
    { id: '1', title: 'Charaka Sutrasthana Ch 1 - Deerghamjeeviteeya Adhyaya', category: "Samhita's Lectures", duration: '45 Min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: '2', title: 'Charaka Sutrasthana Ch 2 - Apamarga Tanduleeya Adhyaya', category: "Samhita's Lectures", duration: '38 Min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: '3', title: 'Sushruta Sutrasthana Ch 1 - Vedotpatti Adhyaya', category: "Samhita's Lectures", duration: '52 Min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: '4', title: 'Dravyaguna Vijnana - Karmakarmukata & Rasapanchaka', category: "Subject's Lectures", duration: '42 Min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: '5', title: 'Rasa Shastra - Maharasa, Uparasa, Sadharanarasa Varga', category: "Subject's Lectures", duration: '50 Min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: '6', title: 'Ayurveda Samgraha - Quick Revision Volume 1', category: "Book's Lectures", duration: '60 Min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  ];

  const filteredLectures = activeCategory === 'all'
    ? sampleLectures
    : sampleLectures.filter(l => {
        if (activeCategory === 'samhitas') return l.category.includes('Samhita');
        if (activeCategory === 'subjects') return l.category.includes('Subject');
        if (activeCategory === 'books') return l.category.includes('Book');
        return true;
      });

  return (
    <div style={{ padding: '16px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Open Sans", Arial, sans-serif' }}>
      {/* Hero Header Box matching Screenshot 2026-11-14 192606.png */}
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
          <PageHeroIllustration type="audio_video" width={110} height={100} />
          <div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#2c3e50', letterSpacing: '0.5px' }}>
              AUDIO LECTURES
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#6c757d' }}>
              High-definition chapterwise audio revisions for AIAPGET & State PSC
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href="/app1.5/membership.php"
            style={{
              backgroundColor: '#2aacdd',
              color: '#ffffff',
              padding: '9px 16px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 4px rgba(42,172,221,0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Audio Lecture Subscriptions (Chapterwise Lectures)
          </a>
          <a
            href="/app1.5/membership.php"
            style={{
              backgroundColor: '#ffffff',
              color: '#2aacdd',
              border: '1px solid #2aacdd',
              padding: '9px 16px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Test Series Subscriptions (Question Bank)
          </a>
        </div>
      </div>

      {/* 3 Main Category Cards matching Screenshot 2026-11-14 192606.png */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        {/* Samhita's Lectures */}
        <div
          onClick={() => setActiveCategory(activeCategory === 'samhitas' ? 'all' : 'samhitas')}
          style={{
            backgroundColor: '#d2f2fa',
            borderRadius: '12px',
            padding: '24px',
            border: activeCategory === 'samhitas' ? '2px solid #2aacdd' : '1px solid #bce6f2',
            boxShadow: '0 3px 8px rgba(0,0,0,0.04)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#1f4354' }}>
                Samhita's Lectures
              </h2>
              <span style={{ backgroundColor: '#ffffff', color: '#2aacdd', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                1288 Lectures
              </span>
            </div>
            <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#4a6572', fontWeight: 600 }}>
              394 Hrs / 19 Min
            </p>
            <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#68828f' }}>
              Charaka, Sushruta, Ashtanga Hridaya, Madhava Nidana, Sharangadhara, Kashyapa
            </p>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <span
              style={{
                backgroundColor: '#e83e8c',
                color: '#ffffff',
                padding: '7px 16px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              &gt; Listen Now
            </span>
          </div>
        </div>

        {/* Subject's Lectures */}
        <div
          onClick={() => setActiveCategory(activeCategory === 'subjects' ? 'all' : 'subjects')}
          style={{
            backgroundColor: '#d2f2fa',
            borderRadius: '12px',
            padding: '24px',
            border: activeCategory === 'subjects' ? '2px solid #2aacdd' : '1px solid #bce6f2',
            boxShadow: '0 3px 8px rgba(0,0,0,0.04)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#1f4354' }}>
                Subject's Lectures
              </h2>
              <span style={{ backgroundColor: '#ffffff', color: '#2aacdd', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                695 Lectures
              </span>
            </div>
            <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#4a6572', fontWeight: 600 }}>
              244 Hrs / 11 Min
            </p>
            <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#68828f' }}>
              Kayachikitsa, Dravyaguna, Rasa Shastra, Shalya, Shalakya, Kaumarbhritya
            </p>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <span
              style={{
                backgroundColor: '#e83e8c',
                color: '#ffffff',
                padding: '7px 16px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              &gt; Listen Now
            </span>
          </div>
        </div>

        {/* Book's Lectures */}
        <div
          onClick={() => setActiveCategory(activeCategory === 'books' ? 'all' : 'books')}
          style={{
            backgroundColor: '#d2f2fa',
            borderRadius: '12px',
            padding: '24px',
            border: activeCategory === 'books' ? '2px solid #2aacdd' : '1px solid #bce6f2',
            boxShadow: '0 3px 8px rgba(0,0,0,0.04)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#1f4354' }}>
                Book's Lectures
              </h2>
              <span style={{ backgroundColor: '#ffffff', color: '#2aacdd', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                910 Lectures
              </span>
            </div>
            <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#4a6572', fontWeight: 600 }}>
              357 Hrs / 58 Min
            </p>
            <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#68828f' }}>
              Ayurveda Samgraha, Competitive Handbooks, Rapid Revision Notes
            </p>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <span
              style={{
                backgroundColor: '#e83e8c',
                color: '#ffffff',
                padding: '7px 16px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              &gt; Listen Now
            </span>
          </div>
        </div>
      </div>

      {/* Summary Ribbon matching Screenshot 2026-11-14 192606.png */}
      <div
        style={{
          backgroundColor: '#2aacdd',
          color: '#ffffff',
          borderRadius: '8px',
          padding: '12px 20px',
          textAlign: 'center',
          fontWeight: 800,
          fontSize: '14px',
          letterSpacing: '1px',
          boxShadow: '0 2px 6px rgba(42,172,221,0.3)',
          marginBottom: '28px'
        }}
      >
        LECTURES 2071 &nbsp;&nbsp;|&nbsp;&nbsp; DURATION 676 Hrs / 21 Min &nbsp;&nbsp;|&nbsp;&nbsp; STUDENTS 14232
      </div>

      {/* Audio Player Drawer / Bar if active */}
      {playingLecture && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '16px 24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            border: '2px solid #2aacdd',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#e83e8c', fontWeight: 700, textTransform: 'uppercase' }}>
              Now Playing • {playingLecture.category}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#2c3e50', marginTop: '2px' }}>
              {playingLecture.title}
            </div>
          </div>
          <audio controls autoPlay src={playingLecture.audioUrl} style={{ height: '36px' }} />
          <button
            onClick={() => setPlayingLecture(null)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#888',
              cursor: 'pointer',
              fontSize: '18px',
              padding: '4px'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Lecture List */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e1e8ed', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #eef2f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#2c3e50' }}>
            Featured Audio Chapters {activeCategory !== 'all' ? `(${activeCategory.toUpperCase()})` : ''}
          </h3>
          <span style={{ fontSize: '12px', color: '#6c757d' }}>Showing {filteredLectures.length} chapters</span>
        </div>

        <div>
          {filteredLectures.map((item, idx) => (
            <div
              key={item.id}
              style={{
                padding: '14px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafcfd',
                borderBottom: '1px solid #f0f4f8'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#eef9fb',
                    color: '#2aacdd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '13px'
                  }}
                >
                  {idx + 1}
                </span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#2c3e50' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: '#8c9ba5', marginTop: '2px' }}>
                    {item.category} • {item.duration}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setPlayingLecture(item)}
                style={{
                  backgroundColor: playingLecture?.id === item.id ? '#2aacdd' : '#e83e8c',
                  color: '#ffffff',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '5px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {playingLecture?.id === item.id ? '▶ Playing' : '▶ Listen'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
