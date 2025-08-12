const express = require("express");
const router = express.Router();
const {
  getAllDoctors,
  createDoctorProfile,
} = require("../controllers/doctorController.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

// Route for getting the list of all doctors (Public)
router.route("/").get(getAllDoctors);

// Route for creating a new doctor profile (Protected: Admin Only)
router.route("/").post(protect, admin, createDoctorProfile);

module.exports = router;
