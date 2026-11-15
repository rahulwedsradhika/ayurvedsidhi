import React, { useState } from 'react';

export const BooksPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const books = [
    {
      id: 1,
      title: 'AyurQuest Vol 1 (Charaka Samhita Decoded)',
      author: 'Dr. Rohit & Team AyurQuest',
      category: 'samhita',
      rating: '4.9 ★ (1,240 reviews)',
      price: '₹650',
      mrp: '₹900',
      coverColor: '#2aacdd',
      edition: '2026 Edition'
    },
    {
      id: 2,
      title: 'AyurQuest Vol 2 (Sushruta & Vagbhata Essentials)',
      author: 'Dr. Rohit & Faculty Team',
      category: 'samhita',
      rating: '4.8 ★ (980 reviews)',
      price: '₹750',
      mrp: '₹1,050',
      coverColor: '#17a2b8',
      edition: '2026 Edition'
    },
    {
      id: 3,
      title: 'Ayurveda Samgraha (Comprehensive Guide)',
      author: 'Dr. G. Prabhakar Rao',
      category: 'guide',
      rating: '4.9 ★ (2,450 reviews)',
      price: '₹850',
      mrp: '₹1,200',
      coverColor: '#28a745',
      edition: 'Latest Edition'
    },
    {
      id: 4,
      title: 'Chikitsha Chandrika (Clinical Practice)',
      author: 'Dr. Brahmanand Tripathi',
      category: 'clinical',
      rating: '4.7 ★ (670 reviews)',
      price: '₹550',
      mrp: '₹750',
      coverColor: '#6f42c1',
      edition: 'Classic Edition'
    },
    {
      id: 5,
      title: 'A Text Book of Dravyaguna Vijnana (Vol 1 & 2)',
      author: 'Dr. J.L.N. Sastry',
      category: 'subject',
      rating: '4.9 ★ (1,890 reviews)',
      price: '₹950',
      mrp: '₹1,350',
      coverColor: '#fd7e14',
      edition: 'Revised 2025'
    },
    {
      id: 6,
      title: 'Rasa Shastra & Bhaishajya Kalpana',
      author: 'Dr. Ravindra Angadi',
      category: 'subject',
      rating: '4.8 ★ (820 reviews)',
      price: '₹720',
      mrp: '₹950',
      coverColor: '#e83e8c',
      edition: '2025 Edition'
    },
    {
      id: 7,
      title: 'Rog Nidana Evam Vikriti Vijnana',
      author: 'Dr. P.S. Byadgi',
      category: 'subject',
      rating: '4.8 ★ (750 reviews)',
      price: '₹680',
      mrp: '₹890',
      coverColor: '#20c997',
      edition: '2026 Edition'
    },
    {
      id: 8,
      title: 'Shalya Tantra Rahasya (Surgical Principles)',
      author: 'Dr. K.K. Sijoria',
      category: 'subject',
      rating: '4.7 ★ (510 reviews)',
      price: '₹600',
      mrp: '₹850',
      coverColor: '#dc3545',
      edition: '2025 Edition'
    },
    {
      id: 9,
      title: 'Shalakya Tantra Vijnana (ENT & Ophthalmology)',
      author: 'Dr. Dinkar Rai',
      category: 'subject',
      rating: '4.6 ★ (430 reviews)',
      price: '₹580',
      mrp: '₹800',
      coverColor: '#6610f2',
      edition: '2025 Edition'
    },
    {
      id: 10,
      title: 'Kaumarbhritya Parichaya (Pediatrics in Ayurveda)',
      author: 'Dr. B.M. Singh',
      category: 'subject',
      rating: '4.8 ★ (620 reviews)',
      price: '₹540',
      mrp: '₹720',
      coverColor: '#007bff',
      edition: '2026 Edition'
    },
    {
      id: 11,
      title: 'Prasuti Tantra & Stri Roga (Obstetrics & Gynaecology)',
      author: 'Dr. Premvati Tewari',
      category: 'subject',
      rating: '4.9 ★ (1,560 reviews)',
      price: '₹820',
      mrp: '₹1,100',
      coverColor: '#d63384',
      edition: 'Master Edition'
    },
    {
      id: 12,
      title: 'AIAPGET Booster 2026 Edition (10,000 High-Yield MCQs)',
      author: 'AyurQuest Publications',
      category: 'guide',
      rating: '5.0 ★ (3,100 reviews)',
      price: '₹499',
      mrp: '₹799',
      coverColor: '#e83e8c',
      edition: 'Hot Seller'
    }
  ];

  const filteredBooks = filter === 'all' ? books : books.filter(b => b.category === filter);

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Open Sans", Arial, sans-serif' }}>
      {/* Header matching Screenshot 2026-11-14 192730.png */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#2c3e50', letterSpacing: '0.5px' }}>
          BOOK STORE
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: '15px', color: '#6c757d' }}>
          Buy Ayurveda Books online from our verified publishing partners
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: 'All Books (12)' },
          { key: 'samhita', label: 'Samhita Classics' },
          { key: 'subject', label: 'Subject Textbooks' },
          { key: 'guide', label: 'Competitive Guides' },
          { key: 'clinical', label: 'Clinical Handbooks' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: filter === tab.key ? 'none' : '1px solid #ced4da',
              backgroundColor: filter === tab.key ? '#2aacdd' : '#ffffff',
              color: filter === tab.key ? '#ffffff' : '#2c3e50',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: filter === tab.key ? '0 2px 6px rgba(42,172,221,0.3)' : 'none'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3x4 Grid of 12 Authentic Ayurveda Books matching Screenshot 2026-11-14 192730.png */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e1e8ed',
              overflow: 'hidden',
              boxShadow: '0 3px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            {/* Book Spine / Cover Preview */}
            <div
              style={{
                height: '160px',
                backgroundColor: book.coverColor,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
                color: '#ffffff',
                textAlign: 'center',
                position: 'relative',
                boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.15)'
              }}
            >
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.9 }}>
                {book.edition}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, marginTop: '8px', lineHeight: 1.3 }}>
                {book.title}
              </div>
              <div style={{ fontSize: '11px', marginTop: '6px', opacity: 0.85 }}>
                {book.author}
              </div>
            </div>

            {/* Book Body */}
            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#ff9800', fontWeight: 700, marginBottom: '6px' }}>
                  {book.rating}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#2c3e50', minHeight: '40px' }}>
                  {book.title}
                </div>
                <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                  By {book.author}
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#2c3e50' }}>{book.price}</span>
                  <span style={{ fontSize: '13px', color: '#dc3545', textDecoration: 'line-through' }}>{book.mrp}</span>
                  <span style={{ fontSize: '11px', color: '#28a745', fontWeight: 700 }}>Save 30%</span>
                </div>

                <button
                  onClick={() => alert(`Direct checkout initiated for: ${book.title}. Free delivery across India!`)}
                  style={{
                    width: '100%',
                    backgroundColor: '#e83e8c',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(232,62,140,0.3)'
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

