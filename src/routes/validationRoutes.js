import express from 'express';
import {
  validatePhoneNumberController,
  validateAppointmentSlotController,
  validatePaymentDataController,
  validateClientDataController
} from '../controllers/validationController.js';

const router = express.Router();

router.post('/phone', validatePhoneNumberController);
router.post('/slot', validateAppointmentSlotController);
router.post('/payment', validatePaymentDataController);
router.post('/client', validateClientDataController);

export default router;
