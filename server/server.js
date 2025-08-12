// server/server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors
const connectDB = require("./config/db.js");

// Import our new routes
const userRoutes = require("./routes/userRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js"); // <-- 1. IMPORTED THIS
const appointmentRoutes = require("./routes/appointmentRoutes.js"); // 1. Import appointment routes

dotenv.config();
connectDB();

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); // Use cors middleware to allow cross-origin requests
app.use(express.json()); // Use express.json() to parse JSON bodies

// --- ROUTES ---
app.get("/", (req, res) => {
  res.send("API is running successfully!");
});

// Tell the app to use our user routes
// Any request to '/api/users' will be handled by userRoutes
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes); // <-- 2. ADDED THIS
app.use("/api/appointments", appointmentRoutes); // 2. Use the appointment routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
