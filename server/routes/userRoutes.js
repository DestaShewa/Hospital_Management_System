// server/routes/userRoutes.js

const express = require("express");
const router = express.Router();

// Import all four functions from the controller
const {
  registerUser,
  loginUser,
  getUsers,
  getPatientUsers, // <-- Import the new function
} = require("../controllers/userController.js");

// Import the necessary middleware
const { protect, admin } = require("../middleware/authMiddleware.js");

// --- ALL USER ROUTES ---

// Route for registering a new user (Public)
router.route("/register").post(registerUser);

// Route for getting a list of all users (Admin only)
router.route("/").get(protect, admin, getUsers);

// Route for logging in a user (Public)
router.post("/login", loginUser);

// --- NEW ROUTE ADDED HERE ---
// Route for getting a list of only patient users (for Doctors, etc.)
// It is protected, so only logged-in users can access it.
router.route("/patients").get(protect, getPatientUsers);

// Make sure to export the router
module.exports = router;
