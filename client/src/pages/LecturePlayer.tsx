import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { Course, Lecture } from '../types';

export const LecturePlayer: React.FC = () => {
  const { courseId, lectureId } = useParams<{ courseId: string; lectureId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>("1.0");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;
    setLoading(true);
    api.getCourse(courseId)
      .then(c => {
        setCourse(c);
        let found: Lecture | undefined;
        for (const mod of c.modules) {
          const l = mod.lectures.find(item => item.id.toString() === lectureId);
          if (l) {
            found = l;
            break;
          }
        }
        if (!found && c.modules[0]?.lectures[0]) {
          found = c.modules[0].lectures[0];
        }
        setCurrentLecture(found || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lecture player load error:", err);
        setLoading(false);
      });
  }, [courseId, lectureId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <i className="fa fa-spinner fa-spin fa-2x text-aqua"></i>
        <p style={{ marginTop: 10 }}>Initializing AyurQuest Player...</p>
      </div>
    );
  }

  if (!course || !currentLecture) {
    return (
      <div className="content-wrapper" style={{ padding: '30px' }}>
        <div className="alert alert-danger">Lecture not found.</div>
        <Link to="/courses" className="btn btn-default">Back to Courses</Link>
      </div>
    );
  }

  // Find all lectures in sequence for next/previous navigation
  const allLectures: Lecture[] = [];
  course.modules.forEach(m => allLectures.push(...m.lectures));
  const currentIndex = allLectures.findIndex(l => l.id === currentLecture.id);
  const prevLecture = currentIndex > 0 ? allLectures[currentIndex - 1] : null;
  const nextLecture = currentIndex < allLectures.length - 1 ? allLectures[currentIndex + 1] : null;

  return (
    <div className="content-wrapper" style={{ padding: '20px 25px', backgroundColor: '#f4f6f9', minHeight: 'calc(100vh - 100px)' }}>
      {/* Breadcrumb */}
      <ol className="breadcrumb" style={{ backgroundColor: '#fff', padding: '10px 15px', borderRadius: 4, marginBottom: 15 }}>
        <li><Link to="/"><i className="fa fa-dashboard"></i> Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to={`/courses/${course.id}`}>{course.title}</Link></li>
        <li className="active">{currentLecture.title}</li>
      </ol>

      <div className="row">
        {/* Main Player Column */}
        <div className="col-lg-8 col-md-12">
          <div className="box box-solid" style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            {/* Player Container */}
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', backgroundColor: '#000' }}>
              {currentLecture.mediaType === 'video' ? (
                <iframe
                  src={currentLecture.mediaUrl}
                  title={currentLecture.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #1b2838 0%, #2c3e50 100%)',
                  color: '#fff',
                  padding: 20
                }}>
                  <i className="fa fa-headphones" style={{ fontSize: 64, color: '#f39c12', marginBottom: 20 }}></i>
                  <h3 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>{currentLecture.title}</h3>
                  <p style={{ color: '#bdc3c7', fontSize: 14 }}>{currentLecture.speaker} &bull; {currentLecture.chapter}</p>
                  <audio controls style={{ width: '80%', marginTop: 20 }}>
                    <source src="/assets/audio/correct-enhanced-v2-90p.mp3" type="audio/mpeg" />
                    Your browser does not support audio element.
                  </audio>
                </div>
              )}
            </div>

            {/* Player Controls & Info Bar */}
            <div className="box-body" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 15 }}>
                <div>
                  <span className="label label-info" style={{ marginRight: 8 }}>{currentLecture.subject}</span>
                  <span className="label label-default">{currentLecture.chapter}</span>
                  <h2 style={{ margin: '10px 0 6px 0', fontSize: 20, fontWeight: 700, color: '#2c3e50' }}>
                    {currentLecture.title}
                  </h2>
                  {currentLecture.hindiTitle && (
                    <div style={{ fontSize: 14, color: '#7f8c8d', marginBottom: 8 }}>
                      {currentLecture.hindiTitle}
                    </div>
                  )}
                  <p style={{ margin: 0, fontSize: 13, color: '#555' }}>
                    <i className="fa fa-user-md text-aqua" style={{ marginRight: 6 }}></i>
                    Speaker: <strong>{currentLecture.speaker}</strong> &bull; Duration: <strong>{currentLecture.duration}</strong>
                  </p>
                </div>

                {/* Speed & Actions */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-default dropdown-toggle"
                      style={{ fontWeight: 600 }}
                      onClick={() => {
                        const speeds = ["0.75", "1.0", "1.25", "1.5", "2.0"];
                        const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                        setPlaybackSpeed(next);
                      }}
                    >
                      <i className="fa fa-tachometer" style={{ marginRight: 4 }}></i>
                      Speed: {playbackSpeed}x
                    </button>
                  </div>

                  {currentLecture.notesPdf && (
                    <a
                      href={`/assets/docs/${currentLecture.notesPdf}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-success"
                      style={{ fontWeight: 600 }}
                    >
                      <i className="fa fa-file-pdf-o" style={{ marginRight: 6 }}></i>
                      Lecture Notes (PDF)
                    </a>
                  )}
                </div>
              </div>

              {/* Navigation buttons: Prev / Next */}
              <div style={{
                marginTop: 20,
                paddingTop: 15,
                borderTop: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <button
                  type="button"
                  disabled={!prevLecture}
                  onClick={() => prevLecture && navigate(`/lecture/${course.id}/${prevLecture.id}`)}
                  className="btn btn-default"
                  style={{ opacity: prevLecture ? 1 : 0.5 }}
                >
                  <i className="fa fa-arrow-left" style={{ marginRight: 6 }}></i>
                  Previous: {prevLecture ? prevLecture.title.slice(0, 25) + '...' : 'None'}
                </button>

                <button
                  type="button"
                  disabled={!nextLecture}
                  onClick={() => nextLecture && navigate(`/lecture/${course.id}/${nextLecture.id}`)}
                  className="btn btn-info"
                  style={{ opacity: nextLecture ? 1 : 0.5 }}
                >
                  Next: {nextLecture ? nextLecture.title.slice(0, 25) + '...' : 'End of Module'}
                  <i className="fa fa-arrow-right" style={{ marginLeft: 6 }}></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Course Playlist */}
        <div className="col-lg-4 col-md-12">
          <div className="box box-solid" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="box-header with-border" style={{ padding: '15px 20px', backgroundColor: '#fcfcfc' }}>
              <h3 className="box-title" style={{ fontSize: 16, fontWeight: 700 }}>
                <i className="fa fa-play-circle text-aqua" style={{ marginRight: 6 }}></i>
                Course Lecture Playlist
              </h3>
            </div>
            <div className="box-body" style={{ maxHeight: 520, overflowY: 'auto', padding: 0 }}>
              <ul className="products-list product-list-in-box" style={{ margin: 0, padding: 0 }}>
                {allLectures.map((item, idx) => {
                  const isActive = item.id === currentLecture.id;
                  return (
                    <li
                      key={item.id}
                      onClick={() => navigate(`/lecture/${course.id}/${item.id}`)}
                      style={{
                        padding: '12px 18px',
                        backgroundColor: isActive ? '#f0f9fd' : '#fff',
                        borderLeft: isActive ? '4px solid #2aacdd' : '4px solid transparent',
                        borderBottom: '1px solid #f4f4f4',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12
                      }}
                    >
                      <div style={{ color: isActive ? '#2aacdd' : '#999', fontWeight: 700, fontSize: 13, width: 20 }}>
                        {idx + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: isActive ? 700 : 500, color: isActive ? '#2aacdd' : '#333', fontSize: 13 }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
                          <i className="fa fa-clock-o" style={{ marginRight: 4 }}></i>
                          {item.duration} &bull; {item.speaker}
                        </div>
                      </div>
                      <div>
                        {isActive ? (
                          <span className="label label-info">Playing</span>
                        ) : (
                          <i className="fa fa-play-circle-o" style={{ color: '#bbb', fontSize: 16 }}></i>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

