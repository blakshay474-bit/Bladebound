import React from 'react';
import { Link } from 'react-router-dom';
import BladeboundLogo from './BladeboundLogo';

export default function Footer() {
  return (
    <footer className="w-full px-gutter-mobile py-space-xl bg-surface-container-lowest flex flex-col gap-space-md border-t border-surface-container-high/40 mt-space-md">
      <div className="flex flex-col items-center text-center gap-space-xs">
        <BladeboundLogo size={52} />
        <h3 className="font-headline-md text-headline-md uppercase text-on-surface tracking-wider">
          BLADEBOUND
        </h3>
        <p className="font-caption-sm text-caption-sm text-secondary uppercase tracking-widest">
          ONE BATTLEFIELD. ONE BLADE. ONE SURVIVOR.
        </p>
      </div>

      {/* Quick Navigation Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs text-center max-w-3xl mx-auto w-full">
        <Link className="font-label-tactical text-caption-sm uppercase text-on-surface-variant hover:text-primary py-1 transition-colors" to="/battlefield">
          THE BATTLEFIELD
        </Link>
        <Link className="font-label-tactical text-caption-sm uppercase text-on-surface-variant hover:text-primary py-1 transition-colors" to="/warriors">
          WARRIORS
        </Link>
        <Link className="font-label-tactical text-caption-sm uppercase text-on-surface-variant hover:text-primary py-1 transition-colors" to="/armoury">
          ARMOURY
        </Link>
        <Link className="font-label-tactical text-caption-sm uppercase text-on-surface-variant hover:text-primary py-1 transition-colors" to="/leaderboards">
          RANKINGS
        </Link>
        <Link className="font-label-tactical text-caption-sm uppercase text-on-surface-variant hover:text-primary py-1 transition-colors" to="/game-modes">
          GAME MODES
        </Link>
        <Link className="font-label-tactical text-caption-sm uppercase text-on-surface-variant hover:text-primary py-1 transition-colors" to="/combat-hud">
          COMBAT HUD
        </Link>
        <a className="font-label-tactical text-caption-sm uppercase text-on-surface-variant hover:text-primary py-1 transition-colors" href="#">
          PRIVACY CODEX
        </a>
        <a className="font-label-tactical text-caption-sm uppercase text-on-surface-variant hover:text-primary py-1 transition-colors" href="#">
          TERMS OF STEEL
        </a>
      </div>

      {/* Medieval Community Hub Banners */}
      <div className="flex items-center justify-center gap-space-md py-space-xs text-on-surface-variant">
        <a className="hover:text-primary transition-colors flex items-center gap-1 font-label-tactical text-caption-sm uppercase" href="#" target="_blank" rel="noreferrer">
          <span className="material-symbols-outlined text-[20px]">forum</span> DISCORD
        </a>
        <a className="hover:text-secondary transition-colors flex items-center gap-1 font-label-tactical text-caption-sm uppercase" href="#" target="_blank" rel="noreferrer">
          <span className="material-symbols-outlined text-[20px]">live_tv</span> TWITCH
        </a>
        <a className="hover:text-primary transition-colors flex items-center gap-1 font-label-tactical text-caption-sm uppercase" href="#" target="_blank" rel="noreferrer">
          <span className="material-symbols-outlined text-[20px]">smart_display</span> YOUTUBE
        </a>
      </div>

      <div className="text-center font-caption-sm text-[10px] text-on-surface-variant/60 leading-relaxed">
        © 2026 BLADEBOUND STUDIOS. ALL RIGHTS RESERVED. REALM SECTOR EU-7 ONSLAUGHT PROTOCOL ACTIVE. DESIGNED FOR DARK FANTASY COMBAT ENTHUSIASTS.
      </div>
    </footer>
  );
}
