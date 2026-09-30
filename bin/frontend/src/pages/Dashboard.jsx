import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [currentUser, setCurrentUser] = useState({ fullName: 'Guest User', username: 'guest', age: 24, weight: 75, height: 180 });
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    return () => clearInterval(timer);
  }, []);

  const getAgeCategory = (age) => {
    if (age < 18) return 'child';
    if (age <= 55) return 'adult';
    return 'senior';
  };

  const ageCategory = getAgeCategory(currentUser.age);

  const ageData = {
    child: {
      bg: '/images/bg_young.png',
      title: 'Youth Active Growth',
      metrics: { calories: 850, activeTime: '120 min', weight: 45, height: 150 },
      options: [
        { value: 'growth', label: 'Healthy Growth & Activity' },
        { value: 'sports', label: 'Sports Performance' }
      ],
      protocols: {
        growth: {
          food: [
            "Breakfast: Oatmeal with fresh berries and milk.",
            "Lunch: Turkey sandwich on whole grain bread.",
            "Snack: Apple slices with peanut butter.",
            "Dinner: Pasta with lean meat sauce.",
            "Hydration: Minimum 6-8 glasses of water per day."
          ],
          sleep: [
            "Target: 9-11 hours per night.",
            "Routine: Read a book 30 mins before bed.",
            "Environment: Cool, quiet, and dark room for deep rest."
          ]
        },
        sports: {
          food: [
            "Pre-practice: Banana and a handful of pretzels.",
            "Post-practice: Chocolate milk for recovery.",
            "Dinner: Chicken, brown rice, and broccoli.",
            "Hydration: Drink water before, during, and after play."
          ],
          sleep: [
            "Target: 10 hours for optimal muscle recovery.",
            "Routine: Gentle stretching before bed to relieve tight muscles."
          ]
        }
      }
    },
    adult: {
      bg: '/images/bg_adult.png',
      title: 'Adult Performance & Fitness',
      metrics: { calories: 1240, activeTime: '60 min', weight: 75, height: 180 },
      options: [
        { value: 'weight_loss', label: 'Fat Loss & Defining' },
        { value: 'muscle_gain', label: 'Hypertrophy (Muscle Gain)' }
      ],
      protocols: {
        weight_loss: {
          food: [
            "Breakfast: Egg white omelette with spinach & black coffee.",
            "Lunch: Grilled chicken breast (150g) with 1/2 cup quinoa.",
            "Snack: Plain Greek yogurt with almonds.",
            "Dinner: Baked wild salmon with mixed greens.",
            "Hydration: Minimum 3 liters of water per day."
          ],
          sleep: [
            "Target: 10:30 PM to 6:00 AM.",
            "Environment: Drop room temperature to 65°F (18°C).",
            "Routine: Digital sundown 45 minutes before bed."
          ]
        },
        muscle_gain: {
          food: [
            "Breakfast: 3 whole eggs, oatmeal with peanut butter.",
            "Lunch: Ground beef/turkey (200g) with 1 cup white rice.",
            "Pre-Workout: 1 banana and a black coffee.",
            "Dinner: Sirloin steak (200g) with sweet potato.",
            "Protein Target: Aim for 2.0g of protein per kg daily."
          ],
          sleep: [
            "Target: 10:00 PM to 6:30 AM (8+ hours).",
            "Supplementation: Consider Casein protein before bed.",
            "Routine: Foam roll or stretch tight muscles for 10 minutes."
          ]
        }
      }
    },
    senior: {
      bg: '/images/bg_senior.png',
      title: 'Senior Health & Longevity',
      metrics: { calories: 600, activeTime: '45 min', weight: 68, height: 165 },
      options: [
        { value: 'mobility', label: 'Joint Health & Mobility' },
        { value: 'heart_health', label: 'Cardiovascular Maintenance' }
      ],
      protocols: {
        mobility: {
          food: [
            "Breakfast: Greek yogurt with chia seeds (rich in calcium).",
            "Lunch: Leafy greens salad with salmon (omega-3s for joints).",
            "Dinner: Soft baked chicken and steamed veggies.",
            "Hydration: Sip water throughout the day consistently."
          ],
          sleep: [
            "Target: 7-8 hours per night.",
            "Routine: Avoid heavy meals before bed to prevent heartburn.",
            "Environment: Ensure pathways are well-lit for safety at night."
          ]
        },
        heart_health: {
          food: [
            "Breakfast: Whole grain toast with avocado.",
            "Lunch: Lentil soup with a side of mixed greens.",
            "Dinner: Grilled white fish with asparagus.",
            "Sodium: Keep sodium intake low to manage blood pressure."
          ],
          sleep: [
            "Target: 7-8 hours.",
            "Environment: Use a comfortable, supportive mattress."
          ]
        }
      }
    }
  };

  const currentData = ageData[ageCategory];

  // Reset active plan when age category changes
  useEffect(() => {
    setActivePlan(null);
  }, [ageCategory]);

  return (
    <div className="dashboard-layout" style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <div 
        className="dashboard-bg" 
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundImage: `url(${currentData.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2,
          transition: 'background-image 0.5s ease-in-out'
        }} 
      />
      <Sidebar />
      <main className="main-content">
        <div className="ambient-overlay"></div>
        <header>
          <div>
            <h1 className="greeting">Welcome back, <span>{currentUser.fullName.split(' ')[0]}</span>!</h1>
            <p style={{ color: 'var(--accent-cyan)', margin: '5px 0 0 0', fontWeight: 'bold' }}>{currentData.title}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '20px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="live-dot" style={{ width: '8px', height: '8px' }}></span>
              <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--accent-cyan)' }}>{time}</span>
            </div>
            <img src={`https://ui-avatars.com/api/?name=${currentUser.fullName}&background=00f2fe&color=fff&size=150`} style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid var(--accent-blue)', objectFit: 'cover' }} alt="Profile" />
          </div>
        </header>

        <div className="dashboard-grid">
          {/* STAT SUMMARY CARDS */}
          <div className="glass-panel stat-card">
            <div className="stat-icon"><svg viewBox="0 0 24 24"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5S17.5 10 17.5 10 13 12.5 13 15s2 4.5 4.5 4.5zM6.5 19C9 19 11 17 11 14.5S6.5 10 6.5 10 2 12.5 2 15s2 4.5 4.5 4.5zM12 11c2 0 3.5-1.5 3.5-3.5S12 2 12 2 8.5 5.5 8.5 7.5 10 11 12 11z"/></svg></div>
            <div className="stat-info">
              <h3>Avg Calories Burned</h3>
              <div className="value">{currentData.metrics.calories}</div>
            </div>
          </div>

          <div className="glass-panel stat-card">
            <div className="stat-icon" style={{ color: '#55efc4', background: 'rgba(85, 239, 196, 0.1)' }}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
            <div className="stat-info">
              <h3>Daily Active Time</h3>
              <div className="value">{currentData.metrics.activeTime}</div>
            </div>
          </div>

          {/* PROFILE BLOCK */}
          <div className="glass-panel profile-block" style={{ gridColumn: 'span 6' }}>
            <img src={`https://ui-avatars.com/api/?name=${currentUser.fullName}&background=00f2fe&color=fff&size=150`} className="avatar" alt="Avatar" />
            <h2 style={{ margin: '0 0 5px 0' }}>{currentUser.fullName}</h2>
            <p style={{ margin: '0', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600 }}>@{currentUser.username}</p>
            <div className="p-metrics">
              <div className="p-metric"><span className="val">{currentUser.age}</span><span className="lbl">Years</span></div>
              <div className="p-metric"><span className="val">{currentUser.weight}</span><span className="lbl">Kg</span></div>
              <div className="p-metric"><span className="val">{currentUser.height}</span><span className="lbl">cm</span></div>
            </div>
          </div>

          {/* AI PROTOCOL ENGINE */}
          <div className="glass-panel" style={{ gridColumn: 'span 12', marginTop: '15px' }}>
            <h2 style={{ fontSize: '1.4rem', margin: '0 0 20px 0', background: 'linear-gradient(to right, #00f2fe, #4facfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Nutrition & Recovery Protocol</h2>
            <select 
              value={activePlan ? activePlan.key : ""}
              onChange={(e) => setActivePlan(e.target.value ? { key: e.target.value, ...currentData.protocols[e.target.value] } : null)}
              style={{ maxWidth: '400px', padding: '12px 15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: '#fff' }}
            >
              <option value="">Select objective...</option>
              {currentData.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {activePlan && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginTop: '25px', animation: 'fadeIn 0.5s' }}>
                <div style={{ background: 'rgba(0,242,254,0.05)', border: '1px solid rgba(0,242,254,0.2)', padding: '20px', borderRadius: '20px' }}>
                  <h3 style={{ color: '#00f2fe' }}>Food Planning</h3>
                  <ul>{activePlan.food.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
                <div style={{ background: 'rgba(251,194,235,0.05)', border: '1px solid rgba(251,194,235,0.2)', padding: '20px', borderRadius: '20px' }}>
                  <h3 style={{ color: '#fbc2eb' }}>Sleeping Menu</h3>
                  <ul>{activePlan.sleep.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .main-content { flex: 1; padding: 40px; overflow-y: auto; height: 100vh; position: relative; z-index: 1; }
        header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .greeting { font-size: 2.2rem; font-weight: 700; margin: 0; }
        .greeting span { color: var(--accent-cyan); }
        .dashboard-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 25px; }
        .glass-panel {
          background: var(--card-base); backdrop-filter: blur(20px);
          border: 1px solid var(--border-light); border-radius: 20px; padding: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: 0.3s;
        }
        .stat-card { grid-column: span 3; display: flex; align-items: center; gap: 20px; }
        .stat-icon {
          width: 60px; height: 60px; border-radius: 16px;
          background: rgba(0, 242, 254, 0.1); color: var(--accent-cyan);
          display: flex; justify-content: center; align-items: center;
        }
        .stat-info h3 { margin: 0; font-size: 0.9rem; color: var(--text-muted); font-weight: 500;}
        .stat-info .value { font-size: 1.8rem; font-weight: 700; margin-top: 5px; }
        .profile-block { grid-column: span 4; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .avatar { width: 100px; height: 100px; border-radius: 50%; border: 4px solid var(--accent-blue); margin-bottom: 15px; }
        .p-metrics { display: flex; justify-content: space-between; width: 100%; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-light); }
        .p-metric { display: flex; flex-direction: column; }
        .p-metric .val { font-size: 1.4rem; font-weight: 700; }
        .p-metric .lbl { font-size: 0.8rem; color: var(--text-muted); }
        .live-dot { width: 8px; height: 8px; background: #00f2fe; border-radius: 50%; display: inline-block; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
        
        select option { background: #1a1a1f; color: #fff; }
      `}} />
    </div>
  );
};

export default Dashboard;
