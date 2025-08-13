// server/controllers/labReportController.js

const LabReport = require("../models/labReportModel");
const { cloudinary } = require("../config/cloudinaryConfig");

// @desc    Upload a lab report
// @route   POST /api/reports/upload
// @access  Private/Doctor
const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Upload file to Cloudinary
    const result = await new Promise((resolve, reject) => {
      // --- THIS IS THE FIX ---
      // The function name was corrected from 'create_upload_stream' to 'upload_stream'
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: "lab-reports" }, // Store in a 'lab-reports' folder
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      // Send the file's buffer from Multer to the Cloudinary stream
      uploadStream.end(req.file.buffer);
    });

    // Create a new lab report document in the database
    const report = new LabReport({
      patient: req.body.patientId,
      doctor: req.user._id, // Doctor is the logged-in user
      title: req.body.title,
      reportUrl: result.secure_url,
      publicId: result.public_id,
    });

    const createdReport = await report.save();
    res.status(201).json(createdReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during file upload." });
  }
};

module.exports = { uploadReport };
