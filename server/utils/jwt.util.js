const jwt = require("jsonwebtoken");

module.exports = (user, secret) => {
  const payload = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(payload, secret, {
    expiresIn: "24h",
  });
  return token;
};
