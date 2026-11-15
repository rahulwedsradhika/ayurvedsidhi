import React, { useState } from 'react';

export const ForumPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newDiscussionModal, setNewDiscussionModal] = useState(false);

  const categories = [
    {
      id: 'samhitas',
      title: 'AYURVEDA SAMHITAS',
      count: 54,
      description: 'Charaka, Sushruta, Ashtanga Hridaya, Madhava Nidana, Sharangadhara Samhita queries',
      lastPost: { title: 'Charaka Chikitsasthana Ch 3 Jwara Chikitsa Shloka 110 doubt', user: 'Vd. Priya S.', time: '2 hours ago' }
    },
    {
      id: 'subjects',
      title: 'AYURVEDA SUBJECTS',
      count: 21,
      description: 'Dravyaguna, Rasa Shastra, Bhaishajya Kalpana, Rog Nidana, Agada Tantra, Shalya, Shalakya',
      lastPost: { title: 'Maharasa vs Uparasa vs Sadharanarasa classification tricks', user: 'Dr. Anand', time: 'Yesterday' }
    },
    {
      id: 'modern',
      title: 'MODERN SUBJECTS',
      count: 9,
      description: 'Anatomy, Physiology, Pathology, Pharmacology, Forensic Medicine & Modern Surgery',
      lastPost: { title: 'High yield modern surgery questions for AIAPGET 2026', user: 'Dr. Ritu K.', time: '3 days ago' }
    },
    {
      id: 'aiapget',
      title: 'ALL INDIA AYUSH POST GRADUATE TEST',
      count: 18,
      description: 'AIAPGET notifications, syllabus, test strategies, cut-offs and counseling guidance',
      lastPost: { title: 'AIAPGET 2026 application form dates update', user: 'Vd. Rohit', time: '5 hours ago' }
    },
    {
      id: 'upsc',
      title: 'UNION PUBLIC SERVICE COMMISSION',
      count: 8,
      description: 'UPSC Medical Officer (Ayurveda), ESIC MO and National Health Mission posts',
      lastPost: { title: 'UPSC Ayurveda MO previous question papers with keys', user: 'Dr. Rajesh', time: '1 week ago' }
    },
    {
      id: 'gk',
      title: 'STATEWISE GENERAL KNOWLEDGE',
      count: 24,
      description: 'State PSC Ayurveda examinations (Rajasthan, UP, MP, Maharashtra, Kerala, Karnataka)',
      lastPost: { title: 'Rajasthan PSC Ayurveda Medical Officer GK syllabus', user: 'Vd. Kuldeep', time: '4 days ago' }
    }
  ];

  return (
    <div style={{ padding: '20px 24px', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Open Sans", Arial, sans-serif' }}>
      {/* Forum Header matching Screenshot 2026-11-14 192652.png */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          padding: '20px 28px',
          border: '1px solid #e1e8ed',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
          marginBottom: '24px'
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#2c3e50', letterSpacing: '0.5px' }}>
            DISCUSSION FORUM
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#6c757d' }}>
            Start your exam related discussion here
          </p>
        </div>

        <button
          onClick={() => setNewDiscussionModal(true)}
          style={{
            backgroundColor: '#2aacdd',
            color: '#ffffff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(42,172,221,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>+</span> New Discussion
        </button>
      </div>

      {/* Categories Table / Card Grid matching Screenshot 2026-11-14 192652.png */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e1e8ed', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '13px' }}>
              <th style={{ padding: '14px 20px' }}>Category</th>
              <th style={{ padding: '14px 20px', textAlign: 'center', width: '140px' }}>Discussions</th>
              <th style={{ padding: '14px 20px', width: '320px' }}>Latest Activity</th>
              <th style={{ padding: '14px 20px', textAlign: 'center', width: '120px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr
                key={cat.id}
                style={{
                  borderBottom: '1px solid #eef2f6',
                  backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafcfd'
                }}
              >
                <td style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '8px',
                        backgroundColor: '#eef9fb',
                        color: '#2aacdd',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px'
                      }}
                    >
                      💬
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#1f4354' }}>
                        {cat.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#68828f', marginTop: '2px' }}>
                        {cat.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '18px 20px', textAlign: 'center' }}>
                  <span
                    style={{
                      backgroundColor: '#eef9fb',
                      color: '#2aacdd',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 800
                    }}
                  >
                    {cat.count}
                  </span>
                </td>
                <td style={{ padding: '18px 20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#2c3e50', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
                    {cat.lastPost.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#8c9ba5', marginTop: '3px' }}>
                    by {cat.lastPost.user} • {cat.lastPost.time}
                  </div>
                </td>
                <td style={{ padding: '18px 20px', textAlign: 'center' }}>
                  <button
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      backgroundColor: '#2aacdd',
                      color: '#ffffff',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Discussion Modal */}
      {newDiscussionModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '24px', width: '90%', maxWidth: '520px', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 800, color: '#2c3e50' }}>
              Start a New Discussion
            </h3>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '4px' }}>Category</label>
              <select style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px' }}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '4px' }}>Discussion Title</label>
              <input type="text" placeholder="e.g., Doubt regarding Sushruta Sutrasthana Ch 5" style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '4px' }}>Question / Details</label>
              <textarea rows={4} placeholder="Type your detailed question or shloka reference..." style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setNewDiscussionModal(false)}
                style={{ backgroundColor: '#f8f9fa', border: '1px solid #ced4da', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Your discussion topic has been published to the AyurQuest community!');
                  setNewDiscussionModal(false);
                }}
                style={{ backgroundColor: '#2aacdd', color: '#ffffff', border: 'none', padding: '8px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                Publish Topic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

