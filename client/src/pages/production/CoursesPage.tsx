import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const CoursesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'aiapget' | 'upsc'>('aiapget');

  const aiapgetCourses = [
    {
      id: "aiapget-2027-crash",
      headerTitle: "REVISION (CRASH) COURSE LECTURES + Q-BANK FOR AIAPGET 2027",
      discount: "45% Off",
      bannerTitle: "AIAPGET 2027",
      bannerSubtitle: "CRASH COURSE LECTURES + Q-BANK",
      bannerTarget: "Maximize your selection chances",
      badges: ["Important Topics Covered", "Prev Year Papers", "55000+ MCQs"],
      originalPrice: "10999",
      discountedPrice: "5999",
      offerValidity: "Offer valid till 14 November"
    },
    {
      id: "aiapget-2027-detailed",
      headerTitle: "DETAILED LECTURE AND Q-BANK COURSE FOR AIAPGET 2027",
      discount: "75% Off",
      bannerTitle: "AIAPGET 2027",
      bannerSubtitle: "DETAILED LECTURES AND QUESTION BANK",
      bannerTarget: "Maximize your selection chances",
      badges: ["Complete AIAPGET Syllabus", "Daily/Weekly Tests", "55000+ MCQs"],
      originalPrice: "39999",
      discountedPrice: "9999",
      offerValidity: "Offer valid till 14 November"
    }
  ];

  const upscCourses = [
    {
      id: "upsc-ayurveda-mo",
      headerTitle: "UPSC AYURVEDA MEDICAL OFFICER COMPREHENSIVE COURSE",
      discount: "40% Off",
      bannerTitle: "UPSC AYURVEDA",
      bannerSubtitle: "MEDICAL OFFICER PREPARATION BATCH",
      bannerTarget: "Full Syllabus + State/Central PYQs",
      badges: ["Clinical Subjects", "Charaka/Sushruta", "State GK MCQs"],
      originalPrice: "14999",
      discountedPrice: "7999",
      offerValidity: "Offer valid till 14 November"
    },
    {
      id: "state-psc-ayurveda",
      headerTitle: "STATE PSC (UPPSC / HPPSC / MPPSC) EXAM PACKAGE",
      discount: "50% Off",
      bannerTitle: "STATE PSC 2026",
      bannerSubtitle: "TARGETED STATE EXAM REVISION",
      bannerTarget: "Solved Previous Year Papers & Tests",
      badges: ["1000+ Hours Lectures", "Daily Tests", "45000+ MCQs"],
      originalPrice: "9999",
      discountedPrice: "4999",
      offerValidity: "Offer valid till 14 November"
    }
  ];

  const currentCourses = activeTab === 'aiapget' ? aiapgetCourses : upscCourses;

  return (
    <div style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 50px)', paddingBottom: 40 }}>
      {/* Page Title & Stats Header */}
      <div style={{ textAlign: 'center', paddingTop: 25, paddingBottom: 15 }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: 24, fontWeight: 700, color: '#333', letterSpacing: 0.5 }}>
          AYURQUEST COURSES
        </h2>
        <p style={{ margin: 0, fontSize: 13, color: '#555' }}>
          <b>13600+</b> Students are actively using <b>AyurQuest Courses</b>
        </p>
      </div>

      {/* 3 Stats Strip */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto 20px auto',
        borderTop: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0',
        fontSize: 13,
        color: '#444',
        fontWeight: 600
      }}>
        <div>* 1000+ Hours Lectures</div>
        <div style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee', padding: '0 25px' }}>
          * 10+ Tutors
        </div>
        <div>* 13600+ Students</div>
      </div>

      {/* 2 Tabs */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto 25px auto',
        display: 'flex',
        border: '1px solid #dcebf1',
        borderRadius: 4,
        overflow: 'hidden'
      }}>
        <button
          type="button"
          onClick={() => setActiveTab('aiapget')}
          style={{
            flex: 1,
            padding: '14px 20px',
            backgroundColor: activeTab === 'aiapget' ? '#fff' : '#f8fbfc',
            color: activeTab === 'aiapget' ? '#1b3a57' : '#777',
            border: 'none',
            borderRight: '1px solid #dcebf1',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 400, color: '#888' }}>Prep Courses for</div>
          AIAPGET
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upsc')}
          style={{
            flex: 1,
            padding: '14px 20px',
            backgroundColor: activeTab === 'upsc' ? '#fff' : '#f8fbfc',
            color: activeTab === 'upsc' ? '#1b3a57' : '#777',
            border: 'none',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 400, color: '#888' }}>Prep Courses for</div>
          UPSC/PSC
        </button>
      </div>

      {/* Courses Cards Grid */}
      <div className="container-fluid" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 15px' }}>
        <div className="row">
          {currentCourses.map(course => (
            <div key={course.id} className="col-md-6 col-sm-12" style={{ marginBottom: 25 }}>
              <div
                style={{
                  border: '1px solid #dcebf1',
                  borderRadius: 6,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                }}
              >
                {/* Header Strip with Discount Badge */}
                <div style={{
                  padding: '10px 15px',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#2c3e50', letterSpacing: 0.3 }}>
                    {course.headerTitle}
                  </span>
                  <span style={{
                    backgroundColor: '#27ae60',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: 3,
                    fontSize: 11,
                    fontWeight: 700
                  }}>
                    {course.discount}
                  </span>
                </div>

                {/* Course Banner Body */}
                <div style={{
                  background: 'linear-gradient(135deg, #eef9fb 0%, #e1f4f8 100%)',
                  padding: '24px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15
                }}>
                  {/* Left illustration */}
                  <div style={{ flexShrink: 0, width: 110, textAlign: 'center' }}>
                    <svg viewBox="0 0 100 120" style={{ width: '100%', maxHeight: 110 }}>
                      <circle cx="50" cy="80" r="35" fill="#fef9e7" />
                      <rect x="25" y="85" width="50" height="12" rx="3" fill="#e74c3c" />
                      <rect x="20" y="98" width="60" height="14" rx="3" fill="#2980b9" />
                      <circle cx="50" cy="35" r="14" fill="#2c3e50" />
                      <circle cx="50" cy="37" r="11" fill="#f5cba7" />
                      <path d="M38 52 c0 15 24 15 24 0 v25 h-24 z" fill="#fff" />
                      <rect x="40" y="62" width="26" height="16" rx="2" fill="#e74c3c" />
                    </svg>
                  </div>

                  {/* Banner Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <img src="/assets/images/logo.png" alt="AQ" style={{ width: 18, height: 18 }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#2aacdd' }}>AyurQuest</span>
                    </div>

                    <h3 style={{ margin: '0 0 4px 0', fontSize: 26, fontWeight: 900, color: '#1b3a57', letterSpacing: 0.5 }}>
                      {course.bannerTitle}
                    </h3>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#2c3e50', marginBottom: 4 }}>
                      {course.bannerSubtitle}
                    </div>
                    <div style={{ fontSize: 12, color: '#555', marginBottom: 10 }}>
                      {course.bannerTarget}
                    </div>

                    <Link
                      to={`/courses/${course.id}`}
                      style={{
                        backgroundColor: '#1b3a57',
                        color: '#fff',
                        padding: '6px 16px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'inline-block',
                        marginBottom: 10
                      }}
                    >
                      &gt;&gt; More Details
                    </Link>

                    {/* Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {course.badges.map((b, bIdx) => (
                        <span
                          key={bIdx}
                          style={{
                            backgroundColor: '#1b3a57',
                            color: '#fff',
                            fontSize: 10,
                            padding: '3px 8px',
                            borderRadius: 12,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <i className="fa fa-check-circle" style={{ fontSize: 9 }}></i>
                          <span>{b}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Offer Validity */}
                <div style={{
                  padding: '12px 15px',
                  borderTop: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 13
                }}>
                  <div>
                    <span style={{ textDecoration: 'line-through', color: '#e74c3c', marginRight: 8 }}>
                      ₹ {course.originalPrice}
                    </span>
                    <strong style={{ fontSize: 16, color: '#2c3e50' }}>
                      ₹ {course.discountedPrice}
                    </strong>
                  </div>
                  <div style={{ color: '#d81b60', fontWeight: 600, fontSize: 12 }}>
                    {course.offerValidity}
                  </div>
                </div>

                {/* Bottom Bar: Detail | EMI | > More Details */}
                <div style={{
                  padding: '10px 15px',
                  backgroundColor: '#fbfcfd',
                  borderTop: '1px solid #f0f0f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 12
                }}>
                  <div style={{ display: 'flex', gap: 15 }}>
                    <span style={{ color: '#27ae60', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <i className="fa fa-whatsapp"></i> DETAIL
                    </span>
                    <span style={{ color: '#e67e22', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <i className="fa fa-credit-card"></i> EMI
                    </span>
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    style={{ color: '#2c3e50', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}
                  >
                    <i className="fa fa-chevron-circle-right text-muted"></i>
                    <span>More Details</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

