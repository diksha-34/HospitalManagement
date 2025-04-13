"use strict";

var dotenv = require('dotenv');
var express = require('express');
var cors = require('cors');
var connectDB = require('./config/db');
dotenv.config();
var app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});