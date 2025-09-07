import express from 'express';
import {
  createClientController,
  getClientByPhoneController,
  getClientByIdController,
  updateClientController,
  getClientHistoryController,
  addAISessionHistoryController,
  updateClientPreferencesController,
  searchClientsController
} from '../controllers/clientController.js';

const router = express.Router();

router.post('/', createClientController);
router.get('/phone/:phone', getClientByPhoneController);
router.get('/:id', getClientByIdController);
router.put('/:id', updateClientController);
router.get('/:id/history', getClientHistoryController);
router.post('/:id/ai-session', addAISessionHistoryController);
router.put('/:id/preferences', updateClientPreferencesController);
router.get('/search', searchClientsController);

export default router;
