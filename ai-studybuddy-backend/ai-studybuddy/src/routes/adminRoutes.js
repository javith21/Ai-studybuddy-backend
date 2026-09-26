const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser, getSystemStats } = require("../controllers/adminController");
const { authenticate, authorize } = require("../middleware/auth");

// All admin routes require a logged-in user with the "admin" role
router.use(authenticate, authorize("admin"));

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/stats", getSystemStats);

module.exports = router;
