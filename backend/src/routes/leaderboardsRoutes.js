import express from 'express';
import { getLeaderboards, submitRecord } from '../controllers/leaderboardsController.js';

const router = express.Router();

router.get('/', getLeaderboards);
router.post('/', submitRecord);

export default router;
