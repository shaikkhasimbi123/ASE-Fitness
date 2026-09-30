import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> },
    { name: 'My Workouts', path: '/my-workouts', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7.5V16.5M18 7.5V16.5M2 10V14M22 10V14M5 12H19M4 9H8V15H4V9ZM16 9H20V15H16V9Z"></path></svg> },
    { name: 'Goals Target', path: '/goals-target', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg> },
    { name: 'Diet Plan', path: '/diet-plan', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8Z"></path><path d="M10 12h.01"></path><path d="M13 15h.01"></path><path d="M7 15h.01"></path></svg> },
    { name: 'About Us', path: '/about', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> },
    { name: 'Contact', path: '/contact', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> },
    { name: 'Feedback', path: '/feedback', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> },
  ];

  return (
    <aside className="sidebar glass-panel" style={{ 
      width: '280px', 
      margin: '20px', 
      height: 'calc(100vh - 40px)', 
      position: 'sticky', 
      top: '20px',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(30px)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '50px', 
        color: '#fff', 
        fontWeight: '900', 
        letterSpacing: '2px',
        background: 'linear-gradient(to right, var(--accent-cyan), var(--accent-blue))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '1.5rem'
      }}>Ctrl+Alt+Elite Fitness</h2>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`sidebar-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            style={{
              padding: '14px 20px',
              borderRadius: '15px',
              textDecoration: 'none',
              color: location.pathname === item.path ? 'white' : 'var(--text-muted)',
              background: location.pathname === item.path ? 'linear-gradient(to right, rgba(0,242,254,0.2), rgba(60,80,255,0.2))' : 'transparent',
              transition: '0.4s',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              border: location.pathname === item.path ? '1px solid rgba(0,242,254,0.3)' : '1px solid transparent',
              fontWeight: location.pathname === item.path ? '700' : '500'
            }}
          >
            <span style={{ 
              opacity: location.pathname === item.path ? 1 : 0.6,
              color: location.pathname === item.path ? 'var(--accent-cyan)' : 'inherit',
              display: 'flex',
              alignItems: 'center'
            }}>
              {item.icon}
            </span>
            <span style={{ fontSize: '0.95rem' }}>{item.name}</span>
          </Link>
        ))}
      </nav>
      
      <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px',
          padding: '14px 20px',
          color: '#ff4d4d', 
          textDecoration: 'none', 
          fontWeight: '700',
          fontSize: '0.95rem',
          transition: '0.3s'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          LOGOUT
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
