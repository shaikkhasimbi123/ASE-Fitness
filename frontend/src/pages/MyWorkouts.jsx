import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const MyWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [currentUser] = useState(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch(`http://localhost:9089/api/workouts/${currentUser.id}`);
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error('Failed to fetch workouts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser.id) fetchWorkouts();
  }, [currentUser.id]);

  const getAgeTheme = (age) => {
    if (!age) return 'var(--accent-cyan)';
    if (age < 20) return '#ff00ff'; // Vibrant Magenta for Youth
    if (age <= 45) return 'var(--accent-cyan)'; // Pro Cyan for Adults
    return '#00ff88'; // Soothing Emerald for Seniors
  };

  const themeColor = getAgeTheme(currentUser.age);

  const seedSampleData = async () => {
    const samples = [
      { type: 'Strength', durationMinutes: 45, caloriesBurned: 350, workoutDate: '2026-05-10' },
      { type: 'Cardio', durationMinutes: 30, caloriesBurned: 400, workoutDate: '2026-05-11' },
      { type: 'Yoga', durationMinutes: 60, caloriesBurned: 150, workoutDate: '2026-05-12' }
    ];

    try {
      for (const s of samples) {
        await fetch(`http://localhost:9089/api/workout/${currentUser.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(s)
        });
      }
      fetchWorkouts();
    } catch (e) {
      console.error("Failed to seed data");
    }
  };

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const workoutData = {
      type: formData.get('type'),
      durationMinutes: parseInt(formData.get('durationMinutes')),
      caloriesBurned: parseInt(formData.get('caloriesBurned')),
      workoutDate: formData.get('date')
    };

    try {
      const response = await fetch(`http://localhost:9089/api/workout/${currentUser.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData)
      });
      if (response.ok) {
        setShowForm(false);
        fetchWorkouts();
      }
    } catch (error) {
      alert('Error logging workout');
    }
  };

  const totalCalories = workouts.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);
  const avgDuration = workouts.length > 0 ? Math.round(workouts.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0) / workouts.length) : 0;

  return (
    <div className="page-layout workout-page-bg" style={{ '--age-accent': themeColor }}>
      <Sidebar />
      <main className="main-content">
        <header className="workout-header">
          <div className="header-text">
            <h1>Activity Log</h1>
            <p>Track your consistency. View your progress history below.</p>
            <div className="age-badge" style={{ color: themeColor }}>Age: {currentUser.age || 'N/A'} - Personalized View</div>
          </div>
          <button className="add-workout-btn" onClick={() => setShowForm(true)} style={{ background: themeColor }}>+ Log Workout</button>
        </header>

        {/* SUMMARY INSIGHTS */}
        <div className="workout-insights">
          <div className="glass-panel insight-card">
            <span className="i-label">SESSIONS</span>
            <span className="i-value">{workouts.length}</span>
          </div>
          <div className="glass-panel insight-card highlight" style={{ borderColor: themeColor }}>
            <span className="i-label">AVG TIME</span>
            <span className="i-value">{avgDuration} <span>min</span></span>
          </div>
          <div className="glass-panel insight-card">
            <span className="i-label">TOTAL BURN</span>
            <span className="i-value">{totalCalories} <span>kcal</span></span>
          </div>
        </div>

        {/* LOG FORM OVERLAY */}
        {showForm && (
          <div className="form-overlay" onClick={() => setShowForm(false)}>
            <div className="glass-panel form-modal" onClick={e => e.stopPropagation()}>
              <h2>New Training Session</h2>
              <form onSubmit={handleAddWorkout}>
                <div className="input-group">
                  <label>Activity Type</label>
                  <select name="type" required style={{ background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '12px' }}>
                    <option value="" disabled selected style={{ background: '#222' }}>Select activity</option>
                    <option value="Strength Training" style={{ background: '#ff4b2b', color: '#fff' }}>🔥 Strength Training</option>
                    <option value="Running (Cardio)" style={{ background: '#00d2ff', color: '#fff' }}>🏃 Running (Cardio)</option>
                    <option value="Cycling" style={{ background: '#3a7bd5', color: '#fff' }}>🚴 Cycling</option>
                    <option value="Yoga & Stretching" style={{ background: '#00ff88', color: '#000' }}>🧘 Yoga & Stretching</option>
                    <option value="Swimming" style={{ background: '#4facfe', color: '#fff' }}>🏊 Swimming</option>
                    <option value="HIIT Workout" style={{ background: '#f093fb', color: '#fff' }}>⚡ HIIT Workout</option>
                  </select>
                </div>
                <div className="grid-2">
                  <div className="input-group">
                    <label>Duration (min)</label>
                    <input type="number" name="durationMinutes" required />
                  </div>
                  <div className="input-group">
                    <label>Calories</label>
                    <input type="number" name="caloriesBurned" required />
                  </div>
                </div>
                <div className="input-group">
                  <label>Date</label>
                  <input type="date" name="date" required />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn-save">Save Log</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="workout-list-container">
          {loading ? (
            <div className="loading-state">Accessing encrypted training logs...</div>
          ) : workouts.length > 0 ? (
            <div className="workout-grid">
              {workouts.map((w, index) => (
                <div key={w.id || index} className="glass-panel workout-card">
                  <div className="card-top">
                    <span className={`type-tag ${w.type?.toLowerCase().includes('run') ? 'cardio' : 'strength'}`}>
                      {w.type}
                    </span>
                    <span className="date-text">{w.workoutDate}</span>
                  </div>
                  <div className="card-body">
                    <h3>{w.type} Training</h3>
                    <div className="card-metrics">
                      <div className="metric">
                        <span className="m-icon">🕒</span>
                        <span className="m-val">{w.durationMinutes} min</span>
                      </div>
                      <div className="metric">
                        <span className="m-icon">🔥</span>
                        <span className="m-val">{w.caloriesBurned} kcal</span>
                      </div>
                    </div>
                  </div>
                  <div className="intensity-meter">
                    <div className="meter-fill" style={{ width: '80%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state glass-panel">
              <span className="e-icon">📊</span>
              <h3>No activity recorded.</h3>
              <p>Your journey starts with the first log. Get started today!</p>
              <button className="add-workout-btn" onClick={seedSampleData} style={{ marginTop: '20px', background: 'rgba(255,255,255,0.05)', color: 'var(--accent-cyan)' }}>
                Seed Sample Workouts
              </button>
            </div>
          )}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .workout-page-bg { 
          background: linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/high_clarity_workout_bg_1778551364423.png');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          min-height: 100vh;
        }
        .workout-list-container { padding-bottom: 200px; }
        .workout-card {
          -webkit-box-reflect: below 2px linear-gradient(transparent, rgba(255,255,255,0.05));
        }
        .workout-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; position: relative; z-index: 1; }
        .header-text h1 { font-size: 3rem; margin-bottom: 5px; }
        .header-text p { color: var(--text-muted); font-size: 1.1rem; }
        
        .add-workout-btn { 
          background: var(--accent-cyan); color: #000; font-weight: 800; border-radius: 50px; 
          padding: 12px 30px; box-shadow: 0 10px 20px rgba(0, 242, 254, 0.2); 
        }

        .workout-insights { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .insight-card { padding: 25px !important; display: flex; flex-direction: column; gap: 5px; }
        .insight-card.highlight { border-color: var(--accent-cyan); background: rgba(0, 242, 254, 0.05); }
        .i-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 800; letter-spacing: 1px; }
        .i-value { font-size: 2rem; font-weight: 700; color: #fff; }
        .i-value span { font-size: 0.9rem; color: var(--text-muted); }

        .workout-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px; }
        .workout-card { padding: 25px !important; transition: 0.4s; }
        .workout-card:hover { transform: translateY(-10px); border-color: var(--accent-cyan); }
        
        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .type-tag { padding: 4px 12px; border-radius: 20px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); }
        .type-tag.strength { color: #ff6b6b; border-color: #ff6b6b; }
        .type-tag.cardio { color: #4facfe; border-color: #4facfe; }
        .date-text { font-size: 0.75rem; color: var(--text-muted); }

        .card-body h3 { margin-bottom: 15px; font-size: 1.2rem; color: var(--accent-cyan); }
        .card-metrics { display: flex; gap: 20px; }
        .metric { display: flex; align-items: center; gap: 8px; }
        .m-icon { font-size: 1.1rem; }
        .m-val { font-size: 0.95rem; font-weight: 600; }

        .intensity-meter { margin-top: 20px; height: 3px; background: rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden; }
        .meter-fill { height: 100%; background: var(--accent-cyan); box-shadow: 0 0 10px var(--accent-cyan); }

        /* FORM MODAL */
        .form-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); }
        .form-modal { width: 100%; max-width: 450px; padding: 40px !important; animation: modalIn 0.3s ease-out; }
        .form-modal h2 { margin-bottom: 30px; text-align: center; color: var(--accent-cyan); }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-actions { display: flex; gap: 15px; margin-top: 30px; }
        .btn-cancel { flex: 1; background: rgba(255,255,255,0.05); }
        .btn-save { flex: 2; background: var(--accent-cyan); color: #000; font-weight: 800; }

        @keyframes modalIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .loading-state { text-align: center; padding: 100px; color: var(--accent-cyan); font-weight: bold; letter-spacing: 2px; }
      `}} />
    </div>
  );
};

export default MyWorkouts;
