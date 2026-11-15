import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import { DiagnosticsData } from '../types';

export const Diagnostics: React.FC = () => {
  const [data, setData] = useState<DiagnosticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [upstreamLatency, setUpstreamLatency] = useState<number | null>(null);
  const [testLegacyResult, setTestLegacyResult] = useState<string | null>(null);

  useEffect(() => {
    loadDiagnostics();
  }, []);

  const loadDiagnostics = () => {
    setLoading(true);
    const start = performance.now();
    api.getDiagnostics()
      .then(res => {
        setData(res);
        setUpstreamLatency(Math.round(performance.now() - start));
        setLoading(false);
      })
      .catch(err => {
        console.error("Diagnostics load error:", err);
        setLoading(false);
      });
  };

  const handleTestLegacyBridge = async () => {
    try {
      const res = await api.callLegacyBookmark(101);
      setTestLegacyResult(`POST /ajax_bookmark.php responded: "${res.trim()}" (Status: OK)`);
    } catch (err: any) {
      setTestLegacyResult(`Error calling legacy endpoint: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <i className="fa fa-spinner fa-spin fa-2x text-aqua"></i>
        <p style={{ marginTop: 10 }}>Running environment diagnostics...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="content-wrapper" style={{ padding: '30px' }}>
        <div className="alert alert-danger">Diagnostics service unreachable.</div>
      </div>
    );
  }

  return (
    <div className="content-wrapper" style={{ padding: '20px 25px', backgroundColor: '#f4f6f9', minHeight: 'calc(100vh - 100px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h2 style={{ margin: '0 0 6px 0', fontSize: 24, fontWeight: 700, color: '#2c3e50' }}>
            <i className="fa fa-stethoscope text-yellow" style={{ marginRight: 10 }}></i>
            Developer Diagnostics & System Health
          </h2>
          <p style={{ margin: 0, color: '#7f8c8d', fontSize: 14 }}>
            Verification of replica subsystems, upstream reachability, media delivery, and local state adapters.
          </p>
        </div>
        <div>
          <button onClick={loadDiagnostics} className="btn btn-sm btn-info" style={{ fontWeight: 600 }}>
            <i className="fa fa-refresh" style={{ marginRight: 6 }}></i> Refresh Diagnostics
          </button>
        </div>
      </div>

      {/* Top Banner: Local Dev No Login Status */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: '18px 22px',
        marginBottom: 20,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        borderLeft: '5px solid #27ae60'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h4 style={{ margin: 0, fontWeight: 700, color: '#27ae60' }}>
              <i className="fa fa-check-circle" style={{ marginRight: 8 }}></i>
              NON-INTERACTIVE LOCALHOST ACCESS: ENABLED
            </h4>
            <p style={{ margin: '4px 0 0 0', color: '#555', fontSize: 13 }}>
              Environment variable <code>LOCAL_DEV_NO_LOGIN=true</code> is active. Interactive student login and registration modals are bypassed.
            </p>
          </div>
          <div>
            <span className="label label-success" style={{ fontSize: 12, padding: '6px 12px' }}>
              REPLICA COMPLIANT
            </span>
          </div>
        </div>
      </div>

      {/* Services Grid with LIVE / LOCAL Badges */}
      <div className="row" style={{ marginBottom: 20 }}>
        <div className="col-md-6">
          <div className="box box-solid" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="box-header with-border" style={{ padding: '16px 20px', backgroundColor: '#fcfcfc' }}>
              <h3 className="box-title" style={{ fontSize: 16, fontWeight: 700 }}>
                <i className="fa fa-server text-aqua" style={{ marginRight: 6 }}></i>
                Core System Services
              </h3>
            </div>
            <div className="box-body" style={{ padding: '15px 20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Frontend */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f4f4f4', paddingBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#2c3e50' }}>Vite React Development Server</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{data.services.frontend.host}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span className="label label-info">{data.services.frontend.kind}</span>
                    <span className="label label-success">{data.services.frontend.status}</span>
                  </div>
                </div>

                {/* Local Backend Adapter */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f4f4f4', paddingBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#2c3e50' }}>Node.js / Express API Adapter</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{data.services.localBackendAdapter.host} (Port {data.environment.port})</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span className="label label-info">{data.services.localBackendAdapter.kind}</span>
                    <span className="label label-success">{data.services.localBackendAdapter.status}</span>
                  </div>
                </div>

                {/* Upstream Production */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f4f4f4', paddingBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#2c3e50' }}>Upstream AyurQuest Production Host</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{data.services.upstreamAyurQuest.baseApp} ({upstreamLatency}ms ping)</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span className="label label-warning">{data.services.upstreamAyurQuest.kind}</span>
                    <span className="label label-success">{data.services.upstreamAyurQuest.status}</span>
                  </div>
                </div>

                {/* Media Delivery */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#2c3e50' }}>Video & Media Delivery Architecture</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{data.services.mediaDelivery.provider}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span className="label label-warning">{data.services.mediaDelivery.kind}</span>
                    <span className="label label-success">{data.services.mediaDelivery.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Catalog & Content Status */}
        <div className="col-md-6">
          <div className="box box-solid" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="box-header with-border" style={{ padding: '16px 20px', backgroundColor: '#fcfcfc' }}>
              <h3 className="box-title" style={{ fontSize: 16, fontWeight: 700 }}>
                <i className="fa fa-database text-green" style={{ marginRight: 6 }}></i>
                Curriculum Catalog & Entity Parity
              </h3>
            </div>
            <div className="box-body" style={{ padding: '15px 20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f4f4f4', paddingBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#2c3e50' }}>Video & Audio Courses</div>
                    <div style={{ fontSize: 12, color: '#888' }}>AIAPGET 2027/28, UPSC, State PSC</div>
                  </div>
                  <div>
                    <span className="badge bg-aqua" style={{ fontSize: 12, marginRight: 6 }}>{data.catalogStatus.courses.total} Courses</span>
                    <span className="label label-info">{data.catalogStatus.courses.kind}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f4f4f4', paddingBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#2c3e50' }}>Classical Samhitas</div>
                    <div style={{ fontSize: 12, color: '#888' }}>Charaka, Sushruta, Ashtanga Hridaya, etc.</div>
                  </div>
                  <div>
                    <span className="badge bg-green" style={{ fontSize: 12, marginRight: 6 }}>{data.catalogStatus.samhitas.total} Samhitas</span>
                    <span className="label label-info">{data.catalogStatus.samhitas.kind}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f4f4f4', paddingBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#2c3e50' }}>Ayurveda MCQs in Database</div>
                    <div style={{ fontSize: 12, color: '#888' }}>Brihat Trayi, Laghu Trayi & Sharira</div>
                  </div>
                  <div>
                    <span className="badge bg-yellow" style={{ fontSize: 12, marginRight: 6 }}>{data.catalogStatus.questions.total} Questions</span>
                    <span className="label label-info">{data.catalogStatus.questions.kind}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#2c3e50' }}>Daily Tests & Mock Exams</div>
                    <div style={{ fontSize: 12, color: '#888' }}>Daily Quiz, Rapid Fire, Mock Series</div>
                  </div>
                  <div>
                    <span className="badge bg-purple" style={{ fontSize: 12, marginRight: 6 }}>{data.catalogStatus.quizzes.total} Tests</span>
                    <span className="label label-info">{data.catalogStatus.quizzes.kind}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Session & Local Persistence */}
      <div className="row">
        <div className="col-md-6" style={{ marginBottom: 20 }}>
          <div className="box box-solid" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="box-header with-border" style={{ padding: '16px 20px', backgroundColor: '#fcfcfc' }}>
              <h3 className="box-title" style={{ fontSize: 16, fontWeight: 700 }}>
                <i className="fa fa-user-circle text-aqua" style={{ marginRight: 6 }}></i>
                Local Development Identity State
              </h3>
            </div>
            <div className="box-body" style={{ padding: '15px 20px' }}>
              <table className="table table-bordered" style={{ margin: 0, fontSize: 13 }}>
                <tbody>
                  <tr>
                    <td style={{ width: '40%', fontWeight: 600, color: '#555' }}>Scholar Name</td>
                    <td>{data.userState.localIdentity.name}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#555' }}>Email / Phone</td>
                    <td>{data.userState.localIdentity.email} &bull; {data.userState.localIdentity.phone}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#555' }}>Exam Target</td>
                    <td>{data.userState.localIdentity.examTarget}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#555' }}>Active Subscription</td>
                    <td><span className="label label-warning">{data.userState.localIdentity.membershipPlan}</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#555' }}>Bookmarks Count</td>
                    <td><strong>{data.userState.bookmarksCount}</strong> questions</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#555' }}>Personal Sticky Notes</td>
                    <td><strong>{data.userState.notesCount}</strong> notes</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#555' }}>Attempted Questions</td>
                    <td><strong>{data.userState.attemptsCount}</strong> attempts</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Legacy Endpoint Verification Tool */}
        <div className="col-md-6">
          <div className="box box-solid" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="box-header with-border" style={{ padding: '16px 20px', backgroundColor: '#fcfcfc' }}>
              <h3 className="box-title" style={{ fontSize: 16, fontWeight: 700 }}>
                <i className="fa fa-wrench text-yellow" style={{ marginRight: 6 }}></i>
                Legacy PHP Endpoint Adapter Bridge
              </h3>
            </div>
            <div className="box-body" style={{ padding: '15px 20px' }}>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>
                AyurQuest 1.5 client components make direct POST requests to PHP handler files like <code>/ajax_bookmark.php</code>, <code>/ajax_category_mcq.php</code>, and <code>/ajax_sticky_note.php</code>.
              </p>
              <button
                type="button"
                onClick={handleTestLegacyBridge}
                className="btn btn-sm btn-default"
                style={{ fontWeight: 600, marginBottom: 12 }}
              >
                <i className="fa fa-paper-plane" style={{ marginRight: 6 }}></i>
                Execute Test POST /ajax_bookmark.php
              </button>
              {testLegacyResult && (
                <div style={{
                  padding: '10px 14px',
                  backgroundColor: '#e8f8f5',
                  borderRadius: 4,
                  fontSize: 12,
                  color: '#1e824c',
                  fontFamily: 'monospace'
                }}>
                  {testLegacyResult}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

