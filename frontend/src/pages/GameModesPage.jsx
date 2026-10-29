import React, { useState, useEffect } from 'react';
import { fetchModes, postJoinQueue } from '../services/api';

const defaultModes = [
  {
    id: 'last-warrior',
    name: 'LAST WARRIOR (SOLO)',
    type: '50 PLAYERS • SOLO',
    badgeType: 'SOLO SURVIVAL',
    queueTime: '~12s',
    activePlayers: 1842,
    color: 'text-primary',
    btnBg: 'bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(220,38,38,0.4)]',
    icon: 'play_arrow',
    desc: 'Drop into the expanding Ashen Eclipse fog. Scavenge ancient weapons and survive until only one warrior remains breathing.'
  },
  {
    id: 'honor-duel',
    name: 'HONOR DUEL (1v1)',
    type: 'RANKED ELO',
    badgeType: 'RANKED COMPETITIVE',
    queueTime: '~5s',
    activePlayers: 630,
    color: 'text-secondary',
    btnBg: 'bg-secondary-container text-on-secondary-container',
    icon: 'swords',
    desc: 'Pure competitive swordsmanship in an enclosed sand ring. Best of 5 rounds. No potions, no escape.'
  },
  {
    id: 'castle-siege',
    name: 'CASTLE SIEGE (16v16)',
    type: '16v16 OBJECTIVE',
    badgeType: 'MASSIVE OBJECTIVE',
    queueTime: '~28s',
    activePlayers: 944,
    color: 'text-on-surface',
    btnBg: 'bg-surface-container-high hover:bg-surface-bright text-on-surface',
    icon: 'fort',
    desc: 'Battering rams, burning oil cauldrons, and throne room breaches. Defend or topple the keep.'
  }
];

export default function GameModesPage() {
  const [modesList, setModesList] = useState(defaultModes);
  const [deployingMode, setDeployingMode] = useState(null);
  const [activeTicket, setActiveTicket] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadModes = async () => {
      const data = await fetchModes();
      if (data && Array.isArray(data) && mounted) {
        setModesList(data.map((m, idx) => ({
          ...defaultModes[idx % defaultModes.length],
          ...m
        })));
      }
    };
    loadModes();
    return () => { mounted = false; };
  }, []);

  const handleDeploy = async (mode) => {
    setDeployingMode(mode.id);
    const res = await postJoinQueue(mode.id);
    if (res && res.ticketId) {
      setActiveTicket(res);
    } else {
      setActiveTicket({
        ticketId: `LOCAL-${Math.floor(Math.random() * 90000)}`,
        mode,
        region: 'EU-CENTRAL',
        estimatedWaitSeconds: 4
      });
    }

    setTimeout(() => {
      setDeployingMode(null);
    }, 2500);
  };

  return (
    <div className="flex flex-col w-full text-on-surface py-space-xl px-gutter-mobile max-w-5xl mx-auto">
      <div className="flex flex-col gap-space-2xs mb-space-md">
        <div className="flex items-center gap-space-2xs text-secondary">
          <span className="material-symbols-outlined text-[18px]">military_tech</span>
          <span className="font-label-tactical text-label-tactical uppercase tracking-widest text-secondary">
            ENGAGEMENT THEATRES
          </span>
          <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-stat-mono bg-surface-container-high text-emerald-400 border border-emerald-500/30">
            MATCHMAKING ENGINE READY
          </span>
        </div>
        <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl uppercase text-on-surface tracking-wide">
          WARFARE MODES
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Select your battlefield protocol. From solo survival arenas to tactical fortress sieges.
        </p>
      </div>

      {/* Matchmaking Ticket Banner */}
      {activeTicket && (
        <div className="mb-4 p-4 rounded bg-surface-container-high border-2 border-primary/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px] animate-spin">
              sync
            </span>
            <div className="flex flex-col">
              <span className="font-headline-sm text-sm uppercase text-on-surface">
                {activeTicket.message || `Matchmaking for ${activeTicket.mode?.name}`}
              </span>
              <span className="font-stat-mono text-xs text-primary">
                TICKET: {activeTicket.ticketId} • REGION: {activeTicket.region || 'EU-CENTRAL'}
              </span>
            </div>
          </div>
          <button 
            onClick={() => setActiveTicket(null)}
            className="px-3 py-1 rounded bg-surface-bright text-xs font-label-tactical uppercase hover:bg-surface-container-lowest"
          >
            DISMISS
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-space-sm">
        {modesList.map((mode) => {
          const isCurrentDeploying = deployingMode === mode.id;
          return (
            <div 
              key={mode.id}
              className="p-space-md rounded bg-surface-container-low flex flex-col gap-space-xs shadow-xl relative overflow-hidden border border-surface-container-high hover:border-secondary/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className={`font-headline-sm text-headline-sm uppercase ${mode.color || 'text-primary'}`}>
                  {mode.name}
                </span>
                <span className="font-stat-mono text-caption-sm px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface">
                  {mode.type}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {mode.desc}
              </p>
              <div className="flex items-center justify-between mt-space-2xs pt-space-xs border-t border-surface-container-high">
                <span className="font-stat-mono text-caption-sm text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">timer</span> QUEUE: {mode.queueTime} • {mode.activePlayers || 1000}+ IN COMBAT
                </span>
                <button 
                  onClick={() => handleDeploy(mode)}
                  disabled={deployingMode !== null}
                  className={`h-10 px-space-md rounded font-label-tactical text-caption-sm uppercase tracking-wider flex items-center gap-1 active:scale-95 transition-all cursor-pointer ${mode.btnBg || 'bg-primary-container text-on-primary-container'}`}
                >
                  <span className="material-symbols-outlined text-[16px] animate-pulse">
                    {isCurrentDeploying ? 'sync' : (mode.icon || 'play_arrow')}
                  </span> 
                  <span>{isCurrentDeploying ? 'QUEUING MATCH...' : 'DEPLOY SQUAD'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
