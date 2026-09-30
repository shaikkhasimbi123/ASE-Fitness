import React from 'react';
import Sidebar from '../components/Sidebar';

const MyWorkouts = () => {
  return (
    <div className="page-layout" style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <Sidebar />
      <main className="main-content" style={{ flex: 1, padding: '40px', position: 'relative', zIndex: 1 }}>
        <div className="ambient-overlay"></div>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--accent-cyan)', margin: 0 }}>My Workouts</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track your recent activity and performance.</p>
        </header>

        <div className="glass-panel" style={{ background: 'var(--card-base)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '30px', border: '1px solid var(--border-light)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '15px' }}>Date</th>
                <th style={{ padding: '15px' }}>Workout Type</th>
                <th style={{ padding: '15px' }}>Duration</th>
                <th style={{ padding: '15px' }}>Calories Burned</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px' }}>Today</td>
                <td style={{ padding: '15px' }}>Upper Body Strength</td>
                <td style={{ padding: '15px' }}>45 min</td>
                <td style={{ padding: '15px', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>320 kcal</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '15px' }}>Yesterday</td>
                <td style={{ padding: '15px' }}>HIIT Cardio</td>
                <td style={{ padding: '15px' }}>30 min</td>
                <td style={{ padding: '15px', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>400 kcal</td>
              </tr>
              <tr>
                <td style={{ padding: '15px' }}>2 Days Ago</td>
                <td style={{ padding: '15px' }}>Core & Flexibility</td>
                <td style={{ padding: '15px' }}>25 min</td>
                <td style={{ padding: '15px', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>150 kcal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MyWorkouts;
