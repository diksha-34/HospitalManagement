const express = require("express");
const { bookAppointment, getAppointments } = require("../controller/appointmentController");
const { protect } = require("../middleware/authenticate"); 
const router = express.Router();

router.post("/book", protect, bookAppointment);
router.get("/", protect, getAppointments);

module.exports = router;
