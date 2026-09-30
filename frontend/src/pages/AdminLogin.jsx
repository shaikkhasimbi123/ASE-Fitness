import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const adminId = formData.get('adminId');
    const securityKey = formData.get('securityKey');

    if (
      (adminId === 'rechal' && securityKey === 'Khasimbi@2006') ||
      (adminId === 'khasimbi' && securityKey === 'Rechal@2006')
    ) {
      navigate('/admin');
    } else {
      alert('Invalid Admin ID or Security Key. Access Denied.');
    }
  };

  return (
    <div className="page-wrapper admin-login-page">
      <Navbar />
      <div className="ambient-overlay"></div>
      <div className="glass-panel container">
        <div className="icon-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
        </div>
        <h1>Admin Portal</h1>
        <form className="admin-form" onSubmit={handleAdminLogin}>
          <div className="form-group">
            <label>Admin ID</label>
            <input type="text" name="adminId" required />
          </div>
          <div className="form-group">
            <label>Security Key</label>
            <input type="password" name="securityKey" required />
          </div>
          <button type="submit" className="btn-admin">Authorize Access</button>
        </form>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          background: var(--card-base);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 40px;
          max-width: 400px;
          width: 100%;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
        }
        .icon-box {
          width: 80px; height: 80px; background: rgba(0, 0, 0, 0.05);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px; color: var(--accent-primary);
        }
        .icon-box svg { width: 40px; }
        h1 { margin-bottom: 30px; font-size: 1.8rem; letter-spacing: 2px; color: var(--text-main); }
        .form-group { text-align: left; margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase; }
        input {
          width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--glass-border);
          background: rgba(0, 0, 0, 0.03); color: var(--text-main);
        }
        .btn-admin {
          width: 100%; padding: 15px; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); 
          color: var(--text-main);
          border: none; border-radius: 8px; font-weight: bold; cursor: pointer;
          transition: 0.3s;
        }
        .btn-admin:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); }
      `}} />
    </div>
  );
};

export default AdminLogin;
