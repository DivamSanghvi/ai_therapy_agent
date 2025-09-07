import {
  sendAppointmentConfirmation,
  sendReminder,
  sendCancellationNotice,
  sendRescheduleNotice
} from '../services/notificationService.js';

export const sendAppointmentConfirmationController = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const result = await sendAppointmentConfirmation(appointmentId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendReminderController = async (req, res) => {
  try {
    const { appointmentId, type } = req.body;
    const result = await sendReminder(appointmentId, type);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendCancellationNoticeController = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const result = await sendCancellationNotice(appointmentId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendRescheduleNoticeController = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const result = await sendRescheduleNotice(appointmentId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
