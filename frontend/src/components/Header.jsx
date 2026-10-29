import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchHealth } from '../services/api';
import BladeboundLogo from './BladeboundLogo';

export default function Header({ isDrawerOpen, setIsDrawerOpen, onPlayClick }) {
  const location = useLocation();
  const [serverStatus, setServerStatus] = useState('CHECKING');

  useEffect(() => {
    let mounted = true;
    const checkServer = async () => {
      const res = await fetchHealth();
      if (mounted) {
        setServerStatus(res && res.status === 'ONLINE' ? 'ONLINE' : 'OFFLINE');
      }
    };
    checkServer();
    const interval = setInterval(checkServer, 10000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const getPageTitle = (path) => {
    switch (path) {
      case '/': return 'Home';
      case '/battlefield': return 'Battlefield';
      case '/warriors': return 'Warriors';
      case '/armoury': return 'Armoury';
      case '/combat-hud': return 'Combat HUD';
      case '/game-modes': return 'Game Modes';
      case '/leaderboards': return 'Rankings';
      case '/profile': return 'Warrior Profile';
      default: return 'Home';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/40">
      <div className="h-16 px-gutter-mobile flex items-center justify-between gap-space-xs">
        <div className="flex items-center gap-space-xs min-w-0">
          <button 
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary cursor-pointer active:scale-95 transition-transform shrink-0"
            aria-label="Toggle Navigation Drawer"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isDrawerOpen ? 'close' : 'menu'}
            </span>
          </button>
          <Link to="/" className="flex items-center gap-space-xs min-w-0 group">
            <BladeboundLogo size={42} showGlow={true} />
            <div className="flex flex-col truncate">
              <span className="font-display-hero text-sm sm:text-base uppercase text-on-surface tracking-wider leading-tight truncate group-hover:text-primary transition-colors">
                BLADEBOUND
              </span>
              <span className="font-caption-sm text-[10px] text-primary-fixed-dim uppercase tracking-widest leading-none truncate">
                {getPageTitle(location.pathname)}
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-space-md">
          <Link 
            to="/" 
            className={`font-label-tactical text-caption-sm uppercase tracking-wider transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary border-b border-primary' : 'text-on-surface-variant'}`}
          >
            SANCTUM
          </Link>
          <Link 
            to="/battlefield" 
            className={`font-label-tactical text-caption-sm uppercase tracking-wider transition-colors hover:text-primary ${location.pathname === '/battlefield' ? 'text-primary border-b border-primary' : 'text-on-surface-variant'}`}
          >
            BATTLEFIELD
          </Link>
          <Link 
            to="/warriors" 
            className={`font-label-tactical text-caption-sm uppercase tracking-wider transition-colors hover:text-primary ${location.pathname === '/warriors' ? 'text-primary border-b border-primary' : 'text-on-surface-variant'}`}
          >
            WARRIORS
          </Link>
          <Link 
            to="/armoury" 
            className={`font-label-tactical text-caption-sm uppercase tracking-wider transition-colors hover:text-primary ${location.pathname === '/armoury' ? 'text-primary border-b border-primary' : 'text-on-surface-variant'}`}
          >
            ARMOURY
          </Link>
          <Link 
            to="/combat-hud" 
            className={`font-label-tactical text-caption-sm uppercase tracking-wider transition-colors hover:text-primary ${location.pathname === '/combat-hud' ? 'text-primary border-b border-primary' : 'text-on-surface-variant'}`}
          >
            HUD
          </Link>
          <Link 
            to="/game-modes" 
            className={`font-label-tactical text-caption-sm uppercase tracking-wider transition-colors hover:text-primary ${location.pathname === '/game-modes' ? 'text-primary border-b border-primary' : 'text-on-surface-variant'}`}
          >
            MODES
          </Link>
          <Link 
            to="/leaderboards" 
            className={`font-label-tactical text-caption-sm uppercase tracking-wider transition-colors hover:text-primary ${location.pathname === '/leaderboards' ? 'text-primary border-b border-primary' : 'text-on-surface-variant'}`}
          >
            RANKINGS
          </Link>
        </nav>

        <div className="flex items-center gap-space-xs shrink-0">
          {/* Live Backend Connection Indicator */}
          <div 
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-stat-mono border ${
              serverStatus === 'ONLINE' 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400' 
                : 'bg-rose-950/40 border-rose-500/40 text-rose-400'
            }`}
            title={`Backend Status: ${serverStatus}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${serverStatus === 'ONLINE' ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`}></span>
            <span className="uppercase tracking-wider font-semibold">
              {serverStatus === 'ONLINE' ? 'SERVER ONLINE' : 'SERVER OFFLINE'}
            </span>
          </div>

          <button 
            onClick={onPlayClick}
            className="h-10 px-space-sm bg-gradient-to-b from-primary-container to-on-primary flex items-center justify-center rounded gap-space-2xs shadow-[0_0_16px_rgba(220,38,38,0.4)] active:scale-95 transition-all text-on-primary-container cursor-pointer"
          >
            <span className="material-symbols-outlined text-on-primary-container text-[16px]">swords</span>
            <span className="font-label-tactical text-label-tactical uppercase text-on-primary-container tracking-wider hidden xs:inline">
              PLAY NOW
            </span>
          </button>
          <Link 
            to="/profile" 
            className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-secondary/60 hover:border-secondary shadow-md shrink-0 active:scale-95 transition-all group"
            title="Warrior Profile"
          >
            <img 
              src="/images/profile_avatar.jpg" 
              alt="Grandmaster Profile Avatar" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-surface"></span>
          </Link>
        </div>
      </div>
    </header>
  );
}
