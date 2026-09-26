const Material = require("../models/Material");
const { Summary, Flashcard, Quiz, StudyPlan } = require("../models/AIResources");
const gemini = require("../utils/gemini");

// Shared helper: fetch a material owned by the requesting user
const getOwnedMaterial = async (materialId, userId) => {
  return Material.findOne({ _id: materialId, userId });
};

// POST /api/ai/summary  { materialId }
const createSummary = async (req, res) => {
  try {
    const { materialId } = req.body;
    const material = await getOwnedMaterial(materialId, req.user.id);
    if (!material) return res.status(404).json({ success: false, message: "Material not found" });

    const summaryText = await gemini.generateSummary(material.content);

    const summary = await Summary.create({
      userId: req.user.id,
      materialId,
      summary: summaryText,
    });

    res.status(201).json({ success: true, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/ai/flashcards  { materialId, count }
const createFlashcards = async (req, res) => {
  try {
    const { materialId, count } = req.body;
    const material = await getOwnedMaterial(materialId, req.user.id);
    if (!material) return res.status(404).json({ success: false, message: "Material not found" });

    const cards = await gemini.generateFlashcards(material.content, count || 10);

    const flashcard = await Flashcard.create({
      userId: req.user.id,
      materialId,
      cards,
    });

    res.status(201).json({ success: true, flashcard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/ai/quiz  { materialId, count }
const createQuiz = async (req, res) => {
  try {
    const { materialId, count } = req.body;
    const material = await getOwnedMaterial(materialId, req.user.id);
    if (!material) return res.status(404).json({ success: false, message: "Material not found" });

    const questions = await gemini.generateQuiz(material.content, count || 10);

    const quiz = await Quiz.create({
      userId: req.user.id,
      materialId,
      questions,
    });

    res.status(201).json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/ai/study-plan  { materialId, examDate, preferences }
const createStudyPlan = async (req, res) => {
  try {
    const { materialId, examDate, preferences } = req.body;
    const material = await getOwnedMaterial(materialId, req.user.id);
    if (!material) return res.status(404).json({ success: false, message: "Material not found" });

    const planText = await gemini.generateStudyPlan(material.content, examDate, preferences);

    const studyPlan = await StudyPlan.create({
      userId: req.user.id,
      materialId,
      studyPlan: planText,
      examDate,
    });

    res.status(201).json({ success: true, studyPlan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/ai/history  - all generated resources for the logged-in user
const getHistory = async (req, res) => {
  try {
    const [summaries, flashcards, quizzes, studyPlans] = await Promise.all([
      Summary.find({ userId: req.user.id }).sort({ createdAt: -1 }),
      Flashcard.find({ userId: req.user.id }).sort({ createdAt: -1 }),
      Quiz.find({ userId: req.user.id }).sort({ createdAt: -1 }),
      StudyPlan.find({ userId: req.user.id }).sort({ createdAt: -1 }),
    ]);

    res.status(200).json({ success: true, summaries, flashcards, quizzes, studyPlans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createSummary, createFlashcards, createQuiz, createStudyPlan, getHistory };
