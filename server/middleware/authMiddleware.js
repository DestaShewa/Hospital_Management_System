const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

// Checks if the user is logged in by verifying their token
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next(); // Success, go to the next step
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Checks if the logged-in user has the 'Admin' role
const admin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next(); // Success, this user is an Admin
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { protect, admin };
