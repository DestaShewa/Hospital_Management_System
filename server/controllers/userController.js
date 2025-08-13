// server/controllers/userController.js

const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({ name, email, password, role });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// @desc    Get all users (for Admin)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// --- NEW FUNCTION ADDED HERE ---
// @desc    Get all users with the role of 'Patient'
// @route   GET /api/users/patients
// @access  Private (for logged-in staff like Doctors/Admins)
const getPatientUsers = async (req, res) => {
  try {
    // Find all documents in the User collection where the role is 'Patient'
    const patients = await User.find({ role: "Patient" });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// --- FINAL, UPDATED EXPORTS ---
// Make sure all four functions are exported.
module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getPatientUsers, // <-- The new function is added here
};
