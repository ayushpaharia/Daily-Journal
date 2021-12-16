require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const mongoConnect = require("./db");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");

async function main() {
  const app = express();

  // Using Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan("dev"));

  // Routes
  app.use("/posts", postRouter);
  app.use("/users", userRouter);
  app.use("/auth", authRouter);

  // Listening to port
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server Connected on localhost:${PORT}`);
    mongoConnect();
  });
}

console.clear();
main().catch((err) => console.log(err));
