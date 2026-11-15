import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeroIllustration } from '../../components/PageHeroIllustration';

export const UpscPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
      {/* Top Hero Illustration */}
      <PageHeroIllustration type="upsc" />

      {/* Title */}
      <div style={{ textAlign: 'center', padding: '16px 0 12px 0', borderBottom: '1px solid #eee' }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2c3e50', letterSpacing: 0.5 }}>
          UPSC - AYURVEDA
        </h3>
      </div>

      {/* Two Daily Challenge Boxes */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        borderBottom: '1px solid #eee'
      }}>
        <Link
          to="/app1.5/daily-tests.php?type=rapid"
          style={{
            flex: 1,
            padding: '20px 15px',
            textAlign: 'center',
            borderRight: '1px solid #eee',
            textDecoration: 'none',
            color: '#2c3e50'
          }}
        >
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '2px solid #d81b60',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            color: '#d81b60'
          }}>
            <i className="fa fa-bullseye" style={{ fontSize: 18 }}></i>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>DAILY RAPID FIRE</div>
          <div style={{ fontSize: 11, color: '#888' }}>CHALLENGE</div>
        </Link>

        <Link
          to="/app1.5/daily-tests.php?type=qod"
          style={{
            flex: 1,
            padding: '20px 15px',
            textAlign: 'center',
            textDecoration: 'none',
            color: '#2c3e50'
          }}
        >
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '2px solid #d81b60',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            color: '#d81b60'
          }}>
            <i className="fa fa-bullseye" style={{ fontSize: 18 }}></i>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>DAILY QUESTION</div>
          <div style={{ fontSize: 11, color: '#888' }}>CHALLANGE</div>
        </Link>
      </div>

      {/* 4 UPSC Module Rows */}
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Row 1: UPSC MOCK TESTS */}
        <Link
          to="/app1.5/ayush-npget.php?action=mock_test"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #eee',
            textDecoration: 'none',
            gap: 15
          }}
        >
          <div style={{ color: '#d81b60', fontSize: 24 }}>
            <i className="fa fa-list-alt"></i>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#2aacdd', textTransform: 'uppercase' }}>
              UPSC MOCK TESTS
            </div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
              Practice tests for UPSC. Feel like real exam!!
            </div>
          </div>
        </Link>

        {/* Row 2: UPSC TEST SERIES */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #eee',
            gap: 15
          }}
        >
          <div style={{ color: '#27ae60', fontSize: 24 }}>
            <i className="fa fa-list-alt"></i>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#27ae60', textTransform: 'uppercase' }}>
              UPSC TEST SERIES
            </div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
              Test series specially designed for UPSC exams.
            </div>
          </div>
          <Link
            to="/app1.5/membership.php"
            style={{
              backgroundColor: '#d81b60',
              color: '#fff',
              padding: '6px 16px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            Enroll Now
          </Link>
        </div>

        {/* Row 3: UPSC PREVIOUS YEAR EXAMS */}
        <Link
          to="/app1.5/prev-years.php"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #eee',
            textDecoration: 'none',
            gap: 15
          }}
        >
          <div style={{ color: '#d81b60', fontSize: 24 }}>
            <i className="fa fa-list-alt"></i>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#2aacdd', textTransform: 'uppercase' }}>
              UPSC PREVIOUS YEAR EXAMS
            </div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
              Solve previous year UPSC Exams!!
            </div>
          </div>
        </Link>

        {/* Row 4: GENERAL KNOWLEDGE MCQS */}
        <Link
          to="/app1.5/category.php?action=tags"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #eee',
            textDecoration: 'none',
            gap: 15
          }}
        >
          <div style={{ color: '#d81b60', fontSize: 24 }}>
            <i className="fa fa-list-alt"></i>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#2aacdd', textTransform: 'uppercase' }}>
              GENERAL KNOWLEDGE MCQS
            </div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
              Practice statewise GK questions!!
            </div>
          </div>
        </Link>
      </div>

      {/* Social Groups Footer Bar */}
      <div style={{
        marginTop: 35,
        textAlign: 'center',
        padding: '12px',
        fontSize: 13,
        fontWeight: 700,
        color: '#2aacdd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        letterSpacing: 0.5
      }}>
        <i className="fa fa-share-alt"></i>
        <span>SOCIAL GROUPS</span>
      </div>
    </div>
  );
};

