import {
  createClient,
  getClientByPhone,
  getClientById,
  updateClient,
  getClientHistory,
  addAISessionHistory,
  updateClientPreferences,
  searchClients
} from '../services/clientService.js';

export const createClientController = async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }
    const data = req.body;
    const client = await createClient(data);
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getClientByPhoneController = async (req, res) => {
  try {
    const { phone } = req.params;
    const client = await getClientByPhone(phone);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getClientByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await getClientById(id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateClientController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const client = await updateClient(id, data);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getClientHistoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const history = await getClientHistory(id);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addAISessionHistoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const session = req.body;
    const client = await addAISessionHistory(id, session);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateClientPreferencesController = async (req, res) => {
  try {
    const { id } = req.params;
    const preferences = req.body;
    const client = await updateClientPreferences(id, preferences);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchClientsController = async (req, res) => {
  try {
    const filters = req.query;
    const clients = await searchClients(filters);
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
