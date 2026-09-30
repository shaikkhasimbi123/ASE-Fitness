import React from 'react';
import Navbar from '../components/Navbar';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    e.target.reset();
  };
  return (
    <div className="page-wrapper contact-page">
      <Navbar />
      <div className="ambient-overlay"></div>
      <div className="content-card">
        <h1>Get in Touch</h1>
        <p>Have questions? We'd love to hear from you.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="How can we help?" rows="4" required></textarea>
          </div>
          <button type="submit" className="btn-act">Send Message</button>
        </form>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .contact-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
        }
        .content-card {
          background: var(--card-base);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 40px;
          max-width: 500px;
          width: 100%;
        }
        h1 { margin-bottom: 20px; color: var(--accent-cyan); }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; color: var(--text-muted); }
        input, textarea {
          width: 100%; padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05); color: #fff; font-size: 1rem;
        }
        .btn-act {
          width: 100%; padding: 15px; border: none; border-radius: 10px;
          background: linear-gradient(to right, #00f2fe, #4facfe);
          color: #000; font-weight: bold; cursor: pointer; transition: 0.3s;
        }
      `}} />
    </div>
  );
};

export default Contact;
