import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { User } from '../types';

export const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboard()
      .then(data => {
        setUser(data.user);
        setStats(data.stats);
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <i className="fa fa-spinner fa-spin fa-3x" style={{ color: '#2aacdd' }}></i>
        <p style={{ marginTop: 15, fontSize: 16 }}>Loading AyurQuest 1.5 Learning Dashboard...</p>
      </div>
    );
  }

  const tiles = [
    {
      title: "Video Courses",
      subtitle: "Comprehensive PG & UPSC Modules",
      icon: "fa fa-graduation-cap",
      svgId: "video-camera",
      link: "/courses",
      color: "#2aacdd",
      ribbon: "Popular"
    },
    {
      title: "Daily Tests",
      subtitle: "Live Daily Quizzes & MCQs",
      icon: "fa fa-calendar-check-o",
      svgId: "file",
      link: "/quizzes?mode=daily",
      color: "#27ae60",
      ribbon: "Live"
    },
    {
      title: "Full Mock Tests",
      subtitle: "Simulated AIAPGET 90-min Exams",
      icon: "fa fa-clock-o",
      svgId: "file-1",
      link: "/quizzes?mode=mock",
      color: "#e67e22",
      ribbon: "Exam Mode"
    },
    {
      title: "Rapid Fire",
      subtitle: "Quick Fire Speed Challenge",
      icon: "fa fa-bolt",
      svgId: "invention",
      link: "/quizzes?mode=rapid",
      color: "#e74c3c",
      ribbon: "Speed"
    },
    {
      title: "Samhitawise MCQs",
      subtitle: "Charaka, Sushruta, Vagbhata",
      icon: "fa fa-cubes",
      svgId: "notepad",
      link: "/question-bank",
      color: "#3498db",
      ribbon: "16 Samhitas"
    },
    {
      title: "AIAPGET Prep",
      subtitle: "Comprehensive 2027/28 Target",
      icon: "fa fa-book",
      svgId: "file",
      link: "/courses?type=aiapget",
      color: "#8e44ad",
      ribbon: "2027/28"
    },
    {
      title: "UPSC Entrance",
      subtitle: "Medical Officer Syllabus",
      icon: "fa fa-university",
      svgId: "business-and-finance",
      link: "/courses?type=upsc",
      color: "#16a085",
      ribbon: "Govt Jobs"
    },
    {
      title: "Audio Lectures",
      subtitle: "Revision On-the-Go Streams",
      icon: "fa fa-headphones",
      svgId: "video-camera",
      link: "/courses?type=revision",
      color: "#d35400",
      ribbon: "Audio"
    },
    {
      title: "Bookmarks",
      subtitle: `${stats?.bookmarkedCount || 0} Questions Saved`,
      icon: "fa fa-bookmark",
      svgId: "notepad",
      link: "/bookmarks",
      color: "#f39c12",
      ribbon: `${stats?.bookmarkedCount || 0} Saved`
    },
    {
      title: "Personal Notes",
      subtitle: `${stats?.notesCount || 0} Sticky Annotations`,
      icon: "fa fa-sticky-note-o",
      svgId: "notepad",
      link: "/notes",
      color: "#00c0ef",
      ribbon: "Study Notes"
    },
    {
      title: "Score Card & Stats",
      subtitle: `Accuracy: ${stats?.accuracy || 0}% (${stats?.solvedCount || 0} Solved)`,
      icon: "fa fa-line-chart",
      svgId: "business-and-finance",
      link: "/scorecard",
      color: "#00a65a",
      ribbon: `${stats?.accuracy || 0}% Accuracy`
    },
    {
      title: "Wallet Points",
      subtitle: `${stats?.walletPoints || 0} Points Balance`,
      icon: "fa fa-money",
      svgId: "business-and-finance",
      link: "/wallet",
      color: "#dd4b39",
      ribbon: `${stats?.walletPoints || 0} Pts`
    },
    {
      title: "Dev Diagnostics",
      subtitle: "Health & Upstream Monitor",
      icon: "fa fa-stethoscope",
      svgId: "settings",
      link: "/dev/diagnostics",
      color: "#605ca8",
      ribbon: "LOCAL DEV"
    }
  ];

  return (
    <div className="content-wrapper" style={{ padding: '20px 25px', backgroundColor: '#f4f6f9', minHeight: 'calc(100vh - 100px)' }}>
      {/* Top Welcome & Notification Bar */}
      <div className="callout callout-info" style={{
        backgroundColor: '#fff',
        borderLeft: '5px solid #2aacdd',
        borderRadius: 4,
        padding: '16px 20px',
        marginBottom: 25,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        color: '#333'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h4 style={{ margin: 0, color: '#2aacdd', fontWeight: 600, fontSize: 18 }}>
              <i className="fa fa-graduation-cap" style={{ marginRight: 8 }}></i>
              AyurQuest 1.5 Interactive Learning Suite
            </h4>
            <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: 13 }}>
              Target: <strong>{user?.examTarget || "AIAPGET 2027"}</strong> &bull; Plan: <strong>{user?.membershipPlan}</strong>
            </p>
          </div>
          <div>
            <span className="label label-success" style={{ fontSize: 12, padding: '6px 12px', marginRight: 8 }}>
              <i className="fa fa-unlock"></i> LOCAL_DEV_NO_LOGIN: ACTIVE
            </span>
            <Link to="/dev/diagnostics" className="btn btn-sm btn-default" style={{ borderColor: '#ddd' }}>
              <i className="fa fa-cogs"></i> System Diagnostics
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Banners Carousel Replica */}
      <div className="row" style={{ marginBottom: 25 }}>
        <div className="col-md-6" style={{ marginBottom: 15 }}>
          <div style={{
            background: 'linear-gradient(135deg, #2aacdd 0%, #1b6ca8 100%)',
            borderRadius: 8,
            padding: '24px 25px',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(42, 172, 221, 0.25)'
          }}>
            <span className="label label-warning" style={{ fontSize: 11, fontWeight: 'bold' }}>TARGET 2028</span>
            <h3 style={{ margin: '12px 0 6px 0', fontWeight: 700, fontSize: 22 }}>
              AIAPGET 2028 Comprehensive Program
            </h3>
            <p style={{ fontSize: 13, opacity: 0.9, maxWidth: '80%' }}>
              Complete curriculum coverage across Charaka, Sushruta, Vagbhata with high-yield video lectures, mock test series, and personalized notes.
            </p>
            <div style={{ marginTop: 15 }}>
              <Link to="/courses/aiapget-2028" className="btn btn-default" style={{ color: '#1b6ca8', fontWeight: 600 }}>
                <i className="fa fa-play-circle" style={{ marginRight: 6 }}></i> Explore Course & Lectures
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6" style={{ marginBottom: 15 }}>
          <div style={{
            background: 'linear-gradient(135deg, #27ae60 0%, #1e824c 100%)',
            borderRadius: 8,
            padding: '24px 25px',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(39, 174, 96, 0.25)'
          }}>
            <span className="label label-warning" style={{ fontSize: 11, fontWeight: 'bold' }}>EXAM PREPARATION</span>
            <h3 style={{ margin: '12px 0 6px 0', fontWeight: 700, fontSize: 22 }}>
              AIAPGET 2027 & UPSC Live Batch
            </h3>
            <p style={{ fontSize: 13, opacity: 0.9, maxWidth: '80%' }}>
              Vimeo embedded video stream with real-time commentary, comprehensive question palette, and AIAPGET test simulation.
            </p>
            <div style={{ marginTop: 15 }}>
              <Link to="/courses/aiapget-2027" className="btn btn-default" style={{ color: '#1e824c', fontWeight: 600 }}>
                <i className="fa fa-play-circle" style={{ marginRight: 6 }}></i> Watch Lecture & Solve MCQs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 21 Tiles Grid (AyurQuest Production Architecture) */}
      <div className="box box-solid" style={{ borderRadius: 6, border: 'none', boxShadow: 'none', background: 'transparent' }}>
        <div className="box-header" style={{ padding: '0 0 15px 0' }}>
          <h3 className="box-title" style={{ fontSize: 18, fontWeight: 700, color: '#333' }}>
            <i className="fa fa-th-large text-aqua" style={{ marginRight: 8 }}></i>
            Learning Modules & Interactive Tools
          </h3>
        </div>

        <div className="row">
          {tiles.map((tile, idx) => (
            <div key={idx} className="col-lg-3 col-md-4 col-sm-6 col-xs-12" style={{ marginBottom: 20 }}>
              <Link to={tile.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div
                  className="small-box"
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    padding: '20px',
                    position: 'relative',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    borderTop: `4px solid ${tile.color}`,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    minHeight: 140,
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                  }}
                >
                  {/* Top Ribbon */}
                  {tile.ribbon && (
                    <div style={{
                      position: 'absolute',
                      top: 10,
                      right: 12,
                      backgroundColor: `${tile.color}18`,
                      color: tile.color,
                      padding: '2px 8px',
                      borderRadius: 12,
                      fontSize: 10,
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {tile.ribbon}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 15 }}>
                    <div style={{
                      width: 50,
                      height: 50,
                      borderRadius: 10,
                      backgroundColor: `${tile.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <i className={tile.icon} style={{ fontSize: 24, color: tile.color }}></i>
                    </div>

                    <div style={{ flex: 1, paddingRight: 40 }}>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: 16, fontWeight: 700, color: '#2c3e50' }}>
                        {tile.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: 12, color: '#7f8c8d', lineHeight: 1.4 }}>
                        {tile.subtitle}
                      </p>
                    </div>
                  </div>

                  <div style={{ marginTop: 15, paddingTop: 10, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: tile.color, fontWeight: 600 }}>Access Module</span>
                    <i className="fa fa-arrow-right" style={{ fontSize: 11, color: tile.color }}></i>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

