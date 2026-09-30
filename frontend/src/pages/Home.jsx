import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for Reveal on Scroll
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-wrapper">
      <Navbar />
      <div className="ambient-overlay"></div>
      
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content glass-panel reveal">
          <h1 className="hero-title" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
            FITNESS
          </h1>
          <p className="hero-tagline reveal">Unlock your potential with the next generation of fitness tracking.</p>
          
          <div className="hero-stats reveal">
            <div className="stat-pill">
              <span className="stat-val">500+</span>
              <span className="stat-label">Workouts</span>
            </div>
            <div className="stat-pill">
              <span className="stat-val">AI</span>
              <span className="stat-label">Insights</span>
            </div>
            <div className="stat-pill">
              <span className="stat-val">24/7</span>
              <span className="stat-label">Tracking</span>
            </div>
          </div>

          <div className="cta-group reveal">
            <button className="cta-primary" onClick={() => navigate('/register')}>Start Your Journey</button>
            <button className="cta-secondary" onClick={() => navigate('/login')}>Member Login</button>
          </div>
        </div>

        <div className="hero-visual" style={{ transform: `translateY(${-scrollY * 0.2}px)` }}>
          <div className="floating-card c1">
            <span className="icon">🔥</span>
            <div className="card-txt">
              <strong>Burn 500+</strong>
              <p>Calories Daily</p>
            </div>
          </div>
          <div className="floating-card c2">
            <span className="icon">💪</span>
            <div className="card-txt">
              <strong>Strength</strong>
              <p>New Personal Best</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2 className="section-title reveal">Why Choose FITNESS?</h2>
        <div className="features-grid">
          <div className="feature-card glass-panel reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="feature-image food-img"></div>
            <h3>Diet Plans</h3>
            <p>Get personalized nutrition strategies that adapt to your workout intensity.</p>
            <div className="sample-data diet-sample">
              <span>🍳 Eggs & Avocado</span>
              <span>🥗 Quinoa Salad</span>
              <span>🍗 Grilled Salmon</span>
            </div>
          </div>
          <div className="feature-card glass-panel reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="feature-icon">📊</div>
            <h3>Deep Analytics</h3>
            <p>Visualize your progress with high-definition charts and performance tracking.</p>
            <div className="sample-data stats-sample">
              <div className="mini-bar-chart">
                <div className="bar" style={{ height: '40%' }}></div>
                <div className="bar" style={{ height: '70%' }}></div>
                <div className="bar" style={{ height: '90%' }}></div>
              </div>
              <strong>+15% Efficiency</strong>
            </div>
          </div>
          <div className="feature-card glass-panel reveal" style={{ transitionDelay: '0.3s' }}>
            <div className="feature-icon">🎯</div>
            <h3>Goal Crushing</h3>
            <p>Set ambitious targets and let our system guide you step-by-step.</p>
            <div className="sample-data goal-sample">
              <div className="progress-wrap">
                <div className="progress-bar" style={{ width: '85%' }}></div>
              </div>
              <strong>85% to Target</strong>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND STORY SECTION */}
      <section className="about-brand-section">
        <div className="brand-card glass-panel reveal">
          <div className="brand-badge">THE LEGACY</div>
          <h2>Redefining Fitness for the Modern Age</h2>
          <p>FITNESS was born from a simple vision: to bridge the gap between high-end professional coaching and daily lifestyle tracking. We don't just count steps; we empower journeys. Our platform combines aesthetic excellence with mathematical precision to help you rewrite your story.</p>
          <div className="brand-values">
            <div className="value-item">
              <span className="v-icon">💎</span>
              <strong>Premium Quality</strong>
            </div>
            <div className="value-item">
              <span className="v-icon">⚡</span>
              <strong>Instant Results</strong>
            </div>
            <div className="value-item">
              <span className="v-icon">🌍</span>
              <strong>Global Community</strong>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSFORMATION SECTION */}
      <section className="transformation-section">
        <div className="transformation-content glass-panel reveal">
          <div className="trans-text">
            <h2>Track Every Transformation</h2>
            <p>Our immersive dashboard keeps you motivated by showing you exactly how far you've come. From calorie burns to goal milestones, your journey is beautiful.</p>
            <button className="cta-primary" onClick={() => navigate('/register')} style={{ marginTop: '20px' }}>Join the Movement</button>
          </div>
          <div className="trans-image">
            <div className="image-stack" style={{ transform: `rotate(${-scrollY * 0.02}deg)` }}>
              <div className="stack-item s1"></div>
              <div className="stack-item s2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer reveal">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>FITNESS</h3>
            <p>Your ultimate fitness companion.</p>
          </div>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 FITNESS. All rights reserved.</p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        .landing-wrapper { width: 100%; overflow-x: hidden; }
        
        /* Reveal Animation Styles */
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .reveal-visible { opacity: 1; transform: translateY(0); }

        section { padding: 100px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        
        /* HERO */
        .hero-section { min-height: 100vh; display: grid; grid-template-columns: 1.2fr 1fr; gap: 50px; max-width: 1200px; margin: 0 auto; position: relative; }
        .hero-content { padding: 60px !important; text-align: left; background: rgba(10, 15, 25, 0.4) !important; position: relative; z-index: 5; }
        .hero-title { font-size: 5rem; margin: 0; line-height: 1; font-weight: 900; letter-spacing: -2px; transition: transform 0.1s ease-out; }
        .hero-tagline { font-size: 1.2rem; color: var(--text-muted); margin: 20px 0 40px; }
        
        .hero-stats { display: flex; gap: 30px; margin-bottom: 50px; }
        .stat-pill { display: flex; flex-direction: column; }
        .stat-val { font-size: 1.8rem; font-weight: 800; color: var(--accent-cyan); }
        .stat-label { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
        
        .cta-group { display: flex; gap: 20px; }
        .cta-primary { padding: 18px 40px; font-size: 1.1rem; box-shadow: 0 10px 30px rgba(0, 242, 254, 0.3); }
        .cta-secondary { padding: 18px 40px; font-size: 1.1rem; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); color: #fff; }

        .hero-visual { position: relative; height: 500px; transition: transform 0.1s ease-out; }
        .floating-card { position: absolute; background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border: 1px solid var(--glass-border); padding: 20px; border-radius: 20px; display: flex; align-items: center; gap: 15px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); animation: float 4s ease-in-out infinite; }
        .c1 { top: 20%; right: 10%; animation-delay: 0s; }
        .c2 { bottom: 20%; left: 0%; animation-delay: 1s; }

        /* FEATURES */
        .section-title { font-size: 3.5rem; margin-bottom: 60px; text-align: center; font-weight: 800; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; max-width: 1200px; width: 100%; }
        .feature-card { padding: 40px !important; text-align: center; transition: 0.5s ease; cursor: default; }
        .feature-card:hover { transform: scale(1.05) translateY(-10px); border-color: var(--accent-cyan); background: rgba(0, 242, 254, 0.05); }
        .feature-icon { font-size: 3.5rem; margin-bottom: 20px; display: block; filter: drop-shadow(0 0 10px var(--accent-cyan)); }
        
        .feature-image {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          border-radius: 20px;
          background-size: cover;
          background-position: center;
          border: 2px solid var(--accent-cyan);
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.3);
        }
        .food-img { background-image: url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200'); }

        .feature-card h3 { color: var(--accent-cyan); font-size: 1.6rem; margin-bottom: 15px; }
        
        .sample-data {
          margin-top: 25px;
          padding: 15px;
          background: rgba(0,0,0,0.2);
          border-radius: 15px;
          font-size: 0.85rem;
          text-align: left;
        }
        
        .diet-sample { display: flex; flex-direction: column; gap: 8px; }
        .diet-sample span { border-left: 2px solid var(--accent-cyan); padding-left: 10px; }

        .stats-sample { display: flex; align-items: center; gap: 15px; }
        .mini-bar-chart { display: flex; align-items: flex-end; gap: 4px; height: 30px; }
        .mini-bar-chart .bar { width: 6px; background: var(--accent-cyan); border-radius: 2px; }
        .stats-sample strong { color: var(--accent-cyan); }

        .goal-sample { display: flex; flex-direction: column; gap: 10px; }
        .progress-wrap { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
        .progress-bar { height: 100%; background: var(--accent-cyan); box-shadow: 0 0 10px var(--accent-cyan); }

        /* BRAND STORY */
        .about-brand-section { background: rgba(255,255,255,0.02); }
        .brand-card { max-width: 900px; width: 100%; text-align: center; padding: 80px !important; }
        .brand-badge { display: inline-block; padding: 8px 20px; background: var(--accent-cyan); color: #000; border-radius: 50px; font-weight: 800; font-size: 0.8rem; margin-bottom: 25px; }
        .brand-card h2 { font-size: 3rem; margin-bottom: 20px; }
        .brand-card p { font-size: 1.1rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 40px; }
        .brand-values { display: flex; justify-content: center; gap: 40px; border-top: 1px solid var(--glass-border); padding-top: 40px; }
        .value-item { display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .v-icon { font-size: 2rem; }
        .value-item strong { color: #fff; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }

        /* TRANSFORMATION */
        .transformation-content { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; max-width: 1100px; width: 100%; align-items: center; padding: 60px !important; }
        .image-stack { position: relative; height: 350px; transition: transform 0.1s ease-out; }
        .stack-item { position: absolute; width: 85%; height: 250px; border-radius: 24px; border: 2px solid var(--accent-cyan); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        .s1 { background: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000') center/cover; top: 0; left: 0; z-index: 2; }
        .s2 { background: url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1000') center/cover; bottom: 0; right: 0; opacity: 0.4; transform: scale(0.9); }

        /* FOOTER */
        .landing-footer { background: rgba(0,0,0,0.4); padding: 80px 20px 40px; width: 100%; margin-top: 100px; border-top: 1px solid var(--glass-border); }
        .footer-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 60px; }
        .footer-links { display: flex; gap: 40px; }
        .footer-links a { color: var(--text-muted); text-decoration: none; transition: 0.3s; font-weight: 500; font-size: 1.1rem; }
        .footer-links a:hover { color: var(--accent-cyan); text-shadow: 0 0 10px var(--accent-cyan); }
        .footer-bottom { text-align: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 30px; color: var(--text-muted); font-size: 1rem; }

        @media (max-width: 1024px) {
          .hero-section, .features-grid, .transformation-content, .footer-content { grid-template-columns: 1fr; text-align: center; }
          .hero-stats { justify-content: center; }
          .cta-group { justify-content: center; }
          .hero-visual { display: none; }
          .footer-links { flex-direction: column; align-items: center; gap: 20px; }
          .hero-title { font-size: 3.5rem; }
        }
      `}} />
    </div>
  );
};

export default Home;
