const mongoose = require("mongoose");
// Define the schema for the URL model
const urlSchema = new mongoose.Schema(
  {
    urlCode: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Create the URL model

module.exports = mongoose.model("URL", urlSchema);
