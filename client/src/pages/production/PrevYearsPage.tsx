import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeroIllustration } from '../../components/PageHeroIllustration';

export const PrevYearsPage: React.FC = () => {
  const sections = [
    {
      id: "all-ayurveda",
      title: "ALL AYURVEDA ENTRANCE TESTS",
      subtitle: "Practice previous year exams of Post Grdauate Entrance Tests and State/Centeral UPSC !!",
      iconSvg: (
        <div style={{
          width: 68,
          height: 68,
          borderRadius: '50%',
          backgroundColor: '#fff',
          border: '3px solid #2aacdd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px auto'
        }}>
          <img src="/assets/images/logo.png" alt="AyurQuest" style={{ width: 44, height: 44 }} />
        </div>
      )
    },
    {
      id: "aiapget-pyq",
      title: "POST GRADUATE ENTRANCE TESTS",
      subtitle: "Practice previous year exams of different states and colleges!!",
      iconSvg: (
        <div style={{
          width: 68,
          height: 68,
          borderRadius: '50%',
          backgroundColor: '#fef9e7',
          border: '2px solid #f39c12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px auto'
        }}>
          <i className="fa fa-graduation-cap" style={{ fontSize: 32, color: '#f39c12' }}></i>
        </div>
      )
    },
    {
      id: "upsc-pyq",
      title: "UPSC AYURVEDA ENTRANCE TESTS",
      subtitle: "Practice previous year exams of State and Centeral UPSC !!",
      iconSvg: (
        <div style={{
          width: 68,
          height: 68,
          borderRadius: '50%',
          backgroundColor: '#f4f6f9',
          border: '2px solid #2c3e50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px auto'
        }}>
          <i className="fa fa-university" style={{ fontSize: 28, color: '#2c3e50' }}></i>
        </div>
      )
    }
  ];

  return (
    <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
      {/* Top Hero Illustration */}
      <PageHeroIllustration type="prev_years" />

      {/* Title */}
      <div style={{ textAlign: 'center', padding: '16px 0 12px 0', borderBottom: '1px solid #eee' }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2c3e50', letterSpacing: 0.5 }}>
          PREVIOUS YEAR PAPERS
        </h3>
      </div>

      {/* 3 Examination Cards */}
      <div style={{ maxWidth: 1000, margin: '20px auto', padding: '0 15px' }}>
        {sections.map(sec => (
          <Link
            key={sec.id}
            to={`/app1.5/ayush-npget.php?action=mock_test`}
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '30px 20px',
              borderBottom: '1px solid #eee',
              textDecoration: 'none',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafcfe')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {sec.iconSvg}
            <h4 style={{ margin: '0 0 6px 0', fontSize: 16, fontWeight: 700, color: '#d81b60', letterSpacing: 0.3 }}>
              {sec.title}
            </h4>
            <p style={{ margin: 0, fontSize: 13, color: '#666' }}>
              {sec.subtitle}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

