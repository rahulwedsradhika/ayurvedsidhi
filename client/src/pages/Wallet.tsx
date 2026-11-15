import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import { WalletData } from '../types';

export const Wallet: React.FC = () => {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getWallet()
      .then(res => {
        setWallet(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Wallet error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <i className="fa fa-spinner fa-spin fa-2x text-aqua"></i>
        <p style={{ marginTop: 10 }}>Loading wallet credits...</p>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="content-wrapper" style={{ padding: '30px' }}>
        <div className="alert alert-danger">Failed to load wallet data.</div>
      </div>
    );
  }

  return (
    <div className="content-wrapper" style={{ padding: '20px 25px', backgroundColor: '#f4f6f9', minHeight: 'calc(100vh - 100px)' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: '0 0 6px 0', fontSize: 24, fontWeight: 700, color: '#2c3e50' }}>
          <i className="fa fa-money text-orange" style={{ marginRight: 10 }}></i>
          My AyurQuest Wallet Points
        </h2>
        <p style={{ margin: 0, color: '#7f8c8d', fontSize: 14 }}>
          Earn reward credits by solving daily tests, maintaining streaks, and scoring top ranks.
        </p>
      </div>

      <div className="row">
        {/* Balance Card */}
        <div className="col-md-4" style={{ marginBottom: 20 }}>
          <div style={{
            background: 'linear-gradient(135deg, #f39c12 0%, #d35400 100%)',
            borderRadius: 8,
            padding: '25px',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(243, 156, 18, 0.3)'
          }}>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.9 }}>Available Balance</span>
            <div style={{ fontSize: 44, fontWeight: 800, margin: '8px 0 15px 0' }}>
              {wallet.points} <span style={{ fontSize: 18, fontWeight: 500 }}>PTS</span>
            </div>
            <p style={{ fontSize: 12, opacity: 0.9, lineHeight: 1.5, margin: 0 }}>
              Use your accumulated reward points to redeem mock tests, subscription discounts, and special lecture notes.
            </p>
          </div>
        </div>

        {/* Ledger Transaction History */}
        <div className="col-md-8">
          <div className="box box-solid" style={{ borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="box-header with-border" style={{ padding: '16px 20px', backgroundColor: '#fcfcfc' }}>
              <h3 className="box-title" style={{ fontSize: 16, fontWeight: 700 }}>
                <i className="fa fa-exchange text-aqua" style={{ marginRight: 6 }}></i>
                Wallet Points Credit & Debit Ledger
              </h3>
            </div>
            <div className="box-body" style={{ padding: 0 }}>
              <div className="table-responsive">
                <table className="table table-hover" style={{ margin: 0 }}>
                  <thead>
                    <tr style={{ color: '#888', fontSize: 12 }}>
                      <th>Date</th>
                      <th>Activity Description</th>
                      <th style={{ textAlign: 'right' }}>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wallet.history.map((h, idx) => (
                      <tr key={idx}>
                        <td style={{ fontSize: 12, color: '#888' }}>{h.date}</td>
                        <td style={{ fontWeight: 500, color: '#2c3e50', fontSize: 13 }}>{h.description}</td>
                        <td style={{ textAlign: 'right', fontWeight: 700, color: h.points > 0 ? '#27ae60' : '#e74c3c' }}>
                          {h.points > 0 ? `+${h.points}` : h.points} PTS
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

