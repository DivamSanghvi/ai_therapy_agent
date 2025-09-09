import { getAvailableTherapists } from './therapistService.js';
import { createAppointment } from './appointmentService.js';
import { getClientByPhone, createClient } from './clientService.js';
import { cancelAppointment } from './appointmentService.js';
import { getAppointmentById } from './appointmentService.js';

export const checkTherapistAvailability = async (date, startTime, endTime, specialization) => {
  const therapists = await getAvailableTherapists(date, startTime, endTime, specialization);
  return { availableTherapists: therapists.map(t => ({ name: t.name, id: t._id })) };
};

export const bookAppointmentTool = async (data) => {
  console.log('=== bookAppointmentTool START ===');
  console.log('Input data:', JSON.stringify(data, null, 2));

  const { clientName, clientPhone, therapistId, appointmentDate, startTime, endTime, duration, amount, currency, sessionType, bookingSource } = data;
  console.log('Extracted fields:', { clientName, clientPhone, therapistId, appointmentDate, startTime, endTime, duration, amount, currency, sessionType, bookingSource });

  // Check if client exists, if not create
  console.log('Checking if client exists with phone:', clientPhone);
  let client = await getClientByPhone(clientPhone);
  console.log('Client lookup result:', client);

  if (!client) {
    console.log('Client not found, creating new client with:', { name: clientName, phone: clientPhone });
    client = await createClient({ name: clientName, phone: clientPhone });
    console.log('New client created:', client);
  }

  const appointmentData = {
    therapist: therapistId,
    client: client._id,
    appointmentDate,
    startTime,
    endTime,
    duration,
    amount,
    currency: currency || 'INR',
    sessionType: sessionType || 'follow_up',
    bookingSource: bookingSource || 'voice_call'
  };

  console.log('Appointment data to create:', JSON.stringify(appointmentData, null, 2));
  console.log('Calling createAppointment...');

  const appointment = await createAppointment(appointmentData);
  console.log('createAppointment result:', appointment);

  const result = { success: true, appointmentId: appointment._id, message: 'Appointment booked successfully' };
  console.log('bookAppointmentTool final result:', result);

  return result;
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
