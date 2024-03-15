const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../app/models");
const User = db.user;

function extractToken (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[2];
  } else if (req.query && req.query.token) {
      return req.query.token;
  }
  return null;
}

verifyToken = (req, res, next) => {
  

  jwt.verify(extractToken(req), config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.role = decoded.role;
    next();
  });
};



const authJwt = {
  verifyToken,
};
module.exports = authJwt;
