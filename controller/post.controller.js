const Post = require("../models/post");


exports.createPost = async (req, res) => {
  try {
    let { title, content, user } = req.body;

    if (!title || !content || !user) {
      return res.status(400).send("All fields are required");
    }

    let newpost = await Post.create({
      title,
      content,
      user,
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newpost,
    });
  } catch (error) {
    res.status(500).send("server error");
  }
};

exports.getPost = async (req, res) => {
  try {
    let posts = await Post.find().populate("user");

    res.status(200).json({
      message: "Posts fetched successfully",
      posts: posts,
    });
  } catch (err) {
    res.status(404).send("Post is not found");
  }
};

exports.updatePosts = async (req, res) => {
  try {
    let { title, content, user } = req.body;

    if (!title || !content || !user) {
      return res.status(400).send("All fields are required");
    }

    let { id } = req.params;

    let updatedPosts = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("user");

    res.status(200).json({
      message: "Post is Updated",
      post: updatedPosts,
    });
  } catch (error) {
    return res.status(500).send("post is not found");
  }
};

exports.deletePost = async (req, res) => {
  try {
    let { id } = req.params;

    let deletedPost = await Post.findByIdAndDelete(id);

    res.status(200).json({
      message: "Post deleted successfully",
      post: deletedPost,
    });
  } catch (error) {
    return res.status(500).send("server Error");
  }
}


exports.likePost = async (req, res) => {

  // post id url se milegi
  const postId = req.params.id;

  // login user ki id middleware se aayegi
  const userId = req.user.id;

  // database se post find karo
  const post = await Post.findById(postId);

  // check karo user ne already like kiya hai ya nahi
  if (post.likes.includes(userId)) {
    return res.status(400).json({
      message: "You already liked this post"
    });
  }

  // agar like nahi kiya to user id likes array me push karo
  post.likes.push(userId);

  // database update save karo
  await post.save();

  res.status(200).json({
    message: "Post liked successfully",
    totalLikes: post.likes.length
  });
};

exports.unlikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  const post = await Post.findById(postId);

  post.likes = post.likes.filter(function (id) {
    return id.toString() !== userId;
  });

  await post.save();

  res.status(200).json({
    message: "Post unliked successfully",
    totalLikes: post.likes.length,
  });
}
