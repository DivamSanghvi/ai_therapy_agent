import express from 'express';
import {
  checkTherapistAvailabilityController,
  bookAppointmentToolController,
  getClientInfoToolController,
  cancelAppointmentToolController,
  sendConfirmationToolController,
  getAppointmentDetailsToolController
} from '../controllers/vapiToolsController.js';

const router = express.Router();

router.post('/check-availability', checkTherapistAvailabilityController);
router.post('/book-appointment', bookAppointmentToolController);
router.post('/client-info', getClientInfoToolController);
router.post('/cancel-appointment', cancelAppointmentToolController);
router.post('/send-confirmation', sendConfirmationToolController);
router.post('/appointment-details', getAppointmentDetailsToolController);

export default router;
