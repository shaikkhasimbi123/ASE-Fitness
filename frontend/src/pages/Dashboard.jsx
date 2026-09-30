import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser] = useState(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  const [waterIntake, setWaterIntake] = useState(0);
  const [steps, setSteps] = useState(2450);
  const [heartRate, setHeartRate] = useState(72);
  const [energyLevel, setEnergyLevel] = useState('💪');
  const [stats, setStats] = useState({ totalCalories: 0, totalDuration: 0 });
  const [activeTab, setActiveTab] = useState('Week');
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [isSyncing, setIsSyncing] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Dynamic Performance Data
  const chartData = {
    'Week': [
      { label: 'MON', full: 'Monday', h: 40 }, { label: 'TUE', full: 'Tuesday', h: 70 },
      { label: 'WED', full: 'Wednesday', h: 45 }, { label: 'THU', full: 'Thursday', h: 90 },
      { label: 'FRI', full: 'Friday', h: 65 }, { label: 'SAT', full: 'Saturday', h: 80 },
      { label: 'SUN', full: 'Sunday', h: 55 }
    ],
    'Month': [
      { label: 'W1', full: 'Week 1', h: 65 }, { label: 'W2', full: 'Week 2', h: 85 },
      { label: 'W3', full: 'Week 3', h: 45 }, { label: 'W4', full: 'Week 4', h: 95 }
    ],
    'Year': [
      { label: 'JAN', full: 'January', h: 40 }, { label: 'FEB', full: 'February', h: 55 },
      { label: 'MAR', full: 'March', h: 75 }, { label: 'APR', full: 'April', h: 90 },
      { label: 'MAY', full: 'May', h: 65 }, { label: 'JUN', full: 'June', h: 85 },
      { label: 'JUL', full: 'July', h: 50 }, { label: 'AUG', full: 'August', h: 70 },
      { label: 'SEP', full: 'September', h: 80 }, { label: 'OCT', full: 'October', h: 95 },
      { label: 'NOV', full: 'November', h: 60 }, { label: 'DEC', full: 'December', h: 85 }
    ]
  };

  const fitnessActivities = [
    { title: 'Swimming', desc: 'Full-body endurance and low-impact recovery.', fact: 'Burns up to 400 kcal in 30 mins.', detail: 'Swimming uses nearly every major muscle group (arms, legs, core, and back). It is ideal for joint health and provides one of the best cardiovascular workouts with minimal injury risk.', img: 'https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&q=80&w=600' },
    { title: 'Cycling', desc: 'High-intensity cardio and lower body power.', fact: 'Boosts cardiovascular health by 50%.', detail: 'Regular cycling increases stamina and strengthens leg muscles. It is a fantastic way to burn calories while enjoying the outdoors or using a stationary bike for controlled sessions.', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600' },
    { title: 'Muscle', desc: 'Strength building and metabolic acceleration.', fact: 'Muscle burns more calories than fat.', detail: 'Strength training increases bone density and builds lean muscle mass. A higher muscle percentage means your body burns more energy even at rest, accelerating weight management.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600' },
    { title: 'Weight Loss', desc: 'Caloric deficit and metabolic conditioning.', fact: 'Consistency beats intensity every time.', detail: 'Losing weight is about sustainable lifestyle changes. Focusing on nutrient-dense foods and regular movement creates a healthy caloric deficit for long-term transformation.', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600' },
    { title: 'Weight Gain', desc: 'Hypertrophy and strategic nutrient surplus.', fact: 'Requires 300+ extra healthy kcal.', detail: 'Healthy weight gain involves building muscle through hypertrophy training and consuming high-quality proteins and complex carbohydrates to support tissue repair and growth.', img: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=600' },
    { title: 'Yoga', desc: 'Flexibility, balance, and mental clarity.', fact: 'Reduces cortisol levels instantly.', detail: 'Yoga combines physical postures, breathing exercises, and meditation. It is scientifically proven to lower stress hormones, improve flexibility, and enhance mental focus.', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600' }
  ];

  useEffect(() => {
    setTimeout(() => setIsSyncing(false), 3000);
  }, []);

  useEffect(() => {
    let interval;
    if (isTimerOpen) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerOpen]);

  useEffect(() => {
    let interval;
    if (isWalking) {
      interval = setInterval(() => {
        setSteps(s => s + Math.floor(Math.random() * 5 + 1));
        setHeartRate(h => Math.min(140, h + Math.floor(Math.random() * 2)));
      }, 1000);
    } else {
      interval = setInterval(() => {
        setHeartRate(h => h > 70 ? h - 1 : h + Math.floor(Math.random() * 2 - 1));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isWalking]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`http://localhost:9089/api/stats/${currentUser.id}`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats');
      }
    };
    if (currentUser.id) fetchStats();
  }, [currentUser.id]);

  const addSteps = () => setSteps(prev => prev + 500);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="page-layout dashboard-bg">
      <Sidebar />
      <main className="main-content dashboard-content">
        <header className="dashboard-header">
          <div className="welcome-text">
            <div className="status-badge">
              <div className={`dot ${isSyncing ? 'syncing' : 'active'}`}></div>
              <span>{isSyncing ? 'Syncing Devices...' : 'Systems Optimal'}</span>
            </div>
            <h1>Elevate Your Limits, {currentUser.name?.split(' ')[0] || 'Athlete'}</h1>
            <p>You've crushed {stats.totalCalories} calories this week. Keep going!</p>
          </div>
          <div className="header-actions">
             <div className="weather-mini glass-panel">
               <span className="weather-icon">☀️</span>
               <div className="weather-info">
                 <span className="temp">28°C</span>
                 <span className="desc">Ideal for Run</span>
               </div>
             </div>
             <div className="heart-rate-mini glass-panel">
               <span className="heart-icon">❤️</span>
               <span className="hr-val">{heartRate}</span>
               <span className="hr-unit">BPM</span>
             </div>
             <div className="profile-mini glass-panel">
               <img src={currentUser.profilePhotoUrl || 'https://via.placeholder.com/50'} alt="Profile" />
               <span>{currentUser.username}</span>
             </div>
          </div>
        </header>

        <div className="dashboard-grid">
          {/* STATS CARDS */}
          <div className="stats-container">
            <div className="glass-panel stat-card highlight">
              <div className="stat-info">
                <span className="label">ENERGY BURNED</span>
                <h2 className="value">{stats.totalCalories} <span>kcal</span></h2>
              </div>
              <div className="stat-icon pulse">🔥</div>
            </div>

            <div className="glass-panel stat-card steps-widget" onClick={addSteps}>
              <div className="stat-info">
                <span className="label">DAILY STEPS</span>
                <h2 className="value">{steps.toLocaleString()}</h2>
                <div className="steps-progress-bg"><div className="steps-progress" style={{ width: `${Math.min((steps/10000)*100, 100)}%` }}></div></div>
              </div>
              <div className="stat-icon walk">👟</div>
              <div className="click-hint">Click +500</div>
            </div>
            
            <div className="glass-panel stat-card water-widget automated">
              <div className="stat-info">
                <span className="label">REQUIRED HYDRATION</span>
                <h2 className="value">{(2 + (stats.totalCalories / 1000) + (steps / 10000)).toFixed(1)} <span>Liters Today</span></h2>
                <div className="water-level-bg">
                  <div className="water-level" style={{ width: `${Math.min(((2 + (stats.totalCalories / 1000) + (steps / 10000)) / 4) * 100, 100)}%` }}></div>
                </div>
              </div>
              <div className="stat-icon drop pulse-reminder">💧</div>
              <div className="click-hint">Workout Driven</div>
            </div>
          </div>

          {/* MAIN CHART AREA */}
          <div className="glass-panel chart-widget reveal">
            <div className="widget-header">
              <h3>Activity Performance</h3>
              <div className="chart-tabs">
                {['Week', 'Month', 'Year'].map(t => (
                  <button key={t} className={activeTab === t ? 'active' : ''} onClick={() => setActiveTab(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="visual-chart">
              <div className="y-axis">
                <span>2000</span>
                <span>1500</span>
                <span>1000</span>
                <span>500</span>
                <span>0</span>
              </div>
              <div className="chart-bars">
                {chartData[activeTab].map((d, i) => (
                  <div key={i} className="bar-wrapper">
                    <div className="bar" style={{ height: `${d.h}%`, animationDelay: `${i * 0.05}s` }}>
                      <div className="bar-glow"></div>
                      <div className="bar-tooltip">{d.h * 20} kcal</div>
                    </div>
                    <span className="day-label">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-breakdown">
              {chartData[activeTab].map((d, i) => (
                <div key={i} className="breakdown-item">
                  <div className="day-name-wrapper">
                    <span className="breakdown-icon">📊</span>
                    <span className="day-name">{d.full}</span>
                  </div>
                  <span className="day-value">{d.h * 20} kcal</span>
                </div>
              ))}
            </div>

            {/* NEW: Cinematic Fitness Vertical Scroll Gallery */}
            <div className="chart-carousel">
              <div className="carousel-track">
                {fitnessActivities.map((item, idx) => (
                  <div key={idx} className="carousel-item" onClick={() => setSelectedActivity(item)}>
                    <img src={item.img} alt={item.title} />
                    <button className="like-btn" onClick={(e) => {
                      e.stopPropagation();
                      e.currentTarget.classList.toggle('liked');
                    }}>❤️</button>
                    <div className="carousel-info">
                      <strong>{item.title}</strong>
                      <p>Tap to Read More</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECONDARY GRID */}
          <div className="secondary-grid">
            <div className="glass-panel weekly-goal-widget">
               <h3>Weekly Goal</h3>
               <div className="circular-progress-main">
                 <svg viewBox="0 0 36 36" className="circular-chart">
                   <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                   <path className="circle" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                   <text x="18" y="20.35" className="percentage">75%</text>
                 </svg>
               </div>
               <p>Almost there! Only 2 sessions left.</p>
            </div>

            <div className="glass-panel nutrition-macros">
              <h3>Nutrition Macros</h3>
              <div className="macro-bars">
                <div className="macro-item">
                  <div className="macro-label"><span>Protein</span><span>120g/150g</span></div>
                  <div className="m-bar-bg"><div className="m-bar" style={{ width: '80%', background: '#ff4d4d' }}></div></div>
                </div>
                <div className="macro-item">
                  <div className="macro-label"><span>Carbs</span><span>210g/250g</span></div>
                  <div className="m-bar-bg"><div className="m-bar" style={{ width: '84%', background: '#ffc107' }}></div></div>
                </div>
                <div className="macro-item">
                  <div className="macro-label"><span>Fats</span><span>45g/60g</span></div>
                  <div className="m-bar-bg"><div className="m-bar" style={{ width: '75%', background: '#4dff88' }}></div></div>
                </div>
              </div>
            </div>

            <div className="glass-panel sleep-widget">
              <div className="widget-header">
                <h3>Sleep Analysis</h3>
                <span className="sleep-icon">🌙</span>
              </div>
              <div className="sleep-content">
                <div className="sleep-val">7.5 <span>hours</span></div>
                <div className="sleep-bar-bg"><div className="sleep-bar" style={{ width: '92.5%' }}></div></div>
                <p className="sleep-quality">Deep Sleep: <strong>4.2h</strong> (Good)</p>
              </div>
            </div>

            <div className="glass-panel body-metrics-widget">
              <h3>Body Metrics</h3>
              <div className="metrics-grid">
                <div className="metric-item">
                  <span>Weight</span>
                  <strong>{currentUser.weight || 72} kg</strong>
                </div>
                <div className="metric-item">
                  <span>BMI</span>
                  <strong>22.4</strong>
                </div>
                <div className="metric-item">
                  <span>Body Fat</span>
                  <strong>18%</strong>
                </div>
              </div>
            </div>

            <div className="glass-panel active-goals-widget">
               <h3>Quick Actions</h3>
               <div className="quick-btn-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                 <button className="q-btn" onClick={() => navigate('/diet-plan')}>Log Meal</button>
                 <button className="q-btn" onClick={() => setIsTimerOpen(true)}>Start Timer</button>
                 <button className={`q-btn ${isWalking ? 'active-walk' : ''}`} onClick={() => setIsWalking(!isWalking)}>
                   {isWalking ? 'Walking...' : 'Live Walk'}
                 </button>
                 <button className="q-btn" onClick={() => navigate('/my-workouts')}>Log Workout</button>
                 <button className="q-btn" onClick={() => navigate('/goals-target')}>Check Goals</button>
                 <button className="q-btn" onClick={() => navigate('/feedback')}>Give Feedback</button>
               </div>
            </div>
          </div>
        </div>

        {/* STOPWATCH MODAL */}
        {isTimerOpen && (
          <div className="modal-overlay">
            <div className="glass-panel timer-modal">
              <h2>Workout Session</h2>
              <div className="timer-display">{formatTime(seconds)}</div>
              <div className="modal-actions">
                <button className="stop-btn" onClick={() => { setIsTimerOpen(false); setSeconds(0); }}>Stop & Reset</button>
                <button className="close-btn" onClick={() => setIsTimerOpen(false)}>Minimize</button>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVITY DETAIL MODAL */}
        {selectedActivity && (
          <div className="modal-overlay" onClick={() => setSelectedActivity(null)}>
            <div className="glass-panel detail-modal" onClick={e => e.stopPropagation()}>
              <img src={selectedActivity.img} alt={selectedActivity.title} className="detail-img" />
              <div className="detail-header">
                <h2>{selectedActivity.title}</h2>
                <button className="close-x" onClick={() => setSelectedActivity(null)}>×</button>
              </div>
              <div className="detail-body">
                <div className="pro-fact-badge">Did you know? {selectedActivity.fact}</div>
                <p className="full-desc">{selectedActivity.detail}</p>
                <div className="modal-footer-btns">
                  <button className="start-btn" onClick={() => { setSelectedActivity(null); navigate('/my-workouts'); }}>Start Training</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NEW: DASHBOARD FOOTER */}
        <footer className="dashboard-footer">
          <div className="footer-content">
            <div className="footer-section mission">
              <h4>Fitness Command</h4>
              <p>Empowering your journey with real-time biological insights and professional coaching. Our mission is to transform your data into measurable health results.</p>
            </div>
            <div className="footer-section links">
              <h4>Support</h4>
              <ul>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact Support</li>
              </ul>
            </div>
            <div className="footer-section disclaimer">
              <p><span>⚠️ Disclaimer:</span> Consult your physician before starting any new exercise program. Data provided is for informational purposes only and not intended as medical advice.</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Ctrl+Alt+Elite Fitness. All Rights Reserved. | Systems Optimal | Connected via Secure API</p>
          </div>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-bg { 
          background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/high_clarity_gym_dashboard_bg_1778551347831.png');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          min-height: 100vh;
        }
        .dashboard-content { max-width: 1500px; margin: 0 auto; width: 100%; position: relative; z-index: 1; padding-bottom: 50px; }
        
        .status-badge { display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.4); width: fit-content; padding: 5px 12px; border-radius: 50px; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.1); }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.active { background: #4dff88; box-shadow: 0 0 10px #4dff88; }
        .dot.syncing { background: #ffc107; animation: blink 1s infinite; }
        .status-badge span { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #fff; }
        
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .glass-panel {
          -webkit-box-reflect: below 2px linear-gradient(transparent, rgba(255,255,255,0.05));
          margin-bottom: 30px;
        }
        
        .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .header-actions { display: flex; gap: 15px; align-items: center; }
        
        .weather-mini { display: flex; align-items: center; gap: 10px; padding: 8px 15px !important; border-radius: 50px; }
        .weather-icon { font-size: 1.2rem; }
        .weather-info { display: flex; flex-direction: column; }
        .temp { font-size: 0.9rem; font-weight: 800; }
        .desc { font-size: 0.6rem; opacity: 0.6; font-weight: 700; white-space: nowrap; }

        .heart-rate-mini { display: flex; align-items: center; gap: 10px; padding: 8px 15px !important; border-radius: 50px; border: 1px solid rgba(255, 77, 77, 0.3) !important; }
        .heart-icon { animation: heartBeat 1.2s infinite; display: inline-block; }
        .hr-val { font-size: 1.2rem; font-weight: 800; color: #ff4d4d; }
        .hr-unit { font-size: 0.6rem; opacity: 0.6; font-weight: 800; }

        .profile-mini { display: flex; align-items: center; gap: 15px; padding: 10px 20px !important; border-radius: 50px; }
        .profile-mini img { width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--accent-cyan); }
        .profile-mini span { font-weight: 700; color: var(--accent-cyan); }

        .dashboard-grid { display: grid; grid-template-columns: 1fr 380px; gap: 30px; }
        
        .stats-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; grid-column: span 2; }
        .stat-card { display: flex; justify-content: space-between; align-items: center; padding: 30px !important; transition: 0.3s; position: relative; overflow: hidden; }
        .stat-card:hover { transform: translateY(-5px); border-color: var(--accent-cyan); }
        .stat-card.highlight { border-color: var(--accent-cyan); background: rgba(0, 242, 254, 0.05); }
        
        .steps-widget { cursor: pointer; border-color: var(--accent-blue); }
        .steps-progress-bg { width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 10px; margin-top: 15px; overflow: hidden; }
        .steps-progress { height: 100%; background: linear-gradient(to right, var(--accent-blue), var(--accent-cyan)); transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1); }

        .water-widget { cursor: pointer; position: relative; overflow: hidden; }
        .water-level-bg { width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 10px; margin-top: 15px; overflow: hidden; }
        .water-level { height: 100%; background: var(--accent-cyan); transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 10px var(--accent-cyan); }
        
        .stat-card .label { font-size: 0.75rem; color: var(--text-muted); font-weight: 800; letter-spacing: 1px; }
        .stat-card .value { font-size: 2rem; margin: 5px 0 0; }
        .stat-card .value span { font-size: 1rem; color: var(--text-muted); }
        .stat-icon { font-size: 2.5rem; filter: drop-shadow(0 0 10px rgba(0,0,0,0.5)); }
        
        .chart-widget { padding: 30px !important; }
        .widget-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .chart-tabs { display: flex; background: rgba(255,255,255,0.05); border-radius: 10px; padding: 5px; }
        .chart-tabs button { background: transparent; padding: 8px 15px; font-size: 0.8rem; border-radius: 8px; color: #fff; cursor: pointer; transition: 0.3s; }
        .chart-tabs button.active { background: var(--accent-cyan); color: #000; }
        
        .visual-chart { height: 320px; display: flex; align-items: flex-end; padding: 20px 0; gap: 20px; }
        .y-axis { display: flex; flex-direction: column; justify-content: space-between; height: 100%; color: var(--text-muted); font-size: 0.7rem; font-weight: 800; padding-bottom: 30px; opacity: 0.5; }
        
        .chart-bars { display: flex; justify-content: space-between; align-items: flex-end; width: 100%; height: 100%; gap: 15px; }
        .bar-wrapper { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end; }
        .bar { width: 100%; background: linear-gradient(to top, var(--accent-blue), var(--accent-cyan)); border-radius: 8px 8px 0 0; position: relative; transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1); transform-origin: bottom; animation: barRise 1s ease-out forwards; opacity: 0; }
        .bar-glow { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, transparent, rgba(255,255,255,0.1)); opacity: 0; transition: 0.3s; }
        .bar:hover .bar-glow { opacity: 1; }
        .bar:hover { filter: brightness(1.2); cursor: pointer; transform: scaleX(1.1); }
        .bar-tooltip { position: absolute; top: -35px; left: 50%; transform: translateX(-50%); background: #fff; color: #000; padding: 5px 10px; border-radius: 5px; font-size: 0.7rem; font-weight: bold; opacity: 0; transition: 0.3s; pointer-events: none; white-space: nowrap; }
        .bar:hover .bar-tooltip { opacity: 1; top: -45px; }
        .day-label { margin-top: 15px; font-size: 0.7rem; color: var(--text-muted); font-weight: 800; letter-spacing: 1px; }

        .chart-breakdown { margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .breakdown-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 15px; background: rgba(255,255,255,0.02); border-radius: 8px; transition: 0.3s; }
        .breakdown-item:hover { background: rgba(0, 242, 254, 0.05); transform: translateX(5px); }
        .day-name-wrapper { display: flex; align-items: center; gap: 10px; }
        .breakdown-icon { font-size: 0.8rem; filter: opacity(0.5); }
        .day-name { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
        .day-value { font-size: 0.8rem; color: var(--accent-cyan); font-weight: 800; }

        .chart-carousel { margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; height: 400px; overflow-y: auto; overflow-x: hidden; scroll-behavior: smooth; }
        .carousel-track { display: flex; flex-direction: column; gap: 20px; width: 100%; padding-bottom: 20px; }
        .carousel-item { width: 100%; min-height: 200px; border-radius: 12px; overflow: hidden; position: relative; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: 0.3s; flex-shrink: 0; }
        .carousel-item:hover { transform: translateY(-5px); border-color: var(--accent-cyan); }
        .carousel-item img { width: 100%; height: 100%; object-fit: cover; }
        .like-btn { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5); border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; filter: grayscale(1) opacity(0.6); transition: 0.3s; }
        .like-btn.liked { filter: grayscale(0) opacity(1); transform: scale(1.2); text-shadow: 0 0 10px #ff4d4d; color: #ff4d4d; }
        
        .carousel-info { position: absolute; bottom: 0; left: 0; width: 100%; padding: 10px; background: linear-gradient(transparent, rgba(0,0,0,0.8)); color: #fff; z-index: 5; }
        .carousel-info strong { font-size: 0.7rem; color: var(--accent-cyan); text-transform: uppercase; display: block; }
        .carousel-info p { font-size: 0.55rem; opacity: 0.7; }
        
        .chart-carousel::-webkit-scrollbar { width: 4px; }
        .chart-carousel::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .chart-carousel::-webkit-scrollbar-thumb { background: var(--accent-cyan); border-radius: 10px; }

        .dashboard-footer { margin-top: 80px; padding: 40px; background: rgba(0,0,0,0.4); border-top: 1px solid rgba(255,255,255,0.1); border-radius: 20px 20px 0 0; }
        .footer-content { display: grid; grid-template-columns: 2fr 1fr 2fr; gap: 40px; margin-bottom: 30px; }
        .footer-section h4 { color: var(--accent-cyan); margin-bottom: 15px; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; }
        .footer-section p { font-size: 0.85rem; line-height: 1.6; color: rgba(255,255,255,0.6); }
        .footer-section ul { list-style: none; padding: 0; }
        .footer-section li { font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 8px; cursor: pointer; transition: 0.3s; }
        .footer-section li:hover { color: var(--accent-cyan); transform: translateX(5px); }
        .disclaimer span { color: #ff4d4d; font-weight: 800; }
        .footer-bottom { text-align: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); }
        .footer-bottom p { font-size: 0.7rem; color: rgba(255,255,255,0.3); font-weight: 700; letter-spacing: 1px; }

        .detail-modal { width: 95%; max-width: 500px; padding: 0 !important; overflow: hidden; position: relative; animation: modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); max-height: 90vh; overflow-y: auto; }
        .detail-img { width: 100%; height: 220px; object-fit: cover; }
        .detail-header { padding: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .detail-header h2 { font-size: 1.6rem; color: var(--accent-cyan); }
        .close-x { background: transparent; border: none; color: #fff; font-size: 2rem; cursor: pointer; line-height: 1; }
        .detail-body { padding: 20px; }
        .pro-fact-badge { background: rgba(0, 242, 254, 0.1); border: 1px solid var(--accent-cyan); color: var(--accent-cyan); padding: 10px 15px; border-radius: 10px; font-size: 0.8rem; font-weight: 700; margin-bottom: 20px; }
        .full-desc { font-size: 0.9rem; line-height: 1.6; color: rgba(255,255,255,0.8); }
        .modal-footer-btns { margin-top: 30px; display: flex; justify-content: flex-end; }
        .start-btn { background: var(--accent-cyan); color: #000; border: none; padding: 12px 25px; border-radius: 10px; font-weight: 800; cursor: pointer; transition: 0.3s; }
        .start-btn:hover { transform: scale(1.05); box-shadow: 0 0 20px var(--accent-cyan); }

        @keyframes modalPop { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        .weekly-goal-widget { padding: 25px !important; text-align: center; }
        .circular-progress-main { width: 120px; height: 120px; margin: 15px auto; }
        .circular-chart { display: block; margin: 10px auto; max-width: 100%; }
        .circle-bg { fill: none; stroke: rgba(255,255,255,0.05); stroke-width: 3.8; }
        .circle { fill: none; stroke: var(--accent-cyan); stroke-width: 3.8; stroke-linecap: round; transition: stroke-dasharray 0.3s ease; }
        .percentage { fill: var(--accent-cyan); font-family: sans-serif; font-size: 0.5rem; text-anchor: middle; font-weight: 800; }

        .nutrition-macros { padding: 25px !important; }
        .macro-bars { display: flex; flex-direction: column; gap: 15px; margin-top: 15px; }
        .macro-label { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .macro-label span { font-size: 0.7rem; font-weight: 800; }
        .m-bar-bg { width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 10px; }
        .m-bar { height: 100%; border-radius: 10px; box-shadow: 0 0 10px currentColor; }

        .sleep-widget { padding: 25px !important; }
        .sleep-val { font-size: 2rem; font-weight: 800; margin-bottom: 10px; }
        .sleep-val span { font-size: 0.9rem; opacity: 0.6; }
        .sleep-bar-bg { width: 100%; height: 8px; background: rgba(255,255,255,0.05); border-radius: 10px; margin-bottom: 10px; }
        .sleep-bar { height: 100%; background: linear-gradient(to right, #a18cd1, #fbc2eb); border-radius: 10px; }
        .sleep-quality { font-size: 0.8rem; color: var(--text-muted); }

        .body-metrics-widget { padding: 25px !important; }
        .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 15px; }
        .metric-item { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .metric-item span { font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
        .metric-item strong { font-size: 1.1rem; color: var(--accent-cyan); margin-top: 5px; }

        @keyframes barRise { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
        @keyframes heartBeat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }

        .active-goals-widget { padding: 30px !important; }
        .quick-btn-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 20px; }
        .q-btn { width: 100%; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; font-weight: 600; transition: 0.3s; cursor: pointer; }
        .q-btn:hover { background: var(--accent-cyan); color: #000; transform: scale(1.02); }
        .q-btn.active-walk { background: var(--accent-blue); border-color: var(--accent-cyan); animation: walkPulse 1.5s infinite; }
        
        @keyframes walkPulse { 0% { box-shadow: 0 0 5px var(--accent-cyan); } 50% { box-shadow: 0 0 25px var(--accent-cyan); } 100% { box-shadow: 0 0 5px var(--accent-cyan); } }
      `}} />
    </div>
  );
};

export default Dashboard;
