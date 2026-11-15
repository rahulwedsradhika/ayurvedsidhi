import React from 'react';
import { Link } from 'react-router-dom';

export const IndexDashboard: React.FC = () => {
  const cards = [
    {
      title: "AIAPGET 2028",
      subTitle: "LECTURES ( DETAILED & REVISION* ) AND QUESTION BANK",
      description: "Maximize your selection chances",
      badges: ["Complete AIAPGET Syllabus", "Daily/Weekly Tests", "55000+ MCQs"],
      link: "/app1.5/courses.php"
    },
    {
      title: "AIAPGET 2028",
      subTitle: "DETAILED LECTURES AND QUESTION BANK",
      description: "Maximize your selection chances",
      badges: ["Complete AIAPGET Syllabus", "Daily/Weekly Tests", "55000+ MCQs"],
      link: "/app1.5/courses.php"
    },
    {
      title: "AIAPGET 2027",
      subTitle: "CRASH COURSE LECTURES + Q-BANK",
      description: "Maximize your selection chances",
      badges: ["Important Topics Covered", "Prev Year Papers", "55000+ MCQs"],
      link: "/app1.5/courses.php"
    },
    {
      title: "AIAPGET 2027",
      subTitle: "DETAILED LECTURE AND QUESTION BANK",
      description: "Maximize your selection chances",
      badges: ["Complete AIAPGET Syllabus", "Daily/Weekly Tests", "55000+ MCQs"],
      link: "/app1.5/courses.php"
    }
  ];

  return (
    <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
      {/* Top Welcome Section */}
      <div style={{ textAlign: 'center', padding: '35px 20px 20px 20px' }}>
        <div style={{ fontSize: 16, color: '#444', marginBottom: 8 }}>
          Hi, Rohit !
        </div>
        <h1 style={{ margin: '0 0 18px 0', fontSize: 32, fontWeight: 700, color: '#333' }}>
          Welcome to AyurQuest Education
        </h1>

        <div style={{ marginBottom: 25 }}>
          <Link
            to="/app1.5/courses.php"
            style={{
              backgroundColor: '#f39c12',
              color: '#fff',
              padding: '10px 24px',
              borderRadius: 6,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 2px 5px rgba(243, 156, 18, 0.3)'
            }}
          >
            <i className="fa fa-tachometer"></i>
            <span>Go to Dashboard</span>
          </Link>
        </div>

        <div style={{
          maxWidth: 700,
          margin: '0 auto 30px auto',
          color: '#555',
          fontSize: 14,
          fontStyle: 'italic',
          lineHeight: 1.6
        }}>
          <i className="fa fa-quote-left text-muted" style={{ marginRight: 8 }}></i>
          Never give up on a dream just because of the time it will take to accomplish it, time will pass anyway.
        </div>
      </div>

      {/* Grid of Banners */}
      <div className="container-fluid" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 20px' }}>
        <div className="row">
          {cards.map((card, idx) => (
            <div key={idx} className="col-md-6 col-sm-12" style={{ marginBottom: 25 }}>
              <div
                style={{
                  border: '1px solid #dcebf1',
                  borderRadius: 6,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                }}
              >
                {/* Card Top Title */}
                <div style={{
                  padding: '10px 15px',
                  borderBottom: '1px solid #eee',
                  fontWeight: 700,
                  fontSize: 13,
                  color: '#2c3e50',
                  textAlign: 'center',
                  letterSpacing: 0.5
                }}>
                  WHATS NEW FOR AIAPGET
                </div>

                {/* Card Banner Body */}
                <div style={{
                  background: 'linear-gradient(135deg, #eef9fb 0%, #e1f4f8 100%)',
                  padding: '24px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15,
                  position: 'relative'
                }}>
                  {/* Left illustration */}
                  <div style={{ flexShrink: 0, width: 110, textAlign: 'center' }}>
                    <svg viewBox="0 0 100 120" style={{ width: '100%', maxHeight: 110 }}>
                      <circle cx="50" cy="80" r="35" fill="#fef9e7" />
                      <rect x="25" y="85" width="50" height="12" rx="3" fill="#e74c3c" />
                      <rect x="20" y="98" width="60" height="14" rx="3" fill="#2980b9" />
                      {/* Girl with laptop */}
                      <circle cx="50" cy="35" r="14" fill="#2c3e50" />
                      <circle cx="50" cy="37" r="11" fill="#f5cba7" />
                      <path d="M38 52 c0 15 24 15 24 0 v25 h-24 z" fill="#fff" />
                      <rect x="40" y="62" width="26" height="16" rx="2" fill="#e74c3c" />
                    </svg>
                  </div>

                  {/* Banner content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <img src="/assets/images/logo.png" alt="AQ" style={{ width: 18, height: 18 }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#2aacdd' }}>AyurQuest</span>
                    </div>

                    <h3 style={{ margin: '0 0 4px 0', fontSize: 26, fontWeight: 900, color: '#1b3a57', letterSpacing: 0.5 }}>
                      {card.title}
                    </h3>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#2c3e50', marginBottom: 6 }}>
                      {card.subTitle}
                    </div>
                    <div style={{ fontSize: 12, color: '#555', marginBottom: 12 }}>
                      {card.description}
                    </div>

                    <Link
                      to={card.link}
                      style={{
                        backgroundColor: '#1b3a57',
                        color: '#fff',
                        padding: '6px 16px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'inline-block',
                        marginBottom: 12
                      }}
                    >
                      &gt;&gt; More Details
                    </Link>

                    {/* Badges strip */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {card.badges.map((b, bIdx) => (
                        <span
                          key={bIdx}
                          style={{
                            backgroundColor: '#1b3a57',
                            color: '#fff',
                            fontSize: 10,
                            padding: '3px 8px',
                            borderRadius: 12,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <i className="fa fa-check-circle" style={{ fontSize: 9 }}></i>
                          <span>{b}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom Bar */}
                <div style={{
                  padding: '10px 15px',
                  borderTop: '1px solid #eee',
                  fontSize: 12,
                  color: '#2c3e50',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}>
                  <i className="fa fa-chevron-circle-right text-muted"></i>
                  <span>Click here to know more..</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

