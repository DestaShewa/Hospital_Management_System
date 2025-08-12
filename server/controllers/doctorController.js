const Doctor = require("../models/doctorModel.js");
const User = require("../models/userModel.js");

// Logic to get all doctors from the database
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Logic to create a new doctor profile in the database
const createDoctorProfile = async (req, res) => {
  const { userId, name, specialization, qualifications, experienceInYears } =
    req.body;

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== "Doctor") {
      return res
        .status(400)
        .json({ message: "A valid user with the Doctor role is required." });
    }

    const doctorExists = await Doctor.findOne({ user: userId });
    if (doctorExists) {
      return res
        .status(400)
        .json({ message: "Doctor profile already exists for this user." });
    }

    const doctor = new Doctor({
      user: userId,
      name,
      specialization,
      qualifications,
      experienceInYears,
    });

    const createdDoctor = await doctor.save();
    res.status(201).json(createdDoctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllDoctors, createDoctorProfile };
