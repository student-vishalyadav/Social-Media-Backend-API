const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, "Title must be at least 6 char"],
    maxlength: [10, "Title cannot exceed 10 charecters"],
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: [20, "Content must be at least 20 char"],
    maxlength: [80, "Content cannot exceed 80 charecters"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});
module.exports = mongoose.model("post", postSchema);
