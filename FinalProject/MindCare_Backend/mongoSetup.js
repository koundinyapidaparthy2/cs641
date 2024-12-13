// mongoSetup.js
const gridfsStream = require("gridfs-stream");
const mongoose = require("mongoose");

let gfs;

const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "images",
      });
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1); // Exit the process if MongoDB connection fails
    });
};

const getGFS = () => gfs;

module.exports = { connectToMongo, getGFS };
