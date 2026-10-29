import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'SANCTUM', icon: 'fort' },
    { path: '/battlefield', label: 'WAR', icon: 'explore' },
    { path: '/armoury', label: 'FORGE', icon: 'hardware' },
    { path: '/combat-hud', label: 'HUD', icon: 'speed' },
    { path: '/profile', label: 'KNIGHT', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl border-t border-surface-container-high/40 shadow-[0_-1px_8px_rgba(0,0,0,0.3)]">
      <div className="h-16 px-gutter-mobile flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-12 h-12 transition-all ${
                isActive 
                  ? 'text-primary scale-110' 
                  : 'text-on-surface-variant hover:text-on-surface active:scale-95'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span className="font-label-tactical text-label-tactical uppercase text-[9px]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
