import React from 'react';

interface HeroProps {
  type:
    | 'mock_test'
    | 'upsc'
    | 'prev_years'
    | 'samhitas'
    | 'subjects'
    | 'tags'
    | 'audio_video'
    | 'bookmarks'
    | 'reported'
    | 'wallet'
    | 'invites'
    | 'scorecard';
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

export const PageHeroIllustration: React.FC<HeroProps> = ({ type, width, height, style }) => {
  const isInline = !!(width || height);

  return (
    <div
      style={{
        backgroundColor: isInline ? 'transparent' : '#eef9fb',
        padding: isInline ? '0' : '25px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: isInline ? 'none' : '1px solid #d8edf3',
        minHeight: isInline ? 'auto' : 180,
        position: 'relative',
        overflow: 'hidden',
        width: width || 'auto',
        height: height || 'auto',
        ...style
      }}
    >
      {type === 'mock_test' && (
        <svg viewBox="0 0 500 160" style={{ maxHeight: 150, width: 'auto' }}>
          {/* Trophy & Students at computers */}
          <circle cx="250" cy="80" r="75" fill="#d9f2f8" />
          {/* Golden Trophy */}
          <path d="M230 40 h40 v35 c0 15 -10 25 -20 25 s-20 -10 -20 -25 z" fill="#f1c40f" />
          <path d="M225 45 c-15 0 -20 15 -15 25 s15 10 20 5" stroke="#f39c12" strokeWidth="4" fill="none" />
          <path d="M275 45 c15 0 20 15 15 25 s-15 10 -20 5" stroke="#f39c12" strokeWidth="4" fill="none" />
          <path d="M250 55 l3 7 h7 l-5 4 l2 7 l-7 -4 l-7 4 l2 -7 l-5 -4 h7 z" fill="#fff" />
          <rect x="246" y="100" width="8" height="20" fill="#d4ac0d" />
          <rect x="235" y="120" width="30" height="8" rx="3" fill="#2c3e50" />
          {/* Student Left */}
          <circle cx="180" cy="65" r="14" fill="#f39c12" />
          <path d="M165 72 c0-5 30-5 30 0 v8 h-30 z" fill="#2980b9" />
          <path d="M162 82 c0 15 36 15 36 0 v38 h-36 z" fill="#e67e22" />
          <rect x="185" y="90" width="35" height="25" rx="3" fill="#2980b9" />
          <rect x="198" y="115" width="9" height="10" fill="#7f8c8d" />
          {/* Student Right */}
          <circle cx="320" cy="65" r="14" fill="#3498db" />
          <path d="M305 72 c0-5 30-5 30 0 v8 h-30 z" fill="#2c3e50" />
          <path d="M302 82 c0 15 36 15 36 0 v38 h-36 z" fill="#2980b9" />
          <rect x="280" y="90" width="35" height="25" rx="3" fill="#2980b9" />
          <rect x="293" y="115" width="9" height="10" fill="#7f8c8d" />
        </svg>
      )}

      {type === 'upsc' && (
        <svg viewBox="0 0 500 160" style={{ maxHeight: 150, width: 'auto' }}>
          {/* University building */}
          <polygon points="250,20 160,50 340,50" fill="#5dade2" />
          <text x="250" y="42" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">UPSC</text>
          <rect x="175" y="50" width="150" height="8" fill="#3498db" />
          {/* Pillars */}
          <rect x="185" y="58" width="14" height="65" fill="#85c1e9" />
          <rect x="215" y="58" width="14" height="65" fill="#85c1e9" />
          <rect x="245" y="58" width="14" height="65" fill="#85c1e9" />
          <rect x="275" y="58" width="14" height="65" fill="#85c1e9" />
          <rect x="305" y="58" width="14" height="65" fill="#85c1e9" />
          {/* Giant books in front */}
          <rect x="220" y="110" width="60" height="14" rx="2" fill="#e67e22" />
          <rect x="215" y="124" width="70" height="14" rx="2" fill="#2980b9" />
        </svg>
      )}

      {type === 'prev_years' && (
        <svg viewBox="0 0 500 160" style={{ maxHeight: 150, width: 'auto' }}>
          {/* Laptop with checklist */}
          <rect x="200" y="30" width="100" height="70" rx="4" fill="#3498db" />
          <rect x="206" y="36" width="88" height="58" rx="2" fill="#fff" />
          {/* Checklist items */}
          <rect x="215" y="45" width="50" height="4" fill="#bdc3c7" />
          <circle cx="275" cy="47" r="4" fill="#2ecc71" />
          <rect x="215" y="57" width="50" height="4" fill="#bdc3c7" />
          <circle cx="275" cy="59" r="4" fill="#2ecc71" />
          <rect x="215" y="69" width="50" height="4" fill="#bdc3c7" />
          <circle cx="275" cy="71" r="4" fill="#2ecc71" />
          {/* Laptop base */}
          <polygon points="180,105 320,105 310,115 190,115" fill="#7f8c8d" />
        </svg>
      )}

      {(type === 'samhitas' || type === 'scorecard') && (
        <svg viewBox="0 0 500 160" style={{ maxHeight: 150, width: 'auto' }}>
          {/* Stack of books with graduation cap & trophy */}
          <rect x="200" y="110" width="100" height="16" rx="3" fill="#2980b9" />
          <rect x="205" y="94" width="90" height="16" rx="3" fill="#e67e22" />
          <rect x="210" y="78" width="80" height="16" rx="3" fill="#c0392b" />
          {/* Graduation cap */}
          <polygon points="250,30 205,48 250,62 295,48" fill="#1b2631" />
          <rect x="240" y="55" width="20" height="15" fill="#1b2631" />
          <path d="M295 48 v25" stroke="#f39c12" strokeWidth="3" />
          {/* Golden Trophy on right */}
          <path d="M315 70 h30 v25 c0 12 -8 20 -15 20 s-15 -8 -15 -20 z" fill="#f1c40f" />
          <rect x="326" y="115" width="8" height="15" fill="#d4ac0d" />
          <rect x="318" y="130" width="24" height="6" fill="#2c3e50" />
        </svg>
      )}

      {(type === 'subjects' || type === 'tags') && (
        <svg viewBox="0 0 500 160" style={{ maxHeight: 150, width: 'auto' }}>
          {/* Big open book with magnifying glass and pencil */}
          <path d="M250 40 c-20 -10 -60 -10 -80 0 v80 c20 -10 60 -10 80 0 z" fill="#fff" stroke="#3498db" strokeWidth="2" />
          <path d="M250 40 c20 -10 60 -10 80 0 v80 c-20 -10 -60 -10 -80 0 z" fill="#fff" stroke="#3498db" strokeWidth="2" />
          <rect x="160" y="40" width="10" height="80" fill="#e67e22" />
          {/* Magnifying glass */}
          <circle cx="235" cy="70" r="18" fill="none" stroke="#2980b9" strokeWidth="5" />
          <line x1="248" y1="83" x2="265" y2="100" stroke="#2980b9" strokeWidth="6" strokeLinecap="round" />
          {/* Yellow Pencil */}
          <polygon points="310,30 318,30 314,15" fill="#e74c3c" />
          <rect x="310" y="30" width="8" height="90" fill="#f1c40f" />
        </svg>
      )}

      {type === 'audio_video' && (
        <svg viewBox="0 0 500 160" style={{ maxHeight: 150, width: 'auto' }}>
          {/* Smartphone with play & equalizer, boy/girl with headphones */}
          <rect x="215" y="20" width="70" height="120" rx="10" fill="#2980b9" />
          <rect x="220" y="30" width="60" height="100" rx="4" fill="#fff" />
          <circle cx="250" cy="70" r="16" fill="#e74c3c" />
          <polygon points="245,62 258,70 245,78" fill="#fff" />
          {/* Equalizer lines */}
          <rect x="230" y="95" width="6" height="18" fill="#e67e22" />
          <rect x="240" y="90" width="6" height="23" fill="#f1c40f" />
          <rect x="250" y="100" width="6" height="13" fill="#2ecc71" />
          <rect x="260" y="93" width="6" height="20" fill="#3498db" />
        </svg>
      )}

      {type === 'bookmarks' && (
        <svg viewBox="0 0 500 160" style={{ maxHeight: 150, width: 'auto' }}>
          {/* Monitor with folders & magnifying glass */}
          <rect x="180" y="25" width="140" height="95" rx="5" fill="#2980b9" />
          <rect x="188" y="33" width="124" height="79" rx="3" fill="#fff" />
          {/* 6 folder icons */}
          <rect x="198" y="42" width="28" height="20" rx="2" fill="#f39c12" />
          <rect x="236" y="42" width="28" height="20" rx="2" fill="#f39c12" />
          <rect x="274" y="42" width="28" height="20" rx="2" fill="#f39c12" />
          <rect x="198" y="72" width="28" height="20" rx="2" fill="#f39c12" />
          <rect x="236" y="72" width="28" height="20" rx="2" fill="#f39c12" />
          <rect x="274" y="72" width="28" height="20" rx="2" fill="#f39c12" />
          {/* Monitor stand */}
          <rect x="242" y="120" width="16" height="16" fill="#7f8c8d" />
          <rect x="220" y="136" width="60" height="6" rx="3" fill="#34495e" />
        </svg>
      )}

      {type === 'reported' && (
        <svg viewBox="0 0 500 160" style={{ maxHeight: 150, width: 'auto' }}>
          {/* Phone with female doctor & Q&A */}
          <rect x="180" y="20" width="70" height="120" rx="8" fill="#3498db" />
          <rect x="185" y="28" width="60" height="104" rx="4" fill="#fff" />
          {/* Doctor */}
          <circle cx="215" cy="55" r="14" fill="#34495e" />
          <circle cx="215" cy="57" r="11" fill="#f5cba7" />
          <path d="M198 75 c0 15 34 15 34 0 v35 h-34 z" fill="#fff" stroke="#2980b9" strokeWidth="2" />
          {/* Big Q&A text */}
          <text x="270" y="85" fill="#2980b9" fontSize="52" fontWeight="900" fontFamily="sans-serif">Q&amp;A</text>
        </svg>
      )}

      {type === 'wallet' && (
        <svg viewBox="0 0 500 160" style={{ maxHeight: 150, width: 'auto' }}>
          {/* Big blue wallet with cards and shield */}
          <rect x="190" y="45" width="120" height="80" rx="10" fill="#2980b9" />
          {/* Credit cards peeking out */}
          <rect x="205" y="20" width="80" height="50" rx="5" fill="#5dade2" />
          <rect x="215" y="30" width="80" height="50" rx="5" fill="#f39c12" />
          {/* Wallet flap & clasp */}
          <path d="M250 45 h60 v40 h-60 c-10 0 -10 -40 0 -40 z" fill="#1b4f72" />
          <circle cx="290" cy="65" r="6" fill="#f1c40f" />
          {/* Green Security Shield */}
          <polygon points="325,45 350,55 350,85 325,100 300,85 300,55" fill="#2ecc71" />
          <polyline points="310,70 320,80 340,60" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )}

      {type === 'invites' && (
        <svg viewBox="0 0 500 160" style={{ maxHeight: 150, width: 'auto' }}>
          {/* Smartphone with social post, megaphone, emojis */}
          <rect x="200" y="20" width="100" height="120" rx="8" fill="#3498db" />
          <rect x="206" y="26" width="88" height="108" rx="4" fill="#fff" />
          {/* Megaphone */}
          <polygon points="230,70 250,55 250,85" fill="#e74c3c" />
          <rect x="220" y="65" width="10" height="10" fill="#c0392b" />
          <path d="M255 58 c5 5 5 20 0 25" stroke="#f39c12" strokeWidth="3" fill="none" />
          {/* Emojis floating */}
          <circle cx="175" cy="50" r="12" fill="#f1c40f" />
          <circle cx="325" cy="50" r="12" fill="#f1c40f" />
        </svg>
      )}
    </div>
  );
};
