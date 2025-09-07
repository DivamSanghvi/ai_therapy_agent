import SystemSettings from '../models/SystemSettings.js';

export const getSetting = async (key) => {
  return await SystemSettings.findOne({ settingKey: key });
};

export const updateSetting = async (key, value, description, category) => {
  return await SystemSettings.findOneAndUpdate(
    { settingKey: key },
    { settingValue: value, description, category, updatedAt: new Date() },
    { upsert: true, new: true }
  );
};

export const getAllSettings = async (category) => {
  const query = category ? { category } : {};
  return await SystemSettings.find(query);
};
