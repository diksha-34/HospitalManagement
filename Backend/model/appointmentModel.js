const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, 
  reason: { type: String, required: true },
  doctor: { type: String, required: true }, 
  status: { type: String, enum: ['Pending', 'Confirmed', 'Rejected'], default: 'Confirmed' },
  zoomLink: { type: String },
});

module.exports = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
