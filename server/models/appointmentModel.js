// server/models/appointmentModel.js

const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    // Link to the user who booked the appointment (the Patient)
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // Link to the doctor the appointment is with
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
