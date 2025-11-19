import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { Marketplace } from './pages/Marketplace';
import { Profile } from './pages/Profile';
import { Messages } from './pages/Messages';
import { CalendarPage } from './pages/Calendar';
import { ResourcesPage } from './pages/Resources';
import { ChallengesPage } from './pages/Challenges';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg text-gray-200 font-sans flex flex-col md:flex-row">
        <Navigation />
        
        {/* Main Content Area - Margin adjusted to 64 (16rem) to match Navigation width */}
        <main className="flex-1 md:ml-64 pb-24 md:pb-8 p-4 md:p-8 max-w-7xl mx-auto min-h-screen w-full transition-all duration-300">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;