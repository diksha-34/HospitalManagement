"use strict";

var express = require("express");
var _require = require('../controller/authController'),
  register = _require.register,
  login = _require.login;
var router = express.Router();
router.post('/register', register);
router.post('/login', login);
module.exports = router;