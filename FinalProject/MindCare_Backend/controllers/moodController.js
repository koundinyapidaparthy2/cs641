// controllers/moodController.js
const Mood = require("../models/Mood");
const User = require("../models/User");
const { getGFS } = require("../mongoSetup");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const conn = mongoose.connection;

exports.moods = async (req, res) => {
  try {
    const { emoji, text } = req.body;
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const date = new Date().getTime();

    const gfs = getGFS();
    const imageFile = req.files?.image ? req.files.image[0] : null;
    const audioFile = req.files?.audio ? req.files.audio[0] : null;

    const moodData = { emoji, text, date };
    console.log({ moodData, imageFile, audioFile });

    const chunkSize = 16 * 1024 * 1024; // Set to 16 MB (for example)

    // Upload image to GridFS if provided
    if (imageFile) {
      const writeImageStream = gfs.openUploadStream(imageFile.originalname, {
        contentType: imageFile.mimetype,
        bucketName: "moodImages",
        chunkSize,
      });
      writeImageStream.write(imageFile.buffer);
      writeImageStream.end((err) => {
        if (err) {
          console.error("Error uploading image:", err);
        }
      }, "base64");
      moodData.image = writeImageStream.id;
    }

    // Upload audio to GridFS if provided
    if (audioFile) {
      const writeAudioStream = gfs.openUploadStream({
        filename: audioFile.originalname,
        content_type: audioFile.mimetype,
      });
      writeAudioStream.write(audioFile.buffer);
      writeAudioStream.end();

      moodData.audio = writeAudioStream.id;
    }

    moodData.user = id;
    moodData.date = date;
    console.log({ moodData });
    // Save mood to MongoDB
    const newMood = new Mood(moodData);
    await newMood.save();
    res.status(201).json({ message: "Mood saved successfully", mood: newMood });
  } catch (error) {
    console.error("Error saving mood:", error);
    res.status(500).json({ error: "Failed to save mood" });
  }
};

exports.getMoods = async (req, res) => {
  try {
    const { id } = req.user;
    console.log({ id });
    const moods = await Mood.find({ user: id }).sort({ date: -1 });

    const bucket = new GridFSBucket(conn.db, { bucketName: "images" }); // 'images' matches your GridFS bucket name

    const moodsWithFiles = await Promise.all(
      moods.map(async (mood) => {
        const result = { ...mood.toObject() };

        // Fetch image as Base64
        if (mood.image) {
          const imageData = await getBase64File(bucket, mood.image);
          if (imageData) {
            result.image = `data:image/png;base64,${imageData}`; // Adjust MIME type as needed
          }
        }

        // Fetch audio as Base64
        if (mood.audio) {
          const audioData = await getBase64File(bucket, mood.audio);
          if (audioData) {
            result.audio = `data:audio/m4a;base64,${audioData}`; // Adjust MIME type as needed
          }
        }

        return result;
      })
    );

    res.status(200).json({ moods: moodsWithFiles });
  } catch (error) {
    console.error("Error fetching moods:", error);
    res.status(500).json({ error: "Failed to fetch moods" });
  }
};

// Helper function to fetch a file from GridFSBucket and return it as a Base64 string
const getBase64File = (bucket, fileId) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const readStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(fileId)
    );

    readStream.on("data", (chunk) => chunks.push(chunk));
    readStream.on("end", () => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer.toString("base64"));
    });
    readStream.on("error", (err) => {
      console.error("Error reading file:", err);
      reject(err);
    });
  });
};

exports.deleteMood = async (req, res) => {
  try {
    const { id } = req.body; // Get the mood ID from the request body

    if (!id) {
      return res.status(400).json({ message: "Mood ID is required." });
    }
    const { id: userId } = req.user; // Get the user's ID from the request

    // Find the mood by ID
    const mood = await Mood.findOne({ _id: id, user: userId });

    if (!mood) {
      return res.status(404).json({ msg: "Mood not found" });
    }

    // Delete mood from MongoDB
    await Mood.deleteOne({ _id: id });

    const gfs = getGFS();
    const bucketImage = new GridFSBucket(mongoose.connection.db, {
      bucketName: "moodImages",
    });
    const bucketAudio = new GridFSBucket(mongoose.connection.db, {
      bucketName: "moodAudios",
    });

    // If there is an image, delete it from GridFS
    if (mood.image) {
      try {
        await bucketImage.delete(mood.image); // Delete the image file from GridFS
      } catch (error) {
        console.error(`Error deleting image: ${error}`);
        // Optionally, you can decide to not respond with an error here and just log it.
      }
    }

    // If there is an audio file, delete it from GridFS
    if (mood.audio) {
      try {
        await bucketAudio.delete(mood.audio); // Delete the audio file from GridFS
      } catch (error) {
        console.error(`Error deleting audio: ${error}`);
        // Similarly, log the error without interrupting the response flow.
      }
    }

    res.status(200).json({ msg: "Mood deleted successfully" });
  } catch (error) {
    console.error("Error deleting mood:", error);
    res.status(500).json({ error: "Failed to delete mood" });
  }
};
