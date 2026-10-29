import React, { useState, useEffect } from 'react';
import { profileData as localProfile } from '../data/profileData';
import { fetchProfile, putUpdateLoadout } from '../services/api';

export default function ProfilePage() {
  const [profile, setProfile] = useState(localProfile);
  const [isEditingLoadout, setIsEditingLoadout] = useState(false);
  const [newLoadout, setNewLoadout] = useState(localProfile.loadout);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    let mounted = true;
    const loadProfileData = async () => {
      const data = await fetchProfile();
      if (mounted && data) {
        setProfile(data);
        setNewLoadout(data.loadout);
      }
    };
    loadProfileData();
    return () => { mounted = false; };
  }, []);

  const handleSaveLoadout = async () => {
    setStatusMsg('Saving loadout to arena server...');
    const res = await putUpdateLoadout(newLoadout);
    if (res && res.success) {
      setProfile(res.data);
      setStatusMsg('Loadout updated on server!');
      setIsEditingLoadout(false);
    } else {
      setProfile(prev => ({ ...prev, loadout: newLoadout }));
      setStatusMsg('Loadout saved locally.');
      setIsEditingLoadout(false);
    }
    setTimeout(() => setStatusMsg(''), 2500);
  };

  return (
    <div className="flex flex-col w-full text-on-surface py-space-xl px-gutter-mobile max-w-5xl mx-auto">
      <div className="flex flex-col gap-space-2xs mb-space-md">
        <div className="flex items-center gap-space-2xs text-secondary">
          <span className="material-symbols-outlined text-[18px]">military_tech</span>
          <span className="font-label-tactical text-label-tactical uppercase tracking-widest text-secondary">
            WAR RECORD
          </span>
          <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-stat-mono bg-surface-container-high text-emerald-400 border border-emerald-500/30">
            PROFILE API SYNCED
          </span>
        </div>
        <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl uppercase text-on-surface tracking-wide">
          WARRIOR PROFILE
        </h2>
      </div>

      {statusMsg && (
        <div className="mb-4 p-2.5 rounded bg-surface-container-high text-emerald-400 border border-emerald-500/30 text-xs font-stat-mono flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Identity & Level Banner */}
      <div className="p-space-md rounded bg-surface-container-low flex flex-col gap-space-md shadow-2xl relative overflow-hidden border border-surface-container-high">
        <div className="flex items-center gap-space-sm">
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-primary border-2 border-secondary shadow-lg">
            <img 
              className="w-full h-full object-cover" 
              src={profile.avatar} 
              alt={profile.name}
            />
            <div className="absolute bottom-0 inset-x-0 bg-primary-container text-on-primary-container text-[8px] font-stat-mono uppercase text-center font-bold py-0.5">
              LVL {profile.level}
            </div>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-space-2xs">
              <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface truncate">
                {profile.name}
              </h3>
              <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
            </div>
            <span className="font-caption-sm text-caption-sm text-secondary uppercase">
              {profile.rankTitle}
            </span>

            {/* XP Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-surface-container-highest mt-2 overflow-hidden">
              <div className="h-full bg-secondary transition-all duration-500 rounded-full" style={{ width: `${profile.xpPercent}%` }}></div>
            </div>
          </div>
        </div>

        {/* Combat Records 3-Column Bento */}
        <div className="grid grid-cols-3 gap-space-2xs text-center border-t border-surface-container-high pt-space-sm">
          <div className="p-space-xs rounded bg-surface-container flex flex-col border border-surface-container-high">
            <span className="font-stat-mono text-stat-mono text-on-surface font-bold">
              {profile.stats.battles}
            </span>
            <span className="font-caption-sm text-[10px] text-on-surface-variant uppercase">BATTLES</span>
          </div>
          <div className="p-space-xs rounded bg-surface-container flex flex-col border border-surface-container-high">
            <span className="font-stat-mono text-stat-mono text-primary font-bold">
              {profile.stats.victories}
            </span>
            <span className="font-caption-sm text-[10px] text-on-surface-variant uppercase">VICTORIES</span>
          </div>
          <div className="p-space-xs rounded bg-surface-container flex flex-col border border-surface-container-high">
            <span className="font-stat-mono text-stat-mono text-secondary font-bold">
              {profile.stats.eliminations}
            </span>
            <span className="font-caption-sm text-[10px] text-on-surface-variant uppercase">ELIMINATIONS</span>
          </div>
        </div>

        {/* Preferred Equipment Loadout */}
        <div className="p-space-xs rounded bg-surface-container flex flex-col gap-2 border border-surface-container-high">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">swords</span>
              <div className="flex flex-col">
                <span className="font-caption-sm text-caption-sm text-on-surface-variant uppercase">FAVORED LOADOUT</span>
                {!isEditingLoadout ? (
                  <span className="font-stat-mono text-caption-sm text-on-surface font-bold">{profile.loadout}</span>
                ) : (
                  <input
                    type="text"
                    value={newLoadout}
                    onChange={(e) => setNewLoadout(e.target.value)}
                    className="mt-1 px-2 py-1 rounded bg-surface-container-lowest text-xs font-stat-mono text-on-surface border border-primary focus:outline-none"
                  />
                )}
              </div>
            </div>
            {!isEditingLoadout ? (
              <button 
                onClick={() => setIsEditingLoadout(true)}
                className="px-space-xs py-0.5 rounded bg-primary-container text-on-primary-container font-label-tactical text-[9px] uppercase cursor-pointer hover:bg-on-primary"
              >
                CUSTOMIZE
              </button>
            ) : (
              <div className="flex gap-1">
                <button 
                  onClick={handleSaveLoadout}
                  className="px-2 py-0.5 rounded bg-emerald-600 text-white font-label-tactical text-[9px] uppercase"
                >
                  SAVE
                </button>
                <button 
                  onClick={() => setIsEditingLoadout(false)}
                  className="px-2 py-0.5 rounded bg-surface-bright text-on-surface font-label-tactical text-[9px] uppercase"
                >
                  CANCEL
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Trophies & Feats Section */}
        <div className="flex flex-col gap-space-2xs mt-space-2xs">
          <span className="font-label-tactical text-caption-sm uppercase text-secondary tracking-wider">
            TROPHY HALL FEATS
          </span>
          <div className="grid grid-cols-2 gap-space-xs">
            {profile.trophies.map((t) => (
              <div key={t.id} className="p-space-xs rounded bg-surface-container-high flex items-center gap-2 border border-surface-container-highest">
                <span className={`material-symbols-outlined text-[20px] ${t.iconColor}`}>
                  {t.icon}
                </span>
                <div className="flex flex-col">
                  <span className="font-label-tactical text-[10px] uppercase text-on-surface font-bold">
                    {t.title}
                  </span>
                  <span className="text-[9px] text-on-surface-variant">
                    {t.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
