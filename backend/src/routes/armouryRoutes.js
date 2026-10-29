import express from 'express';
import { getArmoury, getArtifactById, forgeArtifact } from '../controllers/armouryController.js';

const router = express.Router();

router.get('/', getArmoury);
router.post('/forge', forgeArtifact);
router.get('/:id', getArtifactById);

export default router;
