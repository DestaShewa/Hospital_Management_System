// server/controllers/statsController.js

const User = require("../models/userModel.js");
const Doctor = require("../models/doctorModel.js");
const Appointment = require("../models/appointmentModel.js");

// @desc    Get summary statistics for the admin dashboard
// @route   GET /api/stats/summary
// @access  Private/Admin
const getSummaryStats = async (req, res) => {
  try {
    // Count the total number of documents in each collection
    const totalPatients = await User.countDocuments({ role: "Patient" });
    const totalDoctors = await Doctor.countDocuments({});
    const totalAppointments = await Appointment.countDocuments({});

    // This is a more advanced query to get the distribution of user roles for a pie chart
    // It groups users by their 'role' and counts how many are in each group.
    const userRoleDistribution = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
      // This part renames the fields to be more chart-friendly ('name' and 'value')
      { $project: { name: "$_id", value: "$count", _id: 0 } },
    ]);

    // Send all the calculated stats back in a single JSON object
    res.json({
      totalPatients,
      totalDoctors,
      totalAppointments,
      userRoleDistribution,
    });
  } catch (error) {
    // If any of the database queries fail, send back an error
    res.status(500).json({ message: error.message });
  }
};

// Make sure the controller function is exported correctly in an object.
module.exports = { getSummaryStats };
