import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Contact = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user) {
        setCurrentUser(user);
        setCurrentUser(user);
      }
    } catch (e) {
      console.error("Failed to parse user session", e);
    }
  }, []);


  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = ((clientX - innerWidth / 2) / (innerWidth / 2)) * 10;
    const y = ((clientY - innerHeight / 2) / (innerHeight / 2)) * 10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="page-wrapper contact-page" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <Navbar />
      <div className="ambient-overlay" style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
      
      <div className="contact-container" style={{
        transform: `rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`,
        transition: 'transform 0.1s ease-out',
        zIndex: 10
      }}>
        <div className="glass-panel main-panel">
            <>
              <h1>CONNECT WITH US</h1>
              
              <div className="contact-display-grid">
                <div className="contact-card-premium">
                  <div className="card-inner">
                    <span className="icon">📧</span>
                    <h3>Official Email</h3>
                    <p className="contact-val">fitness123@gmail.com</p>
                    <span className="card-tag">24/7 Support</span>
                  </div>
                </div>

                <div className="contact-card-premium">
                  <div className="card-inner">
                    <span className="icon">📞</span>
                    <h3>Direct Line</h3>
                    <p className="contact-val">+91 98765 43210</p>
                    <span className="card-tag">Mon-Sat (9AM-6PM)</span>
                  </div>
                </div>

                <div className="contact-card-premium">
                  <div className="card-inner">
                    <span className="icon">📍</span>
                    <h3>Our Studio</h3>
                    <p className="contact-val">Vijayawada, Andhra Pradesh</p>
                    <span className="card-tag">Visit Us</span>
                  </div>
                </div>

                <div className="contact-card-premium">
                  <div className="card-inner">
                    <span className="icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </span>
                    <h3>Instagram</h3>
                    <p className="contact-val">@fitness_official</p>
                    <span className="card-tag">Follow Our Journey</span>
                  </div>
                </div>
              </div>

              <div className="contact-footer-note">
                <p>We believe in direct human connection. Reach out to any of our channels above for immediate assistance.</p>
              </div>
            </>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .diet-page-bg { 
          background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/bluish_black_gym.png');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          min-height: 100vh;
        }
        
        .contact-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
          padding: 80px 20px;
          overflow: hidden;
        }
        .contact-container {
          width: 100%;
          max-width: 900px;
          transform-style: preserve-3d;
        }
        .main-panel {
          background: var(--card-base);
          backdrop-filter: blur(30px);
          border: 1px solid var(--glass-border);
          border-radius: 32px;
          padding: 60px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
          text-align: center;
        }
        h1 { font-size: 3rem; margin-bottom: 50px; background: linear-gradient(to right, var(--accent-cyan), var(--accent-blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 900; letter-spacing: 2px; }
        
        .contact-display-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
        }
        .contact-card-premium {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 40px 20px;
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .contact-card-premium:hover {
          background: rgba(0,242,254,0.05);
          transform: translateY(-10px) scale(1.02);
          border-color: var(--accent-cyan);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .card-inner { position: relative; z-index: 1; }
        .icon { font-size: 3rem; display: block; margin-bottom: 20px; filter: drop-shadow(0 0 10px rgba(0,242,254,0.5)); }
        .contact-card-premium h3 { margin: 0; font-size: 1.2rem; color: #fff; margin-bottom: 10px; opacity: 0.8; }
        .contact-val { margin: 0; font-size: 1.1rem; font-weight: 700; color: var(--accent-cyan); word-break: break-all; }
        .card-tag { 
          display: inline-block; margin-top: 15px; font-size: 0.7rem; font-weight: 900; 
          text-transform: uppercase; letter-spacing: 2px; color: var(--text-muted);
          background: rgba(255,255,255,0.05); padding: 5px 15px; border-radius: 50px;
        }

        .contact-footer-note {
          padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.05);
          color: var(--text-muted); font-size: 1rem; line-height: 1.6; max-width: 600px; margin: 0 auto;
        }
        
        .success-message { text-align: center; padding: 40px 0; animation: fadeIn 0.5s; }
        .check-icon { width: 80px; height: 80px; background: var(--accent-cyan); color: #000; border-radius: 50%; font-size: 3rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 0 30px rgba(0,242,254,0.5); }
        
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}} />
    </div>
  );
};

export default Contact;
