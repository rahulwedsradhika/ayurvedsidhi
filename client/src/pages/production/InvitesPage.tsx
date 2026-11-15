import React, { useState } from 'react';
import { PageHeroIllustration } from '../../components/PageHeroIllustration';

export const InvitesPage: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const referralCode = '126448';
  const referralLink = `https://ayurquest.com/app1.5/index.php?ref=${referralCode}`;

  const copyToClipboard = (text: string, isLink: boolean) => {
    navigator.clipboard.writeText(text);
    if (isLink) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div style={{ padding: '16px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Open Sans", Arial, sans-serif' }}>
      {/* Hero Header Box matching Screenshot 2026-11-14 192742.png */}
      <div
        style={{
          backgroundColor: '#eef9fb',
          borderRadius: '12px',
          padding: '24px 30px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #d9f0f5',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <PageHeroIllustration type="invites" width={110} height={100} />
          <div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#2c3e50', letterSpacing: '0.5px' }}>
              INVITE FRIENDS & EARN
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#6c757d', fontWeight: 600 }}>
              Learn Together. Grow Together.
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            border: '2px dashed #2aacdd',
            borderRadius: '10px',
            padding: '12px 24px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#6c757d', letterSpacing: '1px' }}>
            MY REFERRALS
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#2aacdd', marginTop: '2px' }}>
            0
          </div>
        </div>
      </div>

      {/* Referral Link & Code Cards matching Screenshot 2026-11-14 192742.png */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        {/* Referral Link */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e1e8ed', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#2aacdd', letterSpacing: '1px', marginBottom: '8px' }}>
            REFERRAL LINK
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              readOnly
              value={referralLink}
              style={{ flex: 1, padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', backgroundColor: '#f8fafc', color: '#495057' }}
            />
            <button
              onClick={() => copyToClipboard(referralLink, true)}
              style={{
                backgroundColor: copiedLink ? '#28a745' : '#2aacdd',
                color: '#ffffff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {copiedLink ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Referral Code */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e1e8ed', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#e83e8c', letterSpacing: '1px', marginBottom: '8px' }}>
            REFERRAL CODE
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              readOnly
              value={referralCode}
              style={{ flex: 1, padding: '10px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '16px', fontWeight: 800, letterSpacing: '2px', backgroundColor: '#f8fafc', color: '#2c3e50', textAlign: 'center' }}
            />
            <button
              onClick={() => copyToClipboard(referralCode, false)}
              style={{
                backgroundColor: copiedCode ? '#28a745' : '#e83e8c',
                color: '#ffffff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {copiedCode ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>
      </div>

      {/* Social Share Bar */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e1e8ed', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', textAlign: 'center', marginBottom: '28px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 800, color: '#2c3e50' }}>
          Share Directly on Social Media
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a
            href={`https://wa.me/?text=Join%20me%20on%20AyurQuest%20for%20AIAPGET%20preparation!%20Use%20code%20${referralCode}%20to%20get%20100%20free%20wallet%20points:%20${referralLink}`}
            target="_blank"
            rel="noreferrer"
            style={{ backgroundColor: '#25D366', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span>📱</span> WhatsApp
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Join%20me%20on%20AyurQuest%20using%20code%20${referralCode}!`}
            target="_blank"
            rel="noreferrer"
            style={{ backgroundColor: '#0088cc', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span>✈️</span> Telegram
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
            target="_blank"
            rel="noreferrer"
            style={{ backgroundColor: '#1877f2', color: '#ffffff', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span>📘</span> Facebook
          </a>
        </div>
      </div>

      {/* How it works 3 Steps */}
      <div style={{ backgroundColor: '#eef9fb', borderRadius: '12px', padding: '24px', border: '1px solid #d9f0f5' }}>
        <h3 style={{ margin: '0 0 18px', fontSize: '16px', fontWeight: 800, color: '#1f4354', textAlign: 'center' }}>
          How the AyurQuest Referral System Works
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '18px', borderRadius: '8px', border: '1px solid #e1e8ed', textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2aacdd', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontWeight: 800 }}>1</div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#2c3e50', marginBottom: '6px' }}>Share Your Code</div>
            <div style={{ fontSize: '12px', color: '#6c757d' }}>Send your referral code or link to fellow Ayurveda students and colleagues.</div>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '18px', borderRadius: '8px', border: '1px solid #e1e8ed', textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e83e8c', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontWeight: 800 }}>2</div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#2c3e50', marginBottom: '6px' }}>Friend Signs Up</div>
            <div style={{ fontSize: '12px', color: '#6c757d' }}>Your friend registers with your code and instantly gets 100 free wallet bonus points.</div>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '18px', borderRadius: '8px', border: '1px solid #e1e8ed', textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#28a745', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontWeight: 800 }}>3</div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#2c3e50', marginBottom: '6px' }}>Earn Rewards</div>
            <div style={{ fontSize: '12px', color: '#6c757d' }}>You get 100 wallet points credited immediately into your wallet to unlock mock tests!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

