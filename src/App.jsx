import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Marketplace from './Marketplace';
import NGO from './NGO';
import Header from './Header';
import LandingPage from './LandingPage';
import Footer from './Footer';
import PlaceholderPage from './PlaceholderPage';
import AuthPage from './AuthPage';
import './App.css';
import { FaCheckCircle, FaLeaf, FaRecycle } from 'react-icons/fa';
import Confetti from './Confetti';

function WelcomeModal({ onClose }) {
  const [dontShow, setDontShow] = useState(false);
  
  const handleClose = () => {
    if (dontShow) localStorage.setItem('hideWelcome', 'true');
    onClose();
  };
  
  return (
    <div className="welcome-modal-backdrop">
      <div className="welcome-modal" role="dialog" aria-modal="true" aria-label="Welcome to ReBuy">
        <h2>👋 Welcome to <span style={{color: 'var(--primary)'}}>ReBuy</span>!</h2>
        <p>Discover a smarter, greener way to handle retail returns and shop sustainably.</p>
        <ul>
          <li><FaCheckCircle color="#43a047" style={{marginRight: 6}}/> Upload and classify returns</li>
          <li><FaLeaf color="#388e3c" style={{marginRight: 6}}/> Shop eco-friendly, pre-loved products</li>
          <li><FaRecycle color="#fbc02d" style={{marginRight: 6}}/> Track your positive impact</li>
        </ul>
        <label style={{display: 'flex', alignItems: 'center', margin: '1rem 0'}}>
          <input 
            type="checkbox" 
            checked={dontShow} 
            onChange={e => setDontShow(e.target.checked)} 
            style={{marginRight: 8}} 
          />
          Don't show again
        </label>
        <button className="button" onClick={handleClose} autoFocus>Get Started</button>
      </div>
    </div>
  );
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('hideWelcome')) setShowWelcome(true);
  }, []);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <Router>
      <div className="app-container">
        {showConfetti && <Confetti />}
        <Header />
        
        <main>
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard triggerConfetti={triggerConfetti} />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/ngo" element={<NGO triggerConfetti={triggerConfetti} />} />

            {/* Auth Pages */}
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />

            {/* Placeholder Pages */}
            <Route path="/resources" element={<PlaceholderPage />} />
            <Route path="/pricing" element={<PlaceholderPage />} />
            <Route path="/about" element={<PlaceholderPage />} />
            <Route path="/careers" element={<PlaceholderPage />} />
            <Route path="/press" element={<PlaceholderPage />} />
            <Route path="/faq" element={<PlaceholderPage />} />
            <Route path="/contact" element={<PlaceholderPage />} />
            <Route path="/privacy" element={<PlaceholderPage />} />
          </Routes>
        </main>
        
        <Footer />
        {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
      </div>
    </Router>
  );
}
