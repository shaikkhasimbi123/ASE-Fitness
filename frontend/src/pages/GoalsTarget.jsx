import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const GoalsTarget = () => {
  const [goals, setGoals] = useState([]);
  const [currentUser] = useState(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      const response = await fetch(`http://localhost:9089/api/goals/${currentUser.id}`);
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error('Failed to fetch goals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser.id) fetchGoals();
  }, [currentUser.id]);

  const getAgeTheme = (age) => {
    if (!age) return 'var(--accent-cyan)';
    if (age < 20) return '#ff00ff'; // Youth
    if (age <= 45) return 'var(--accent-cyan)'; // Adult
    return '#00ff88'; // Senior
  };

  const themeColor = getAgeTheme(currentUser.age);

  const handleSetGoal = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const goalData = {
      description: `${formData.get('goalName')} - ${formData.get('targetValue')}`,
      targetDate: formData.get('targetDate'),
      achieved: false
    };

    try {
      const response = await fetch(`http://localhost:9089/api/goal/${currentUser.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goalData)
      });
      if (response.ok) {
        alert('Mission Accepted. Target Acquired.');
        e.target.reset();
        fetchGoals();
      }
    } catch (error) {
      alert('Failed to establish connection to mission control.');
    }
  };

  const achievedCount = goals.filter(g => g.achieved).length;

  return (
    <div className="page-layout goals-page-bg" style={{ '--age-accent': themeColor }}>
      <Sidebar />
      <main className="main-content">
        <header className="goals-header">
          <div className="header-text">
            <h1>Targets & Milestones</h1>
            <p>Set your vision, track your grind, celebrate your wins.</p>
            <div style={{ color: themeColor, fontSize: '0.9rem', fontWeight: 'bold' }}>Theme: {currentUser.age < 20 ? 'Energetic Youth' : currentUser.age <= 45 ? 'Peak Performance' : 'Healthy Vitality'}</div>
          </div>
        </header>

        {/* GOAL ANALYTICS */}
        <div className="goals-summary">
          <div className="glass-panel summary-card">
            <span className="s-label">ACTIVE MISSIONS</span>
            <span className="s-value">{goals.length}</span>
          </div>
          <div className="glass-panel summary-card highlight" style={{ borderColor: themeColor }}>
            <span className="s-label">SUCCESSFUL</span>
            <span className="s-value">{achievedCount}</span>
          </div>
          <div className="glass-panel summary-card">
            <span className="s-label">SUCCESS RATE</span>
            <span className="s-value">{goals.length > 0 ? Math.round((achievedCount / goals.length) * 100) : 0} <span>%</span></span>
          </div>
        </div>

        <div className="goals-main-grid">
          {/* GOAL SETTING PANEL */}
          <div className="glass-panel goal-form-panel">
            <h2>New Objective</h2>
            <form onSubmit={handleSetGoal}>
              <div className="input-group">
                <label>Mission Category</label>
                <select name="goalName" required style={{ background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '12px', width: '100%' }}>
                  <option value="" disabled selected style={{ background: '#222' }}>Select category</option>
                  <option value="Weight Loss" style={{ background: '#ff6b6b', color: '#fff' }}>📉 Weight Loss</option>
                  <option value="Muscle Gain" style={{ background: '#ff9f43', color: '#fff' }}>💪 Muscle Gain</option>
                  <option value="Marathon Training" style={{ background: '#4facfe', color: '#fff' }}>🏁 Marathon Training</option>
                  <option value="Strength Target" style={{ background: '#ff4b2b', color: '#fff' }}>🏋️ Strength Target</option>
                  <option value="Daily Steps" style={{ background: '#00ff88', color: '#000' }}>👣 Daily Steps</option>
                  <option value="Flexibility Goal" style={{ background: '#a18cd1', color: '#fff' }}>🧘 Flexibility Goal</option>
                </select>
              </div>
              <div className="input-group">
                <label>Target Value/Note</label>
                <input type="text" name="targetValue" placeholder="e.g. 5kg, 10 reps" required />
              </div>
              <div className="input-group">
                <label>Deadline Date</label>
                <input type="date" name="targetDate" required />
              </div>
              <button type="submit" className="btn-set-goal">INITIATE MISSION</button>
            </form>
          </div>

          {/* ACTIVE GOALS LIST */}
          <div className="goals-display">
            {loading ? (
              <div className="loading-text">Analyzing your trajectory...</div>
            ) : goals.length > 0 ? (
              <div className="goal-cards-grid">
                {goals.map((goal, idx) => {
                  return (
                    <div key={goal.id || idx} className={`glass-panel goal-card ${goal.achieved ? 'achieved' : ''}`}>
                      <div className="goal-visual">
                        <svg viewBox="0 0 36 36" className="circular-chart">
                          <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="circle" strokeDasharray={`${goal.achieved ? '100' : '40'}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <span className="percentage">{goal.achieved ? '100%' : 'Active'}</span>
                      </div>
                      <div className="goal-info">
                        <h3>{goal.description}</h3>
                        <p>Deadline: {goal.targetDate}</p>
                        {goal.achieved && <span className="achieved-badge">🏆 MISSION COMPLETE</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-goals glass-panel">
                <span className="e-icon">🎯</span>
                <h3>No missions active.</h3>
                <p>Define your first target to begin tracking your evolution.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .goals-page-bg { 
          background: linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/high_clarity_mission_bg_1778551378941.png');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          min-height: 100vh;
        }
        .goals-display { padding-bottom: 200px; }
        .goal-card {
          -webkit-box-reflect: below 2px linear-gradient(transparent, rgba(255,255,255,0.05));
        }
        .goals-header { margin-bottom: 40px; position: relative; z-index: 1; }
        .goals-header h1 { font-size: 3rem; margin-bottom: 5px; }
        .goals-header p { color: var(--text-muted); font-size: 1.1rem; }

        .goals-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .summary-card { padding: 25px !important; display: flex; flex-direction: column; gap: 5px; }
        .summary-card.highlight { border-color: var(--accent-cyan); background: rgba(0, 242, 254, 0.05); }
        .s-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 800; letter-spacing: 1px; }
        .s-value { font-size: 2rem; font-weight: 700; color: #fff; }
        .s-value span { font-size: 0.9rem; color: var(--text-muted); }

        .goals-main-grid { display: grid; grid-template-columns: 350px 1fr; gap: 30px; }
        
        .goal-form-panel { padding: 40px !important; height: fit-content; position: sticky; top: 20px; }
        .goal-form-panel h2 { margin-bottom: 30px; color: var(--accent-cyan); font-size: 1.5rem; }
        .btn-set-goal { 
          width: 100%; margin-top: 20px; padding: 18px; 
          background: linear-gradient(to right, var(--accent-cyan), var(--accent-blue)); 
          color: #000; font-weight: 900; letter-spacing: 1px; border-radius: 12px; cursor: pointer;
        }

        .goal-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .goal-card { padding: 20px !important; display: flex; align-items: center; gap: 20px; transition: 0.3s; }
        .goal-card:hover { transform: translateY(-5px); border-color: var(--accent-cyan); }
        .goal-card.achieved { border-color: #ffd700; background: rgba(255, 215, 0, 0.03); }

        .goal-visual { position: relative; width: 70px; height: 70px; flex-shrink: 0; }
        .circular-chart { width: 100%; height: 100%; }
        .circle-bg { fill: none; stroke: rgba(255,255,255,0.05); stroke-width: 3; }
        .circle { fill: none; stroke: var(--accent-cyan); stroke-width: 3; stroke-linecap: round; transition: 1s ease-out; }
        .goal-card.achieved .circle { stroke: #ffd700; }
        .percentage { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 0.7rem; font-weight: 800; color: #fff; }

        .goal-info h3 { font-size: 1.1rem; margin-bottom: 5px; color: var(--accent-cyan); }
        .goal-card.achieved h3 { color: #ffd700; }
        .goal-info p { font-size: 0.8rem; color: var(--text-muted); margin: 0; }
        .achieved-badge { font-size: 0.65rem; font-weight: 800; color: #ffd700; display: block; margin-top: 8px; letter-spacing: 1px; }

        .loading-text { text-align: center; padding: 100px; color: var(--accent-cyan); font-weight: bold; letter-spacing: 2px; }
        .empty-goals { text-align: center; padding: 60px !important; }
        .e-icon { font-size: 3rem; display: block; margin-bottom: 15px; opacity: 0.2; }

        .input-group { margin-bottom: 20px; }
        .input-group label { display: block; margin-bottom: 8px; color: var(--text-muted); font-size: 0.85rem; }
        .input-group input { width: 100%; padding: 12px; background: rgba(0,0,0,0.2); border: 1px solid var(--glass-border); border-radius: 10px; color: #fff; }
      `}} />
    </div>
  );
};

export default GoalsTarget;
