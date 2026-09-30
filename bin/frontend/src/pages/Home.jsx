import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
      localStorage.setItem('currentUser', JSON.stringify(users[username]));
    } else {
      // Default fallback
      const defaultUser = { fullName: 'Test User', username: username || 'guest', age: 24, weight: 75, height: 180 };
      localStorage.setItem('currentUser', JSON.stringify(defaultUser));
    }
    
    navigate('/dashboard');
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      
      const middleX = window.innerWidth / 2;
      const middleY = window.innerHeight / 2;
      
      const offsetX = ((x - middleX) / middleX) * 15;
      const offsetY = ((y - middleY) / middleY) * 15;
      
      containerRef.current.style.transform = `rotateX(${-offsetY}deg) rotateY(${offsetX}deg)`;
    };

    const handleMouseLeave = () => {
      if (!containerRef.current) return;
      containerRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="page-wrapper home-page">
      <Navbar />
      <div className="ambient-overlay"></div>
      <div className="container" ref={containerRef}>
        <h1>REKHA'S FITNESS</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" required placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" required placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
        <div className="nav-links">
          New user? <Link to="/register">Create a profile</Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .home-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }
        .container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.2);
          animation: fadeIn 0.8s ease-out;
          -webkit-box-reflect: below 2px linear-gradient(transparent, rgba(255,255,255,0.1));
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
          will-change: transform;
        }
        h1 {
          text-align: center;
          margin-bottom: 40px;
          background: linear-gradient(to right, #00f2fe, #4facfe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 2.5rem;
        }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; font-weight: 600; }
        input {
          width: 100%; padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.05); color: #fff; font-size: 1rem; box-sizing: border-box;
        }
        .btn {
          width: 100%; padding: 15px; border: none; border-radius: 10px;
          background: linear-gradient(to right, #4facfe, #00f2fe);
          color: white; font-size: 1.2rem; font-weight: bold; cursor: pointer; transition: 0.3s;
          margin-top: 20px;
        }
        .btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,242,254,0.4); }
        .nav-links { text-align: center; margin-top: 25px; }
        .nav-links a { color: #00f2fe; text-decoration: none; font-weight: 600; }
      `}} />
    </div>
  );
};

export default Home;
