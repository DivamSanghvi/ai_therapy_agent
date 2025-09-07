import mongoose from "mongoose";

const therapistSchema = new mongoose.Schema({
  therapistId: {
    type: String,
    required: true,
    unique: true,
    default: () =>
      `therapist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true },

  specializations: [
    {
      type: String,
      enum: [
        "anxiety",
        "depression",
        "trauma",
        "relationships",
        "addiction",
        "grief",
        "stress",
        "general"
      ]
    }
  ],
  qualifications: [String],
  experience: { type: Number, min: 0 },
  bio: { type: String, maxlength: 1000 },

  hourlyRate: { type: Number, required: true, min: 0 },
  currency: { type: String, default: "INR" },

  weeklySchedule: {
    monday: { available: { type: Boolean, default: false }, slots: [{ start: String, end: String }] },
    tuesday: { available: { type: Boolean, default: false }, slots: [{ start: String, end: String }] },
    wednesday: { available: { type: Boolean, default: false }, slots: [{ start: String, end: String }] },
    thursday: { available: { type: Boolean, default: false }, slots: [{ start: String, end: String }] },
    friday: { available: { type: Boolean, default: false }, slots: [{ start: String, end: String }] },
    saturday: { available: { type: Boolean, default: false }, slots: [{ start: String, end: String }] },
    sunday: { available: { type: Boolean, default: false }, slots: [{ start: String, end: String }] }
  },

  sessionDuration: { type: Number, default: 60, enum: [30, 45, 60, 90] },
  bufferTime: { type: Number, default: 15 },
  advanceBookingDays: { type: Number, default: 30 },

  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

therapistSchema.index({ specializations: 1, isActive: 1 });
therapistSchema.index({ "weeklySchedule.monday.available": 1 });

therapistSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Therapist", therapistSchema);
