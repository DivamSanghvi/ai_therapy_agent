import mongoose from "mongoose";

const systemSettingsSchema = new mongoose.Schema({
  settingKey: { type: String, required: true, unique: true },
  settingValue: mongoose.Schema.Types.Mixed,
  description: String,
  category: { type: String, enum: ["booking", "payment", "notifications", "ai", "general"], default: "general" },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("SystemSettings", systemSettingsSchema);
