import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    required: true,
    unique: true,
    default: () =>
      `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: "Therapist", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },

  appointmentDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  duration: { type: Number, required: true },

  status: {
    type: String,
    enum: ["pending", "confirmed", "in_progress", "completed", "cancelled", "no_show"],
    default: "pending"
  },

  bookingSource: { type: String, enum: ["voice_call", "web", "admin", "mobile_app"], default: "voice_call" },
  bookingDate: { type: Date, default: Date.now },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "partial", "refunded", "failed"],
    default: "pending"
  },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  paymentMethod: { type: String, enum: ["cash", "card", "upi", "bank_transfer", "wallet"] },
  transactionId: String,

  sessionType: {
    type: String,
    enum: ["initial_consultation", "follow_up", "group_session", "emergency"],
    default: "follow_up"
  },
  sessionNotes: String,
  therapistNotes: String,

  cancellationReason: String,
  cancelledBy: { type: String, enum: ["client", "therapist", "system"] },
  cancelledAt: Date,
  originalAppointmentId: String,

  remindersSent: {
    sms24h: { type: Boolean, default: false },
    sms2h: { type: Boolean, default: false },
    call30min: { type: Boolean, default: false }
  },

  vapiCallId: String,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

appointmentSchema.index({ therapist: 1, appointmentDate: 1, status: 1 });
appointmentSchema.index({ client: 1, appointmentDate: -1 });

appointmentSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Appointment", appointmentSchema);
