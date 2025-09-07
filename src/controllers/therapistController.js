import {
  createTherapist,
  getAllTherapists,
  getTherapistById,
  updateTherapist,
  deleteTherapist,
  getAvailableTherapists,
  updateWeeklySchedule,
  addSpecialAvailability,
  getTherapistAppointments
} from '../services/therapistService.js';

export const createTherapistController = async (req, res) => {
  try {
    const data = req.body;
    const therapist = await createTherapist(data);
    res.status(201).json(therapist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTherapistsController = async (req, res) => {
  try {
    const { specialization, isActive } = req.query;
    const filters = {};
    if (specialization) filters.specializations = { $in: [specialization] };
    if (isActive !== undefined) filters.isActive = isActive === 'true';
    const therapists = await getAllTherapists(filters);
    res.json(therapists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTherapistByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const therapist = await getTherapistById(id);
    if (!therapist) return res.status(404).json({ error: 'Therapist not found' });
    res.json(therapist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTherapistController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const therapist = await updateTherapist(id, data);
    if (!therapist) return res.status(404).json({ error: 'Therapist not found' });
    res.json(therapist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTherapistController = async (req, res) => {
  try {
    const { id } = req.params;
    const therapist = await deleteTherapist(id);
    if (!therapist) return res.status(404).json({ error: 'Therapist not found' });
    res.json({ message: 'Therapist deactivated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAvailableTherapistsController = async (req, res) => {
  try {
    const { date, startTime, endTime, specialization } = req.query;
    const therapists = await getAvailableTherapists(date, startTime, endTime, specialization);
    res.json(therapists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateWeeklyScheduleController = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = req.body;
    const therapist = await updateWeeklySchedule(id, schedule);
    if (!therapist) return res.status(404).json({ error: 'Therapist not found' });
    res.json(therapist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addSpecialAvailabilityController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const availability = await addSpecialAvailability(id, data);
    res.status(201).json(availability);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTherapistAppointmentsController = async (req, res) => {
  try {
    const { id } = req.params;
    const appointments = await getTherapistAppointments(id);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
