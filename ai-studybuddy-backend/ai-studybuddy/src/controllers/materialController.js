const Material = require("../models/Material");

// POST /api/materials  (supports either raw text content or an uploaded file)
const createMaterial = async (req, res) => {
  try {
    const { title, subject, content } = req.body;

    if (!title || (!content && !req.file)) {
      return res.status(400).json({
        success: false,
        message: "Title and either content text or a file are required",
      });
    }

    const material = await Material.create({
      userId: req.user.id,
      title,
      subject,
      content: content || "", // if a file was uploaded, parsing/extraction would populate this
      filePath: req.file ? req.file.path : undefined,
    });

    res.status(201).json({ success: true, message: "Material saved", material });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/materials
const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, materials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/materials/:id
const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findOne({ _id: req.params.id, userId: req.user.id });
    if (!material) {
      return res.status(404).json({ success: false, message: "Material not found" });
    }
    res.status(200).json({ success: true, material });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/materials/:id
const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!material) {
      return res.status(404).json({ success: false, message: "Material not found" });
    }
    res.status(200).json({ success: true, message: "Material deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createMaterial, getMaterials, getMaterialById, deleteMaterial };
