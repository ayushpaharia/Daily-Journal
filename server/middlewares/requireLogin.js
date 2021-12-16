const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  // check header or url parameters or post parameters for token
  let token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({ error: true, message: "Unauthorized" }); //if no token, continue

  token = token.replace("Bearer ", "");
  jwt.verify(token, JWT_TOKEN, async function (err, payload) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    } else {
      const user = await User.findById(payload.user.id);
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
};
