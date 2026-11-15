import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="main-footer" style={{
      background: '#fff',
      padding: '15px 20px',
      color: '#444',
      borderTop: '1px solid #d2d6de',
      fontSize: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 10
    }}>
      <div className="pull-right hidden-xs">
        <b>Version</b> 1.6 &bull; <span className="text-success"><i className="fa fa-shield"></i> Authorized Replica Environment</span>
      </div>
      <div>
        <strong>Copyright &copy; 2026 <a href="https://ayurquest.com" target="_blank" rel="noreferrer" style={{ color: '#2aacdd' }}>AyurQuest Education</a>.</strong> All rights reserved.
      </div>
    </footer>
  );
};

