import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { Question } from '../types';

export const Notes: React.FC = () => {
  const [notesList, setNotesList] = useState<{ quesId: number; question: Question; notes: string[] }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    setLoading(true);
    api.getNotes()
      .then(data => {
        setNotesList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Notes load error:", err);
        setLoading(false);
      });
  };

  return (
    <div className="content-wrapper" style={{ padding: '20px 25px', backgroundColor: '#f4f6f9', minHeight: 'calc(100vh - 100px)' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: 24, fontWeight: 700, color: '#2c3e50' }}>
          <i className="fa fa-sticky-note-o text-aqua" style={{ marginRight: 10 }}></i>
          My Personal Sticky Notes ({notesList.length})
        </h2>
        <p style={{ margin: 0, color: '#7f8c8d', fontSize: 14 }}>
          Annotated notes, memory shortcuts, and references attached to specific Ayurveda MCQs.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <i className="fa fa-spinner fa-spin fa-2x text-aqua"></i>
          <p style={{ marginTop: 10 }}>Loading study notes...</p>
        </div>
      ) : notesList.length === 0 ? (
        <div className="box box-solid" style={{ borderRadius: 8, padding: '40px', textAlign: 'center' }}>
          <i className="fa fa-pencil-square-o" style={{ fontSize: 48, color: '#ccc', marginBottom: 15 }}></i>
          <h4>No Personal Notes Added Yet</h4>
          <p style={{ color: '#777', fontSize: 13 }}>
            Add sticky notes to questions while practicing to record mnemonic devices and key reminders.
          </p>
          <Link to="/question-bank" className="btn btn-info" style={{ marginTop: 10 }}>
            Go to Samhita Question Bank
          </Link>
        </div>
      ) : (
        <div className="row">
          {notesList.map(item => (
            <div key={item.quesId} className="col-md-6 col-lg-6" style={{ marginBottom: 20 }}>
              <div
                className="box box-solid"
                style={{
                  borderRadius: 8,
                  padding: '20px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  borderLeft: '4px solid #2aacdd',
                  backgroundColor: '#fff',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span className="label label-primary">{item.question.sam}</span>
                    <span style={{ fontSize: 11, color: '#999' }}>Question #{item.quesId}</span>
                  </div>

                  <h4 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 600, color: '#2c3e50', lineHeight: 1.5 }}>
                    {item.question.Q}
                  </h4>

                  {/* Notes cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 15 }}>
                    {item.notes.map((note, nIdx) => (
                      <div
                        key={nIdx}
                        style={{
                          backgroundColor: '#fefde8',
                          border: '1px solid #fef08a',
                          padding: '10px 14px',
                          borderRadius: 6,
                          fontSize: 13,
                          color: '#713f12',
                          lineHeight: 1.5
                        }}
                      >
                        <i className="fa fa-sticky-note text-yellow" style={{ marginRight: 6 }}></i>
                        {note}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: '#888' }}>
                    Correct: Option {String.fromCharCode(64 + item.question.A)}
                  </span>
                  <Link
                    to={`/quiz/practice?sam_id=${item.question.sam_id}&sth_id=${item.question.sth_id}`}
                    className="btn btn-xs btn-default"
                  >
                    <i className="fa fa-play" style={{ marginRight: 4 }}></i> Practice Question
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

