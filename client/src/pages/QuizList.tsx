import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import { Quiz } from '../types';

export const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentMode = searchParams.get('mode') || 'daily';

  useEffect(() => {
    setLoading(true);
    api.getQuizzes(currentMode === 'all' ? undefined : currentMode)
      .then(data => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Quizzes load error:", err);
        setLoading(false);
      });
  }, [currentMode]);

  const tabs = [
    { id: 'daily', label: 'Daily Tests', icon: 'fa-calendar-check-o' },
    { id: 'mock', label: 'AIAPGET Mock Tests', icon: 'fa-clock-o' },
    { id: 'rapid', label: 'Rapid Fire Quizzes', icon: 'fa-bolt' },
    { id: 'pre_entrance', label: 'State Pre-Entrance', icon: 'fa-university' },
  ];

  return (
    <div className="content-wrapper" style={{ padding: '20px 25px', backgroundColor: '#f4f6f9', minHeight: 'calc(100vh - 100px)' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: 24, fontWeight: 700, color: '#2c3e50' }}>
          <i className="fa fa-list-alt text-aqua" style={{ marginRight: 10 }}></i>
          AyurQuest Test Series & Mock Exams
        </h2>
        <p style={{ margin: 0, color: '#7f8c8d', fontSize: 14 }}>
          Daily timed quizzes, AIAPGET 90-minute full simulations, and subjectwise challenges.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 25, flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSearchParams({ mode: tab.id })}
            className={`btn btn-sm ${currentMode === tab.id ? 'btn-info' : 'btn-default'}`}
            style={{
              padding: '8px 18px',
              borderRadius: 20,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: currentMode === tab.id ? '0 2px 6px rgba(42, 172, 221, 0.3)' : 'none'
            }}
          >
            <i className={`fa ${tab.icon}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Quizzes Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <i className="fa fa-spinner fa-spin fa-2x text-aqua"></i>
          <p style={{ marginTop: 10 }}>Loading tests...</p>
        </div>
      ) : quizzes.length === 0 ? (
        <div className="alert alert-info" style={{ backgroundColor: '#fff', color: '#555', borderLeft: '4px solid #2aacdd' }}>
          No tests found in this category. Check back soon!
        </div>
      ) : (
        <div className="row">
          {quizzes.map(quiz => (
            <div key={quiz.id} className="col-md-6 col-lg-6" style={{ marginBottom: 20 }}>
              <div
                className="box box-solid"
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: '20px 22px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  border: '1px solid #e1e8ed',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <span className="label label-primary" style={{ fontSize: 10, textTransform: 'uppercase' }}>
                      {quiz.mode.replace('_', ' ')}
                    </span>
                    <span style={{ fontSize: 12, color: '#999' }}>
                      <i className="fa fa-calendar" style={{ marginRight: 4 }}></i>
                      {quiz.d} &bull; {quiz.pt}
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 6px 0', fontSize: 18, fontWeight: 700, color: '#2c3e50' }}>
                    {quiz.name}
                  </h3>
                  <p style={{ margin: '0 0 15px 0', fontSize: 13, color: '#7f8c8d' }}>
                    {quiz.sub}
                  </p>

                  {/* Metadata chips */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 12,
                    backgroundColor: '#f8fafc',
                    padding: '10px 14px',
                    borderRadius: 6,
                    marginBottom: 15,
                    fontSize: 12,
                    color: '#555'
                  }}>
                    <span>
                      <i className="fa fa-question-circle text-aqua" style={{ marginRight: 4 }}></i>
                      <strong>{quiz.q}</strong> MCQs
                    </span>
                    <span>
                      <i className="fa fa-clock-o text-yellow" style={{ marginRight: 4 }}></i>
                      <strong>{quiz.qt}</strong> Minutes
                    </span>
                    <span>
                      <i className="fa fa-trophy text-green" style={{ marginRight: 4 }}></i>
                      <strong>{quiz.m}</strong> Marks (+{quiz.pm} / -{quiz.nm})
                    </span>
                    <span>
                      <i className="fa fa-gift text-orange" style={{ marginRight: 4 }}></i>
                      <strong>+{quiz.w}</strong> Wallet Pts
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                  <Link
                    to={`/quiz/${quiz.id}?mode=exam`}
                    className="btn btn-warning"
                    style={{ flex: 1, fontWeight: 600 }}
                  >
                    <i className="fa fa-pencil" style={{ marginRight: 6 }}></i>
                    Exam Mode (Timed)
                  </Link>
                  <Link
                    to={`/quiz/${quiz.id}?mode=practice`}
                    className="btn btn-info"
                    style={{ flex: 1, fontWeight: 600 }}
                  >
                    <i className="fa fa-bolt" style={{ marginRight: 6 }}></i>
                    Practice Mode (Instant Feedback)
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

