const authRouter = require("express").Router();
const User = require("../models/user.model");
const argon2 = require("argon2");
const signJWT = require("../utils/jwt.util");
const requireLogin = require("../middlewares/requireLogin");

/**
 * @route   POST /auth
 * @desc    Login
 */
authRouter.post("/", async function (req, res) {
  try {
    const { email, password } = req.body;
    // check user with email exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({
        message: "Invalid credentials",
      });
    }

    // match hash password
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(422).json({
        message: "Invalid credentials",
        data: null,
      });
    }

    // generate token
    const token = signJWT(user, process.env.JWT_SECRET);

    return res
      .status(201)
      .json({ message: "Logged In successfully", data: token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

authRouter.get("/test", requireLogin, async function (req, res) {
  return res.json({ user: req.user });
});

module.exports = authRouter;
