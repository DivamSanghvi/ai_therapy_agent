import Client from '../models/client.js';
import Appointment from '../models/appointment.js';

export const createClient = async (data) => {
  console.log('=== createClient START ===');
  console.log('Input data:', JSON.stringify(data, null, 2));

  const client = new Client(data);
  console.log('Client object created:', client);

  const savedClient = await client.save();
  console.log('Client saved to database:', savedClient);

  return savedClient;
};

export const getClientByPhone = async (phone) => {
  console.log('=== getClientByPhone START ===');
  console.log('Input phone:', phone);

  const client = await Client.findOne({ phone });
  console.log('Client lookup result:', client);

  return client;
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
