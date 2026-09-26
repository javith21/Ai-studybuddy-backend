const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    subject: { type: String },
    content: { type: String, required: true }, // extracted or pasted text
    filePath: { type: String }, // path to uploaded raw file, if any
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
