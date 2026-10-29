import React from 'react';

export default function TeaserModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-3xl bg-surface-container-low border border-primary/40 rounded shadow-2xl p-space-md flex flex-col gap-space-sm">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-space-xs">
          <div className="flex items-center gap-space-2xs text-secondary">
            <span className="material-symbols-outlined text-[20px]">play_circle</span>
            <span className="font-headline-sm text-headline-sm uppercase text-on-surface">
              BLADEBOUND 4K CINEMATIC TEASER
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Video Container Simulation */}
        <div className="relative w-full aspect-video rounded overflow-hidden bg-black flex items-center justify-center group shadow-inner">
          <img 
            src="/images/hero_cinematic.jpg" 
            alt="Teaser Preview" 
            className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-16 h-16 rounded-full bg-primary-container/90 text-on-primary-container flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.8)] animate-pulse cursor-pointer">
              <span className="material-symbols-outlined text-[36px]">play_arrow</span>
            </div>
            <span className="font-label-tactical text-caption-sm text-on-surface tracking-widest uppercase bg-surface/80 px-3 py-1 rounded">
              TEASER PLAYBACK INITIALIZING...
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-caption-sm font-caption-sm text-on-surface-variant">
          <span>SEASON IV: THE ASHEN ECLIPSE</span>
          <span className="text-secondary font-stat-mono">4K 60FPS HDR</span>
        </div>
      </div>
    </div>
  );
}
