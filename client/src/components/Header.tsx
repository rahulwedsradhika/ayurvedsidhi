import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar: () => void;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, userName = "Rohit" }) => {
  const navigate = useNavigate();

  return (
    <header
      style={{
        backgroundColor: '#2aacdd',
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 15px',
        position: 'sticky',
        top: 0,
        zIndex: 1050,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      {/* Left section: Hamburger + Greeting */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
        <button
          type="button"
          onClick={onToggleSidebar}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: 22,
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none'
          }}
          title="Toggle Navigation Menu"
        >
          <i className="fa fa-bars"></i>
        </button>

        <div style={{ color: '#fff', fontSize: 13, fontWeight: 400, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Hello <b>{userName}</b>, Welcome to <b>AyurQuest Education</b></span>
          <span style={{
            backgroundColor: '#ffd700',
            color: '#1a3a4b',
            fontSize: 10,
            fontWeight: 800,
            padding: '2px 7px',
            borderRadius: 10,
            letterSpacing: 0.5,
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
          }}>PRO</span>
        </div>
      </div>

      {/* Right section: C Back, Dashboard, Pro Active */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: 13,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '5px 8px'
          }}
          title="Go Back"
        >
          <i className="fa fa-repeat" style={{ fontSize: 14 }}></i>
          <span>Back</span>
        </button>

        <Link
          to="/app1.5/index.php"
          style={{
            color: '#fff',
            fontSize: 13,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '5px 8px'
          }}
          title="Home Dashboard"
        >
          <i className="fa fa-home" style={{ fontSize: 15 }}></i>
          <span>Dashboard</span>
        </Link>

        <Link
          to="/preview"
          style={{
            color: '#ffffff',
            backgroundColor: '#0f172a',
            fontSize: 12,
            fontWeight: 800,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '4px 10px',
            borderRadius: 4,
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}
          title="35 Test Series Developer Preview Portal"
        >
          <i className="fa fa-television" style={{ fontSize: 13, color: '#38bdf8' }}></i>
          <span>35-Test Preview</span>
        </Link>

        <Link
          to="/testing"
          style={{
            color: '#1a3a4b',
            backgroundColor: '#ffd700',
            fontSize: 12,
            fontWeight: 800,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '4px 10px',
            borderRadius: 4,
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
          }}
          title="Extracted Tests & Questions Database Explorer"
        >
          <i className="fa fa-database" style={{ fontSize: 13 }}></i>
          <span>/testing</span>
        </Link>

        <Link
          to="/app1.5/membership.php"
          style={{
            color: '#fff',
            fontSize: 13,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '4px 10px',
            backgroundColor: 'rgba(255,255,255,0.18)',
            borderRadius: 4
          }}
          title="AyurQuest Pro Subscription Active"
        >
          <i className="fa fa-star" style={{ fontSize: 14, color: '#ffd700' }}></i>
          <span style={{ fontWeight: 700 }}>PRO ACTIVE</span>
        </Link>
      </div>
    </header>
  );
};
