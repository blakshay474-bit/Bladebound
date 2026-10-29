import express from 'express';
import { getZones, getZoneById, getArenaTelemetry } from '../controllers/zonesController.js';

const router = express.Router();

router.get('/', getZones);
router.get('/telemetry', getArenaTelemetry);
router.get('/:id', getZoneById);

export default router;
