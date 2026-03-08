const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth.middleware");
const {
  createComment,
  getComment,
  Delcomment,
} = require("../controller/comment.controller");
router.post("/posts/:id/comment", auth, createComment);
router.get("/posts/:id/comments", getComment);
router.delete("/comments/:id", auth, Delcomment);
module.exports = router;
