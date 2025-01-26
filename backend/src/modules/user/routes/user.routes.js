const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect } = require("../../../middleware/auth.middleware");

router.put("/profile", protect, userController.updateProfile);

module.exports = router;
