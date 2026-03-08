const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
});
module.exports = mongoose.model("Comment", commentSchema);
