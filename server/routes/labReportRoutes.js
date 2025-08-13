// server/routes/labReportRoutes.js

const express = require("express");
const router = express.Router();
const { uploadReport } = require("../controllers/labReportController");
const { protect, doctor } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinaryConfig");

// The 'upload.single('report')' middleware from Multer will process the file first
router
  .route("/upload")
  .post(protect, doctor, upload.single("report"), uploadReport);

module.exports = router;
