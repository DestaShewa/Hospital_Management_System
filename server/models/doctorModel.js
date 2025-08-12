const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
  {
    user: {
      // A link to the doctor's user account in the 'users' collection
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    experienceInYears: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
