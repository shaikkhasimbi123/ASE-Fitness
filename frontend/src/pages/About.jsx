import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div className="page-wrapper about-page">
      <Navbar />
      <div className="ambient-overlay"></div>
      
      <div className="glass-panel about-container">
        <header className="about-header">
          <h1>FITNESS</h1>
          <p className="subtitle">Empowering your evolution through data-driven fitness.</p>
        </header>

        <div className="about-sections">
          {/* Section 1: Philosophy + Facility Image */}
          <section className="narrative-section">
            <div className="narrative-text">
              <h2>Our Philosophy</h2>
              <p>At <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>FITNESS</span>, we believe that health is your greatest wealth. Our platform is more than just a tracker; it's your personal companion in the journey towards a stronger, more vibrant version of yourself.</p>
              <div className="accent-line"></div>
            </div>
            <div className="narrative-image">
              <div className="img-frame">
                <img src="/images/about/gym_1.png" alt="Premium Gym Interior" />
                <div className="narrative-badge">State-of-the-Art Facility</div>
              </div>
            </div>
          </section>

          {/* Section 2: Training Image + Mission */}
          <section className="narrative-section reverse">
            <div className="narrative-image">
              <div className="img-frame">
                <img src="/images/about/gym_2.png" alt="Fitness Training" />
                <div className="narrative-badge">Expert Coaching</div>
              </div>
            </div>
            <div className="narrative-text">
              <h2>Data-Driven Success</h2>
              <div className="mini-grid">
                <div className="mini-item">
                  <h3>Why Fitness Matters</h3>
                  <p>Regular physical activity boosts energy, mental clarity, and body strength. We help you stay consistent.</p>
                </div>
                <div className="mini-item">
                  <h3>Personalized Journey</h3>
                  <p>No two bodies are the same. We provide tailored insights that adapt to your progress and goals.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="quote-box">
          <p>"Your only limit is you. Start tracking your progress today and watch yourself evolve into the best version of YOU."</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .about-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 20px;
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/about/gym_1.png');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        .about-container {
          background: var(--card-base);
          backdrop-filter: blur(40px);
          border: 1px solid var(--glass-border);
          border-radius: 40px;
          padding: 80px 60px;
          max-width: 1200px;
          width: 100%;
          animation: fadeIn 1s ease-out;
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
        }
        .about-header { text-align: center; margin-bottom: 100px; }
        .about-header h1 { 
          font-size: 4rem; margin-bottom: 10px; font-weight: 900; letter-spacing: -1px;
          background: linear-gradient(to right, #fff, var(--accent-cyan));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .subtitle { font-size: 1.3rem; opacity: 0.6; letter-spacing: 2px; text-transform: uppercase; }
        
        .about-sections { display: flex; flex-direction: column; gap: 120px; }
        
        .narrative-section { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 80px; align-items: center; }
        .narrative-section.reverse { grid-template-columns: 0.9fr 1.1fr; }
        
        .narrative-text h2 { font-size: 2.8rem; color: #fff; margin-bottom: 25px; font-weight: 800; }
        .narrative-text p { line-height: 1.8; color: var(--text-muted); font-size: 1.15rem; }
        .accent-line { width: 60px; height: 4px; background: var(--accent-cyan); margin-top: 30px; border-radius: 2px; }
        
        .mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 40px; }
        .mini-item { 
          padding: 25px; border-radius: 20px; background: rgba(255,255,255,0.03); 
          border: 1px solid rgba(255,255,255,0.05); transition: 0.3s;
        }
        .mini-item:hover { background: rgba(0,242,254,0.05); border-color: var(--accent-cyan); transform: translateY(-5px); }
        .mini-item h3 { font-size: 1.1rem; color: var(--accent-cyan); margin-bottom: 12px; }
        .mini-item p { font-size: 0.95rem; line-height: 1.6; margin: 0; }

        .narrative-image { position: relative; }
        .img-frame { 
          position: relative; border-radius: 35px; overflow: hidden; 
          border: 1px solid rgba(255,255,255,0.1); transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
          aspect-ratio: 1/1;
        }
        .img-frame img { width: 100%; height: 100%; object-fit: cover; transition: 1s; }
        .narrative-section:hover .img-frame img { transform: scale(1.1); }
        .narrative-section:hover .img-frame { border-color: var(--accent-cyan); transform: translateY(-10px); }
        
        .narrative-badge {
          position: absolute; bottom: 30px; left: 30px; background: rgba(0,0,0,0.8); 
          backdrop-filter: blur(15px); padding: 10px 25px; border-radius: 50px; 
          font-size: 0.8rem; font-weight: 900; color: #fff; letter-spacing: 2px;
          border: 1px solid rgba(255,255,255,0.2); text-transform: uppercase;
        }

        .quote-box {
          margin-top: 120px; padding: 50px; border-radius: 30px; background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05); text-align: center; position: relative;
        }
        .quote-box p { margin: 0; font-style: italic; color: #fff; font-size: 1.4rem; opacity: 0.9; line-height: 1.5; }
        .quote-box::before { content: '"'; position: absolute; top: 10px; left: 50%; transform: translateX(-50%); font-size: 5rem; color: var(--accent-cyan); opacity: 0.2; font-family: serif; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 1100px) {
          .narrative-section, .narrative-section.reverse { grid-template-columns: 1fr; gap: 50px; text-align: center; }
          .narrative-section.reverse .narrative-image { order: 2; }
          .accent-line { margin: 30px auto 0; }
          .img-frame { aspect-ratio: 16/9; }
        }
      `}} />
    </div>
  );
};

export default About;
