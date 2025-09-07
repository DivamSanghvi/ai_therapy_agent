import Client from '../models/client.js';
import Appointment from '../models/appointment.js';

export const createClient = async (data) => {
  const client = new Client(data);
  return await client.save();
};

export const getClientByPhone = async (phone) => {
  return await Client.findOne({ phone });
};

export const getClientById = async (id) => {
  return await Client.findById(id);
};

export const updateClient = async (id, data) => {
  return await Client.findByIdAndUpdate(id, data, { new: true });
};

export const getClientHistory = async (id) => {
  return await Appointment.find({ client: id });
};

export const addAISessionHistory = async (id, session) => {
  return await Client.findByIdAndUpdate(id, { $push: { aiTherapySessions: session } }, { new: true });
};

export const updateClientPreferences = async (id, preferences) => {
  return await Client.findByIdAndUpdate(id, preferences, { new: true });
};

export const searchClients = async (filters = {}) => {
  return await Client.find(filters);
};
