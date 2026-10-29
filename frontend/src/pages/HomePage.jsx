import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeaserModal from '../components/TeaserModal';
import { fetchArenaTelemetry } from '../services/api';

// Section components
import BattlefieldPage from './BattlefieldPage';
import WarriorsPage from './WarriorsPage';
import ArmouryPage from './ArmouryPage';
import CombatHudPage from './CombatHudPage';
import GameModesPage from './GameModesPage';
import LeaderboardsPage from './LeaderboardsPage';
import ProfilePage from './ProfilePage';

export default function HomePage() {
  const navigate = useNavigate();
  const [isTeaserOpen, setIsTeaserOpen] = useState(false);
  const [telemetry, setTelemetry] = useState({
    warriorsAlive: '48 / 50',
    queueStatus: 'MATCH READY',
    queueTime: '00:04',
    survivalRate: '2.4%',
    activeSector: 'ARENA EU-CENTRAL • ONSLAUGHT PROTOCOL'
  });

  useEffect(() => {
    let mounted = true;
    const loadTelemetry = async () => {
      const data = await fetchArenaTelemetry();
      if (data && mounted) {
        setTelemetry(data);
      }
    };
    loadTelemetry();
    const timer = setInterval(loadTelemetry, 5000);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col w-full text-on-surface overflow-x-hidden relative">
      {/* Floating Cinematic Atmospheric Canvas */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute w-2 h-2 rounded-full bg-primary-container blur-[1px] opacity-70 animate-ping top-1/4 left-1/5" style={{ animationDuration: '4s' }}></div>
        <div className="absolute w-1.5 h-1.5 rounded-full bg-secondary-container blur-[0.5px] opacity-60 animate-pulse top-2/3 right-1/4" style={{ animationDuration: '3s' }}></div>
        <div className="absolute w-1 h-1 rounded-full bg-primary-fixed blur-[0.5px] opacity-50 animate-bounce top-1/2 left-3/4" style={{ animationDuration: '6s' }}></div>
      </div>

      {/* 1. FULL-SCREEN CINEMATIC HERO SECTION */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-end overflow-hidden pb-space-xl pt-12">
        {/* Hero Image with High Stakes Scrim & Vignette */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Armoured Knight holding a glowing runic greatsword on an ashen battlefield with burning castle" 
            className="w-full h-full object-cover object-center filter brightness-95 contrast-125 scale-[1.02] transition-transform duration-1000" 
            src="/images/hero_cinematic.jpg"
          />
          {/* Visceral Ember & Blood Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-surface/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-surface/80"></div>
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-surface to-transparent"></div>
          {/* Stylized Peripheral Gore Rim Glow */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(220,38,38,0.35)]"></div>
        </div>

        {/* Live Status Banner */}
        <div className="relative z-20 px-gutter-mobile mb-space-sm max-w-5xl mx-auto w-full">
          <div className="inline-flex items-center gap-space-2xs px-space-sm py-1 rounded bg-surface-container-low/80 backdrop-blur-md border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
            <span className="font-stat-mono text-caption-sm uppercase tracking-widest text-primary-fixed-dim">
              {telemetry.activeSector || 'ARENA EU-CENTRAL • ONSLAUGHT PROTOCOL'}
            </span>
          </div>
        </div>

        {/* Hero Titles & Dramatic Framing */}
        <div className="relative z-20 px-gutter-mobile flex flex-col gap-space-xs max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-space-2xs text-secondary">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            <span className="font-label-tactical text-label-tactical uppercase tracking-widest text-secondary">
              SEASON IV: THE ASHEN ECLIPSE
            </span>
          </div>
          <h1 className="font-display-hero-mobile md:font-display-hero text-display-hero-mobile md:text-display-hero uppercase text-on-surface tracking-wider drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            BLADEBOUND
          </h1>
          <p className="font-headline-sm text-headline-sm uppercase text-primary-fixed-dim tracking-widest drop-shadow-[0_2px_8px_rgba(220,38,38,0.6)]">
            ONLY THE LAST BLADE STANDS
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-space-2xs drop-shadow leading-relaxed">
            Enter the desolate ruins of Valgoth. Master brutal medieval swordplay, guard against catastrophic executions, and outlast 49 rival champions in merciless steel combat.
          </p>

          {/* Tactical CTA Group */}
          <div className="flex flex-col sm:flex-row items-stretch gap-space-xs mt-space-md">
            <button 
              onClick={() => navigate('/game-modes')}
              className="h-14 px-space-lg bg-gradient-to-r from-primary-container via-on-primary to-primary-container rounded shadow-[0_0_28px_rgba(220,38,38,0.55)] flex items-center justify-center gap-space-xs active:scale-95 transition-all text-on-primary-container group cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px] text-on-primary-container group-hover:rotate-45 transition-transform">swords</span>
              <span className="font-headline-sm text-headline-sm tracking-wider uppercase">ENTER BATTLEFIELD</span>
            </button>
            <button 
              onClick={() => setIsTeaserOpen(true)}
              className="h-12 px-space-md bg-surface-container-high/90 backdrop-blur-md rounded flex items-center justify-center gap-space-xs active:scale-95 transition-all text-on-surface hover:bg-surface-bright cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px] text-secondary">play_circle</span>
              <span className="font-label-tactical text-label-tactical uppercase tracking-wider">WATCH TEASER (4K)</span>
            </button>
          </div>

          {/* Live Arena Ticker */}
          <div className="mt-space-md p-space-xs rounded bg-surface-container-low/90 backdrop-blur-lg flex items-center justify-around text-center border border-surface-container-high/50">
            <div className="flex flex-col">
              <span className="font-stat-mono text-stat-mono text-primary">{telemetry.warriorsAlive}</span>
              <span className="font-caption-sm text-caption-sm text-on-surface-variant uppercase">Warriors Alive</span>
            </div>
            <div className="w-px h-8 bg-surface-container-highest"></div>
            <div className="flex flex-col">
              <span className="font-stat-mono text-stat-mono text-secondary">{telemetry.queueStatus}</span>
              <span className="font-caption-sm text-caption-sm text-on-surface-variant uppercase">Queue: {telemetry.queueTime}</span>
            </div>
            <div className="w-px h-8 bg-surface-container-highest"></div>
            <div className="flex flex-col">
              <span className="font-stat-mono text-stat-mono text-primary-fixed-dim">{telemetry.survivalRate}</span>
              <span className="font-caption-sm text-caption-sm text-on-surface-variant uppercase">Survival Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMBAT SYSTEM OVERVIEW */}
      <section className="w-full px-gutter-mobile py-space-xl flex flex-col gap-space-md bg-surface-container-lowest border-y border-surface-container-high/40">
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-space-md">
          <div className="flex flex-col gap-space-2xs">
            <div className="flex items-center gap-space-2xs text-primary">
              <span className="material-symbols-outlined text-[18px]">sports_martial_arts</span>
              <span className="font-label-tactical text-label-tactical uppercase tracking-widest text-primary">MARTIAL COMBAT ARTS</span>
            </div>
            <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl uppercase text-on-surface tracking-wide">
              MASTER THE BLADE
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Fluid precision combat driven by physics, counter frames, poise limits, and lethal stamina punishes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            <div className="p-space-sm rounded bg-surface-container flex items-start gap-space-sm shadow-md border border-surface-container-high">
              <div className="w-10 h-10 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">timer</span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-headline-sm text-headline-sm uppercase text-on-surface">FRAME-PERFECT PARRY</h4>
                <p className="font-body-md text-caption-sm text-on-surface-variant mt-1">
                  Tap block 150ms before enemy steel impacts. Staggers the attacker, granting 100% critical strike riposte.
                </p>
              </div>
            </div>

            <div className="p-space-sm rounded bg-surface-container flex items-start gap-space-sm shadow-md border border-surface-container-high">
              <div className="w-10 h-10 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">gavel</span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-headline-sm text-headline-sm uppercase text-on-surface">GUARD BREAKER</h4>
                <p className="font-body-md text-caption-sm text-on-surface-variant mt-1">
                  Charge heavy attacks against turtling opponents holding shields. Shatters stamina bars and causes poise collapse.
                </p>
              </div>
            </div>

            <div className="p-space-sm rounded bg-surface-container flex items-start gap-space-sm shadow-md border border-surface-container-high">
              <div className="w-10 h-10 rounded bg-surface-bright text-on-surface flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">motion_photos_on</span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-headline-sm text-headline-sm uppercase text-on-surface">DIRECTIONAL COMBOS</h4>
                <p className="font-body-md text-caption-sm text-on-surface-variant mt-1">
                  Chain side slashes into overhead thrusts. Fluid combo strings bypass predictable blocking angles.
                </p>
              </div>
            </div>

            <div className="p-space-sm rounded bg-surface-container flex items-start gap-space-sm shadow-md border border-surface-container-high">
              <div className="w-10 h-10 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">bloodtype</span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-headline-sm text-headline-sm uppercase text-on-surface">RUNIC EXECUTION</h4>
                <p className="font-body-md text-caption-sm text-on-surface-variant mt-1">
                  When an enemy drops below 15% health and stumbles, trigger the cinematic bloodstone finisher instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BATTLEFIELD SECTION */}
      <section id="battlefield" className="w-full border-b border-surface-container-high/40">
        <BattlefieldPage />
      </section>

      {/* 4. WARRIORS SECTION */}
      <section id="warriors" className="w-full border-b border-surface-container-high/40 bg-surface-container-lowest">
        <WarriorsPage />
      </section>

      {/* 5. ARMOURY SECTION */}
      <section id="armoury" className="w-full border-b border-surface-container-high/40">
        <ArmouryPage />
      </section>

      {/* 6. COMBAT HUD SECTION */}
      <section id="combat-hud" className="w-full border-b border-surface-container-high/40 bg-surface-container-lowest">
        <CombatHudPage />
      </section>

      {/* 7. GAME MODES SECTION */}
      <section id="game-modes" className="w-full border-b border-surface-container-high/40">
        <GameModesPage />
      </section>

      {/* 8. LEADERBOARDS SECTION */}
      <section id="leaderboards" className="w-full border-b border-surface-container-high/40 bg-surface-container-lowest">
        <LeaderboardsPage />
      </section>

      {/* 9. PROFILE SECTION */}
      <section id="profile" className="w-full border-b border-surface-container-high/40">
        <ProfilePage />
      </section>

      {/* Teaser Video Overlay Modal */}
      <TeaserModal isOpen={isTeaserOpen} onClose={() => setIsTeaserOpen(false)} />
    </div>
  );
}
