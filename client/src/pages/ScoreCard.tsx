import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { ScorecardData } from '../types';

export const ScoreCard: React.FC = () => {
  const [data, setData] = useState<ScorecardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getScorecard()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Scorecard error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <i className="fa fa-spinner fa-spin fa-2x text-aqua"></i>
        <p style={{ marginTop: 10 }}>Loading student performance scorecard...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="content-wrapper" style={{ padding: '30px' }}>
        <div className="alert alert-danger">Failed to load scorecard data.</div>
      </div>
    );
  }

  return (
    <div className="content-wrapper" style={{ padding: '20px 25px', backgroundColor: '#f4f6f9', minHeight: 'calc(100vh - 100px)' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: 24, fontWeight: 700, color: '#2c3e50' }}>
          <i className="fa fa-line-chart text-green" style={{ marginRight: 10 }}></i>
          Student Performance Analytics & Score Card
        </h2>
        <p style={{ margin: 0, color: '#7f8c8d', fontSize: 14 }}>
          Comprehensive tracking of Ayurveda question attempts, accuracy, and test simulations.
        </p>
      </div>

      {/* 4 Stats Cards */}
      <div className="row" style={{ marginBottom: 25 }}>
        <div className="col-md-3 col-sm-6 col-xs-12">
          <div className="info-box" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <span className="info-box-icon bg-aqua" style={{ borderRadius: '8px 0 0 8px' }}>
              <i className="fa fa-question-circle"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Attempted</span>
              <span className="info-box-number" style={{ fontSize: 22 }}>{data.totalAttempted}</span>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 col-xs-12">
          <div className="info-box" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <span className="info-box-icon bg-green" style={{ borderRadius: '8px 0 0 8px' }}>
              <i className="fa fa-check"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Correct</span>
              <span className="info-box-number" style={{ fontSize: 22, color: '#27ae60' }}>{data.correctCount}</span>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 col-xs-12">
          <div className="info-box" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <span className="info-box-icon bg-red" style={{ borderRadius: '8px 0 0 8px' }}>
              <i className="fa fa-times"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Incorrect</span>
              <span className="info-box-number" style={{ fontSize: 22, color: '#e74c3c' }}>{data.incorrectCount}</span>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 col-xs-12">
          <div className="info-box" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <span className="info-box-icon bg-yellow" style={{ borderRadius: '8px 0 0 8px' }}>
              <i className="fa fa-percent"></i>
            </span>
            <div className="info-box-content">
              <span className="info-box-text">Accuracy</span>
              <span className="info-box-number" style={{ fontSize: 22, color: '#f39c12' }}>{data.accuracy}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Completed Tests History */}
        <div className="col-lg-6 col-md-12" style={{ marginBottom: 20 }}>
          <div className="box box-solid" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="box-header with-border" style={{ padding: '16px 20px', backgroundColor: '#fcfcfc' }}>
              <h3 className="box-title" style={{ fontSize: 16, fontWeight: 700 }}>
                <i className="fa fa-history text-aqua" style={{ marginRight: 6 }}></i>
                Completed Test History ({data.testHistory.length})
              </h3>
            </div>
            <div className="box-body" style={{ padding: 0 }}>
              {data.testHistory.length === 0 ? (
                <div style={{ padding: 25, textAlign: 'center', color: '#888' }}>
                  No tests submitted yet. Attempt a daily quiz or mock test!
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover" style={{ margin: 0 }}>
                    <thead>
                      <tr style={{ color: '#888', fontSize: 12 }}>
                        <th>Test Title</th>
                        <th>Score</th>
                        <th>Percentage</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.testHistory.map((t, idx) => (
                        <tr key={idx}>
                          <td>
                            <strong style={{ color: '#2c3e50', fontSize: 13 }}>{t.quizName}</strong>
                          </td>
                          <td style={{ fontWeight: 600 }}>{t.score} / {t.total}</td>
                          <td>
                            <span className={`label ${t.percentage >= 70 ? 'label-success' : 'label-warning'}`}>
                              {t.percentage}%
                            </span>
                          </td>
                          <td style={{ fontSize: 12, color: '#999' }}>{t.solvedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent MCQ Solved Activity */}
        <div className="col-lg-6 col-md-12">
          <div className="box box-solid" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="box-header with-border" style={{ padding: '16px 20px', backgroundColor: '#fcfcfc' }}>
              <h3 className="box-title" style={{ fontSize: 16, fontWeight: 700 }}>
                <i className="fa fa-list-ol text-green" style={{ marginRight: 6 }}></i>
                Recent Question Practice Stream
              </h3>
            </div>
            <div className="box-body" style={{ padding: 0 }}>
              {data.recentAttempts.length === 0 ? (
                <div style={{ padding: 25, textAlign: 'center', color: '#888' }}>
                  No practice questions attempted yet.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover" style={{ margin: 0 }}>
                    <thead>
                      <tr style={{ color: '#888', fontSize: 12 }}>
                        <th>Question</th>
                        <th>Samhita</th>
                        <th>Result</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentAttempts.map((att, idx) => (
                        <tr key={idx}>
                          <td style={{ fontSize: 13, color: '#333', maxWidth: 220 }}>
                            {att.questionText.slice(0, 45)}...
                          </td>
                          <td style={{ fontSize: 12, color: '#777' }}>{att.samhita}</td>
                          <td>
                            {att.isCorrect ? (
                              <span className="label label-success"><i className="fa fa-check"></i> Correct</span>
                            ) : (
                              <span className="label label-danger"><i className="fa fa-times"></i> Wrong</span>
                            )}
                          </td>
                          <td style={{ fontSize: 12, color: '#999' }}>{att.timeTaken}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

