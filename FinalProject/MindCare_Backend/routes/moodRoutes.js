const express = require("express");
const router = express.Router();
const moodController = require("../controllers/moodController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

// Multer setup for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/saveMood",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  moodController.moods
);

router.get("/getMoods", authMiddleware, moodController.getMoods);
router.post("/deleteMood", authMiddleware, moodController.deleteMood);

module.exports = router;
