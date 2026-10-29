import { loadJson } from '../utils/dataLoader.js';

let leaderboardsData = loadJson('leaderboards.json');

export const getLeaderboards = (req, res) => {
  const { search, sortBy = 'elo', limit } = req.query;
  let results = [...leaderboardsData];

  if (search) {
    results = results.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort
  if (sortBy === 'elo') {
    results.sort((a, b) => {
      const eloA = parseInt(a.elo.replace(/[^0-9]/g, ''), 10) || 0;
      const eloB = parseInt(b.elo.replace(/[^0-9]/g, ''), 10) || 0;
      return eloB - eloA;
    });
  } else if (sortBy === 'victories') {
    results.sort((a, b) => {
      const vA = parseInt(a.victories.replace(/[^0-9]/g, ''), 10) || 0;
      const vB = parseInt(b.victories.replace(/[^0-9]/g, ''), 10) || 0;
      return vB - vA;
    });
  } else if (sortBy === 'kills') {
    results.sort((a, b) => {
      const kA = parseInt(a.kills.replace(/[^0-9]/g, ''), 10) || 0;
      const kB = parseInt(b.kills.replace(/[^0-9]/g, ''), 10) || 0;
      return kB - kA;
    });
  }

  if (limit) {
    results = results.slice(0, parseInt(limit, 10));
  }

  res.json({
    success: true,
    season: 'SEASON IV: THE ASHEN ECLIPSE',
    count: results.length,
    data: results
  });
};

export const submitRecord = (req, res) => {
  const { name, victories = '10', kills = '45', elo = '3,200 ELO', winRate = '28.0% WIN' } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Warrior name is required'
    });
  }

  const newRank = String(leaderboardsData.length + 1).padStart(2, '0');
  const newEntry = {
    rank: newRank,
    name: name.toUpperCase(),
    victories,
    kills,
    elo,
    winRate,
    isTop: false,
    rankBg: 'bg-surface-container-highest text-on-surface-variant',
    nameColor: 'text-on-surface-variant'
  };

  leaderboardsData.push(newEntry);

  res.status(201).json({
    success: true,
    message: `Prestige ledger entry recorded for ${newEntry.name}`,
    data: newEntry
  });
};
