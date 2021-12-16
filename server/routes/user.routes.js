const userRouter = require("express").Router();
const User = require("../models/user.model");
const argon2 = require("argon2");
const requireLogin = require("../middlewares/requireLogin");

/**
 * @route   POST /users
 * @desc    Creates user
 */
userRouter.post("/", async function (req, res) {
  try {
    const { email, password } = req.body;
    const alreadyExists = await User.findOne({ email });
    if (!!alreadyExists)
      return res
        .status(500)
        .json({ message: `User with email[${email}] already exists` });

    // Hash Password

    const hashedPassword = await argon2.hash(password);

    const user = await User.create({
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ message: "User created successfully", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

/**
 * @route   GET /users
 * @desc    Gets a list of users
 */
userRouter.get("/", async function (req, res) {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

/**
 * @route   GET /users/:id
 * @desc    Gets a list of users
 */
userRouter.get("/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const foundUser = await User.findById(id).populate("posts");
    if (!foundUser)
      return res.status(404).json({ message: "User not found", data: null });
    return res.status(200).json({ message: "Found", data: foundUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

/**
 * @route   GET /me
 * @desc    Gets logged in user
 */
userRouter.post("/me", requireLogin, async function (req, res) {
  const id = req.params.id;
  try {
    return res.status(200).json({ message: "Found Me", data: req.user });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = userRouter;
