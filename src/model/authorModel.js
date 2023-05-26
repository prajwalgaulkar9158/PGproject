const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required:[true,"please type firstName"],
      trim: true

    },
    lname: {
      type: String,
     required:[true,"please type lastName"],
      trim: true,
    },
    title: {
      type: String,
      required: true,
      enum: {values:["Mr", "Mrs", "Miss"], massage:"not valid prifix"}
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Author", authorSchema);
