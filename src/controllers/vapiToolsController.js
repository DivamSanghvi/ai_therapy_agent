import {
  checkTherapistAvailability,
  bookAppointmentTool,
  getClientInfoTool,
  cancelAppointmentTool,
  sendConfirmationTool,
  getAppointmentDetailsTool
} from '../services/vapiToolsService.js';

export const checkTherapistAvailabilityController = async (req, res) => {
  try {
    const { date, startTime, endTime, specialization } = req.body;
    const result = await checkTherapistAvailability(date, startTime, endTime, specialization);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const bookAppointmentToolController = async (req, res) => {
  try {
    const { clientPhone, therapistId, appointmentDate, startTime, endTime, duration, amount } = req.body;
    if (!clientPhone || !therapistId || !appointmentDate || !startTime || !endTime || !duration || !amount) {
      return res.status(400).json({ error: 'clientPhone, therapistId, appointmentDate, startTime, endTime, duration, and amount are required' });
    }
    const data = req.body;
    const result = await bookAppointmentTool(data);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getClientInfoToolController = async (req, res) => {
  try {
    const { phone } = req.body;
    const result = await getClientInfoTool(phone);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const cancelAppointmentToolController = async (req, res) => {
  try {
    const { id, reason, cancelledBy } = req.body;
    const result = await cancelAppointmentTool(id, reason, cancelledBy);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const sendConfirmationToolController = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const result = await sendConfirmationTool(appointmentId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAppointmentDetailsToolController = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await getAppointmentDetailsTool(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
