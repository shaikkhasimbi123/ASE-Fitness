import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Feedback from './pages/Feedback';
import MyWorkouts from './pages/MyWorkouts';
import GoalsTarget from './pages/GoalsTarget';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/my-workouts" element={<MyWorkouts />} />
          <Route path="/goals-target" element={<GoalsTarget />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
