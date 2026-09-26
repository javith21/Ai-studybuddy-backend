const User = require("../models/User");
const Material = require("../models/Material");
const { Summary, Flashcard, Quiz, StudyPlan } = require("../models/AIResources");

// GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/admin/stats
const getSystemStats = async (req, res) => {
  try {
    const [userCount, materialCount, summaryCount, flashcardCount, quizCount, studyPlanCount] =
      await Promise.all([
        User.countDocuments(),
        Material.countDocuments(),
        Summary.countDocuments(),
        Flashcard.countDocuments(),
        Quiz.countDocuments(),
        StudyPlan.countDocuments(),
      ]);

    res.status(200).json({
      success: true,
      stats: { userCount, materialCount, summaryCount, flashcardCount, quizCount, studyPlanCount },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllUsers, deleteUser, getSystemStats };
