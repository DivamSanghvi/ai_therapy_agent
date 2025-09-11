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
  return await Appointment.find({ client: clientId, status: { $ne: 'cancelled' } }).populate('therapist');
};

export const getAppointmentsByTherapist = async (therapistId) => {
  return await Appointment.find({ therapist: therapistId }).populate('client');
};

export const getUpcomingAppointments = async () => {
  return await Appointment.find({ appointmentDate: { $gte: new Date() }, status: { $in: ['pending', 'confirmed'] } }).populate('therapist client');
};

export const checkAvailabilitySlot = async (therapistId, date, startTime, endTime) => {
  console.log('=== checkAvailabilitySlot START ===');
  console.log('Input params:', { therapistId, date, startTime, endTime });

  const existing = await Appointment.findOne({
    therapist: therapistId,
    appointmentDate: date,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } }
    ],
    status: { $nin: ['cancelled', 'completed'] }
  });
  console.log('Existing appointment check result:', existing);

  if (existing) {
    console.log('Slot not available - existing appointment found');
    return false;
  }

  const availability = await Availability.findOne({ therapist: therapistId, date });
  console.log('Availability check result:', availability);

  if (availability && availability.type === 'unavailable') {
    console.log('Slot not available - therapist unavailable');
    return false;
  }

  const therapist = await Therapist.findById(therapistId);
  console.log('Therapist lookup result:', therapist);

  if (!therapist) {
    console.log('Therapist not found');
    return false;
  }

  console.log('Date input:', date);
  console.log('Date object:', new Date(date));

  // Fix the bug: toLocaleLowerCase is not a method of Date object
  const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  console.log('Calculated day:', day);

  const daySchedule = therapist.weeklySchedule[day];
  console.log('Day schedule:', daySchedule);

  if (!daySchedule || !daySchedule.available) {
    console.log('Slot not available - day not available or no schedule');
    return false;
  }

  const slotFits = daySchedule.slots.some(slot => slot.start <= startTime && slot.end >= endTime);
  console.log('Slot fits result:', slotFits);

  return slotFits;
};

export const getAvailableSlots = async (therapistId, date) => {
  console.log('=== getAvailableSlots START ===');
  console.log('Input params:', { therapistId, date });

  const therapist = await Therapist.findById(therapistId);
  console.log('Therapist lookup result:', therapist);

  if (!therapist) {
    console.log('Therapist not found');
    return [];
  }

  // Fix the same bug here
  const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  console.log('Calculated day:', day);

  const daySchedule = therapist.weeklySchedule[day];
  console.log('Day schedule:', daySchedule);

  if (!daySchedule || !daySchedule.available) {
    console.log('No available schedule for this day');
    return [];
  }

  const appointments = await Appointment.find({
    therapist: therapistId,
    appointmentDate: date,
    status: { $nin: ['cancelled', 'completed'] }
  });
  console.log('Existing appointments:', appointments);

  const availableSlots = daySchedule.slots.filter(slot => {
    const isAvailable = !appointments.some(app =>
      (app.startTime < slot.end && app.endTime > slot.start)
    );
    console.log(`Slot ${slot.start}-${slot.end} available:`, isAvailable);
    return isAvailable;
  });

  console.log('Final available slots:', availableSlots);
  return availableSlots;
};
