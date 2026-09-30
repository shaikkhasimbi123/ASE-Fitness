import React from 'react';
import Sidebar from '../components/Sidebar';

const Feedback = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Feedback submitted successfully!');
    e.target.reset();
  };
  return (
    <div className="feedback-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main className="main-content">
        <div className="ambient-overlay"></div>
        <header>
          <h1>User Feedback</h1>
        </header>
        <div className="container">
          <div className="glass-panel">
            <p>Your feedback helps us improve our AI algorithms and training protocols.</p>
            <form className="feedback-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Rating</label>
                <select>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Average</option>
                  <option>Poor</option>
                </select>
              </div>
              <div className="form-group">
                <label>Comments</label>
                <textarea rows="5" placeholder="Tell us about your experience..."></textarea>
              </div>
              <button type="submit" className="btn-act">Submit Feedback</button>
            </form>
          </div>
        </div>
      </main>
      <style dangerouslySetInnerHTML={{ __html: `
        .main-content { flex: 1; padding: 40px; display: flex; flex-direction: column; }
        .container { max-width: 600px; margin: 40px 0; }
        .glass-panel { background: var(--card-base); padding: 30px; border-radius: 20px; border: 1px solid var(--border-light); }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; color: var(--text-muted); }
        select, textarea {
          width: 100%; padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1); color: #fff;
        }
        .btn-act {
          width: 100%; padding: 15px; border: none; border-radius: 10px;
          background: linear-gradient(to right, #00f2fe, #4facfe);
          color: #000; font-weight: bold; cursor: pointer; transition: 0.3s; margin-top: 10px;
        }
      `}} />
    </div>
  );
};

export default Feedback;
