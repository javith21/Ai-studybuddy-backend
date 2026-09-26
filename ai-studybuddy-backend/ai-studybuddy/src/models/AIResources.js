const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
    summary: { type: String, required: true },
  },
  { timestamps: true }
);

const flashcardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
    cards: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

const quizSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
      },
    ],
  },
  { timestamps: true }
);

const studyPlanSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
    studyPlan: { type: String, required: true },
    examDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = {
  Summary: mongoose.model("Summary", summarySchema),
  Flashcard: mongoose.model("Flashcard", flashcardSchema),
  Quiz: mongoose.model("Quiz", quizSchema),
  StudyPlan: mongoose.model("StudyPlan", studyPlanSchema),
};
