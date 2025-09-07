export const sendAppointmentConfirmation = async (appointmentId) => {
  // Mock SMS send
  return { success: true, message: 'Appointment confirmation sent' };
};

export const sendReminder = async (appointmentId, type) => {
  // Mock send reminder
  return { success: true, message: `${type} reminder sent` };
};

export const sendCancellationNotice = async (appointmentId) => {
  // Mock send cancellation notice
  return { success: true, message: 'Cancellation notice sent' };
};

export const sendRescheduleNotice = async (appointmentId) => {
  // Mock send reschedule notice
  return { success: true, message: 'Reschedule notice sent' };
};
