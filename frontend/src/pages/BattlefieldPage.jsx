import React, { useState, useEffect } from 'react';
import { zonesData as localZones } from '../data/zonesData';
import { fetchZones, fetchArenaTelemetry } from '../services/api';

export default function BattlefieldPage() {
  const [zonesMap, setZonesMap] = useState(localZones);
  const [activeZoneKey, setActiveZoneKey] = useState('ruins');
  const [telemetry, setTelemetry] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const [zRes, tRes] = await Promise.all([
          fetchZones(),
          fetchArenaTelemetry()
        ]);
        if (mounted) {
          if (zRes && zRes.success && zRes.byId) {
            setZonesMap(zRes.byId);
          }
          if (tRes) {
            setTelemetry(tRes);
          }
        }
      } catch (err) {
        console.warn('Using local fallback zones', err);
      }
    };
    loadData();
    const timer = setInterval(async () => {
      const tRes = await fetchArenaTelemetry();
      if (mounted && tRes) setTelemetry(tRes);
    }, 4000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const activeZone = zonesMap[activeZoneKey] || localZones['ruins'];

  return (
    <div className="flex flex-col w-full text-on-surface py-space-xl px-gutter-mobile max-w-5xl mx-auto">
      <div className="flex flex-col gap-space-2xs mb-space-md">
        <div className="flex items-center gap-space-2xs text-primary">
          <span className="material-symbols-outlined text-[18px]">explore</span>
          <span className="font-label-tactical text-label-tactical uppercase tracking-widest text-primary">
            TERRITORY TELEMETRY
          </span>
          <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-stat-mono bg-surface-container-high text-emerald-400 border border-emerald-500/30">
            {telemetry ? `${telemetry.serverTickRate} • LIVE` : 'SECTOR SENSORS ON'}
          </span>
        </div>
        <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl uppercase text-on-surface tracking-wide">
          ARENA OF THE DAMNED
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Tap combat zones to deploy tactical reconnaissance. Study hazardous drop zones before entering the fog.
        </p>
      </div>

      {/* Live Sector Environmental Telemetry Banner */}
      {telemetry && (
        <div className="mb-4 p-space-xs rounded bg-surface-container-low border border-surface-container-high flex flex-wrap items-center justify-between gap-2 text-xs font-stat-mono">
          <div className="flex items-center gap-1.5 text-secondary">
            <span className="material-symbols-outlined text-[14px]">cloud</span>
            <span>{telemetry.weatherCondition}</span>
          </div>
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[14px]">timer</span>
            <span>STORM COLLAPSE IN: {telemetry.stormCollapseSeconds}s</span>
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px]">groups</span>
            <span>WARRIORS: {telemetry.warriorsAlive}</span>
          </div>
        </div>
      )}

      {/* Map Canvas Card with Pin Nodes */}
      <div className="relative w-full h-[440px] md:h-[520px] rounded-lg overflow-hidden shadow-2xl bg-surface-container-low border border-surface-container-high group">
        {/* Stylized Medieval Dark Map Texture */}
        <div 
          className="w-full h-full bg-cover bg-center filter saturate-105 brightness-95 transition-all duration-700" 
          style={{ 
            backgroundImage: "url('/images/battlefield_map.jpg')" 
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest/20 via-transparent to-surface-container-lowest/80 pointer-events-none"></div>

        {/* Shrinking Safe Zone Ring Indicator */}
        <div className="absolute inset-8 rounded-full border-2 border-dashed border-primary/40 animate-pulse pointer-events-none"></div>

        {/* Tactical Pins */}
        {Object.values(zonesMap).map((z) => {
          const isSelected = z.id === activeZoneKey;
          return (
            <button
              key={z.id}
              onClick={() => setActiveZoneKey(z.id)}
              className={`absolute ${z.coords} w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                isSelected 
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_24px_rgba(220,38,38,1)] scale-110 z-20 animate-bounce' 
                  : 'bg-surface-bright/90 text-on-surface hover:bg-primary-container/80 hover:text-on-primary-container shadow-md z-10'
              }`}
              title={z.name}
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}>
                {z.icon}
              </span>
            </button>
          );
        })}

        {/* Pin Legend Overlay */}
        <div className="absolute bottom-3 left-3 px-space-xs py-1 rounded bg-surface-container-low/90 backdrop-blur-md flex items-center gap-space-xs border border-surface-container-high/50">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
          <span className="font-caption-sm text-caption-sm text-on-surface tracking-wider">
            ACTIVE ZONE FOCUS: {activeZone.name}
          </span>
        </div>
      </div>

      {/* Active Zone Card Display */}
      <div className="p-space-md rounded bg-surface-container flex flex-col gap-space-xs shadow-xl transition-all duration-300 border border-surface-container-high mt-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary-container text-[24px]">
              {activeZone.icon}
            </span>
            <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface">
              {activeZone.name}
            </h3>
          </div>
          <span className={`px-space-xs py-0.5 rounded font-label-tactical text-caption-sm uppercase ${activeZone.hazardColor}`}>
            {activeZone.hazard}
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {activeZone.desc}
        </p>
        <div className="grid grid-cols-2 gap-space-xs mt-space-2xs pt-space-xs border-t border-surface-container-high">
          <div className="p-space-xs rounded bg-surface-container-high flex flex-col">
            <span className="font-caption-sm text-caption-sm text-on-surface-variant uppercase">LOOT TIER</span>
            <span className="font-stat-mono text-stat-mono text-secondary">{activeZone.loot}</span>
          </div>
          <div className="p-space-xs rounded bg-surface-container-high flex flex-col">
            <span className="font-caption-sm text-caption-sm text-on-surface-variant uppercase">TACTICAL HAZARD</span>
            <span className="font-stat-mono text-stat-mono text-primary">{activeZone.choke}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
