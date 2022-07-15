const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");

// ROUTE TO REGISTER A USER
router.post("/register",authCtrl.register);

// ROUTE TO LOGIN
router.post("/login",authCtrl.login);
module.exports = router;