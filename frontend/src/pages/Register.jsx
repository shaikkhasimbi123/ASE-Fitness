import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Register = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // We send as Multipart to the backend
    try {
      const response = await fetch('http://localhost:9089/api/register', {
        method: 'POST',
        body: formData // Fetch automatically sets Content-Type to multipart/form-data
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        alert('Welcome! Your profile has been created.');
        navigate('/dashboard');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      alert('Server error. Make sure Spring Boot is running and supports Multipart registration.');
    }
  };

  return (
    <div className="register-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px' }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '650px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Create Your Profile</h1>
          <form onSubmit={handleRegister} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                border: '3px solid var(--accent-cyan)', 
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                {preview ? (
                  <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.2)' }}>👤</span>
                )}
              </div>
              <label className="btn-act" style={{ cursor: 'pointer', padding: '8px 20px', fontSize: '0.9rem' }}>
                Upload Profile Photo
                <input type="file" name="image" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
              </label>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label>Full Name</label>
              <input type="text" name="name" required placeholder="John Doe" />
            </div>
            <div>
              <label>Username</label>
              <input type="text" name="username" required placeholder="Enter a unique username" />
            </div>
            <div>
              <label>Password</label>
              <input type="password" name="password" required placeholder="••••••••" />
            </div>
            <div>
              <label>Age</label>
              <input type="number" name="age" required placeholder="25" />
            </div>
            <div>
              <label>Gender</label>
              <select name="gender" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label>Height (cm)</label>
              <input type="number" step="0.1" name="height" required placeholder="175" />
            </div>
            <div>
              <label>Weight (kg)</label>
              <input type="number" step="0.1" name="weight" required placeholder="70" />
            </div>
            <button type="submit" style={{ gridColumn: 'span 2', marginTop: '20px', padding: '15px' }}>Join the Fitness Revolution</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '30px', color: 'var(--text-muted)' }}>
            Already a member? <Link to="/login" style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
