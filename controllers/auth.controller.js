const db = require("../app/models");
const config = require("../config/auth.config");
const userData = require("../utils/staffs.json");

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = userData.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return res.status(404).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken: token,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};
