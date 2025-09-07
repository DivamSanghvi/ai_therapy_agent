import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: "Therapist", required: true },
  date: { type: Date, required: true },

  type: { type: String, enum: ["unavailable", "custom_schedule", "vacation", "sick_leave"], required: true },

  customSlots: [{ start: String, end: String, available: Boolean }],
  reason: String,

  createdAt: { type: Date, default: Date.now }
});

availabilitySchema.index({ therapist: 1, date: 1 });

export default mongoose.model("Availability", availabilitySchema);
