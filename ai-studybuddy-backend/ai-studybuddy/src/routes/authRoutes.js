const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getProfile);

module.exports = router;
