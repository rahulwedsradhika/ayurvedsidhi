import React, { useState } from 'react';

export const MembershipPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'test_series',
      name: 'TEST SERIES & QUESTION BANK',
      badge: 'MOST POPULAR',
      badgeColor: '#e83e8c',
      price: '₹650',
      period: 'per year',
      originalPrice: '₹1500',
      features: [
        '56,000+ Topicwise & Samhitawise MCQs',
        '700+ Mock Tests (Full Syllabus & Subjectwise)',
        '125+ Previous Year Papers (AIAPGET, UPSC, State PSC)',
        'Real-time All India Rank (AIR) & Performance Analytics',
        'Authentic Shloka Citations & Rational Explanations',
        'Bookmark up to 3,000 high-yield questions',
        'Unlimited re-attempts and instant solutions'
      ],
      buttonColor: '#e83e8c'
    },
    {
      id: 'video_lectures',
      name: 'VIDEO LECTURES & COURSES',
      badge: 'BEST VALUE',
      badgeColor: '#28a745',
      price: '₹1499',
      period: 'per year',
      originalPrice: '₹3500',
      features: [
        '1000+ Hours HD Video Lectures by Top Ayurveda Tutors',
        'Complete Chapterwise Coverage of all 14 BAMS Subjects',
        'Comprehensive Samhita Sessions (Charaka, Sushruta, Vagbhata)',
        'Recorded Classrooms with Speed Control & Quality Toggle',
        'Exclusive PDF Study Notes & Revision Slips',
        'Includes Complete Question Bank & Test Series Access',
        'Direct Doubt Resolution with Faculty'
      ],
      buttonColor: '#2aacdd'
    },
    {
      id: 'audio_lectures',
      name: 'AUDIO LECTURES (AUDIO BOOK)',
      badge: 'COMMUTER EDITION',
      badgeColor: '#17a2b8',
      price: '₹499',
      period: 'per year',
      originalPrice: '₹1200',
      features: [
        '2071 High-Definition Curated Audio Lectures',
        '676+ Hours of Structured Chapterwise Narration',
        'Samhita Recitations & High-Yield Mnemonic Chants',
        'Listen while traveling, in clinic or resting',
        'Background Playback on AyurQuest Mobile & Web',
        'Downloadable Audio Book Access',
        'Regular Monthly Audio Updates'
      ],
      buttonColor: '#2aacdd'
    }
  ];

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Open Sans", Arial, sans-serif' }}>
      {/* Heading matching Screenshot 2026-11-14 192714.png */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#2c3e50', letterSpacing: '0.5px' }}>
          AYURQUEST SUBSCRIPTIONS
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: '15px', color: '#6c757d', fontWeight: 600 }}>
          90450+ Students are actively using AyurQuest Subscriptions
        </p>

        {/* Stats Ribbon */}
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#eef9fb',
            color: '#2aacdd',
            padding: '10px 24px',
            borderRadius: '24px',
            fontWeight: 800,
            fontSize: '14px',
            marginTop: '16px',
            border: '1px solid #c9ecf5',
            letterSpacing: '0.5px'
          }}
        >
          56000+ MCQs &nbsp;&nbsp;|&nbsp;&nbsp; 700+ Mock Tests &nbsp;&nbsp;|&nbsp;&nbsp; 125+ PYPs
        </div>
      </div>

      {/* 3 Subscription Cards matching Screenshot 2026-11-14 192714.png */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '36px' }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: plan.id === 'test_series' ? '2px solid #e83e8c' : '1px solid #e1e8ed',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            {/* Top Badge */}
            <div
              style={{
                backgroundColor: plan.badgeColor,
                color: '#ffffff',
                textAlign: 'center',
                padding: '6px 0',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '1px'
              }}
            >
              {plan.badge}
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#2c3e50', textAlign: 'center' }}>
                {plan.name}
              </h2>

              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <span style={{ fontSize: '36px', fontWeight: 900, color: '#2c3e50' }}>{plan.price}</span>
                <span style={{ fontSize: '13px', color: '#6c757d', marginLeft: '6px' }}>{plan.period}</span>
                <div style={{ fontSize: '13px', color: '#dc3545', textDecoration: 'line-through', marginTop: '4px' }}>
                  Regular Price: {plan.originalPrice}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f0f4f8', paddingTop: '18px', flex: 1 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#495057' }}>
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px', lineHeight: 1.4 }}>
                      <span style={{ color: '#28a745', fontWeight: 800, fontSize: '14px' }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '24px' }}>
                <button
                  onClick={() => {
                    setSelectedPlan(plan.name);
                    alert(`Selected ${plan.name}! In this local replica environment, full access is granted without payment.`);
                  }}
                  style={{
                    width: '100%',
                    backgroundColor: plan.buttonColor,
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    letterSpacing: '0.5px'
                  }}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Support & Guarantee Banner */}
      <div
        style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#2c3e50' }}>🔒 100% Safe & Secure Payment</div>
          <div style={{ fontSize: '12px', color: '#6c757d' }}>UPI, Cards, NetBanking, Razorpay</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#2c3e50' }}>⚡ Instant Account Activation</div>
          <div style={{ fontSize: '12px', color: '#6c757d' }}>Immediate access to all test series & MCQs</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#2c3e50' }}>📞 WhatsApp Helpline Support</div>
          <div style={{ fontSize: '12px', color: '#6c757d' }}>Call/Message: +91 91720 00000</div>
        </div>
      </div>
    </div>
  );
};

