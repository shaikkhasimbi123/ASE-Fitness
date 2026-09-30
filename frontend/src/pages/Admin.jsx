import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, feedbacksRes] = await Promise.all([
        fetch('http://localhost:9089/api/admin/users'),
        fetch('http://localhost:9089/api/admin/feedbacks')
      ]);
      const usersData = await usersRes.json();
      const feedbacksData = await feedbacksRes.json();
      setUsers(usersData);
      setFeedbacks(feedbacksData);
    } catch (error) {
      console.error('Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      const response = await fetch(`http://localhost:9089/api/admin/toggle-status/${userId}`, {
        method: 'POST'
      });
      if (response.ok) {
        fetchData(); // Refresh list
      }
    } catch (error) {
      alert('Failed to update user status');
    }
  };

  if (loading) return <div className="admin-layout"><Sidebar /><main className="main-content"><h1>Loading Admin Panel...</h1></main></div>;

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main className="main-content">
        <div className="ambient-overlay"></div>
        <header>
          <h1>System Control Panel</h1>
          <div className="admin-badge">ADMINISTRATOR</div>
        </header>

        <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
          <div className="glass-panel user-management">
            <h2 style={{ color: 'var(--accent-cyan)' }}>User Records</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Details</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>@{user.username}</td>
                      <td>{user.age} yrs | {user.weight}kg | {user.height}cm</td>
                      <td>
                        <span className={`status ${user.blocked ? 'blocked' : 'active'}`}>
                          {user.blocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className={user.blocked ? 'btn-unblock' : 'btn-del'} 
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.blocked ? 'Unblock' : 'Block'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-panel feedback-management">
            <h2 style={{ color: 'var(--accent-cyan)' }}>User Feedbacks & Messages</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((f, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 'bold' }}>{f.userName}</td>
                      <td>{f.userEmail}</td>
                      <td style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{f.userFeedback}</td>
                    </tr>
                  ))}
                  {feedbacks.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No feedback received yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .main-content { flex: 1; padding: 40px; position: relative; z-index: 1; }
        header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .admin-badge { background: var(--accent-cyan); color: #000; padding: 6px 16px; border-radius: 20px; font-weight: bold; font-size: 0.75rem; letter-spacing: 1px; }
        .glass-panel { background: var(--card-base); backdrop-filter: blur(20px); border-radius: 24px; padding: 30px; border: 1px solid var(--glass-border); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .table-wrap { overflow-x: auto; margin-top: 25px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { text-align: left; padding: 18px 15px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        th { color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; }
        tr:hover td { background: rgba(255, 255, 255, 0.02); }
        .status { padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
        .status.active { background: rgba(0, 242, 254, 0.1); color: var(--accent-cyan); }
        .status.blocked { background: rgba(255, 255, 255, 0.1); color: #ff6b6b; }
        .btn-del { background: none; border: 1px solid #ff6b6b; color: #ff6b6b; padding: 8px 15px; border-radius: 8px; cursor: pointer; transition: 0.3s; }
        .btn-del:hover { background: #ff6b6b; color: #fff; }
        .btn-unblock { background: none; border: 1px solid var(--accent-cyan); color: var(--accent-cyan); padding: 8px 15px; border-radius: 8px; cursor: pointer; transition: 0.3s; }
        .btn-unblock:hover { background: var(--accent-cyan); color: #000; }
      `}} />
    </div>
  );
};

export default Admin;
