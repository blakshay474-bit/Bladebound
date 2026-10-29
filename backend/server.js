import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PORT } from './src/config/constants.js';

import warriorsRoutes from './src/routes/warriorsRoutes.js';
import zonesRoutes from './src/routes/zonesRoutes.js';
import armouryRoutes from './src/routes/armouryRoutes.js';
import modesRoutes from './src/routes/modesRoutes.js';
import leaderboardsRoutes from './src/routes/leaderboardsRoutes.js';
import profileRoutes from './src/routes/profileRoutes.js';
import combatRoutes from './src/routes/combatRoutes.js';

dotenv.config();

const app = express();

// Global Middleware
app.use(cors({
  origin: '*', // Allow connections from Vite dev server on any localhost port
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tactical API Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`⚔️ [${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Root API Discovery Catalog
app.get('/api', (req, res) => {
  res.json({
    name: 'BLADEBOUND ARENA REST API',
    realm: 'VALGOTH ONSLAUGHT PROTOCOL',
    version: '2.0.0',
    documentation: 'Battlefield endpoints for medieval arena simulator',
    endpoints: {
      health: 'GET /api/health',
      warriors: {
        list: 'GET /api/warriors',
        compare: 'GET /api/warriors/compare?id1=knight&id2=berserker',
        detail: 'GET /api/warriors/:id',
        select: 'POST /api/warriors/select'
      },
      zones: {
        list: 'GET /api/zones',
        telemetry: 'GET /api/zones/telemetry',
        detail: 'GET /api/zones/:id'
      },
      armoury: {
        list: 'GET /api/armoury?category=LONG%20SWORDS',
        forge: 'POST /api/armoury/forge',
        detail: 'GET /api/armoury/:id'
      },
      modes: {
        list: 'GET /api/modes',
        join: 'POST /api/modes/join',
        status: 'GET /api/modes/queue/:ticketId'
      },
      leaderboards: {
        list: 'GET /api/leaderboards?search=...&sortBy=elo',
        submit: 'POST /api/leaderboards'
      },
      profile: {
        get: 'GET /api/profile',
        update: 'PUT /api/profile',
        loadout: 'PUT /api/profile/loadout',
        trophies: 'POST /api/profile/trophies'
      },
      combat: {
        state: 'GET /api/combat/state',
        action: 'POST /api/combat/action',
        reset: 'POST /api/combat/reset'
      }
    }
  });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'BLADEBOUND ARENA BACKEND API',
    version: '2.0.0',
    realmSector: 'EU-CENTRAL • ONSLAUGHT PROTOCOL',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    nodeVersion: process.version
  });
});

// Mount Routes
app.use('/api/warriors', warriorsRoutes);
app.use('/api/zones', zonesRoutes);
app.use('/api/armoury', armouryRoutes);
app.use('/api/modes', modesRoutes);
app.use('/api/leaderboards', leaderboardsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/combat', combatRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found on BLADEBOUND arena server`,
    catalog: 'GET /api for full endpoint roster'
  });
});

// Central Global Error Handler
app.use((err, req, res, next) => {
  console.error('💥 Arena Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Arena Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Combat runtime exception'
  });
});

const server = app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`⚔️  BLADEBOUND ARENA BACKEND ACTIVE`);
  console.log(`🏰 Sector: EU-CENTRAL (Valgoth Realm)`);
  console.log(`🌐 Base URL: http://localhost:${PORT}`);
  console.log(`📖 Endpoint Catalog: http://localhost:${PORT}/api`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});

// Handle graceful termination
process.on('SIGTERM', () => {
  console.log('⚔️  Received SIGTERM, closing Bladebound Arena server...');
  server.close(() => process.exit(0));
});

export default app;
