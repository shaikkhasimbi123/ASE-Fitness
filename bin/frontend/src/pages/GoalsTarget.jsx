import React from 'react';
import Sidebar from '../components/Sidebar';

const GoalsTarget = () => {
  return (
    <div className="page-layout" style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <Sidebar />
      <main className="main-content" style={{ flex: 1, padding: '40px', position: 'relative', zIndex: 1 }}>
        <div className="ambient-overlay"></div>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--accent-cyan)', margin: 0 }}>Goals & Targets</h1>
          <p style={{ color: 'var(--text-muted)' }}>Monitor your progress towards your fitness objectives.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          <div className="glass-panel" style={{ background: 'var(--card-base)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '25px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 15px 0' }}>Weight Goal</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Current: 75kg</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>Target: 70kg</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg, #00f2fe, #4facfe)' }}></div>
            </div>
            <p style={{ textAlign: 'right', fontSize: '0.85rem', marginTop: '8px', color: 'var(--text-muted)' }}>60% Completed</p>
          </div>

          <div className="glass-panel" style={{ background: 'var(--card-base)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '25px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 15px 0' }}>Weekly Active Time</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Current: 120 min</span>
              <span style={{ color: '#fbc2eb', fontWeight: 'bold' }}>Target: 300 min</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: '40%', height: '100%', background: 'linear-gradient(90deg, #fbc2eb, #a6c1ee)' }}></div>
            </div>
            <p style={{ textAlign: 'right', fontSize: '0.85rem', marginTop: '8px', color: 'var(--text-muted)' }}>40% Completed</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GoalsTarget;
