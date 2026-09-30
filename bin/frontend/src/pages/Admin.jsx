import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    setUsers(Object.values(storedUsers));
  };

  const toggleUserStatus = (username) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    if (storedUsers[username]) {
      const currentStatus = storedUsers[username].status || 'active';
      storedUsers[username].status = currentStatus === 'active' ? 'blocked' : 'active';
      localStorage.setItem('users', JSON.stringify(storedUsers));
      loadUsers();
    }
  };

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main className="main-content">
        <div className="ambient-overlay"></div>
        <header>
          <h1>System Control Panel</h1>
          <div className="admin-badge">ADMINISTRATOR</div>
        </header>

        <div className="admin-grid">
          <div className="glass-panel user-management">
            <h2>User Records</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Age</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? users.map((user, index) => {
                    const status = user.status || 'active';
                    return (
                      <tr key={index}>
                        <td>{user.fullName}</td>
                        <td>@{user.username}</td>
                        <td>{user.age}</td>
                        <td><span className={`status ${status}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span></td>
                        <td>
                          {status === 'active' ? (
                            <button className="btn-del" onClick={() => toggleUserStatus(user.username)}>Block</button>
                          ) : (
                            <button className="btn-unblock" onClick={() => toggleUserStatus(user.username)}>Unblock</button>
                          )}
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>No registered users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .main-content { flex: 1; padding: 40px; }
        header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .admin-badge { background: #ff4d4d; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 0.8rem; }
        .glass-panel { background: var(--card-base); backdrop-filter: blur(20px); border-radius: 20px; padding: 25px; border: 1px solid var(--border-light); }
        .table-wrap { overflow-x: auto; margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { text-align: left; padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        th { color: var(--text-muted); font-size: 0.9rem; }
        .status { padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: bold; }
        .status.active { background: rgba(0, 242, 254, 0.1); color: #00f2fe; }
        .status.blocked { background: rgba(255, 77, 77, 0.1); color: #ff4d4d; }
        .btn-del { background: none; border: 1px solid #ff4d4d; color: #ff4d4d; padding: 5px 10px; border-radius: 5px; cursor: pointer; }
        .btn-unblock { background: none; border: 1px solid #00f2fe; color: #00f2fe; padding: 5px 10px; border-radius: 5px; cursor: pointer; }
      `}} />
    </div>
  );
};

export default Admin;
