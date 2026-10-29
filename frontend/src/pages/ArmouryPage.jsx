import React, { useState, useEffect } from 'react';
import { armouryData as localArmoury } from '../data/armouryData';
import InspectArtifactModal from '../components/InspectArtifactModal';
import { fetchArmoury } from '../services/api';

export default function ArmouryPage() {
  const [activeCategory, setActiveCategory] = useState('ALL BLADES');
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [items, setItems] = useState(localArmoury);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['ALL BLADES', 'LONG SWORDS', 'GREAT SWORDS', 'DUAL WEAPONS', 'SHIELDS'];

  useEffect(() => {
    let mounted = true;
    const loadArmouryItems = async () => {
      setIsLoading(true);
      try {
        const res = await fetchArmoury(activeCategory, searchTerm);
        if (mounted && res && Array.isArray(res)) {
          setItems(res);
        } else if (mounted) {
          // Local fallback
          let filtered = localArmoury;
          if (activeCategory !== 'ALL BLADES') {
            filtered = filtered.filter(item => item.category === activeCategory);
          }
          if (searchTerm) {
            filtered = filtered.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
          }
          setItems(filtered);
        }
      } catch (err) {
        console.warn('Using local armoury fallback', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    const delayDebounce = setTimeout(loadArmouryItems, 250);
    return () => {
      mounted = false;
      clearTimeout(delayDebounce);
    };
  }, [activeCategory, searchTerm]);

  return (
    <div className="flex flex-col w-full text-on-surface py-space-xl px-gutter-mobile max-w-5xl mx-auto">
      <div className="flex flex-col gap-space-2xs mb-space-md">
        <div className="flex items-center gap-space-2xs text-primary">
          <span className="material-symbols-outlined text-[18px]">hardware</span>
          <span className="font-label-tactical text-label-tactical uppercase tracking-widest text-primary">
            THE BLACKSMITH VAULT
          </span>
          <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-stat-mono bg-surface-container-high text-emerald-400 border border-emerald-500/30">
            ARSENAL API SYNCED
          </span>
        </div>
        <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl uppercase text-on-surface tracking-wide">
          ARMOURY & ARSENAL
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Inspect tempered steel and bloodstone blades forged in dragon kiln fires.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative w-full mb-space-sm">
        <input 
          type="text" 
          placeholder="SEARCH ARTIFACT BY WEAPON NAME OR TRAIT..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-11 px-space-md pl-10 rounded bg-surface-container border border-surface-container-high text-on-surface font-label-tactical text-caption-sm uppercase focus:outline-none focus:border-primary"
        />
        <span className="material-symbols-outlined text-[18px] text-on-surface-variant absolute left-3 top-3">
          search
        </span>
      </div>

      {/* Weapon Category Filter Pills */}
      <div className="flex gap-space-xs overflow-x-auto pb-space-xs no-scrollbar mb-space-md">
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-space-sm py-1 rounded font-label-tactical text-caption-sm uppercase whitespace-nowrap transition-all cursor-pointer ${
                isActive 
                  ? 'bg-secondary-container text-on-secondary-container font-bold shadow-md' 
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-bright'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Loading state indicator */}
      {isLoading && (
        <div className="py-4 text-center font-stat-mono text-caption-sm text-secondary animate-pulse">
          FETCHING BLACKSMITH RELICS...
        </div>
      )}

      {/* Weapon Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
        {items.map((item) => (
          <div 
            key={item.id}
            className="p-space-sm rounded bg-surface-container flex flex-col gap-space-xs shadow-lg relative overflow-hidden group border border-surface-container-high hover:border-secondary/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className={`px-space-xs py-0.5 rounded font-stat-mono text-caption-sm uppercase ${item.rarityBg}`}>
                {item.rarity}
              </span>
              <span className="font-stat-mono text-stat-mono text-primary">
                {item.statLabel}
              </span>
            </div>

            <div className="relative w-full h-36 rounded bg-surface-container-highest overflow-hidden">
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-1 right-2 font-caption-sm text-caption-sm text-secondary uppercase tracking-widest bg-surface-container-lowest/80 px-2 py-0.5 rounded">
                {item.tier}
              </div>
            </div>

            <div className="flex flex-col">
              <h4 className="font-headline-sm text-headline-sm uppercase text-on-surface">
                {item.name}
              </h4>
              <span className={`font-caption-sm text-caption-sm ${item.specialColor}`}>
                {item.special}
              </span>
            </div>

            <button 
              onClick={() => setSelectedArtifact(item)}
              className="h-9 w-full bg-surface-container-high hover:bg-surface-bright text-on-surface rounded font-label-tactical text-caption-sm uppercase flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>INSPECT ARTIFACT</span>
            </button>
          </div>
        ))}
      </div>

      {/* Artifact Telemetry Modal */}
      <InspectArtifactModal 
        artifact={selectedArtifact} 
        onClose={() => setSelectedArtifact(null)} 
      />
    </div>
  );
}
