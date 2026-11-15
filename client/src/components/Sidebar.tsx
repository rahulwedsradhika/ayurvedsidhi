import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/app1.5/index.php", icon: "fa fa-tachometer" },
    { label: "DB Question Explorer (/testing)", path: "/testing", icon: "fa fa-database" },
    { label: "Courses", path: "/app1.5/courses.php", icon: "fa fa-television" },
    { label: "Mock Tests", path: "/app1.5/ayush-npget.php?action=mock_test", icon: "fa fa-television" },
    { label: "Daily Tests", path: "/app1.5/daily-tests.php", icon: "fa fa-calendar-check-o" },
    { label: "Test Series", path: "/app1.5/test-series.php", icon: "fa fa-file-text-o" },
    { label: "AIAPGET", path: "/app1.5/ayush-npget.php", icon: "fa fa-building-o" },
    { label: "UPSC Entrance", path: "/app1.5/upsc.php", icon: "fa fa-university" },
    { label: "Previous Year Papers", path: "/app1.5/prev-years.php", icon: "fa fa-clipboard" },
    { label: "Samhitawise MCQs", path: "/app1.5/category.php?action=samhitas", icon: "fa fa-book" },
    { label: "Subjectwise MCQs", path: "/app1.5/category.php?action=subjects", icon: "fa fa-book" },
    { label: "New Pattern MCQs", path: "/app1.5/category.php?action=tags", icon: "fa fa-question-circle" },
    { label: "Notes", path: "/app1.5/notes.php", icon: "fa fa-file-text" },
    { label: "Mnemonics", path: "/app1.5/mnemonics.php", icon: "fa fa-magic" },
    { label: "Tips", path: "/app1.5/tips.php", icon: "fa fa-lightbulb-o" },
    { label: "Audio Lectures", path: "/app1.5/audio-video.php", icon: "fa fa-headphones" },
    { label: "Score Card", path: "/app1.5/myScore.php", icon: "fa fa-trophy" },
    { label: "Bookmarks", path: "/app1.5/bookmarks.php", icon: "fa fa-bookmark" },
    { label: "Reported MCQs", path: "/app1.5/reported_questions.php", icon: "fa fa-question-circle-o" },
    { label: "Discussion Forum", path: "/app1.5/forum.php", icon: "fa fa-comments" },
    { label: "My Wallet", path: "/app1.5/myWallet.php", icon: "fa fa-money" },
    { label: "Membership Plans", path: "/app1.5/membership.php", icon: "fa fa-users" },
    { label: "Book Store", path: "/app1.5/books.php", icon: "fa fa-shopping-bag" },
    { label: "Invite Friends", path: "/app1.5/invites.php", icon: "fa fa-gift" },
    { label: "My Profile", path: "/app1.5/myProfile.php", icon: "fa fa-user" },
    { label: "About Us", path: "/app1.5/about.php", icon: "fa fa-users" },
    { label: "Contact Us", path: "/app1.5/contact.php", icon: "fa fa-phone" },
    { label: "Sign Out", path: "/app1.5/logout.php", icon: "fa fa-sign-out" },
  ];

  return (
    <>
      {/* Backdrop overlay when sidebar is open */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.35)',
            zIndex: 1060,
            transition: 'opacity 0.25s ease'
          }}
        />
      )}

      {/* The Sidebar Drawer */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: isOpen ? 0 : -280,
          bottom: 0,
          width: 260,
          backgroundColor: '#2aacdd',
          zIndex: 1070,
          boxShadow: isOpen ? '4px 0 15px rgba(0,0,0,0.2)' : 'none',
          transition: 'left 0.25s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
      >
        {/* Top Header area with Logo and Close button */}
        <div style={{ position: 'relative', padding: '25px 15px 15px 15px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: 22,
              cursor: 'pointer',
              lineHeight: 1
            }}
            title="Close Menu"
          >
            <i className="fa fa-times"></i>
          </button>

          {/* Circular AyurQuest Logo */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            marginBottom: 8
          }}>
            <img
              src="/assets/images/logo.png"
              alt="AyurQuest"
              style={{ width: 48, height: 48, objectFit: 'contain' }}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div style={{ color: '#fff', fontSize: 20, fontWeight: 700, letterSpacing: 0.5 }}>
            AyurQuest
          </div>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#ffd700',
            color: '#1a3a4b',
            fontWeight: 800,
            fontSize: 10,
            padding: '2px 8px',
            borderRadius: 12,
            marginTop: 4,
            letterSpacing: 0.5
          }}>
            PRO DEV USER
          </div>
        </div>

        {/* Navigation Items List */}
        <nav style={{ flex: 1, paddingBottom: 25 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {navItems.map((item, idx) => {
              const currentPathWithSearch = location.pathname + location.search;
              const isActive = (item.path === currentPathWithSearch) ||
                (item.path === '/app1.5/index.php' && location.pathname === '/');

              return (
                <li key={idx} style={{ margin: '1px 0' }}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '11px 20px',
                      color: isActive ? '#2c3e50' : '#ffffff',
                      backgroundColor: isActive ? '#ffffff' : 'transparent',
                      textDecoration: 'none',
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 400,
                      transition: 'background-color 0.15s ease, color 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <i
                      className={item.icon}
                      style={{
                        width: 18,
                        textAlign: 'center',
                        fontSize: 15,
                        color: isActive ? '#2c3e50' : '#ffffff'
                      }}
                    />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};
