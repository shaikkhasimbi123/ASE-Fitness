import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const DietPlan = () => {
  const [currentUser] = useState(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  const [workoutData, setWorkoutData] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9089/api/workouts/${currentUser.id}`);
        const data = await response.json();
        setWorkoutData(data);
        setRecommendation(getDietRecommendation(data));
      } catch (error) {
        console.error('Failed to fetch data');
      }
    };
    if (currentUser.id) fetchData();
  }, [currentUser.id]);

  const getDietRecommendation = (workouts) => {
    const weeklyBurn = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
    const hasWeightLossGoal = currentUser.fitnessGoal === 'Weight Loss';
    const hasMuscleGainGoal = currentUser.fitnessGoal === 'Muscle Gain';
    
    // BMR approximation (Mifflin-St Jeor simplified)
    let bmr = (10 * currentUser.weight) + (6.25 * currentUser.height) - (5 * 25) + 5;
    let targetCals = bmr * 1.5; // Maintenance base
    
    let strategy = '';
    let breakfast, lunch, snack, dinner;

    if (hasWeightLossGoal) {
      strategy = 'Caloric Deficit';
      targetCals -= 500;
      breakfast = '150g Greek Yogurt with 50g Blueberries';
      lunch = '120g Grilled Chicken with 200g Mixed Green Salad';
      snack = '25g Raw Almonds';
      dinner = '150g Baked Cod with 200g Steamed Broccoli';
    } else if (hasMuscleGainGoal || weeklyBurn > 2500) {
      strategy = 'Hypertrophy Focus';
      targetCals += 300;
      breakfast = '3 Whole Eggs (150g) with 100g Whole Grain Toast';
      lunch = '200g Quinoa Bowl with 150g Roasted Turkey';
      snack = '1 Scoop Protein (30g) with 1 Large Banana';
      dinner = '200g Lean Steak with 200g Sweet Potato';
    } else if (weeklyBurn > 1200) {
      strategy = 'Active Maintenance';
      breakfast = '60g Overnight Oats with 15g Chia Seeds';
      lunch = '150g Tuna Wrap with 100g Hummus & Greens';
      snack = '150g Cottage Cheese with 50g Pineapple';
      dinner = '100g Whole Wheat Pasta with 150g Turkey Bolognese';
    } else {
      strategy = 'Metabolic Reset';
      breakfast = '2 Large Eggs (100g) with 100g Sautéed Veggies';
      lunch = '300g Lentil Soup with 50g Kale Chips';
      snack = '150g Sliced Cucumber with 20g Pepper Dip';
      dinner = '200g Zucchini Noodles with 120g Grilled Shrimp';
    }

    // Calculate Water Intake Goal (Base 2L + 0.5L per 60min workout)
    let waterLiters = 2.0 + (weeklyBurn / 1000 * 0.5); 
    if (strategy === 'Caloric Deficit') waterLiters += 0.5; // Extra for metabolism
    const waterGlasses = Math.round(waterLiters * 4); // 1 glass = 250ml

    return { 
      strategy, 
      calories: targetCals, 
      breakfast, 
      lunch, 
      snack, 
      dinner, 
      weeklyBurn, 
      bmr: Math.round(bmr),
      waterGoal: `${waterLiters.toFixed(1)}L (${waterGlasses} Glasses)`
    };
  };

  const saveDietPlan = async () => {
    try {
      const response = await fetch(`http://localhost:9089/api/diet/${currentUser.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: recommendation.strategy,
          totalCalories: recommendation.calories,
          status: 'Active'
        })
      });
      if (response.ok) alert('Diet plan synchronized with your profile!');
    } catch (e) {
      alert('Error saving plan');
    }
  };

  if (!recommendation) return <div className="loading">Analyzing Performance...</div>;

  return (
    <div className="page-layout diet-page">
      <Sidebar />
      <main className="main-content">
        <div className="diet-container">
          <header className="diet-header reveal">
            <h1>Dynamic Diet Strategy</h1>
            <p>Tailored for your <strong>{recommendation.strategy}</strong> phase.</p>
          </header>

          <div className="diet-grid">
            {/* Meal Cards */}
            <div className="meals-section">
              {[
                { time: 'Breakfast', meal: recommendation.breakfast, icon: '🍳' },
                { time: 'Lunch', meal: recommendation.lunch, icon: '🥗' },
                { time: 'Snack', meal: recommendation.snack, icon: '🍎' },
                { time: 'Dinner', meal: recommendation.dinner, icon: '🍲' }
              ].map((item, idx) => (
                <div key={idx} className="glass-panel meal-card reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="meal-icon">{item.icon}</div>
                  <div className="meal-details">
                    <span className="meal-time">{item.time}</span>
                    <h3 className="meal-name">{item.meal}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategy Sidebar */}
            <div className="strategy-sidebar">
              <div className="glass-panel stats-card reveal">
                <h3>Energy Targets</h3>
                <div className="target-stat">
                  <span>Daily Limit</span>
                  <h2>{Math.round(recommendation.calories)} kcal</h2>
                </div>
                <div className="target-stat">
                  <span>Weekly Burn</span>
                  <h2 style={{ color: 'var(--accent-cyan)' }}>{recommendation.weeklyBurn} kcal</h2>
                </div>
              </div>

              {/* Hydration Advisor */}
              <div className="glass-panel hydration-card reveal" style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ fontSize: '2.5rem' }}>💧</div>
                  <div>
                    <h3 style={{ margin: 0, color: 'var(--accent-cyan)' }}>Hydration Advisor</h3>
                    <p style={{ margin: '5px 0 0', fontSize: '1.1rem', fontWeight: '800' }}>{recommendation.waterGoal}</p>
                    <p style={{ margin: '3px 0 0', fontSize: '0.7rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px' }}>Based on {recommendation.weeklyBurn} kcal weekly burn</p>
                  </div>
                </div>
              </div>

              <button className="sync-btn" onClick={saveDietPlan}>SYNC TO PROFILE</button>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .diet-page { background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/images/about/gym_2.png') center/cover fixed; min-height: 100vh; }
        .diet-container { max-width: 1200px; margin: 0 auto; padding: 40px; }
        .diet-header { text-align: center; margin-bottom: 60px; }
        .diet-header h1 { font-size: 3rem; margin-bottom: 10px; background: linear-gradient(to right, #fff, var(--accent-cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        .diet-grid { display: grid; grid-template-columns: 1fr 350px; gap: 40px; }
        
        .meal-card { display: flex; align-items: center; gap: 25px; padding: 25px !important; margin-bottom: 20px; transition: 0.3s; border: 1px solid rgba(255,255,255,0.05); }
        .meal-card:hover { transform: translateX(10px); border-color: var(--accent-cyan); background: rgba(0, 242, 254, 0.05); }
        .meal-icon { font-size: 2.5rem; }
        .meal-time { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-cyan); font-weight: 800; }
        .meal-name { margin: 5px 0 0; font-size: 1.2rem; }

        .stats-card { padding: 30px !important; }
        .target-stat { margin-bottom: 25px; }
        .target-stat span { display: block; font-size: 0.8rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px; }
        .target-stat h2 { margin: 5px 0 0; font-size: 2rem; }

        .hydration-card { padding: 25px !important; border-left: 4px solid var(--accent-cyan); }
        
        .sync-btn { width: 100%; margin-top: 30px; padding: 20px; background: var(--accent-cyan); color: #000; font-weight: 800; letter-spacing: 1px; border-radius: 15px; cursor: pointer; transition: 0.3s; }
        .sync-btn:hover { transform: scale(1.02); box-shadow: 0 10px 30px rgba(0, 242, 254, 0.3); }

        .loading { display: flex; height: 100vh; align-items: center; justify-content: center; font-size: 2rem; color: var(--accent-cyan); font-weight: 900; letter-spacing: 4px; }
      `}} />
    </div>
  );
};

export default DietPlan;
