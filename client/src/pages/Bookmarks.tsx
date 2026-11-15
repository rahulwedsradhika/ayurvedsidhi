import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { Question } from '../types';

export const Bookmarks: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSamhita, setFilterSamhita] = useState<string>("all");

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = () => {
    setLoading(true);
    api.getBookmarks()
      .then(data => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch(err => {
        console.error("Bookmarks load error:", err);
        setLoading(false);
      });
  };

  const handleRemoveBookmark = async (quesId: number) => {
    try {
      await api.toggleBookmark(quesId);
      setQuestions(prev => prev.filter(q => q.id !== quesId));
    } catch (err) {
      console.error("Remove bookmark error:", err);
    }
  };

  const samhitas = Array.from(new Set(questions.map(q => q.sam)));
  const filtered = filterSamhita === 'all' ? questions : questions.filter(q => q.sam === filterSamhita);

  return (
    <div className="content-wrapper" style={{ padding: '20px 25px', backgroundColor: '#f4f6f9', minHeight: 'calc(100vh - 100px)' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: 24, fontWeight: 700, color: '#2c3e50' }}>
          <i className="fa fa-bookmark text-yellow" style={{ marginRight: 10 }}></i>
          My Bookmarked Questions ({questions.length})
        </h2>
        <p style={{ margin: 0, color: '#7f8c8d', fontSize: 14 }}>
          High-yield Ayurveda MCQs saved for targeted revision before exam day.
        </p>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#555' }}>Filter by Samhita:</span>
        <button
          type="button"
          onClick={() => setFilterSamhita('all')}
          className={`btn btn-sm ${filterSamhita === 'all' ? 'btn-info' : 'btn-default'}`}
          style={{ borderRadius: 15 }}
        >
          All ({questions.length})
        </button>
        {samhitas.map(sam => (
          <button
            key={sam}
            type="button"
            onClick={() => setFilterSamhita(sam)}
            className={`btn btn-sm ${filterSamhita === sam ? 'btn-info' : 'btn-default'}`}
            style={{ borderRadius: 15 }}
          >
            {sam} ({questions.filter(q => q.sam === sam).length})
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <i className="fa fa-spinner fa-spin fa-2x text-aqua"></i>
          <p style={{ marginTop: 10 }}>Loading saved bookmarks...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="box box-solid" style={{ borderRadius: 8, padding: '40px', textAlign: 'center' }}>
          <i className="fa fa-bookmark-o" style={{ fontSize: 48, color: '#ccc', marginBottom: 15 }}></i>
          <h4>No Bookmarked Questions Found</h4>
          <p style={{ color: '#777', fontSize: 13 }}>
            Bookmark tricky or high-yield questions while practicing in the question bank.
          </p>
          <Link to="/question-bank" className="btn btn-info" style={{ marginTop: 10 }}>
            Go to Samhita Question Bank
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {filtered.map((q, idx) => (
            <div
              key={q.id}
              className="box box-solid"
              style={{
                borderRadius: 8,
                padding: '20px 22px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                borderLeft: '4px solid #f39c12'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <span className="label label-info" style={{ marginRight: 6 }}>{q.sam}</span>
                  <span className="label label-default" style={{ marginRight: 6 }}>{q.sth}</span>
                  <span style={{ fontSize: 11, color: '#999' }}>ID: #{q.id}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveBookmark(q.id)}
                  className="btn btn-xs btn-default text-red"
                  title="Remove from bookmarks"
                >
                  <i className="fa fa-trash"></i> Remove
                </button>
              </div>

              <div style={{ fontSize: 15, fontWeight: 600, color: '#2c3e50', marginBottom: 15, lineHeight: 1.5 }}>
                {q.Q}
              </div>

              {/* Options */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10, marginBottom: 15 }}>
                {[q.O1, q.O2, q.O3, q.O4].map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 4,
                      backgroundColor: (oIdx + 1 === q.A) ? '#e8f8f5' : '#f9f9f9',
                      border: (oIdx + 1 === q.A) ? '1px solid #27ae60' : '1px solid #eee',
                      color: (oIdx + 1 === q.A) ? '#1e824c' : '#555',
                      fontSize: 13,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <strong>{String.fromCharCode(65 + oIdx)}.</strong> {opt}
                    {oIdx + 1 === q.A && <i className="fa fa-check text-green pull-right" style={{ marginLeft: 'auto' }}></i>}
                  </div>
                ))}
              </div>

              {/* Commentary */}
              <div style={{ backgroundColor: '#fffdf5', border: '1px solid #fef3c7', padding: '10px 14px', borderRadius: 4, fontSize: 13, color: '#7c5417' }}>
                <strong>Commentary: </strong> {q.com}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

