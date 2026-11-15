import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import { Course } from '../types';

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('type') || 'all';

  useEffect(() => {
    setLoading(true);
    api.getCourses(activeTab === 'all' ? undefined : activeTab)
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Courses load error:", err);
        setLoading(false);
      });
  }, [activeTab]);

  const tabs = [
    { id: 'all', label: 'All Courses' },
    { id: 'aiapget', label: 'AIAPGET Prep' },
    { id: 'upsc', label: 'UPSC Entrance' },
    { id: 'state_psc', label: 'State PSC' },
    { id: 'revision', label: 'Audio Revision' },
  ];

  return (
    <div className="content-wrapper" style={{ padding: '20px 25px', backgroundColor: '#f4f6f9', minHeight: 'calc(100vh - 100px)' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: 24, fontWeight: 700, color: '#2c3e50' }}>
          <i className="fa fa-graduation-cap text-aqua" style={{ marginRight: 10 }}></i>
          AyurQuest Learning Curriculum & Video Courses
        </h2>
        <p style={{ margin: 0, color: '#7f8c8d', fontSize: 14 }}>
          Structured lecture series, classical Samhita deep-dives, and AIAPGET/UPSC entrance test modules.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 25, flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSearchParams(tab.id === 'all' ? {} : { type: tab.id })}
            className={`btn btn-sm ${activeTab === tab.id ? 'btn-info' : 'btn-default'}`}
            style={{
              padding: '8px 18px',
              borderRadius: 20,
              fontWeight: 600,
              boxShadow: activeTab === tab.id ? '0 2px 6px rgba(42, 172, 221, 0.3)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <i className="fa fa-spinner fa-spin fa-2x text-aqua"></i>
          <p style={{ marginTop: 10 }}>Loading courses...</p>
        </div>
      ) : (
        <div className="row">
          {courses.map(course => (
            <div key={course.id} className="col-md-6 col-lg-6" style={{ marginBottom: 25 }}>
              <div
                className="box box-widget widget-user-2"
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  border: '1px solid #e1e8ed',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                {/* Header Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, #2aacdd 0%, #1b6ca8 100%)',
                  padding: '20px 25px',
                  color: '#fff',
                  position: 'relative'
                }}>
                  <span className="label label-warning" style={{ position: 'absolute', top: 15, right: 15, fontSize: 11, fontWeight: 'bold' }}>
                    {course.badge}
                  </span>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: 20, fontWeight: 700, color: '#fff', paddingRight: 80 }}>
                    {course.title}
                  </h3>
                  <p style={{ margin: 0, opacity: 0.9, fontSize: 13 }}>
                    {course.subTitle}
                  </p>
                </div>

                {/* Course Body */}
                <div className="box-body" style={{ padding: '20px 25px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    {/* Stats strip */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      backgroundColor: '#f8fafc',
                      padding: '12px 10px',
                      borderRadius: 6,
                      marginBottom: 15,
                      border: '1px solid #eef2f5'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#2aacdd', display: 'block' }}>{course.totalLectures}</span>
                        <span style={{ fontSize: 11, color: '#7f8c8d' }}>Lectures</span>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#27ae60', display: 'block' }}>{course.totalQuestions}</span>
                        <span style={{ fontSize: 11, color: '#7f8c8d' }}>MCQs</span>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#e67e22', display: 'block' }}>{course.totalTests}</span>
                        <span style={{ fontSize: 11, color: '#7f8c8d' }}>Mock Tests</span>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#8e44ad', display: 'block' }}>{course.totalAudio}</span>
                        <span style={{ fontSize: 11, color: '#7f8c8d' }}>Audio</span>
                      </div>
                    </div>

                    <p style={{ color: '#555', fontSize: 13, lineHeight: 1.5, marginBottom: 15 }}>
                      {course.description}
                    </p>

                    {/* Features list */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0' }}>
                      {course.features.map((f, i) => (
                        <li key={i} style={{ fontSize: 12, color: '#444', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <i className="fa fa-check-circle text-green" style={{ fontSize: 13 }}></i>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <Link
                      to={`/courses/${course.id}`}
                      className="btn btn-info btn-block"
                      style={{ fontWeight: 600, padding: '10px 15px' }}
                    >
                      <i className="fa fa-folder-open" style={{ marginRight: 6 }}></i>
                      Open Course Curriculum ({course.modules.length} Modules)
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

