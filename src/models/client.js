import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
    unique: true,
    default: () =>
      `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, lowercase: true, sparse: true },

  age: { type: Number, min: 13, max: 120 },
  gender: { type: String, enum: ["male", "female", "other", "prefer_not_to_say"] },

  preferredTherapists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Therapist" }],
  preferredSpecializations: [String],
  preferredLanguage: { type: String, default: "english" },
  preferredTimeSlots: [{ day: String, startTime: String, endTime: String }],

  emergencyContact: { name: String, phone: String, relationship: String },

  isActive: { type: Boolean, default: true },
  consentGiven: { type: Boolean, default: false },

  aiTherapySessions: [
    { sessionId: String, date: Date, duration: Number, summary: String, sentiment: String }
  ],

  notes: [String],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

clientSchema.index({ phone: 1 });

clientSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Client", clientSchema);
