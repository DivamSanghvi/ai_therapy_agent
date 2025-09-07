import express from 'express';
import {
  startBookingFlowController,
  validateBookingDataController,
  processPaymentController,
  finalizeBookingController,
  handleBookingErrorController
} from '../controllers/bookingFlowController.js';

const router = express.Router();

router.post('/start', startBookingFlowController);
router.post('/validate', validateBookingDataController);
router.post('/payment', processPaymentController);
router.post('/finalize', finalizeBookingController);
router.post('/error', handleBookingErrorController);

export default router;
