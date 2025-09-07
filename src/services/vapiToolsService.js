import { getAvailableTherapists } from './therapistService.js';
import { createAppointment } from './appointmentService.js';
import { getClientByPhone } from './clientService.js';
import { cancelAppointment } from './appointmentService.js';
import { getAppointmentById } from './appointmentService.js';

export const checkTherapistAvailability = async (date, startTime, endTime, specialization) => {
  const therapists = await getAvailableTherapists(date, startTime, endTime, specialization);
  return { availableTherapists: therapists.map(t => ({ name: t.name, id: t._id })) };
};

export const bookAppointmentTool = async (data) => {
  const appointment = await createAppointment(data);
  return { success: true, appointmentId: appointment._id, message: 'Appointment booked successfully' };
};

export const getClientInfoTool = async (phone) => {
  const client = await getClientByPhone(phone);
  if (!client) return { error: 'Client not found' };
  return { clientInfo: { name: client.name, phone: client.phone, id: client._id } };
};

export const cancelAppointmentTool = async (id, reason, cancelledBy) => {
  const appointment = await cancelAppointment(id, reason, cancelledBy);
  return { success: true, message: 'Appointment cancelled' };
};

export const sendConfirmationTool = async (appointmentId) => {
  // Mock SMS send
  return { success: true, message: 'Confirmation sent' };
};

export const getAppointmentDetailsTool = async (id) => {
  const appointment = await getAppointmentById(id);
  if (!appointment) return { error: 'Appointment not found' };
  return { appointmentDetails: appointment };
};
