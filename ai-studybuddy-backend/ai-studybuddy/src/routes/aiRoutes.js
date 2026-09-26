const express = require("express");
const router = express.Router();
const {
  createSummary,
  createFlashcards,
  createQuiz,
  createStudyPlan,
  getHistory,
} = require("../controllers/aiController");
const { authenticate } = require("../middleware/auth");

// All AI routes require a logged-in, authenticated user
router.use(authenticate);

router.post("/summary", createSummary);
router.post("/flashcards", createFlashcards);
router.post("/quiz", createQuiz);
router.post("/study-plan", createStudyPlan);
router.get("/history", getHistory);

module.exports = router;
