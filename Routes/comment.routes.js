const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth.middleware");

const {
  createComment,
  getComment,
  Delcomment
} = require("../controller/comment.controller");

router.use(auth);


router.post("/comments/:id", createComment);


router.get("/comments/:id", getComment);


router.delete("/comments/:id", Delcomment);

module.exports = router;