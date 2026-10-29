import express from 'express';
import { 
  getProfile, 
  updateLoadout, 
  updateProfile, 
  addTrophy 
} from '../controllers/profileController.js';

const router = express.Router();

router.get('/', getProfile);
router.put('/', updateProfile);
router.put('/loadout', updateLoadout);
router.post('/trophies', addTrophy);

export default router;
