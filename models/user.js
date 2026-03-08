const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [3, "username must be at least 3 char"],
      maxlength: [30, "Username cannot exceed 30 charecters"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowecase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, " password is required"],
      trim: true,
      lowecase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", userSchema);
