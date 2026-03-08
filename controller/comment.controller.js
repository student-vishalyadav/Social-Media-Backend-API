const Comment = require("../models/comment");

exports.createComment = async (req, res) => {

  let postId = req.params.id;
  let userId = req.user.id;
  let text = req.body.text;

  const newComment = await Comment.create({
    text: text,
    user: userId,
    post: postId,
  });

  res.status(200).json({
    message: "Comment added",
    comment: newComment,
  });
};


exports.getComment = async (req, res) => {

  let postId = req.params.id;

  const comments = await Comment
    .find({ post: postId })
    .populate("user");

  res.status(200).json({
    comments,
  });
};


exports.Delcomment = async (req, res) => {

  let commentId = req.params.id;

  const delComment = await Comment.findByIdAndDelete(commentId);

  res.status(200).json({
    message: "Comment deleted",
    delComment,
  });

};