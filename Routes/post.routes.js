const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth.middleware");

const {
  createPost,
  getPost,
  updatePosts,
  deletePost,
  likePost,
  unlikePost,
} = require("../controller/post.controller");

// protect all routes
router.use(auth);

router.post("/posts", createPost);
router.get("/posts", getPost);
router.put("/posts/:id", updatePosts);
router.delete("/posts/:id", deletePost);

router.post("/posts/:id/like", likePost);
router.post("/posts/:id/unlike", unlikePost);

module.exports = router;