import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyWorkouts from './pages/MyWorkouts';
import GoalsTarget from './pages/GoalsTarget';
import DietPlan from './pages/DietPlan';
import Feedback from './pages/Feedback';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';

function App() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.id = 'cursor-glow';
    document.body.appendChild(cursor);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;

      // Interactive 3D Tilt for all glass panels
      const panels = document.querySelectorAll('.glass-panel');
      panels.forEach(panel => {
        const rect = panel.getBoundingClientRect();
        const x = clientX - rect.left - rect.width / 2;
        const y = clientY - rect.top - rect.height / 2;
        const rotateX = (y / rect.height) * -10;
        const rotateY = (x / rect.width) * 10;
        panel.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };

    const handleMouseLeave = () => {
      const panels = document.querySelectorAll('.glass-panel');
      panels.forEach(panel => {
        panel.style.transform = `rotateX(0deg) rotateY(0deg)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (cursor && cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-workouts" element={<MyWorkouts />} />
          <Route path="/goals-target" element={<GoalsTarget />} />
          <Route path="/diet-plan" element={<DietPlan />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
