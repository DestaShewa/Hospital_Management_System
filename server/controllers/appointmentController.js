// server/controllers/appointmentController.js

const Appointment = require("../models/appointmentModel.js");

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private (Patient)
const createAppointment = async (req, res) => {
  // Get doctor ID and date from the request body
  const { doctorId, appointmentDate } = req.body;

  if (!doctorId || !appointmentDate) {
    return res
      .status(400)
      .json({ message: "Please provide a doctor and a date." });
  }

  try {
    const appointment = new Appointment({
      patient: req.user._id, // The patient's ID comes from the 'protect' middleware
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

// @desc    Get logged-in user's appointments
// @route   GET /api/appointments/myappointments
// @access  Private (Patient)
const getMyAppointments = async (req, res) => {
  try {
    // Find all appointments where the 'patient' field matches the logged-in user's ID
    const appointments = await Appointment.find({
      patient: req.user._id,
    }).populate("doctor", "name specialization"); // Also fetch the doctor's name and specialization

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAppointment, getMyAppointments };
