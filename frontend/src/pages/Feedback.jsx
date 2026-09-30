import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Feedback = () => {
  const [rating, setRating] = useState('Excellent');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const formData = new FormData(e.target);
    
    const feedbackData = {
      userName: storedUser.name || 'User',
      userEmail: formData.get('email'),
      userFeedback: `[Rating: ${rating}] ${formData.get('comments')}`
    };

    try {
      const response = await fetch('http://localhost:9089/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData)
      });

      if (response.ok) {
        alert('Thank you! Your feedback has been submitted.');
        e.target.reset();
        setRating('Excellent');
      } else {
        alert('Failed to submit feedback.');
      }
    } catch (error) {
      alert('Backend server unreachable.');
    }
  };

  const ratingOptions = [
    { label: 'Excellent', color: '#00f2fe' },
    { label: 'Good', color: '#3b82f6' },
    { label: 'Average', color: '#f59e0b' },
    { label: 'Poor', color: '#ef4444' }
  ];

  return (
    <div className="page-layout">
      <Sidebar />
      <main className="main-content">
        <div className="glass-panel" style={{ maxWidth: '600px' }}>
          <h1>User Feedback</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Tell us about your fitness experience.</p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '15px' }}>Experience Rating</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {ratingOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setRating(opt.label)}
                    style={{
                      flex: 1,
                      minWidth: '100px',
                      background: rating === opt.label ? opt.color : 'rgba(255,255,255,0.05)',
                      color: rating === opt.label ? '#000' : '#fff',
                      border: `1px solid ${opt.color}`,
                      padding: '12px',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      transition: '0.3s',
                      transform: rating === opt.label ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: rating === opt.label ? `0 0 15px ${opt.color}66` : 'none'
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
              <input type="email" name="email" required placeholder="your@email.com" />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Detailed Comments</label>
              <textarea name="comments" rows="6" placeholder="Your thoughts here..." style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}></textarea>
            </div>
            <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Submit Feedback</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
