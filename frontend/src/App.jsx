import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import MobileDrawer from './components/MobileDrawer';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import BattlefieldPage from './pages/BattlefieldPage';
import WarriorsPage from './pages/WarriorsPage';
import ArmouryPage from './pages/ArmouryPage';
import CombatHudPage from './pages/CombatHudPage';
import GameModesPage from './pages/GameModesPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate('/game-modes');
  };

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md flex flex-col min-h-screen relative selection:bg-primary-container selection:text-on-primary-container">
      {/* Top Fixed Header */}
      <Header 
        isDrawerOpen={isDrawerOpen} 
        setIsDrawerOpen={setIsDrawerOpen} 
        onPlayClick={handlePlayClick}
      />

      {/* Mobile Slide-Out Drawer Navigation */}
      <MobileDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />

      {/* Main Viewport Content Routes */}
      <main className="flex-1 relative w-full pt-16 pb-20 bg-surface min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/battlefield" element={<BattlefieldPage />} />
          <Route path="/warriors" element={<WarriorsPage />} />
          <Route path="/armoury" element={<ArmouryPage />} />
          <Route path="/combat-hud" element={<CombatHudPage />} />
          <Route path="/game-modes" element={<GameModesPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>

        {/* Global Footer */}
        <Footer />
      </main>

      {/* Fixed Bottom Mobile Navigation Bar */}
      <BottomNav />
    </div>
  );
}
