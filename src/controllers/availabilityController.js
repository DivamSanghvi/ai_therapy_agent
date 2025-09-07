import {
  addAvailabilityOverride,
  removeAvailabilityOverride,
  getTherapistAvailability,
  bulkUpdateAvailability
} from '../services/availabilityService.js';

export const addAvailabilityOverrideController = async (req, res) => {
  try {
    const data = req.body;
    const availability = await addAvailabilityOverride(data);
    res.status(201).json(availability);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeAvailabilityOverrideController = async (req, res) => {
  try {
    const { therapistId, date } = req.params;
    const result = await removeAvailabilityOverride(therapistId, date);
    if (!result) return res.status(404).json({ error: 'Availability override not found' });
    res.json({ message: 'Availability override removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTherapistAvailabilityController = async (req, res) => {
  try {
    const { therapistId, startDate, endDate } = req.query;
    const availability = await getTherapistAvailability(therapistId, startDate, endDate);
    res.json(availability);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const bulkUpdateAvailabilityController = async (req, res) => {
  try {
    const { therapistId } = req.params;
    const overrides = req.body;
    const result = await bulkUpdateAvailability(therapistId, overrides);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
