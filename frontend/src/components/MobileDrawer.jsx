import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BladeboundLogo from './BladeboundLogo';

export default function MobileDrawer({ isOpen, onClose }) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'HOME', icon: 'fort' },
    { path: '/battlefield', label: 'BATTLEFIELD', icon: 'explore' },
    { path: '/warriors', label: 'WARRIORS', icon: 'shield_person' },
    { path: '/armoury', label: 'ARMOURY', icon: 'hardware' },
    { path: '/combat-hud', label: 'HUD SIMULATOR', icon: 'speed' },
    { path: '/game-modes', label: 'GAME MODES', icon: 'swords' },
    { path: '/leaderboards', label: 'RANKINGS', icon: 'military_tech' },
    { path: '/profile', label: 'PROFILE', icon: 'account_circle' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[80vw] max-w-[320px] z-50 bg-surface-container-low/95 backdrop-blur-2xl transform transition-transform duration-300 ease-out flex flex-col pt-safe pb-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-surface-container-high/40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 px-gutter-mobile flex items-center justify-between border-b border-surface-container/50">
          <div className="flex items-center gap-space-2xs">
            <BladeboundLogo size={28} />
            <span className="font-headline-sm text-headline-sm uppercase text-primary-fixed-dim">
              WAR FORGE
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            aria-label="Close Navigation Drawer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-gutter-mobile py-space-sm flex flex-col gap-space-xs">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-space-sm px-space-sm py-space-xs transition-colors rounded ${
                  isActive 
                    ? 'bg-primary-container text-on-primary-container font-bold' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="font-label-tactical text-label-tactical uppercase">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-gutter-mobile border-t border-surface-container/50">
          <div className="p-space-sm bg-surface-container rounded flex flex-col gap-space-2xs">
            <span className="font-caption-sm text-caption-sm text-secondary uppercase">
              REALM SECTOR: EU-7
            </span>
            <span className="font-stat-mono text-stat-mono text-on-surface">
              WAR-STATUS: ONSLAUGHT
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
