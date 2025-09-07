import { createAppointment } from './appointmentService.js';

export const bookingSessions = new Map();

export const startBookingFlow = async (initialData) => {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  bookingSessions.set(sessionId, { ...initialData, step: 'started' });
  return { sessionId, message: 'Booking flow started' };
};

export const validateBookingData = async (sessionId, data) => {
  const session = bookingSessions.get(sessionId);
  if (!session) throw new Error('Session not found');
  // TODO: Add validation logic
  session.validatedData = data;
  session.step = 'validated';
  return { valid: true, message: 'Data validated' };
};

export const processPayment = async (sessionId, paymentData) => {
  const session = bookingSessions.get(sessionId);
  if (!session) throw new Error('Session not found');
  // Mock payment processing
  session.paymentProcessed = true;
  session.step = 'payment_processed';
  return { success: true, message: 'Payment processed' };
};

export const finalizeBooking = async (sessionId) => {
  const session = bookingSessions.get(sessionId);
  if (!session) throw new Error('Session not found');
  const appointment = await createAppointment(session.validatedData);
  session.appointment = appointment;
  session.step = 'finalized';
  bookingSessions.delete(sessionId);
  return { success: true, appointmentId: appointment._id, message: 'Booking finalized' };
};

export const handleBookingError = async (sessionId, error) => {
  const session = bookingSessions.get(sessionId);
  if (!session) throw new Error('Session not found');
  session.error = error;
  session.step = 'error';
  bookingSessions.delete(sessionId);
  return { handled: true, message: 'Error handled' };
};
