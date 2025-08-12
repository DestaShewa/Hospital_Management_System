// server/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController.js");

// Define the route for registering a user
// When a POST request is made to '/register', call the 'registerUser' controller function
router.post("/register", registerUser);

// Define the route for logging in a user
// When a POST request is made to '/login', call the 'loginUser' controller function
router.post("/login", loginUser);

module.exports = router;
