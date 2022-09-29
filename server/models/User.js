const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: Number,
      pattern: "/^[0-9]{10}",
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      dafault: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
