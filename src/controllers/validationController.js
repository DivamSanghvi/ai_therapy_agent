import {
  validatePhoneNumber,
  validateAppointmentSlot,
  validatePaymentData,
  validateClientData
} from '../services/validationService.js';

export const validatePhoneNumberController = (req, res) => {
  const { phone } = req.body;
  const valid = validatePhoneNumber(phone);
  res.json({ valid });
};

export const validateAppointmentSlotController = (req, res) => {
  const { date, startTime, endTime } = req.body;
  const valid = validateAppointmentSlot(date, startTime, endTime);
  res.json({ valid });
};

export const validatePaymentDataController = (req, res) => {
  const data = req.body;
  const valid = validatePaymentData(data);
  res.json({ valid });
};

export const validateClientDataController = (req, res) => {
  const data = req.body;
  const valid = validateClientData(data);
  res.json({ valid });
};
