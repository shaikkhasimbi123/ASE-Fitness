import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="main-header">
      <nav>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/register">Register</Link>
        <Link to="/admin-login"><i className="fas fa-lock"></i> Admin</Link>
      </nav>
      <style dangerouslySetInnerHTML={{ __html: `
        .main-header {
          width: 100%;
          padding: 20px;
          text-align: center;
          background: rgba(0,0,0,0.5);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }
        .main-header nav a {
          color: #00f2fe;
          margin: 0 20px;
          text-decoration: none;
          font-weight: bold;
          transition: 0.3s;
        }
        .main-header nav a:hover {
          text-shadow: 0 0 10px rgba(0,242,254,0.6);
        }
      `}} />
    </header>
  );
};

export default Navbar;
