require("dotenv").config();

const express = require("express");
const mongodb = require("./config/db");

const userRouter = require("./Routes/user.routes");
const postRouter = require("./Routes/post.routes");
const commentRouter = require("./Routes/comment.routes");

const ratelimit = require("express-rate-limit");
const Helmet = require("helmet");
const { default: helmet } = require("helmet");

const app = express();

const limiter = ratelimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

app.use(express.json());
app.use(helmet());

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
