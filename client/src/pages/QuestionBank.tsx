import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { Samhita, Sthana } from '../types';

export const QuestionBank: React.FC = () => {
  const navigate = useNavigate();
  const [samhitas, setSamhitas] = useState<Samhita[]>([]);
  const [selectedSamhita, setSelectedSamhita] = useState<Samhita | null>(null);
  const [selectedSthana, setSelectedSthana] = useState<Sthana | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSamhitas()
      .then(data => {
        setSamhitas(data);
        if (data.length > 0) {
          setSelectedSamhita(data[0]);
          setSelectedSthana(data[0].sthanas[0] || null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Samhita load error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <i className="fa fa-spinner fa-spin fa-2x text-aqua"></i>
        <p style={{ marginTop: 10 }}>Loading Samhitawise Question Bank...</p>
      </div>
    );
  }

  return (
    <div className="content-wrapper" style={{ padding: '20px 25px', backgroundColor: '#f4f6f9', minHeight: 'calc(100vh - 100px)' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: 24, fontWeight: 700, color: '#2c3e50' }}>
          <i className="fa fa-cubes text-aqua" style={{ marginRight: 10 }}></i>
          Classical Samhita Question Bank
        </h2>
        <p style={{ margin: 0, color: '#7f8c8d', fontSize: 14 }}>
          Browse Brihat Trayi, Laghu Trayi, and Rasa Shastra classics. Practice Sthana-wise and Chapter-wise MCQs.
        </p>
      </div>

      <div className="row">
        {/* Left column: 16 Samhita Cards Selection */}
        <div className="col-lg-5 col-md-6" style={{ marginBottom: 20 }}>
          <div className="box box-solid" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="box-header with-border" style={{ padding: '15px 20px', backgroundColor: '#fcfcfc' }}>
              <h3 className="box-title" style={{ fontSize: 16, fontWeight: 700 }}>
                <i className="fa fa-book text-aqua" style={{ marginRight: 6 }}></i>
                Select Samhita (16 Classics)
              </h3>
            </div>
            <div className="box-body" style={{ maxHeight: 600, overflowY: 'auto', padding: 0 }}>
              <ul className="products-list product-list-in-box" style={{ margin: 0, padding: 0 }}>
                {samhitas.map(sam => {
                  const isSelected = selectedSamhita?.id === sam.id;
                  return (
                    <li
                      key={sam.id}
                      onClick={() => {
                        setSelectedSamhita(sam);
                        setSelectedSthana(sam.sthanas[0] || null);
                      }}
                      style={{
                        padding: '14px 18px',
                        backgroundColor: isSelected ? '#f0f9fd' : '#fff',
                        borderLeft: isSelected ? '4px solid #2aacdd' : '4px solid transparent',
                        borderBottom: '1px solid #f4f4f4',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 15
                      }}
                    >
                      <img
                        src={`/${sam.icon}`}
                        alt={sam.name}
                        style={{ width: 44, height: 44, objectFit: 'contain' }}
                        onError={(e) => {
                          // fallback if image not found
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: isSelected ? 700 : 600, color: isSelected ? '#2aacdd' : '#2c3e50', fontSize: 15 }}>
                          {sam.name}
                        </div>
                        <div style={{ fontSize: 12, color: '#e67e22', fontWeight: 600 }}>
                          {sam.hindiName}
                        </div>
                        <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
                          {sam.author} &bull; {sam.totalChapters} Chapters
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span className="badge bg-green" style={{ fontSize: 11 }}>
                          {sam.totalQuestions} MCQs
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Right column: Sthana & Chapter Drilldown + Practice Launcher */}
        <div className="col-lg-7 col-md-6">
          {selectedSamhita && (
            <div className="box box-solid" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div className="box-header with-border" style={{ padding: '18px 22px', backgroundColor: '#fcfcfc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 className="box-title" style={{ fontSize: 18, fontWeight: 700, color: '#2c3e50' }}>
                      {selectedSamhita.name} ({selectedSamhita.hindiName})
                    </h3>
                    <p style={{ margin: '4px 0 0 0', color: '#7f8c8d', fontSize: 13 }}>
                      Author: {selectedSamhita.author} &bull; {selectedSamhita.sthanas.length} Sthanas
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/quiz/practice?sam_id=${selectedSamhita.id}`)}
                    className="btn btn-sm btn-success"
                    style={{ fontWeight: 600 }}
                  >
                    <i className="fa fa-play" style={{ marginRight: 6 }}></i> Practice All {selectedSamhita.name}
                  </button>
                </div>
              </div>

              <div className="box-body" style={{ padding: '20px 22px' }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#333', marginBottom: 15 }}>
                  Select Sthana to Practice:
                </h4>

                <div className="row">
                  {selectedSamhita.sthanas.map(sth => {
                    const isSthSelected = selectedSthana?.id === sth.id;
                    return (
                      <div key={sth.id} className="col-md-6" style={{ marginBottom: 15 }}>
                        <div
                          onClick={() => setSelectedSthana(sth)}
                          style={{
                            padding: '16px',
                            borderRadius: 6,
                            backgroundColor: isSthSelected ? '#f0f9fd' : '#fff',
                            border: isSthSelected ? '2px solid #2aacdd' : '1px solid #e1e8ed',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                              <h5 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#2c3e50' }}>
                                {sth.name}
                              </h5>
                              <span className="label label-primary" style={{ fontSize: 10 }}>
                                {sth.chapters} Ch.
                              </span>
                            </div>
                            <p style={{ fontSize: 12, color: '#666', lineHeight: 1.4, margin: 0 }}>
                              {sth.description}
                            </p>
                          </div>

                          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 11, color: '#2aacdd', fontWeight: 600 }}>
                              <i className="fa fa-check-circle" style={{ marginRight: 4 }}></i> Ready to Solve
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/quiz/practice?sam_id=${selectedSamhita.id}&sth_id=${sth.id}`);
                              }}
                              className="btn btn-xs btn-info"
                              style={{ fontWeight: 600 }}
                            >
                              <i className="fa fa-play" style={{ marginRight: 4 }}></i> Start
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Practice Mode Info Box */}
                <div style={{
                  marginTop: 20,
                  padding: '16px 20px',
                  backgroundColor: '#fef9e7',
                  borderLeft: '4px solid #f39c12',
                  borderRadius: 4
                }}>
                  <h5 style={{ margin: '0 0 6px 0', fontWeight: 700, color: '#b7791f' }}>
                    <i className="fa fa-lightbulb-o" style={{ marginRight: 6 }}></i>
                    Practice Mode Features
                  </h5>
                  <p style={{ margin: 0, fontSize: 12, color: '#7c5417', lineHeight: 1.5 }}>
                    Instant audio feedback with enhanced sound effects (<code>correct-enhanced-v2-90p.mp3</code>), authentic Sanskrit commentaries, 1-click bookmarking, personal sticky notes, and error reporting.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

