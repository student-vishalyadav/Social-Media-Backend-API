require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const mongodb = require("./config/db");

const userRouter = require("./Routes/user.routes");
const postRouter = require("./Routes/post.routes");
const commentRouter = require("./Routes/comment.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later."
});

app.use(limiter);

const PORT = process.env.PORT || 3000;

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Your server is listening on ${PORT}`);
});
