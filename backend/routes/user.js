const express = require("express");
const router = express.Router();
const userControl = require("../controlles/user");
const email = require("../middleware/email-validator");
const password = require("../middleware/password-validator");

router.post("/signup", email, password, userControl.signup);
router.post("/login", userControl.login);

module.exports = router;
