const postRouter = require("express").Router();

const requireLogin = require("../middlewares/requireLogin");
const Post = require("../models/post.model");
const _ = require("lodash");

postRouter.post("/getposts", async function (req, res) {
  let { visibility, user } = req.body;

  try {
    let filteredPosts;
    if (visibility && user)
      filteredPosts = await Post.find({
        $and: [{ visibility }, { user }],
      }).populate("user");
    else if (visibility)
      filteredPosts = await Post.find({ visibility }).populate("user");
    else if (user) filteredPosts = await Post.find({ user }).populate("user");
    else filteredPosts = await Post.find().populate("user");

    filteredPosts.forEach((post) => {
      post.user = _.pick(post.user, ["email", "_id"]);
      return post;
    });

    res.status(200).json({
      message: "Posts fetched successfully",
      data: filteredPosts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

postRouter.post("/", requireLogin, async function (req, res) {
  try {
    const { title, content, visibility } = req.body;

    if (!req.user)
      return res.status(401).json({ message: "Unauthorized", data: null });
    const post = await Post.create({
      title: title,
      content: content,
      user: req.user.id,
      visibility,
    });
    req.user.posts.push(post.id);
    await req.user.save();

    return res
      .status(201)
      .json({ message: "Post created successfully", data: post });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

postRouter.get("/:postId", async function (req, res) {
  const requestedPostId = req.params.postId;
  try {
    const post = await Post.findById(requestedPostId);
    return res.status(200).json({ message: "Post fetched successfully", post });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", data: null });
  }
});

postRouter.post("/delete/:postId", requireLogin, function (req, res) {
  const requestedPostId = req.params.postId;

  if (!req.user)
    return res.status(401).json({ message: "Unauthorized", data: null });

  Post.findById(requestedPostId, function (err, post) {
    if (err)
      return res
        .status(500)
        .json({ message: "Internal server error", data: null });

    if (!post)
      return res.status(404).json({ message: "Post not found", data: null });

    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized", data: null });

    post.remove();
    return res.status(200).json({ message: "Post deleted successfully" });
  });
});

postRouter.post("/editPost/:postId", requireLogin, function (req, res) {
  const requestedPostId = req.params.postId;
  console.log(req.body, requestedPostId);
  const { title: postTitle, content: postBody, visibility } = req.body;

  Post.findById(requestedPostId, async function (err, post) {
    if (err) return err;

    if (!post)
      return res.status(404).json({ message: "Post not found", data: null });

    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized", data: null });

    post.title = postTitle;
    post.content = postBody;
    post.visibility = visibility;
    await post.save();
    return res.status(200).json({ message: "Post updated successfully", post });
  });
});

module.exports = postRouter;
