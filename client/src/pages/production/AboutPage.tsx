import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ padding: '24px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: '"Open Sans", Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e1e8ed', padding: '36px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#2aacdd',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 900,
              margin: '0 auto 14px'
            }}
          >
            AQ
          </div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#2c3e50' }}>
            About AyurQuest 1.5
          </h1>
          <p style={{ margin: '8px 0 0', fontSize: '15px', color: '#6c757d' }}>
            India's Leading Digital Learning & Examination Platform for Ayurveda Aspirants
          </p>
        </div>

        <div style={{ fontSize: '14px', lineHeight: 1.8, color: '#495057' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1f4354', marginTop: '24px' }}>
            Our Mission
          </h2>
          <p>
            AyurQuest was founded with a dedicated mission: to empower Ayurveda scholars, graduates, and post-graduates across India with the most comprehensive, scientifically curated, and technology-driven preparation platform for AIAPGET, UPSC Ayurveda Medical Officer, and State Public Service Commission examinations.
          </p>

          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1f4354', marginTop: '24px' }}>
            Unrivaled Academic Repository
          </h2>
          <p>
            With over <strong>57,000+ meticulously authenticated MCQs</strong> covering the Brihattrayi (Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya), Laghuttrayi, and 14 clinical and non-clinical Ayurveda subjects, AyurQuest provides unparalleled depth. Every single question is cross-referenced with classical Sanskrit shlokas and accredited commentaries.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', margin: '28px 0' }}>
            <div style={{ backgroundColor: '#eef9fb', padding: '18px', borderRadius: '8px', textAlign: 'center', border: '1px solid #c9ecf5' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#2aacdd' }}>57,000+</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#1f4354', marginTop: '4px' }}>Verified MCQs</div>
            </div>
            <div style={{ backgroundColor: '#eef9fb', padding: '18px', borderRadius: '8px', textAlign: 'center', border: '1px solid #c9ecf5' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#2aacdd' }}>700+</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#1f4354', marginTop: '4px' }}>Mock Tests</div>
            </div>
            <div style={{ backgroundColor: '#eef9fb', padding: '18px', borderRadius: '8px', textAlign: 'center', border: '1px solid #c9ecf5' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#2aacdd' }}>2,071+</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#1f4354', marginTop: '4px' }}>Audio Lectures</div>
            </div>
            <div style={{ backgroundColor: '#eef9fb', padding: '18px', borderRadius: '8px', textAlign: 'center', border: '1px solid #c9ecf5' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#2aacdd' }}>90,450+</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#1f4354', marginTop: '4px' }}>Active Students</div>
            </div>
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1f4354', marginTop: '24px' }}>
            Leadership & Academic Council
          </h2>
          <p>
            The platform is curated by eminent Ayurveda post-graduate scholars, professors, and competitive toppers from premier institutes including National Institute of Ayurveda (NIA Jaipur), Banaras Hindu University (BHU Varanasi), and Institute of Teaching & Research in Ayurveda (ITRA Jamnagar).
          </p>
        </div>
      </div>
    </div>
  );
};

