// server/models/labReportModel.js

const mongoose = require("mongoose");

const labReportSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    reportUrl: { type: String, required: true }, // URL from Cloudinary
    publicId: { type: String, required: true }, // Public ID from Cloudinary (for deletion)
  },
  { timestamps: true }
);

const LabReport = mongoose.model("LabReport", labReportSchema);
module.exports = LabReport;
