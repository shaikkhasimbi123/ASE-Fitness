import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18M9 21V9"/></svg> },
    { name: 'My Workouts', path: '/my-workouts', icon: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg> },
    { name: 'Goals Target', path: '/goals-target', icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16L16 12 12 8M8 12h8"/></svg> },
    { name: 'About Us', path: '/about', icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01M12 12l0 0"/></svg> },
    { name: 'Contact', path: '/contact', icon: <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg> },
    { name: 'Feedback', path: '/feedback', icon: <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg> },
    { name: 'Admin Panel', path: '/admin', icon: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg> },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">FITNESS AI</div>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <Link to="/" className="btn-act" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
          <svg viewBox="0 0 24 24" style={{ width: '18px', marginRight: '5px', verticalAlign: 'middle', fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}>
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Switch User
        </Link>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar {
          width: 260px;
          background: rgba(15, 15, 17, 0.8);
          border-right: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          padding: 30px 0;
          box-shadow: 5px 0 30px rgba(0,0,0,0.5);
          z-index: 10;
          height: 100vh;
          position: sticky;
          top: 0;
        }
        .brand {
          font-size: 1.8rem;
          font-weight: 800;
          text-align: center;
          background: linear-gradient(to right, #00f2fe, #4facfe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 50px;
          letter-spacing: 1px;
        }
        .nav-item {
          padding: 15px 30px;
          display: flex;
          align-items: center;
          gap: 15px;
          color: var(--text-muted);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
        }
        .nav-item:hover, .nav-item.active {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.05);
          border-right: 4px solid var(--accent-cyan);
        }
        .nav-item svg {
          width: 20px; height: 20px;
          fill: none; stroke: currentColor; stroke-width: 2;
          stroke-linecap: round; stroke-linejoin: round;
        }
        .sidebar-bottom {
          margin-top: auto;
          padding: 0 30px;
        }
        .btn-act {
          width: 100%; padding: 14px; background: linear-gradient(to right, #00f2fe, #4facfe);
          color: #000; font-weight: 700; border: none; border-radius: 12px; font-size: 1rem;
          cursor: pointer; transition: 0.3s;
        }
        .btn-act:hover { box-shadow: 0 0 20px rgba(0, 242, 254, 0.4); }
      `}} />
    </aside>
  );
};

export default Sidebar;
