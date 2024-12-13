const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  emoji: String,
  text: String,
  image: String, // Reference to the image in GridFS
  audio: String,
  date: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Mood", moodSchema);
