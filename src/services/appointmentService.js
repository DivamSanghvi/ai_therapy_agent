import Appointment from '../models/appointment.js';
import Therapist from '../models/therapist.js';
import Availability from '../models/Availability.js';

export const createAppointment = async (data) => {
  const isAvailable = await checkAvailabilitySlot(data.therapist, data.appointmentDate, data.startTime, data.endTime);
  if (!isAvailable) throw new Error('Slot not available');
  const appointment = new Appointment(data);
  return await appointment.save();
};

export const getAppointmentById = async (id) => {
  return await Appointment.findById(id).populate('therapist client');
};

export const updateAppointmentStatus = async (id, status) => {
  return await Appointment.findByIdAndUpdate(id, { status }, { new: true });
};

export const rescheduleAppointment = async (id, newDate, newStart, newEnd) => {
  const appointment = await Appointment.findById(id);
  if (!appointment) throw new Error('Appointment not found');
  const isAvailable = await checkAvailabilitySlot(appointment.therapist, newDate, newStart, newEnd);
  if (!isAvailable) throw new Error('New slot not available');
  return await Appointment.findByIdAndUpdate(id, { appointmentDate: newDate, startTime: newStart, endTime: newEnd }, { new: true });
};

export const cancelAppointment = async (id, reason, cancelledBy) => {
  return await Appointment.findByIdAndUpdate(id, { status: 'cancelled', cancellationReason: reason, cancelledBy }, { new: true });
};

export const getAppointmentsByClient = async (clientId) => {
  return await Appointment.find({ client: clientId }).populate('therapist');
};

export const getAppointmentsByTherapist = async (therapistId) => {
  return await Appointment.find({ therapist: therapistId }).populate('client');
};

export const getUpcomingAppointments = async () => {
  return await Appointment.find({ appointmentDate: { $gte: new Date() }, status: { $in: ['pending', 'confirmed'] } }).populate('therapist client');
};

export const checkAvailabilitySlot = async (therapistId, date, startTime, endTime) => {
  const existing = await Appointment.findOne({
    therapist: therapistId,
    appointmentDate: date,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } }
    ],
    status: { $nin: ['cancelled', 'completed'] }
  });
  if (existing) return false;

  const availability = await Availability.findOne({ therapist: therapistId, date });
  if (availability && availability.type === 'unavailable') return false;

  const therapist = await Therapist.findById(therapistId);
  const day = new Date(date).toLocaleLowerCase('en-US', { weekday: 'long' });
  const daySchedule = therapist.weeklySchedule[day];
  if (!daySchedule.available) return false;

  const slotFits = daySchedule.slots.some(slot => slot.start <= startTime && slot.end >= endTime);
  return slotFits;
};

export const getAvailableSlots = async (therapistId, date) => {
  const therapist = await Therapist.findById(therapistId);
  const day = new Date(date).toLocaleLowerCase('en-US', { weekday: 'long' });
  const daySchedule = therapist.weeklySchedule[day];
  if (!daySchedule.available) return [];

  const appointments = await Appointment.find({
    therapist: therapistId,
    appointmentDate: date,
    status: { $nin: ['cancelled', 'completed'] }
  });

  return daySchedule.slots.filter(slot => {
    return !appointments.some(app =>
      (app.startTime < slot.end && app.endTime > slot.start)
    );
  });
};
