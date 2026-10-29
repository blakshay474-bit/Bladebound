import { loadJson } from '../utils/dataLoader.js';

const rawZones = loadJson('zones.json');
const zonesData = Array.isArray(rawZones) ? rawZones : Object.values(rawZones);
const zonesById = Array.isArray(rawZones) 
  ? rawZones.reduce((acc, zone) => {
      acc[zone.id] = zone;
      return acc;
    }, {})
  : rawZones;

export const getZones = (req, res) => {
  res.json({
    success: true,
    count: zonesData.length,
    data: zonesData,
    byId: zonesById
  });
};

export const getZoneById = (req, res) => {
  const { id } = req.params;
  const zone = zonesById[id.toLowerCase()];
  if (!zone) {
    return res.status(404).json({
      success: false,
      message: `Combat territory '${id}' not found on the battlefield map.`
    });
  }
  res.json({
    success: true,
    data: zone
  });
};

export const getArenaTelemetry = (req, res) => {
  // Simulate dynamic live match telemetry
  const aliveCount = Math.floor(40 + Math.random() * 10);
  const queueSeconds = Math.floor(3 + Math.random() * 6);
  const stormClosingIn = Math.floor(45 + Math.random() * 90);

  res.json({
    success: true,
    data: {
      warriorsAlive: `${aliveCount} / 50`,
      aliveCount,
      totalCount: 50,
      queueStatus: 'MATCH READY',
      queueTime: `00:0${queueSeconds}`,
      survivalRate: `${(aliveCount / 50 * 3.5).toFixed(1)}%`,
      activeSector: 'ARENA EU-CENTRAL • ONSLAUGHT PROTOCOL',
      season: 'SEASON IV: THE ASHEN ECLIPSE',
      stormCollapseSeconds: stormClosingIn,
      serverTickRate: '64 TICKS/SEC',
      weatherCondition: 'ASHEN FOG (VISIBILITY 35m)'
    }
  });
};
