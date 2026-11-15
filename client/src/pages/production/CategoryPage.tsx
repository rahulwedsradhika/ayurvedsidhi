import React from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { PageHeroIllustration } from '../../components/PageHeroIllustration';

export const CategoryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const action = searchParams.get('action');

  // VIEW 1: Samhitawise Questions List (?action=samhitas)
  if (action === 'samhitas') {
    const samhitasList = [
      { id: 1, name: "Charaka Samhita (चरक संहिता)", questions: 11175 },
      { id: 2, name: "Sushruta Samhita (सुश्रुत संहिता)", questions: 8709 },
      { id: 3, name: "Ashtanga Hridaya (अष्टांग हृदय)", questions: 6229 },
      { id: 4, name: "Ashtanga Samgrah (अष्टांग संग्रह)", questions: 2164 },
      { id: 5, name: "Chakradatt Samhita (चक्रदत्त संहिता)", questions: 25 },
      { id: 6, name: "Madhava Nidana (माधव निदान)", questions: 1480 },
      { id: 7, name: "Sharngadhara Samhita (शार्ङ्गधर संहिता)", questions: 1240 },
      { id: 8, name: "Bhavaprakasha (भावप्रकाश)", questions: 1860 },
      { id: 9, name: "Kashyapa Samhita (काश्यप संहिता)", questions: 980 },
      { id: 10, name: "Bhela Samhita (भेल संहिता)", questions: 450 },
      { id: 11, name: "Harita Samhita (हारीत संहिता)", questions: 380 },
      { id: 12, name: "Rasa Tarangini (रसतरंगिणी)", questions: 890 }
    ];

    return (
      <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
        <PageHeroIllustration type="samhitas" />
        <div style={{ textAlign: 'center', padding: '16px 0 12px 0', borderBottom: '1px solid #eee' }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2c3e50', letterSpacing: 0.5 }}>
            SAMHITA WISE QUESTIONS
          </h3>
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {samhitasList.map(item => (
            <div
              key={item.id}
              onClick={() => navigate(`/quiz/practice?sam_id=${item.id}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                gap: 20,
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafcfe')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ textAlign: 'center', width: 60, flexShrink: 0 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: '#d81b60',
                  color: '#fff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 14
                }}>
                  ?
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#333', marginTop: 4 }}>
                  {item.questions}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, color: '#2c3e50' }}>
                  <i className="fa fa-book text-aqua"></i>
                  <span>{item.name}</span>
                </div>
                <div style={{ fontSize: 12, color: '#777', marginTop: 4 }}>
                  <i className="fa fa-question-circle" style={{ color: '#d81b60', marginRight: 4 }}></i>
                  Total Questions: {item.questions}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // VIEW 2: Subjectwise Questions List (?action=subjects)
  if (action === 'subjects') {
    const subjectsList = [
      { id: 1, name: "Kayachikitsa", count: 6759 },
      { id: 2, name: "Rog Nidana", count: 6263 },
      { id: 3, name: "Dravyaguna Vigyan", count: 5974 },
      { id: 4, name: "Shalya Tantra", count: 4292 },
      { id: 5, name: "Shalakya Tantra", count: 3331 },
      { id: 6, name: "Miscellaneous", count: 3126 },
      { id: 7, name: "Panchkarma", count: 2976 },
      { id: 8, name: "Swasthvrita", count: 2166 },
      { id: 9, name: "Sharir Rachna", count: 2138 }
    ];

    return (
      <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
        <PageHeroIllustration type="subjects" />
        <div style={{ textAlign: 'center', padding: '16px 0 12px 0', borderBottom: '1px solid #eee' }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2c3e50', letterSpacing: 0.5 }}>
            SUBJECTWISE WISE QUESTIONS
          </h3>
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {subjectsList.map(item => (
            <div
              key={item.id}
              onClick={() => navigate(`/quiz/practice?sub_id=${item.id}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafcfe')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, color: '#2c3e50' }}>
                <i className="fa fa-book text-aqua"></i>
                <span>{item.name}</span>
              </div>
              <span style={{
                backgroundColor: '#1b3a57',
                color: '#fff',
                padding: '4px 14px',
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 700
              }}>
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // VIEW 3: Tagwise Questions List (?action=tags)
  if (action === 'tags') {
    const tagsList = [
      { id: 'statement', name: "Statement MCQs", count: 5070 },
      { id: 'reason_assertion', name: "Reason Assertion MCQs", count: 416 },
      { id: 'match_making', name: "Match Making MCQs", count: 208 },
      { id: 'numerical', name: "Numerical MCQs", count: 1740 },
      { id: 'fill_blank', name: "Fill in blank MCQs", count: 2120 },
      { id: 'image', name: "Image MCQs", count: 199 }
    ];

    return (
      <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
        <PageHeroIllustration type="tags" />
        <div style={{ textAlign: 'center', padding: '16px 0 12px 0', borderBottom: '1px solid #eee' }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2c3e50', letterSpacing: 0.5 }}>
            TAG WISE QUESTIONS
          </h3>
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {tagsList.map(item => (
            <div
              key={item.id}
              onClick={() => navigate(`/quiz/practice?tag=${item.id}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafcfe')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, color: '#2c3e50' }}>
                <i className="fa fa-book text-aqua"></i>
                <span>{item.name}</span>
              </div>
              <span style={{
                backgroundColor: '#1b3a57',
                color: '#fff',
                padding: '4px 14px',
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 700
              }}>
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // VIEW 4: Default Question Bank Home (/app1.5/category.php)
  return (
    <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
      {/* Top Graphic */}
      <div style={{
        backgroundColor: '#eef9fb',
        padding: '20px 15px',
        textAlign: 'center',
        borderBottom: '1px solid #d8edf3'
      }}>
        <svg viewBox="0 0 400 80" style={{ maxHeight: 70, width: 'auto' }}>
          <rect x="150" y="55" width="100" height="15" rx="3" fill="#2980b9" />
          <rect x="155" y="38" width="90" height="15" rx="3" fill="#e67e22" />
          <rect x="160" y="22" width="80" height="15" rx="3" fill="#c0392b" />
        </svg>
      </div>

      {/* Title */}
      <div style={{ textAlign: 'center', padding: '16px 0 10px 0', borderBottom: '1px solid #eee' }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#2c3e50', letterSpacing: 0.5 }}>
          SAMHITA WISE QUESTIONS
        </h3>
      </div>

      {/* 3 Stats Columns */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        borderBottom: '1px solid #eee',
        padding: '14px 0',
        textAlign: 'center'
      }}>
        <div style={{ flex: 1, borderRight: '1px solid #eee' }}>
          <div style={{ fontSize: 11, color: '#888' }}>Total Questions</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#2c3e50' }}>57375</div>
        </div>
        <div style={{ flex: 1, borderRight: '1px solid #eee' }}>
          <div style={{ fontSize: 11, color: '#888' }}>Total Solved</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#2c3e50' }}>0</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: '#888' }}>Unique Solved</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#2c3e50' }}>0</div>
        </div>
      </div>

      {/* 2 Blue Buttons: Subscription Plans & Support Helpline */}
      <div style={{
        maxWidth: 1100,
        margin: '18px auto',
        padding: '0 15px',
        display: 'flex',
        gap: 15
      }}>
        <Link
          to="/app1.5/membership.php"
          style={{
            flex: 1,
            backgroundColor: '#2aacdd',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 600,
            textAlign: 'center',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }}
        >
          <i className="fa fa-life-ring"></i>
          <span>Subscription Plans</span>
        </Link>

        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noreferrer"
          style={{
            flex: 1,
            backgroundColor: '#2aacdd',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 600,
            textAlign: 'center',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }}
        >
          <i className="fa fa-life-ring"></i>
          <span>Support Helpline</span>
        </a>
      </div>

      {/* Solved vs Unsolved Split */}
      <div style={{
        maxWidth: 1100,
        margin: '20px auto',
        padding: '0 15px',
        display: 'flex',
        border: '1px solid #eee',
        borderRadius: 4,
        overflow: 'hidden'
      }}>
        <div style={{
          flex: 1,
          padding: '24px 15px',
          textAlign: 'center',
          borderRight: '1px solid #eee'
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: '#27ae60',
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8
          }}>
            <i className="fa fa-check"></i>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#333' }}>0</div>
          <div style={{ fontSize: 13, color: '#555', fontWeight: 600 }}>Solved Question</div>
        </div>

        <div style={{
          flex: 1,
          padding: '24px 15px',
          textAlign: 'center'
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: '#e74c3c',
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8
          }}>
            <i className="fa fa-times"></i>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#333' }}>57375</div>
          <div style={{ fontSize: 13, color: '#555', fontWeight: 600 }}>Unsolved Question</div>
        </div>
      </div>

      {/* Two Pale-Cyan Cards: Samhitawise & Subjectwise */}
      <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 15px' }}>
        <div className="row">
          {/* Card 1: Samhitawise */}
          <div className="col-md-6" style={{ marginBottom: 20 }}>
            <div style={{
              backgroundColor: '#eef9fb',
              borderRadius: 6,
              border: '1px solid #d8edf3',
              padding: '25px 20px',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: 12 }}>
                <i className="fa fa-book" style={{ fontSize: 36, color: '#d81b60' }}></i>
              </div>
              <h4 style={{ margin: '0 0 10px 0', fontSize: 18, fontWeight: 700, color: '#d81b60' }}>
                Samhitawise
              </h4>
              <p style={{ fontSize: 13, color: '#555', marginBottom: 20 }}>
                Practice 57375 questions from different Samhitas.
              </p>
              <Link
                to="/app1.5/category.php?action=samhitas"
                style={{
                  display: 'block',
                  backgroundColor: '#fff',
                  border: '1px solid #d8edf3',
                  padding: '10px',
                  borderRadius: 4,
                  color: '#2c3e50',
                  fontWeight: 600,
                  fontSize: 13,
                  textDecoration: 'none'
                }}
              >
                <i className="fa fa-chevron-circle-right text-muted" style={{ marginRight: 6 }}></i>
                Practice Now
              </Link>
            </div>
          </div>

          {/* Card 2: Subjectwise */}
          <div className="col-md-6" style={{ marginBottom: 20 }}>
            <div style={{
              backgroundColor: '#eef9fb',
              borderRadius: 6,
              border: '1px solid #d8edf3',
              padding: '25px 20px',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: 12 }}>
                <i className="fa fa-book" style={{ fontSize: 36, color: '#2aacdd' }}></i>
              </div>
              <h4 style={{ margin: '0 0 10px 0', fontSize: 18, fontWeight: 700, color: '#2aacdd' }}>
                Subjectwise
              </h4>
              <p style={{ fontSize: 13, color: '#555', marginBottom: 20 }}>
                Practice 57375 questions from different Subjects.
              </p>
              <Link
                to="/app1.5/category.php?action=subjects"
                style={{
                  display: 'block',
                  backgroundColor: '#fff',
                  border: '1px solid #d8edf3',
                  padding: '10px',
                  borderRadius: 4,
                  color: '#2c3e50',
                  fontWeight: 600,
                  fontSize: 13,
                  textDecoration: 'none'
                }}
              >
                <i className="fa fa-chevron-circle-right text-muted" style={{ marginRight: 6 }}></i>
                Practice Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '20px 0 10px 0',
        color: '#666',
        fontSize: 12,
        borderTop: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: 1100,
        margin: '20px auto 0 auto',
        paddingLeft: 15,
        paddingRight: 15
      }}>
        <div>&copy; 2026 AyurQuest Education. All rights reserved.</div>
        <div>Version 1.6</div>
      </div>
    </div>
  );
};

