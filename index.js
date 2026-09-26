require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/utils/db");

const authRoutes = require("./src/routes/authRoutes");
const materialRoutes = require("./src/routes/materialRoutes");
const aiRoutes = require("./src/routes/aiRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "AI StudyBuddy backend is running" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`AI StudyBuddy backend running on port ${PORT}`);
  });
});
