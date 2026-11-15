import React, { useState } from 'react';
import { PageHeroIllustration } from '../../components/PageHeroIllustration';

export const MyWalletPage: React.FC = () => {
  const [balance, setBalance] = useState(100);
  const [transactions, setTransactions] = useState([
    {
      id: '3100874',
      date: '14 NOV 2026',
      title: 'New user registration bonus',
      points: '+100 Points',
      type: 'credit',
      status: 'Success'
    }
  ]);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState(500);

  const handleRecharge = () => {
    const newTx = {
      id: Math.floor(1000000 + Math.random() * 9000000).toString(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      title: `Wallet Top-up via Razorpay / UPI`,
      points: `+${rechargeAmount} Points`,
      type: 'credit',
      status: 'Success'
    };
    setTransactions([newTx, ...transactions]);
    setBalance(balance + rechargeAmount);
    setShowRechargeModal(false);
  };

  return (
    <div style={{ padding: '16px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Open Sans", Arial, sans-serif' }}>
      {/* Hero Header Box matching Screenshot 2026-11-14 192703.png */}
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
          <PageHeroIllustration type="wallet" width={110} height={100} />
          <div>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#2c3e50', letterSpacing: '0.5px' }}>
              MY WALLET
            </h1>
            <div style={{ marginTop: '8px', fontSize: '13px', fontWeight: 700, color: '#2aacdd', letterSpacing: '0.5px' }}>
              Balance {balance} &nbsp;&nbsp;|&nbsp;&nbsp; Expense 0 &nbsp;&nbsp;|&nbsp;&nbsp; Deposit {balance}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowRechargeModal(true)}
            style={{
              backgroundColor: '#2aacdd',
              color: '#ffffff',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(42,172,221,0.3)'
            }}
          >
            Recharge Wallet
          </button>

          {/* Authentic Pink OR Circle */}
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: '#e83e8c',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 800
            }}
          >
            OR
          </div>

          <a
            href="/app1.5/invites.php"
            style={{
              backgroundColor: '#e83e8c',
              color: '#ffffff',
              padding: '9px 18px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 4px rgba(232,62,140,0.3)',
              display: 'inline-block'
            }}
          >
            Get Free Points
          </a>
        </div>
      </div>

      {/* Transactions Section matching Screenshot 2026-11-14 192703.png */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e1e8ed', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #eef2f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#2c3e50', letterSpacing: '0.5px' }}>
            TRANSACTIONS
          </h2>
          <span style={{ fontSize: '12px', color: '#6c757d' }}>1 Point = ₹1.00</span>
        </div>

        <div style={{ padding: '20px' }}>
          {transactions.map((tx) => (
            <div
              key={tx.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '16px 20px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#2aacdd', letterSpacing: '0.5px' }}>
                  {tx.date} &nbsp;&nbsp;|&nbsp;&nbsp; TRANSACTION ID: {tx.id}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#2c3e50', marginTop: '4px' }}>
                  {tx.title}
                </div>
                <div style={{ fontSize: '12px', color: '#28a745', fontWeight: 600, marginTop: '2px' }}>
                  Status: {tx.status}
                </div>
              </div>

              <div style={{ fontSize: '18px', fontWeight: 800, color: '#28a745' }}>
                {tx.points}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recharge Modal */}
      {showRechargeModal && (
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
          <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '24px', width: '90%', maxWidth: '440px', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 800, color: '#2c3e50' }}>
              Recharge AyurQuest Wallet
            </h3>
            <p style={{ fontSize: '13px', color: '#6c757d', marginBottom: '16px' }}>
              Select points package to recharge your account:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {[200, 500, 1000].map(amt => (
                <button
                  key={amt}
                  onClick={() => setRechargeAmount(amt)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: rechargeAmount === amt ? '2px solid #2aacdd' : '1px solid #ced4da',
                    backgroundColor: rechargeAmount === amt ? '#eef9fb' : '#ffffff',
                    color: rechargeAmount === amt ? '#2aacdd' : '#2c3e50',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ₹{amt} <br />
                  <span style={{ fontSize: '11px', fontWeight: 400 }}>{amt} Pts</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setShowRechargeModal(false)}
                style={{ backgroundColor: '#f8f9fa', border: '1px solid #ced4da', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleRecharge}
                style={{ backgroundColor: '#2aacdd', color: '#ffffff', border: 'none', padding: '8px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                Proceed (₹{rechargeAmount})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

