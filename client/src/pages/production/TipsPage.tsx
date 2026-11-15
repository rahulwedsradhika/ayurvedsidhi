import React, { useState } from 'react';

export const TipsPage: React.FC = () => {
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const tips = [
    {
      title: "Study Tips For Online Students",
      content: "Set a dedicated learning schedule, eliminate social media distractions during study hours, make active written notes from lectures, and solve at least 50 MCQs daily to reinforce retention."
    },
    {
      title: "Reducing Exam Anxiety",
      content: "Practice pranayama (Anulom-Vilom and Bhramari), maintain 7 hours of consistent sleep, simulate real 120-minute exam conditions weekly, and remember that consistent preparation overcomes fear."
    },
    {
      title: "Memorization Tips - For each learning Style",
      content: "Visual learners should use color-coded comparative charts for Dosha-Dhatu-Mala. Auditory learners benefit from listening to audio lectures during travel. Kinesthetic learners retain best by writing shlokas repeatedly."
    },
    {
      title: "Psychology of Studying",
      content: "Use the Pomodoro technique (25 min study + 5 min break). Interleave classical Brihat Trayi study with Modern pathology/surgery to prevent mental fatigue."
    },
    {
      title: "18 Unexpected tips for Higher Score",
      content: "Focus heavily on Charaka Sutrasthana Chatushkas, memorize numbers and durations (Panchakarma pramana, Agni types), practice negative marking discipline by skipping pure guesses, and review all previous year papers twice."
    },
    {
      title: "10 study tips to be more productive",
      content: "Start each day with the toughest Samhita adhyaya. Review bookmarks before bed. Maintain a dedicated error logbook for every wrong test question."
    },
    {
      title: "Revision Power Hour",
      content: "Dedicate the first 60 minutes of every morning to rapid-fire revision of yesterday's MCQs without checking answers first."
    },
    {
      title: "15 ways to improve memory",
      content: "Include Medhya Rasayana herbs (Brahmi, Shankhapushpi, Mandukaparni) in your routine, create absurd mnemonics for yoga ingredients, and teach concepts to study peers."
    },
    {
      title: "25 ways to learn faster",
      content: "Master the fundamental Sanskrit roots, correlate modern medical anatomy with Sharira Sthana, and solve subjectwise test series immediately after completing each adhyaya."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
      {/* Section 1: Study Tips by Toppers */}
      <div style={{
        maxWidth: 1100,
        margin: '20px auto 0 auto',
        border: '1px solid #e1edf2',
        borderRadius: 4,
        overflow: 'hidden'
      }}>
        <div style={{
          backgroundColor: '#f8fbfc',
          padding: '10px 15px',
          borderBottom: '1px solid #e1edf2',
          textAlign: 'center',
          fontSize: 13,
          fontWeight: 700,
          color: '#2c3e50',
          letterSpacing: 0.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6
        }}>
          <i className="fa fa-graduation-cap text-aqua"></i>
          <span>STUDY TIPS BY TOPPERS</span>
        </div>

        <div style={{
          padding: '25px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20
        }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: '3px solid #2aacdd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img src="/assets/images/logo.png" alt="AQ" style={{ width: 38, height: 38 }} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#888' }}>Daily Study Tips By</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#2c3e50' }}>AIAPGET TOPPERS</div>
            <div style={{ fontSize: 12, color: '#666', fontStyle: 'italic' }}>Exclusively on AyurQuest App &amp; Website</div>
          </div>
        </div>
      </div>

      {/* Section 2: General Tips List */}
      <div style={{
        maxWidth: 1100,
        margin: '25px auto 0 auto',
        border: '1px solid #e1edf2',
        borderRadius: 4,
        overflow: 'hidden'
      }}>
        <div style={{
          backgroundColor: '#f8fbfc',
          padding: '10px 15px',
          borderBottom: '1px solid #e1edf2',
          textAlign: 'center',
          fontSize: 13,
          fontWeight: 700,
          color: '#2c3e50',
          letterSpacing: 0.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6
        }}>
          <i className="fa fa-lightbulb-o text-aqua"></i>
          <span>GENERAL TIPS</span>
        </div>

        <div>
          {tips.map((tip, idx) => {
            const isSelected = selectedTip === idx;
            return (
              <div
                key={idx}
                style={{
                  borderBottom: '1px solid #f0f0f0',
                  backgroundColor: isSelected ? '#fafcfe' : '#fff'
                }}
              >
                <div
                  onClick={() => setSelectedTip(isSelected ? null : idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '15px 20px',
                    cursor: 'pointer'
                  }}
                >
                  <i className="fa fa-lightbulb-o" style={{ color: '#d81b60', fontSize: 16 }}></i>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#2c3e50' }}>
                    {tip.title}
                  </span>
                </div>
                {isSelected && (
                  <div style={{
                    padding: '12px 20px 18px 48px',
                    fontSize: 13,
                    color: '#555',
                    lineHeight: 1.6,
                    backgroundColor: '#fdfdfd'
                  }}>
                    {tip.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

