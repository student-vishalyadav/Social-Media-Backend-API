const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/Auth.middleware");

router.use(auth);

const {
  createPost,
  getPost,
  updatePosts,
  deletePost,
  likePost,
  unlikePost,
} = require("../controller/post.controller");

router.post("/posts" ,  createPost);
router.get("/posts"  , getPost);
router.put("/posts/:id" ,  updatePosts);
router.delete("/posts/:d" , deletePost);
router.post("/posts/:id/like", auth, likePost);
router.post("/posts/:id/unlike", auth, unlikePost);

module.exports = router;
