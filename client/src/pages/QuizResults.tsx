import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';

export const QuizResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as {
    result: {
      uuid: string;
      totalQuestions: number;
      correctCount: number;
      wrongCount: number;
      unattemptedCount: number;
      score: number;
      maxMarks: number;
      percentage: number;
      pointsAwarded: number;
    };
    quiz?: any;
    userAnswers?: Record<number, number>;
  } | undefined;

  const result = state?.result;
  const quiz = state?.quiz;

  if (!result) {
    return (
      <div className="content-wrapper" style={{ padding: '30px' }}>
        <div className="alert alert-info">No recent test submission found.</div>
        <Link to="/quizzes" className="btn btn-default">Go to Tests</Link>
      </div>
    );
  }

  return (
    <div className="content-wrapper" style={{ padding: '20px 25px', backgroundColor: '#f4f6f9', minHeight: 'calc(100vh - 100px)' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: 24, fontWeight: 700, color: '#2c3e50' }}>
          <i className="fa fa-trophy text-yellow" style={{ marginRight: 10 }}></i>
          Test Results & Performance Summary
        </h2>
        <p style={{ margin: 0, color: '#7f8c8d', fontSize: 14 }}>
          {quiz?.name || "AIAPGET Examination Assessment"} &bull; Ref: {result.uuid}
        </p>
      </div>

      {/* Score Summary Box */}
      <div className="row">
        <div className="col-md-12" style={{ marginBottom: 25 }}>
          <div style={{
            background: 'linear-gradient(135deg, #2aacdd 0%, #1b6ca8 100%)',
            borderRadius: 8,
            padding: '30px',
            color: '#fff',
            boxShadow: '0 4px 15px rgba(42, 172, 221, 0.3)'
          }}>
            <div className="row" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="col-md-4 text-center" style={{ borderRight: '1px solid rgba(255,255,255,0.2)' }}>
                <span style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.9 }}>Final Score</span>
                <div style={{ fontSize: 48, fontWeight: 800, margin: '6px 0' }}>
                  {result.score} <span style={{ fontSize: 22, fontWeight: 400, opacity: 0.8 }}>/ {result.maxMarks}</span>
                </div>
                <span className="label label-warning" style={{ fontSize: 12, padding: '4px 10px' }}>
                  {result.percentage}% Accuracy
                </span>
              </div>

              <div className="col-md-8">
                <div className="row text-center">
                  <div className="col-xs-3">
                    <div style={{ fontSize: 24, fontWeight: 700 }}>{result.totalQuestions}</div>
                    <div style={{ fontSize: 12, opacity: 0.9 }}>Questions</div>
                  </div>
                  <div className="col-xs-3">
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#a3e4d7' }}>{result.correctCount}</div>
                    <div style={{ fontSize: 12, opacity: 0.9 }}>Correct</div>
                  </div>
                  <div className="col-xs-3">
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#f5b7b1' }}>{result.wrongCount}</div>
                    <div style={{ fontSize: 12, opacity: 0.9 }}>Wrong</div>
                  </div>
                  <div className="col-xs-3">
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#f9e79f' }}>{result.unattemptedCount}</div>
                    <div style={{ fontSize: 12, opacity: 0.9 }}>Unattempted</div>
                  </div>
                </div>

                <div style={{
                  marginTop: 20,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  padding: '10px 16px',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span><i className="fa fa-gift" style={{ marginRight: 6 }}></i> Wallet Points Earned:</span>
                  <strong style={{ fontSize: 16 }}>+{result.pointsAwarded} Points</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Review Table */}
      {quiz?.questions && (
        <div className="box box-solid" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="box-header with-border" style={{ padding: '16px 20px', backgroundColor: '#fcfcfc' }}>
            <h3 className="box-title" style={{ fontSize: 16, fontWeight: 700 }}>
              <i className="fa fa-search text-aqua" style={{ marginRight: 6 }}></i>
              Question Breakdown & Commentary
            </h3>
          </div>
          <div className="box-body" style={{ padding: '15px 20px' }}>
            {quiz.questions.map((q: any, idx: number) => {
              const userAns = state?.userAnswers ? state.userAnswers[q.id] : undefined;
              const isCorrect = userAns === q.A;
              const isUnattempted = !userAns;

              return (
                <div
                  key={q.id}
                  style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #eee'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                    <span style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: isCorrect ? '#27ae60' : isUnattempted ? '#999' : '#e74c3c',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: 2
                    }}>
                      {idx + 1}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#2c3e50' }}>{q.Q}</div>
                      <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                        Your Answer: <strong>{userAns ? `Option ${String.fromCharCode(64 + userAns)}` : 'Unattempted'}</strong> &bull;
                        Correct: <strong className="text-green">Option {String.fromCharCode(64 + q.A)}</strong>
                      </div>
                      <div style={{ marginTop: 6, fontSize: 13, color: '#555', backgroundColor: '#f9f9f9', padding: '8px 12px', borderRadius: 4 }}>
                        <strong>Explanation: </strong> {q.com}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        <Link to="/quizzes" className="btn btn-default" style={{ fontWeight: 600 }}>
          <i className="fa fa-list" style={{ marginRight: 6 }}></i> All Tests
        </Link>
        <Link to="/scorecard" className="btn btn-success" style={{ fontWeight: 600 }}>
          <i className="fa fa-line-chart" style={{ marginRight: 6 }}></i> View Complete Score Card
        </Link>
        {id && (
          <Link to={`/quiz/${id}?mode=exam`} className="btn btn-info" style={{ fontWeight: 600 }}>
            <i className="fa fa-refresh" style={{ marginRight: 6 }}></i> Retake Test
          </Link>
        )}
      </div>
    </div>
  );
};

