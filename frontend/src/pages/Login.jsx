import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await fetch('http://localhost:9089/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        alert(data.message || 'Invalid Credentials');
      }
    } catch (error) {
      alert('Server error. Make sure Spring Boot is running.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', color: '#fff' }}>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div className="glass-panel" style={{ width: '400px' }}>
          <h1 style={{ textAlign: 'center', color: 'var(--accent-cyan)', fontSize: '2rem', marginBottom: '10px' }}>Ctrl+Alt+Elite Fitness</h1>
          <h2 style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', marginBottom: '30px' }}>Login</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '15px' }}>
              <label>Username</label>
              <input type="text" name="username" required />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label>Password</label>
              <input type="password" name="password" required />
            </div>
            <button type="submit" style={{ width: '100%' }}>Login</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '15px' }}>
            New user? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
