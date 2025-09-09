import Therapist from '../models/therapist.js';
import Availability from '../models/Availability.js';
import Appointment from '../models/appointment.js';

export const createTherapist = async (data) => {
  const therapist = new Therapist(data);
  return await therapist.save();
};

export const getAllTherapists = async (filters = {}) => {
  return await Therapist.find(filters);
};

export const getTherapistById = async (id) => {
  return await Therapist.findById(id);
};

export const updateTherapist = async (id, data) => {
  return await Therapist.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTherapist = async (id) => {
  return await Therapist.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

export const getAvailableTherapists = async (date, startTime, endTime, specialization) => {
  console.log('=== getAvailableTherapists START ===');
  console.log('Input params:', { date, startTime, endTime, specialization });

  let query = { isActive: true };
  if (specialization) query.specializations = specialization;
  console.log('Query to execute:', query);

  const therapists = await Therapist.find(query);
  console.log('Therapists found:', therapists.length);

  // TODO: Implement availability check logic
  console.log('getAvailableTherapists result:', therapists);
  return therapists;
};

export const updateWeeklySchedule = async (id, schedule) => {
  return await Therapist.findByIdAndUpdate(id, { weeklySchedule: schedule }, { new: true });
};

export const addSpecialAvailability = async (id, availabilityData) => {
  const availability = new Availability({ therapist: id, ...availabilityData });
  return await availability.save();
};

export const getTherapistAppointments = async (id) => {
  return await Appointment.find({ therapist: id });
};
