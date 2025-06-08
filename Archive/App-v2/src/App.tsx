import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import LawyerOnboarding from './components/LawyerOnboarding';
import ClientManagement from './components/ClientManagement';
import CalendarManagement from './components/CalendarManagement';
import PublicSearch from './components/PublicSearch';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indian-cream via-white to-indian-cream">
        <Routes>
          <Route path="/" element={<PublicSearch />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;