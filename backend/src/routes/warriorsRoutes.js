import express from 'express';
import { 
  getWarriors, 
  getWarriorById, 
  selectWarrior, 
  compareWarriors 
} from '../controllers/warriorsController.js';

const router = express.Router();

router.get('/', getWarriors);
router.get('/compare', compareWarriors);
router.get('/:id', getWarriorById);
router.post('/select', selectWarrior);

export default router;
