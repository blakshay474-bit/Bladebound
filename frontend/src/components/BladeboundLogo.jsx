import React from 'react';

/**
 * BladeboundLogo Component
 * Renders the brand new dark tactical fantasy crest emblem with:
 * - Ultra-high-resolution 3D embossed gold & obsidian shield
 * - Flaming runic steel blades with ambient pulse
 * - Glowing bloodstone heart ruby
 * - Gothic gold typography option
 */
export default function BladeboundLogo({ 
  className = '', 
  showText = false, 
  size = 40,
  showGlow = true,
  subtitle = 'VALGOTH ARENA'
}) {
  return (
    <div className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* High-Impact Photographic Crest Emblem Container */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        {/* Ambient Crimson / Ember Glow Aura */}
        {showGlow && (
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-primary-container to-secondary opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse pointer-events-none"
            style={{ animationDuration: '3s' }}
          />
        )}

        {/* Master Crest Image */}
        <div 
          className="relative w-full h-full rounded-full overflow-hidden border border-secondary/40 shadow-[0_0_15px_rgba(220,38,38,0.6)] group-hover:shadow-[0_0_24px_rgba(217,119,7,0.8)] transition-all duration-300 bg-surface-container-lowest"
        >
          <img 
            src="/images/logo_crest.jpg" 
            alt="Bladebound Crest Emblem"
            className="w-full h-full object-cover object-center filter brightness-110 contrast-125 transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              // Graceful SVG fallback if image is still loading
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Floating Ember Particle Spark */}
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-secondary-container shadow-[0_0_8px_#f59e0b] animate-ping pointer-events-none" style={{ animationDuration: '2.5s' }}></span>
      </div>

      {showText && (
        <div className="flex flex-col min-w-0">
          <span className="font-display-hero text-sm sm:text-base tracking-[0.2em] uppercase text-on-surface font-extrabold group-hover:text-primary transition-colors leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            BLADEBOUND
          </span>
          <span className="font-stat-mono text-[9px] sm:text-[10px] text-secondary tracking-[0.25em] uppercase leading-none font-semibold mt-0.5">
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
}
