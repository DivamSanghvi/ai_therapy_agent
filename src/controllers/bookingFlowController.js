import {
  startBookingFlow,
  validateBookingData,
  processPayment,
  finalizeBooking,
  handleBookingError
} from '../services/bookingFlowService.js';

export const startBookingFlowController = async (req, res) => {
  try {
    const initialData = req.body;
    const result = await startBookingFlow(initialData);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const validateBookingDataController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const data = req.body;
    const result = await validateBookingData(sessionId, data);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const processPaymentController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const paymentData = req.body;
    const result = await processPayment(sessionId, paymentData);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const finalizeBookingController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const result = await finalizeBooking(sessionId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const handleBookingErrorController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { error } = req.body;
    const result = await handleBookingError(sessionId, error);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
