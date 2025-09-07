import express from 'express';
import {
  sendAppointmentConfirmationController,
  sendReminderController,
  sendCancellationNoticeController,
  sendRescheduleNoticeController
} from '../controllers/notificationController.js';

const router = express.Router();

router.post('/confirmation', sendAppointmentConfirmationController);
router.post('/reminder', sendReminderController);
router.post('/cancellation', sendCancellationNoticeController);
router.post('/reschedule', sendRescheduleNoticeController);

export default router;
