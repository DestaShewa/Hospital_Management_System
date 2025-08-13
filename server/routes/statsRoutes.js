// server/routes/statsRoutes.js

const express = require("express");
const router = express.Router();
const { getSummaryStats } = require("../controllers/statsController.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

// When a GET request is made to '/summary', it will first run the 'protect' middleware,
// then the 'admin' middleware, and finally, if both pass, the 'getSummaryStats' function.
router.route("/summary").get(protect, admin, getSummaryStats);

// This is the most critical line. It makes the 'router' object available for import
// in other files. Forgetting this line is the most common cause of the error you saw.
module.exports = router;
