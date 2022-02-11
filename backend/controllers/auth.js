const db = require("../models");
const Users = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

//SIGNUP FUNCTION
exports.signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  // Check if email already exists in the Users table
  await Users.findOne({ where: { email: email } }).then((exist) => {
    if (exist) {
      return res
        .status(409)
        .json({ message: "Email " + email + " is already in use" });
    } else {
      Users.findOne({ where: { email: email } })
        .then((exist) => {
          // If email wasn't in database, hash pw and add the user to users table
          if (!exist) {
            bcrypt.hash(password, 10).then((hash) => {
              Users.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hash,
              })
                .then((user) => {
                  return res
                    .status(201)
                    .json({ message: "Utilisateur créé avec ID" + user.id });
                })
                .catch((error) => {
                  return res.status(500).json({ error });
                });
            });
          } else {
            return res
              .status(409)
              .json({ message: `Email ${email} is already in use` });
          }
        })
        .catch((error) => {
          return res.status(500);
        });
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  await Users.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { id: user.id },
                process.env.ACCESS_TOKEN_SECRET,
                {
                  expiresIn: "24h",
                }
              ),
            });
          } else {
            return res.status(403).json({ error: "Invalid password." });
          }
        });
      } else {
        return res.status(404).json({ message: email + "does not exist." });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
