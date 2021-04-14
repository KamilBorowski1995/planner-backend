const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies.LOGIN_INFO;

  if (!token) return res.status(401).send("Odmowa dostępu");

  try {
    const verifield = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = verifield._id;
    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
};
