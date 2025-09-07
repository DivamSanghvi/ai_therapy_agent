import express from 'express';
import {
  createTherapistController,
  getAllTherapistsController,
  getTherapistByIdController,
  updateTherapistController,
  deleteTherapistController,
  getAvailableTherapistsController,
  updateWeeklyScheduleController,
  addSpecialAvailabilityController,
  getTherapistAppointmentsController
} from '../controllers/therapistController.js';

const router = express.Router();

router.post('/', createTherapistController);
router.get('/', getAllTherapistsController);
router.get('/:id', getTherapistByIdController);
router.put('/:id', updateTherapistController);
router.delete('/:id', deleteTherapistController);
router.get('/available', getAvailableTherapistsController);
router.put('/:id/schedule', updateWeeklyScheduleController);
router.post('/:id/availability', addSpecialAvailabilityController);
router.get('/:id/appointments', getTherapistAppointmentsController);

export default router;
