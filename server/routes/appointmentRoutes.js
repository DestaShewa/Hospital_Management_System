// server/routes/appointmentRoutes.js

const express = require("express");
const router = express.Router();

// Import the controller functions
const {
  createAppointment,
  getMyAppointments,
  getDoctorAppointments,
} = require("../controllers/appointmentController.js");

// Import the middleware for security
const { protect, doctor } = require("../middleware/authMiddleware.js");

// --- Route Definitions ---

// Handles POST requests to /api/appointments
router.route("/").post(protect, createAppointment);

// Handles GET requests to /api/appointments/myappointments
router.route("/myappointments").get(protect, getMyAppointments);

// --- THIS IS THE CRITICAL ROUTE ---
// Handles GET requests to /api/appointments/doctor
router.route("/doctor").get(protect, doctor, getDoctorAppointments);

module.exports = router;
