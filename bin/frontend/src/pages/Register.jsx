import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
      fullName: formData.get('fullName'),
      username: formData.get('username'),
      age: Number(formData.get('age')),
      weight: Number(formData.get('weight')),
      height: Number(formData.get('height')),
    };
    
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    users[user.username] = user;
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registration successful! Please login.');
    navigate('/');
  };

  return (
    <div className="page-wrapper register-page">
      <Navbar />
      <div className="ambient-overlay"></div>
      <div className="container">
        <h1>Create Profile</h1>
        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" required />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" name="username" required />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Age</label>
              <input type="number" name="age" required />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="number" name="weight" required />
            </div>
            <div className="form-group">
              <label>Height (cm)</label>
              <input type="number" name="height" required />
            </div>
          </div>
          <button type="submit" className="btn-act">Register Now</button>
        </form>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .register-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 20px;
        }
        .container {
          background: var(--card-base);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 40px;
          max-width: 600px;
          width: 100%;
        }
        h1 { text-align: center; margin-bottom: 30px; color: var(--accent-cyan); }
        .form-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; color: var(--text-muted); font-size: 0.9rem; }
        input {
          width: 100%; padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05); color: #fff;
        }
        .btn-act {
          width: 100%; padding: 15px; border: none; border-radius: 10px;
          background: linear-gradient(to right, #00f2fe, #4facfe);
          color: #000; font-weight: bold; cursor: pointer; margin-top: 10px;
        }
      `}} />
    </div>
  );
};

export default Register;
