import express from 'express';
import {
  addAvailabilityOverrideController,
  removeAvailabilityOverrideController,
  getTherapistAvailabilityController,
  bulkUpdateAvailabilityController
} from '../controllers/availabilityController.js';

const router = express.Router();

router.post('/override', addAvailabilityOverrideController);
router.delete('/override/:id', removeAvailabilityOverrideController);
router.get('/therapist/:therapistId', getTherapistAvailabilityController);
router.put('/bulk', bulkUpdateAvailabilityController);

export default router;
