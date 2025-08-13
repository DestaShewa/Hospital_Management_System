// server/controllers/appointmentController.js

const Appointment = require("../models/appointmentModel.js");
const Doctor = require("../models/doctorModel.js");

// Function for patients to create an appointment
const createAppointment = async (req, res) => {
  const { doctorId, appointmentDate } = req.body;
  if (!doctorId || !appointmentDate) {
    return res
      .status(400)
      .json({ message: "Please provide a doctor and a date." });
  }
  try {
    const appointment = new Appointment({
      patient: req.user._id,
      doctor: doctorId,
      appointmentDate,
      status: "Scheduled",
    });
    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function for patients to see their own appointments
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user._id,
    }).populate("doctor", "name specialization");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- THIS IS THE CRITICAL FUNCTION ---
// Function for doctors to see their schedule
const getDoctorAppointments = async (req, res) => {
  try {
    const doctorProfile = await Doctor.findOne({ user: req.user._id });
    if (!doctorProfile) {
      return res
        .status(404)
        .json({ message: "Doctor profile not found for this user." });
    }
    const appointments = await Appointment.find({
      doctor: doctorProfile._id,
    }).populate("patient", "name email");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- THIS IS THE CRITICAL EXPORT BLOCK ---
// All three functions must be listed here.
module.exports = {
  createAppointment,
  getMyAppointments,
  getDoctorAppointments,
};
