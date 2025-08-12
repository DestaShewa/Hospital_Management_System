// server/routes/appointmentRoutes.js

const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getMyAppointments,
} = require("../controllers/appointmentController.js");
const { protect } = require("../middleware/authMiddleware.js");

// Both routes are protected. A user must be logged in.
router.route("/").post(protect, createAppointment);
router.route("/myappointments").get(protect, getMyAppointments);

module.exports = router;
