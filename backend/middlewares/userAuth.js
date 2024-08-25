const { config } = require("dotenv");
const jwt = require("jsonwebtoken");

config();

const { verify } = jwt;

const authenticationFunction = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res
      .status(401)
      .json({ msg: "Token is Expired Please Sign In Again" });
  }

  verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res.status(403).json(err);
    }
    req.user = user;
    next();
  });
};

module.exports.authenticationFunction = authenticationFunction;
