// server/server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

const userRoutes = require("./routes/userRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");
const statsRoutes = require("./routes/statsRoutes.js");
const labReportRoutes = require("./routes/labReportRoutes.js");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running successfully!");
});

// --- VERIFY THIS LINE ---
// The base path must be exactly '/api/appointments' (plural)
app.use("/api/appointments", appointmentRoutes);

// Other routes
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/reports", labReportRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
