import express from 'express';
import {
  createAppointmentController,
  getAppointmentByIdController,
  updateAppointmentStatusController,
  rescheduleAppointmentController,
  cancelAppointmentController,
  getAppointmentsByClientController,
  getAppointmentsByTherapistController,
  getUpcomingAppointmentsController,
  checkAvailabilitySlotController,
  getAvailableSlotsController
} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', createAppointmentController);
router.get('/:id', getAppointmentByIdController);
router.put('/:id/status', updateAppointmentStatusController);
router.put('/:id/reschedule', rescheduleAppointmentController);
router.put('/:id/cancel', cancelAppointmentController);
router.get('/client/:clientId', getAppointmentsByClientController);
router.get('/therapist/:therapistId', getAppointmentsByTherapistController);
router.get('/upcoming', getUpcomingAppointmentsController);
router.post('/check-slot', checkAvailabilitySlotController);
router.get('/available-slots', getAvailableSlotsController);

export default router;
