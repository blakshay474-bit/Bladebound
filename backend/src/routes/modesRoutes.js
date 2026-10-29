import express from 'express';
import { getModes, joinMatchQueue, getQueueStatus } from '../controllers/modesController.js';

const router = express.Router();

router.get('/', getModes);
router.post('/join', joinMatchQueue);
router.get('/queue/:ticketId', getQueueStatus);

export default router;
