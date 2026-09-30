import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div className="page-wrapper about-page">
      <Navbar />
      <div className="ambient-overlay"></div>
      <div className="content-card">
        <h1>About Rekha's Fitness</h1>
        <p>Your journey to a healthier, stronger you starts here. We combine cutting-edge technology with fitness expertise to help you achieve your goals.</p>
        <div className="mission-grid">
          <div className="mission-item">
            <h3>Our Mission</h3>
            <p>Empowering individuals through personalized fitness tracking and AI-driven insights.</p>
          </div>
          <div className="mission-item">
            <h3>Our Tech</h3>
            <p>Utilizing modern web technologies to provide a seamless and immersive user experience.</p>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .about-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
        }
        .content-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 50px;
          max-width: 800px;
          width: 100%;
          animation: fadeIn 0.8s ease-out;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          background: linear-gradient(to right, #00f2fe, #4facfe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p { line-height: 1.6; color: var(--text-muted); font-size: 1.1rem; }
        .mission-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-top: 40px;
        }
        .mission-item h3 { color: var(--accent-cyan); margin-bottom: 10px; }
      `}} />
    </div>
  );
};

export default About;
