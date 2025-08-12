// server/controllers/userController.js

const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  // 1. Get data from the request body
  const { name, email, password, role } = req.body;

  try {
    // 2. Check if user already exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400); // Bad Request
      throw new Error("User already exists");
    }

    // 3. Create a new user (the password will be hashed automatically by our pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // 4. If user was created successfully, send back user data and a token
    if (user) {
      res.status(201).json({
        // 201 = Created
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id), // Generate a JWT for the user
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
    // 1. Find user by email
    const user = await User.findOne({ email });

    // 2. If user exists and password matches, send back data and token
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401); // Unauthorized
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
