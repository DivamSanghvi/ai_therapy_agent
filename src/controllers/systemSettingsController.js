import {
  getSetting,
  updateSetting,
  getAllSettings
} from '../services/systemSettingsService.js';

export const getSettingController = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await getSetting(key);
    if (!setting) return res.status(404).json({ error: 'Setting not found' });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSettingController = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, description, category } = req.body;
    const setting = await updateSetting(key, value, description, category);
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllSettingsController = async (req, res) => {
  try {
    const { category } = req.query;
    const settings = await getAllSettings(category);
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
