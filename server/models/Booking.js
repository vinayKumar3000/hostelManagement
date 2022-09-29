const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema);
