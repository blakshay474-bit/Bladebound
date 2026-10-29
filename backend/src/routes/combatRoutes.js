import express from 'express';
import { 
  getCombatState, 
  processCombatAction, 
  resetCombatSession 
} from '../controllers/combatController.js';

const router = express.Router();

router.get('/state', getCombatState);
router.post('/action', processCombatAction);
router.post('/reset', resetCombatSession);

export default router;
