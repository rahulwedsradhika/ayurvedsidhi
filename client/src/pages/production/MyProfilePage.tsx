import React, { useState } from 'react';

export const MyProfilePage: React.FC = () => {
  const [salutation, setSalutation] = useState('Vd.');
  const [fullName, setFullName] = useState('Rohit');
  const [college, setCollege] = useState('National Institute of Ayurveda (NIA), Jaipur');
  const [exam, setExam] = useState('AIAPGET 2026');
  const [whatsapp, setWhatsapp] = useState('9876543210');
  const [email, setEmail] = useState('rohit@ayurquest.com');
  const [state, setState] = useState('Rajasthan');
  const [city, setCity] = useState('Jaipur');
  const [chatEnabled, setChatEnabled] = useState(true);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const handleSaveBasic = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice('Basic account settings updated successfully!');
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice('Personal information saved successfully!');
    setTimeout(() => setSavedNotice(null), 3000);
  };

  return (
    <div style={{ padding: '20px 24px', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Open Sans", Arial, sans-serif' }}>
      {/* Profile Header matching Screenshot 2026-11-14 192750.png */}
      <div
        style={{
          backgroundColor: '#2aacdd',
          borderRadius: '12px',
          padding: '24px 30px',
          color: '#ffffff',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(42,172,221,0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              color: '#2aacdd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 900,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            VR
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800 }}>
              {salutation} {fullName}
            </h1>
            <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '4px' }}>
              Member since Nov 2026 • AIAPGET Scholar
            </div>
            <div
              style={{
                marginTop: '10px',
                display: 'inline-flex',
                gap: '12px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '4px 14px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              <span>100 WALLET</span>
              <span>•</span>
              <span>0 EXPENSE</span>
              <span>•</span>
              <span>100 DEPOSIT</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <a
            href="/app1.5/myWallet.php"
            style={{
              backgroundColor: '#ffffff',
              color: '#2aacdd',
              padding: '9px 18px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            Wallet History
          </a>
          <button
            onClick={() => {
              if (window.confirm('Do you wish to log out from AyurQuest?')) {
                window.location.href = '/';
              }
            }}
            style={{
              backgroundColor: '#dc3545',
              color: '#ffffff',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Quick Settings Strip matching Screenshot 2026-11-14 192750.png */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          border: '1px solid #e1e8ed',
          padding: '16px 24px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '13px', color: '#495057' }}>
          <div>
            <strong>Mobile:</strong> +91 {whatsapp}
          </div>
          <div>
            <strong>Email:</strong> {email}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button
            onClick={() => alert('Profile image update dialog')}
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid #ced4da',
              color: '#2c3e50',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            📷 Profile Image
          </button>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#2c3e50', cursor: 'pointer' }}>
            <span>On/Off Chat Button</span>
            <input
              type="checkbox"
              checked={chatEnabled}
              onChange={(e) => setChatEnabled(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </label>
        </div>
      </div>

      {savedNotice && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', fontWeight: 700, fontSize: '13px' }}>
          ✓ {savedNotice}
        </div>
      )}

      {/* 2 Form Cards matching Screenshot 2026-11-14 192750.png */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Card 1: Basic account settings */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e1e8ed', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <h2 style={{ margin: '0 0 18px', fontSize: '17px', fontWeight: 800, color: '#2c3e50', borderBottom: '1px solid #f0f4f8', paddingBottom: '10px' }}>
            Basic account settings
          </h2>
          <form onSubmit={handleSaveBasic}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '6px' }}>
                Salutation / Title
              </label>
              <select
                value={salutation}
                onChange={(e) => setSalutation(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px' }}
              >
                <option value="Vd.">Vd. (Vaidya)</option>
                <option value="Dr.">Dr.</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '6px' }}>
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '6px' }}>
                College / Ayurveda Institute
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '6px' }}>
                Target Examination
              </label>
              <select
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px' }}
              >
                <option value="AIAPGET 2026">AIAPGET 2026</option>
                <option value="AIAPGET 2027">AIAPGET 2027</option>
                <option value="UPSC Ayurveda MO">UPSC Ayurveda MO</option>
                <option value="State PSC Medical Officer">State PSC Medical Officer</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#2aacdd',
                color: '#ffffff',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(42,172,221,0.3)'
              }}
            >
              Update Settings
            </button>
          </form>
        </div>

        {/* Card 2: Personal information */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e1e8ed', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <h2 style={{ margin: '0 0 18px', fontSize: '17px', fontWeight: 800, color: '#2c3e50', borderBottom: '1px solid #f0f4f8', paddingBottom: '10px' }}>
            Personal information
          </h2>
          <form onSubmit={handleSavePersonal}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '6px' }}>
                Whatsapp Mobile Number
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '6px' }}>
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '6px' }}>
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#495057', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#2aacdd',
                color: '#ffffff',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(42,172,221,0.3)'
              }}
            >
              Save Personal Info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

