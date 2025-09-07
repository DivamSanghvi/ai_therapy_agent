import {
  createAppointment,
  getAppointmentById,
  updateAppointmentStatus,
  rescheduleAppointment,
  cancelAppointment,
  getAppointmentsByClient,
  getAppointmentsByTherapist,
  getUpcomingAppointments,
  checkAvailabilitySlot,
  getAvailableSlots
} from '../services/appointmentService.js';

export const createAppointmentController = async (req, res) => {
  try {
    const data = req.body;
    const appointment = await createAppointment(data);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAppointmentByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await getAppointmentById(id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAppointmentStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const appointment = await updateAppointmentStatus(id, status);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const rescheduleAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { newDate, newStart, newEnd } = req.body;
    const appointment = await rescheduleAppointment(id, newDate, newStart, newEnd);
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const cancelAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, cancelledBy } = req.body;
    const appointment = await cancelAppointment(id, reason, cancelledBy);
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAppointmentsByClientController = async (req, res) => {
  try {
    const { clientId } = req.params;
    const appointments = await getAppointmentsByClient(clientId);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAppointmentsByTherapistController = async (req, res) => {
  try {
    const { therapistId } = req.params;
    const appointments = await getAppointmentsByTherapist(therapistId);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUpcomingAppointmentsController = async (req, res) => {
  try {
    const appointments = await getUpcomingAppointments();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkAvailabilitySlotController = async (req, res) => {
  try {
    const { therapistId, date, startTime, endTime } = req.query;
    const available = await checkAvailabilitySlot(therapistId, date, startTime, endTime);
    res.json({ available });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAvailableSlotsController = async (req, res) => {
  try {
    const { therapistId, date } = req.query;
    const slots = await getAvailableSlots(therapistId, date);
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
