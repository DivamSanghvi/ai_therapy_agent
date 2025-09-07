import Availability from '../models/Availability.js';

export const addAvailabilityOverride = async (data) => {
  const availability = new Availability(data);
  return await availability.save();
};

export const removeAvailabilityOverride = async (therapistId, date) => {
  return await Availability.findOneAndDelete({ therapist: therapistId, date });
};

export const getTherapistAvailability = async (therapistId, startDate, endDate) => {
  return await Availability.find({
    therapist: therapistId,
    date: { $gte: startDate, $lte: endDate }
  });
};

export const bulkUpdateAvailability = async (therapistId, overrides) => {
  await Availability.deleteMany({ therapist: therapistId });
  const docs = overrides.map(o => ({ therapist: therapistId, ...o }));
  return await Availability.insertMany(docs);
};
