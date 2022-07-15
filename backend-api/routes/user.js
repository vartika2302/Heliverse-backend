const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const { verifyToken, verifyUser } = require("../utils/verifyToken");

// GET A USER
router.get("/:id", verifyUser, userCtrl.getUser);

// UPDATE A USER
router.put("/:id", verifyUser, userCtrl.updateUser);

// DELETE A USER
router.delete("/:id", verifyUser, userCtrl.deleteUser);

module.exports = router;
