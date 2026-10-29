import React, { useState, useEffect } from 'react';
import { leaderboardsData as localLeaderboards } from '../data/leaderboardsData';
import { fetchLeaderboards } from '../services/api';

export default function LeaderboardsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('elo');
  const [leaderboard, setLeaderboard] = useState(localLeaderboards);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadRankings = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLeaderboards(searchTerm, sortBy);
        if (mounted && data && Array.isArray(data)) {
          setLeaderboard(data);
        } else if (mounted) {
          // Local fallback filter
          const filtered = localLeaderboards.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setLeaderboard(filtered);
        }
      } catch (err) {
        console.warn('Using local leaderboard fallback', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    const delay = setTimeout(loadRankings, 200);
    return () => {
      mounted = false;
      clearTimeout(delay);
    };
  }, [searchTerm, sortBy]);

  return (
    <div className="flex flex-col w-full text-on-surface py-space-xl px-gutter-mobile max-w-5xl mx-auto">
      <div className="flex flex-col gap-space-2xs mb-space-md">
        <div className="flex items-center gap-space-2xs text-primary">
          <span className="material-symbols-outlined text-[18px]">trophy</span>
          <span className="font-label-tactical text-label-tactical uppercase tracking-widest text-primary">
            HALL OF CHAMPIONS
          </span>
          <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-stat-mono bg-surface-container-high text-emerald-400 border border-emerald-500/30">
            ELO PROTOCOL ACTIVE
          </span>
        </div>
        <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl uppercase text-on-surface tracking-wide">
          SEASON IV RANKINGS
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Global warrior prestige ledger updated in real time after every decisive battlefield climax.
        </p>
      </div>

      {/* Search Bar Input */}
      <div className="relative w-full mb-space-sm">
        <input 
          type="text" 
          placeholder="SEARCH WARRIOR BY NAME..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-11 px-space-md pl-10 rounded bg-surface-container border border-surface-container-high text-on-surface font-label-tactical text-caption-sm uppercase focus:outline-none focus:border-primary"
        />
        <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute left-3 top-3">
          search
        </span>
      </div>

      {/* Sort Buttons */}
      <div className="flex items-center gap-2 mb-space-md overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs font-label-tactical uppercase text-on-surface-variant">SORT BY:</span>
        {['elo', 'victories', 'kills'].map((field) => (
          <button
            key={field}
            onClick={() => setSortBy(field)}
            className={`px-3 py-1 rounded text-xs font-label-tactical uppercase transition-all ${
              sortBy === field 
                ? 'bg-primary-container text-on-primary-container font-bold shadow' 
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {field === 'elo' ? 'HIGHEST ELO' : field === 'victories' ? 'MOST VICTORIES' : 'TOTAL ELIMINATIONS'}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="py-2 text-center text-xs font-stat-mono text-secondary animate-pulse">
          UPDATING RANKING ROSTER...
        </div>
      )}

      {/* Leaderboard Stack */}
      <div className="flex flex-col gap-space-xs mb-space-md">
        {leaderboard.map((item) => (
          <div 
            key={item.rank}
            className={`p-space-sm rounded flex items-center justify-between shadow-lg border transition-all ${
              item.isTop 
                ? 'bg-surface-container-high border-secondary/40' 
                : 'bg-surface-container border-surface-container-high hover:border-surface-bright'
            }`}
          >
            <div className="flex items-center gap-space-sm">
              <div className={`w-8 h-8 rounded-full font-stat-mono text-stat-mono flex items-center justify-center font-bold ${item.rankBg}`}>
                {item.rank}
              </div>
              <div className="flex flex-col">
                <span className={`font-headline-sm text-headline-sm uppercase ${item.nameColor}`}>
                  {item.name}
                </span>
                <span className="font-caption-sm text-caption-sm text-on-surface-variant">
                  {item.victories} Victories • {item.kills} Kills
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-stat-mono text-stat-mono text-primary font-bold">
                {item.elo}
              </span>
              <span className="font-caption-sm text-caption-sm text-secondary">
                {item.winRate}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => alert(`Showing ${leaderboard.length} verified champions for Season IV.`)}
        className="h-12 w-full bg-surface-container hover:bg-surface-bright text-on-surface rounded font-label-tactical text-label-tactical uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer border border-surface-container-high"
      >
        <span className="material-symbols-outlined text-[18px]">format_list_numbered</span>
        <span>SEASON IV LEADERBOARD VERIFIED</span>
      </button>
    </div>
  );
}
