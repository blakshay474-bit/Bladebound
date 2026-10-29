import React, { useState, useEffect } from 'react';
import { warriorsData as localWarriors } from '../data/warriorsData';
import { fetchWarriors, postSelectWarrior } from '../services/api';

export default function WarriorsPage() {
  const [warriorsMap, setWarriorsMap] = useState(localWarriors);
  const [selectedKey, setSelectedKey] = useState('knight');
  const [isEquipped, setIsEquipped] = useState(false);
  const [backendMessage, setBackendMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadChamps = async () => {
      try {
        const response = await fetchWarriors();
        if (response && response.success && response.byId && mounted) {
          setWarriorsMap(response.byId);
          if (response.selectedWarriorId) {
            setSelectedKey(response.selectedWarriorId);
          }
        }
      } catch (err) {
        console.warn('Using local fallback warriors', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    loadChamps();
    return () => { mounted = false; };
  }, []);

  const warrior = warriorsMap[selectedKey] || localWarriors['knight'];

  const handleSelectWarrior = async () => {
    setIsEquipped(true);
    setBackendMessage('Equipping champion with arena server...');
    const res = await postSelectWarrior(selectedKey);
    if (res && res.success) {
      setBackendMessage(res.message);
    } else {
      setBackendMessage('Champion locked locally!');
    }
    setTimeout(() => {
      setIsEquipped(false);
      setBackendMessage('');
    }, 3000);
  };

  return (
    <div className="flex flex-col w-full text-on-surface py-space-xl px-gutter-mobile max-w-5xl mx-auto">
      <div className="flex flex-col gap-space-2xs mb-space-md">
        <div className="flex items-center gap-space-2xs text-secondary">
          <span className="material-symbols-outlined text-[18px]">shield_person</span>
          <span className="font-label-tactical text-label-tactical uppercase tracking-widest text-secondary">
            CHAMPION ROSTER
          </span>
          <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-stat-mono bg-surface-container-high text-emerald-400 border border-emerald-500/30">
            REST API CONNECTED
          </span>
        </div>
        <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl uppercase text-on-surface tracking-wide">
          CHOOSE YOUR BLOODLINE
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Each warrior wields custom weight telemetry, stamina penalties, and unique steel-forged martial rites.
        </p>
      </div>

      {/* Backend Confirmation Notification */}
      {backendMessage && (
        <div className="mb-4 p-3 rounded bg-surface-container-high border border-primary/40 flex items-center gap-2 text-primary animate-pulse">
          <span className="material-symbols-outlined text-[18px]">swords</span>
          <span className="font-stat-mono text-caption-sm">{backendMessage}</span>
        </div>
      )}

      {/* Warrior Select Tabs with Visual Avatars */}
      <div className="flex gap-space-xs overflow-x-auto pb-space-xs no-scrollbar mb-space-md">
        {Object.keys(warriorsMap).map((key) => {
          const w = warriorsMap[key];
          const isActive = key === selectedKey;
          return (
            <button
              key={key}
              onClick={() => {
                setSelectedKey(key);
                setIsEquipped(false);
              }}
              className={`px-3 py-2 rounded font-label-tactical text-label-tactical uppercase whitespace-nowrap transition-all flex items-center gap-2.5 cursor-pointer border ${
                isActive 
                  ? 'bg-primary-container text-on-primary-container border-primary shadow-[0_0_18px_rgba(220,38,38,0.5)] scale-[1.02]' 
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-bright border-surface-container-high'
              }`}
            >
              <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 shrink-0">
                <img src={w.img} alt={w.title} className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold">{w.title}</span>
            </button>
          );
        })}
      </div>

      {/* Warrior Showcase Display Card */}
      <div className="p-space-md rounded bg-surface-container-low flex flex-col gap-space-md shadow-2xl relative overflow-hidden border border-surface-container-high">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-caption-sm text-caption-sm uppercase text-secondary tracking-widest">
              {warrior.archetype}
            </span>
            <h3 className="font-headline-md text-headline-md uppercase text-on-surface">
              {warrior.title}
            </h3>
            <span className="font-body-md text-body-md text-on-surface-variant">
              {warrior.weapon}
            </span>
          </div>
          <div className="px-space-xs py-1 rounded bg-surface-container-highest text-secondary-fixed-dim font-stat-mono text-caption-sm uppercase border border-surface-container-high">
            {warrior.diff}
          </div>
        </div>

        {/* Warrior Illustration Display */}
        <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-2xl bg-surface-container-highest border border-surface-container-high group">
          <img 
            className="w-full h-full object-cover object-top filter brightness-105 contrast-115 group-hover:scale-105 transition-transform duration-700" 
            src={warrior.img} 
            alt={warrior.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="absolute bottom-3 left-3 px-space-xs py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-space-2xs border border-primary/40 shadow-lg">
            <span className="material-symbols-outlined text-[18px] text-primary">auto_fix_high</span>
            <span className="font-label-tactical text-caption-sm uppercase text-on-surface tracking-wider">
              {warrior.ability}
            </span>
          </div>
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-surface-container-lowest/80 text-[10px] font-stat-mono text-secondary border border-secondary/30">
            STUDIO COMBAT RENDER
          </div>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant italic">
          "{warrior.desc}"
        </p>

        {/* Dynamic Stat Channels */}
        <div className="flex flex-col gap-space-xs">
          {/* Attack */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between font-label-tactical text-caption-sm uppercase">
              <span className="text-on-surface-variant">ATTACK POWER</span>
              <span className="text-primary font-stat-mono">{warrior.atk} / 100</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div className="h-full bg-primary transition-all duration-500 rounded-full" style={{ width: `${warrior.atk}%` }}></div>
            </div>
          </div>

          {/* Defense */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between font-label-tactical text-caption-sm uppercase">
              <span className="text-on-surface-variant">POISE / DEFENSE</span>
              <span className="text-secondary font-stat-mono">{warrior.def} / 100</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div className="h-full bg-secondary transition-all duration-500 rounded-full" style={{ width: `${warrior.def}%` }}></div>
            </div>
          </div>

          {/* Speed */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between font-label-tactical text-caption-sm uppercase">
              <span className="text-on-surface-variant">AGILITY / DODGE SPEED</span>
              <span className="text-on-surface font-stat-mono">{warrior.spd} / 100</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div className="h-full bg-on-surface-variant transition-all duration-500 rounded-full" style={{ width: `${warrior.spd}%` }}></div>
            </div>
          </div>
        </div>

        {/* Warrior Equip CTA */}
        <button 
          onClick={handleSelectWarrior}
          className={`h-12 w-full text-on-primary-container rounded font-label-tactical text-label-tactical uppercase tracking-widest flex items-center justify-center gap-space-xs shadow-lg active:scale-95 transition-all cursor-pointer ${
            isEquipped 
              ? 'bg-secondary-container text-on-secondary-container' 
              : 'bg-gradient-to-r from-primary-container to-on-primary shadow-[0_0_20px_rgba(220,38,38,0.4)]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isEquipped ? 'verified' : 'done_all'}
          </span>
          <span>{isEquipped ? 'CHAMPION LOCKED & READY' : 'SELECT THIS WARRIOR'}</span>
        </button>
      </div>
    </div>
  );
}
