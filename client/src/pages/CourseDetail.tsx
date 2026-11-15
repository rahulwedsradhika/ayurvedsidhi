import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';
import { Course } from '../types';

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [openModuleIndex, setOpenModuleIndex] = useState<number>(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.getCourse(id)
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Course load error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <i className="fa fa-spinner fa-spin fa-2x text-aqua"></i>
        <p style={{ marginTop: 10 }}>Loading course curriculum...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="content-wrapper" style={{ padding: '30px' }}>
        <div className="alert alert-danger">Course not found.</div>
        <Link to="/courses" className="btn btn-default">Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className="content-wrapper" style={{ padding: '20px 25px', backgroundColor: '#f4f6f9', minHeight: 'calc(100vh - 100px)' }}>
      {/* Breadcrumb */}
      <ol className="breadcrumb" style={{ backgroundColor: '#fff', padding: '10px 15px', borderRadius: 4, marginBottom: 20 }}>
        <li><Link to="/"><i className="fa fa-dashboard"></i> Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li className="active">{course.title}</li>
      </ol>

      {/* Course Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #2aacdd 0%, #1b6ca8 100%)',
        borderRadius: 8,
        padding: '25px 30px',
        color: '#fff',
        marginBottom: 25,
        boxShadow: '0 4px 12px rgba(42, 172, 221, 0.25)'
      }}>
        <div className="row">
          <div className="col-md-9">
            <span className="label label-warning" style={{ fontSize: 11, fontWeight: 'bold' }}>{course.badge}</span>
            <h2 style={{ margin: '10px 0 8px 0', fontWeight: 700, fontSize: 24 }}>{course.title}</h2>
            <p style={{ fontSize: 14, opacity: 0.95, margin: 0 }}>{course.subTitle}</p>
            <p style={{ marginTop: 12, fontSize: 13, opacity: 0.9 }}>{course.description}</p>
          </div>
          <div className="col-md-3 text-right hidden-xs">
            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '15px', borderRadius: 8 }}>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{course.totalLectures}</div>
              <div style={{ fontSize: 12 }}>Total Lectures</div>
              <hr style={{ margin: '8px 0', borderColor: 'rgba(255,255,255,0.2)' }} />
              <div style={{ fontSize: 18, fontWeight: 700 }}>{course.totalQuestions}</div>
              <div style={{ fontSize: 12 }}>Ayurveda MCQs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules & Curriculum Accordion */}
      <div className="row">
        <div className="col-md-12">
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#333', marginBottom: 15 }}>
            <i className="fa fa-list-ul text-aqua" style={{ marginRight: 8 }}></i>
            Course Curriculum & Video Lectures
          </h3>

          {course.modules.map((module, mIdx) => (
            <div
              key={mIdx}
              className="box box-solid"
              style={{
                borderRadius: 6,
                marginBottom: 15,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                border: '1px solid #e1e8ed',
                overflow: 'hidden'
              }}
            >
              {/* Module Header Toggle */}
              <div
                onClick={() => setOpenModuleIndex(openModuleIndex === mIdx ? -1 : mIdx)}
                style={{
                  padding: '16px 20px',
                  backgroundColor: openModuleIndex === mIdx ? '#f0f9fd' : '#fff',
                  borderBottom: openModuleIndex === mIdx ? '1px solid #d4effc' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <i className={module.icon || "fa fa-book text-aqua"} style={{ fontSize: 18, color: '#2aacdd' }}></i>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#2c3e50' }}>
                      {module.name}
                    </h4>
                    <span style={{ fontSize: 12, color: '#7f8c8d' }}>
                      {module.description} &bull; {module.lectures.length} Lectures
                    </span>
                  </div>
                </div>
                <div>
                  <i className={`fa fa-chevron-${openModuleIndex === mIdx ? 'up' : 'down'}`} style={{ color: '#2aacdd' }}></i>
                </div>
              </div>

              {/* Module Lectures List */}
              {openModuleIndex === mIdx && (
                <div className="box-body" style={{ padding: '10px 20px' }}>
                  <div className="table-responsive">
                    <table className="table table-hover" style={{ margin: 0 }}>
                      <thead>
                        <tr style={{ color: '#888', fontSize: 12 }}>
                          <th style={{ width: 40 }}>#</th>
                          <th>Lecture Title</th>
                          <th>Speaker</th>
                          <th>Type</th>
                          <th>Duration</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {module.lectures.map((lecture, lIdx) => (
                          <tr key={lecture.id} style={{ verticalAlign: 'middle' }}>
                            <td style={{ fontWeight: 600, color: '#999' }}>{lIdx + 1}</td>
                            <td>
                              <div style={{ fontWeight: 600, color: '#2c3e50', fontSize: 14 }}>
                                {lecture.title}
                              </div>
                              {lecture.hindiTitle && (
                                <div style={{ fontSize: 12, color: '#7f8c8d' }}>
                                  {lecture.hindiTitle}
                                </div>
                              )}
                              <span style={{ fontSize: 11, color: '#999' }}>
                                {lecture.chapter} &bull; {lecture.subject}
                              </span>
                            </td>
                            <td style={{ fontSize: 13, color: '#555' }}>
                              <i className="fa fa-user-md" style={{ marginRight: 5, color: '#2aacdd' }}></i>
                              {lecture.speaker}
                            </td>
                            <td>
                              {lecture.mediaType === 'video' ? (
                                <span className="label label-primary"><i className="fa fa-video-camera"></i> Video</span>
                              ) : (
                                <span className="label label-warning"><i className="fa fa-headphones"></i> Audio</span>
                              )}
                            </td>
                            <td style={{ fontSize: 13, color: '#666' }}>
                              <i className="fa fa-clock-o" style={{ marginRight: 4 }}></i>
                              {lecture.duration}
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <Link
                                to={`/lecture/${course.id}/${lecture.id}`}
                                className="btn btn-sm btn-info"
                                style={{ fontWeight: 600, marginRight: 6 }}
                              >
                                <i className="fa fa-play" style={{ marginRight: 4 }}></i>
                                {lecture.mediaType === 'video' ? 'Watch' : 'Listen'}
                              </Link>
                              {lecture.notesPdf && (
                                <a
                                  href={`/assets/docs/${lecture.notesPdf}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn btn-sm btn-default"
                                  title="Download Companion Notes PDF"
                                >
                                  <i className="fa fa-file-pdf-o text-red"></i>
                                </a>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

