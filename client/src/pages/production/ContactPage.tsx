import React, { useState } from 'react';

export const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: '"Open Sans", Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e1e8ed', padding: '36px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#2c3e50' }}>
            Contact AyurQuest Support
          </h1>
          <p style={{ margin: '8px 0 0', fontSize: '15px', color: '#6c757d' }}>
            We're here to assist you with any questions regarding courses, mock tests, or subscriptions
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#eef9fb', padding: '24px', borderRadius: '10px', border: '1px solid #c9ecf5' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📱</div>
            <h3 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 800, color: '#1f4354' }}>WhatsApp Helpline</h3>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#6c757d' }}>Mon - Sat: 9:00 AM to 8:00 PM</p>
            <a
              href="https://wa.me/919172000000"
              target="_blank"
              rel="noreferrer"
              style={{ backgroundColor: '#25D366', color: '#ffffff', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}
            >
              Chat on WhatsApp
            </a>
          </div>

          <div style={{ backgroundColor: '#eef9fb', padding: '24px', borderRadius: '10px', border: '1px solid #c9ecf5' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>✉️</div>
            <h3 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 800, color: '#1f4354' }}>Email Inquiries</h3>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#6c757d' }}>Direct response within 24 hours</p>
            <a
              href="mailto:support@ayurquest.com"
              style={{ backgroundColor: '#2aacdd', color: '#ffffff', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}
            >
              support@ayurquest.com
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{ borderTop: '1px solid #f0f4f8', paddingTop: '28px' }}>
          <h2 style={{ margin: '0 0 18px', fontSize: '18px', fontWeight: 800, color: '#2c3e50' }}>
            Send Us a Message
          </h2>

          {sent ? (
            <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '16px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '14px' }}>
              ✓ Thank you! Your inquiry has been dispatched to the AyurQuest Academic Support Desk.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '6px' }}>Your Name</label>
                  <input type="text" required defaultValue="Vd. Rohit" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '6px' }}>Mobile Number</label>
                  <input type="text" required defaultValue="9876543210" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '6px' }}>Subject</label>
                <input type="text" placeholder="e.g. Question bank clarification or course access inquiry" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '6px' }}>Message</label>
                <textarea rows={4} required placeholder="Describe your query in detail..." style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#2aacdd',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(42,172,221,0.3)'
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

