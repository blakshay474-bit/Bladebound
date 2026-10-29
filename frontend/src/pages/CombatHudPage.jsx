import React, { useState } from 'react';
import { postCombatAction, postResetCombat } from '../services/api';

export default function CombatHudPage() {
  const [hp, setHp] = useState(820);
  const [armour, setArmour] = useState(94);
  const [stamina, setStamina] = useState(65);
  const [kills, setKills] = useState(7);
  const [enemyHp, setEnemyHp] = useState(650);
  const [combo, setCombo] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [lastDamage, setLastDamage] = useState(0);
  const [isCritStrike, setIsCritStrike] = useState(false);

  const triggerCombatAction = async (actionType, fallbackMsg, staminaCost = 10) => {
    // Optimistic / Immediate visual trigger
    setToastMessage(fallbackMsg);
    setShowToast(true);

    try {
      const res = await postCombatAction(actionType, hp, stamina, kills, armour);
      if (res && res.success && res.telemetry) {
        setHp(res.telemetry.hp);
        setStamina(res.telemetry.stamina);
        setKills(res.telemetry.kills);
        setEnemyHp(res.telemetry.enemyHp);
        setCombo(res.telemetry.comboCount);
        setLastDamage(res.telemetry.damageDealt);
        setIsCritStrike(res.telemetry.isCrit);
        setToastMessage(res.message);

        // Regenerate stamina over time
        setTimeout(() => {
          setStamina(prev => Math.min(100, prev + (res.telemetry.staminaCost || 10)));
        }, 1200);
      } else {
        // Local fallback
        if (staminaCost > 0) {
          setStamina(prev => Math.max(10, prev - staminaCost));
          setTimeout(() => {
            setStamina(prev => Math.min(100, prev + staminaCost));
          }, 1500);
        }
        if (actionType === 'SLASH' || actionType === 'HEAVY') {
          setKills(prev => prev + 1);
        }
      }
    } catch (err) {
      console.warn('Combat API fallback active', err);
    }

    setTimeout(() => {
      setShowToast(false);
    }, 1600);
  };

  const handleResetCombat = async () => {
    await postResetCombat();
    setHp(820);
    setStamina(65);
    setKills(7);
    setEnemyHp(650);
    setCombo(0);
    setToastMessage('COMBAT SIMULATOR RESET TO VALGOTH ARENA DEFAULTS');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="flex flex-col w-full text-on-surface py-space-xl px-gutter-mobile max-w-5xl mx-auto">
      <div className="flex flex-col gap-space-2xs mb-space-md">
        <div className="flex items-center gap-space-2xs text-secondary">
          <span className="material-symbols-outlined text-[18px]">speed</span>
          <span className="font-label-tactical text-label-tactical uppercase tracking-widest text-secondary">
            INGAME TELEMETRY
          </span>
          <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-stat-mono bg-surface-container-high text-emerald-400 border border-emerald-500/30">
            REST ENGINE TICK: 64Hz
          </span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl uppercase text-on-surface tracking-wide">
            COMBAT HUD INTERFACE
          </h2>
          <button 
            onClick={handleResetCombat}
            className="px-3 py-1 rounded bg-surface-container-high text-xs font-label-tactical uppercase hover:bg-surface-bright flex items-center gap-1 border border-surface-container-highest cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            <span>RESET DUEL</span>
          </button>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Zero firearms. Pure lethal blade mechanics, active stamina control, parry triggers, and dynamic directional combat feedback.
        </p>
      </div>

      {/* Gameplay Viewport Simulation Card */}
      <div className="relative w-full h-[480px] rounded overflow-hidden shadow-2xl bg-surface-container-lowest border border-surface-container-high">
        {/* Combat Scene Backdrop */}
        <img 
          className="w-full h-full object-cover filter brightness-95 contrast-120 group-hover:scale-105 transition-transform duration-700" 
          alt="First-person medieval warrior melee combat scene with parrying steel sparks"
          src="/images/combat_scene.jpg"
        />

        {/* Dynamic Hit Splatter Vignette */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isCritStrike ? 'shadow-[inset_0_0_120px_rgba(220,38,38,0.9)] opacity-100' : 'shadow-[inset_0_0_80px_rgba(220,38,38,0.5)] opacity-80'
        }`}></div>

        {/* TOP HUD OVERLAY BAR */}
        <div className="absolute top-3 inset-x-3 flex items-start justify-between z-20">
          {/* Vitals Stack */}
          <div className="flex flex-col gap-1 w-44 bg-surface-container-lowest/80 p-2 rounded backdrop-blur-md border border-surface-container-high/50">
            {/* HP Bar */}
            <div className="flex items-center justify-between text-[10px] font-stat-mono">
              <span className="text-primary uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">favorite</span> HP
              </span>
              <span className="text-on-surface">{hp} / 1000</span>
            </div>
            <div className="w-full h-2.5 rounded bg-surface-container-lowest/80 overflow-hidden p-0.5 border border-primary/20">
              <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded transition-all duration-300" style={{ width: `${(hp / 1000) * 100}%` }}></div>
            </div>

            {/* Armour Integrity */}
            <div className="flex items-center justify-between text-[10px] font-stat-mono">
              <span className="text-secondary uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">shield</span> ARMOUR
              </span>
              <span className="text-on-surface">{armour}%</span>
            </div>
            <div className="w-full h-2 rounded bg-surface-container-lowest/80 overflow-hidden p-0.5 border border-secondary/20">
              <div className="h-full bg-secondary rounded transition-all duration-300" style={{ width: `${armour}%` }}></div>
            </div>

            {/* Stamina Meter */}
            <div className="flex items-center justify-between text-[10px] font-stat-mono">
              <span className="text-emerald-400 uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">bolt</span> STAMINA
              </span>
              <span className="text-on-surface">{stamina} / 100</span>
            </div>
            <div className="w-full h-1.5 rounded bg-surface-container-lowest/80 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded transition-all duration-300" style={{ width: `${stamina}%` }}></div>
            </div>
          </div>

          {/* Match Telemetry Stack */}
          <div className="flex flex-col items-end gap-1">
            <div className="px-space-xs py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md border border-surface-container-high/50 flex items-center gap-space-2xs text-[11px] font-stat-mono">
              <span className="text-primary font-bold">{kills} ELIMINATIONS</span>
              <span className="text-on-surface-variant">•</span>
              <span className="text-secondary font-bold">COMBO x{combo}</span>
            </div>
            <div className="px-2 py-0.5 rounded bg-surface-container-lowest/80 text-[10px] font-stat-mono text-emerald-400 border border-emerald-500/20">
              FOE HP: {enemyHp} / 1000
            </div>
          </div>
        </div>

        {/* Center Crosshair Target Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-ping"></div>
        </div>

        {/* Floating Damage Float Popup */}
        {lastDamage > 0 && showToast && (
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-2xl font-stat-mono font-bold text-red-500 animate-bounce pointer-events-none drop-shadow-[0_2px_12px_rgba(220,38,38,1)]">
            -{lastDamage} {isCritStrike && 'CRITICAL!'}
          </div>
        )}

        {/* BOTTOM HUD ACTION CONTROLS */}
        <div className="absolute bottom-3 inset-x-3 flex items-end justify-between z-20">
          {/* Virtual Movement Stick */}
          <div className="w-20 h-20 rounded-full bg-surface-container-lowest/70 backdrop-blur-md flex items-center justify-center border border-surface-container-high shadow-lg">
            <div className="w-9 h-9 rounded-full bg-surface-container-high/90 flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[16px] text-on-surface">drag_pan</span>
            </div>
          </div>

          {/* Tactical Melee Action Cluster */}
          <div className="flex flex-col items-end gap-2">
            {/* Top Row: Parry, Dodge, Potion */}
            <div className="flex gap-2">
              <button 
                onClick={() => triggerCombatAction('POTION', 'CRIMSON VIAL DRINK (+180 HP)', 5)}
                className="w-11 h-11 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-400 flex flex-col items-center justify-center active:scale-90 transition-transform shadow-lg border border-emerald-500/30 cursor-pointer"
                title="Restore Health"
              >
                <span className="material-symbols-outlined text-[16px]">local_pharmacy</span>
                <span className="text-[7px] font-label-tactical uppercase">HEAL</span>
              </button>
              <button 
                onClick={() => triggerCombatAction('PARRY', 'BLOCK / PARRY TRIGGERED!', 10)}
                className="w-12 h-12 rounded-full bg-surface-container-high/90 backdrop-blur-md text-secondary flex flex-col items-center justify-center active:scale-90 transition-transform shadow-lg border border-secondary/30 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">shield</span>
                <span className="text-[8px] font-label-tactical uppercase">PARRY</span>
              </button>
              <button 
                onClick={() => triggerCombatAction('DODGE', 'EVASIVE ROLL EXECUTED!', 15)}
                className="w-12 h-12 rounded-full bg-surface-container-high/90 backdrop-blur-md text-on-surface flex flex-col items-center justify-center active:scale-90 transition-transform shadow-lg border border-surface-bright cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">sprint</span>
                <span className="text-[8px] font-label-tactical uppercase">DODGE</span>
              </button>
            </div>

            {/* Bottom Row: Heavy & Primary Slash Button */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => triggerCombatAction('HEAVY', 'HEAVY GUARD-BREAK STRIKE!', 25)}
                className="w-12 h-12 rounded-full bg-surface-container-high/90 backdrop-blur-md text-primary flex flex-col items-center justify-center active:scale-90 transition-transform shadow-lg border border-primary/40 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">gavel</span>
                <span className="text-[8px] font-label-tactical uppercase">HEAVY</span>
              </button>
              <button 
                onClick={() => triggerCombatAction('SLASH', 'PRIMARY RUNIC SLASH HIT!', 12)}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-container to-on-primary text-on-primary-container flex flex-col items-center justify-center active:scale-90 transition-transform shadow-[0_0_24px_rgba(220,38,38,0.8)] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[24px]">swords</span>
                <span className="text-[9px] font-label-tactical uppercase tracking-wider">SLASH</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Toast Indicator Overlay */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-space-md py-space-xs rounded bg-surface-container-lowest/95 text-primary font-label-tactical text-caption-sm uppercase tracking-widest pointer-events-none transition-opacity duration-200 border border-primary/40 z-30 shadow-2xl text-center max-w-xs ${
          showToast ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
        }`}>
          {toastMessage}
        </div>
      </div>
    </div>
  );
}
