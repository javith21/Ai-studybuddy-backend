const express = require("express");
const router = express.Router();
const {
  createMaterial,
  getMaterials,
  getMaterialById,
  deleteMaterial,
} = require("../controllers/materialController");
const { authenticate } = require("../middleware/auth");
const upload = require("../middleware/upload");

// All material routes require a logged-in user
router.use(authenticate);

router.post("/", upload.single("file"), createMaterial);
router.get("/", getMaterials);
router.get("/:id", getMaterialById);
router.delete("/:id", deleteMaterial);

module.exports = router;
