import React from 'react';

export default function InspectArtifactModal({ artifact, onClose }) {
  if (!artifact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-lg bg-surface-container-low border border-secondary/40 rounded shadow-2xl p-space-md flex flex-col gap-space-sm">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className={`px-space-xs py-0.5 rounded font-stat-mono text-caption-sm uppercase ${artifact.rarityBg}`}>
              {artifact.rarity}
            </span>
            <span className="font-stat-mono text-stat-mono text-secondary">
              {artifact.tier}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="relative w-full h-48 rounded bg-surface-container-highest overflow-hidden">
          <img 
            src={artifact.img} 
            alt={artifact.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 px-space-xs py-1 rounded bg-surface-container-lowest/90 font-stat-mono text-stat-mono text-primary font-bold">
            {artifact.statLabel}
          </div>
        </div>

        <div className="flex flex-col gap-space-2xs">
          <h3 className="font-headline-md text-headline-md uppercase text-on-surface">
            {artifact.name}
          </h3>
          <span className={`font-caption-sm text-caption-sm font-bold ${artifact.specialColor}`}>
            {artifact.special}
          </span>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
            {artifact.desc}
          </p>
        </div>

        <div className="flex items-center justify-between pt-space-xs border-t border-surface-container-high mt-space-xs">
          <span className="font-label-tactical text-caption-sm uppercase text-on-surface-variant">
            CATEGORY: {artifact.category}
          </span>
          <button 
            onClick={onClose}
            className="h-9 px-space-md bg-secondary-container text-on-secondary-container rounded font-label-tactical text-caption-sm uppercase font-bold"
          >
            EQUIP TO LOADOUT
          </button>
        </div>
      </div>
    </div>
  );
}
