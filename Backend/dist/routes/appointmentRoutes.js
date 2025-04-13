"use strict";

var express = require("express");
var _require = require("../controller/appointmentController"),
  bookAppointment = _require.bookAppointment,
  getAppointments = _require.getAppointments;
var _require2 = require("../middleware/authenticate"),
  protect = _require2.protect;
var router = express.Router();
router.post("/book", protect, bookAppointment);
router.get("/", protect, getAppointments);
module.exports = router;