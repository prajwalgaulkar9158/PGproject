const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
default:"C000"    },
    cardType: {
      type: String,
      required: true,
      enum:["REGULAR","SPECIAL"]
    },
    customerName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "ACTIVE",
    },
    vision: {
      type: String,
      required: true,
    },
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "customer",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("card", cardSchema);
