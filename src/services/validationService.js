export const validatePhoneNumber = (phone) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
};

export const validateAppointmentSlot = (date, startTime, endTime) => {
  const now = new Date();
  const appointmentDate = new Date(date);
  if (appointmentDate < now) return false;
  const start = new Date(`${date}T${startTime}`);
  const end = new Date(`${date}T${endTime}`);
  if (start >= end) return false;
  return true;
};

export const validatePaymentData = (data) => {
  return data.amount > 0 && data.method;
};

export const validateClientData = (data) => {
  return data.name && data.phone && validatePhoneNumber(data.phone);
};
