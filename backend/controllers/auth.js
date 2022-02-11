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
        .json({ error: "Email " + email + " is already in use" });
    } else {
      Users.findOne({ where: { email: email } })
        .then((exist) => {
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
              .json({ error: "Email " + email + " is already in use" });
          }
        })
        .catch((error) => {
          return res.status(500);
        });
    }
  });
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const pw = req.body.pw;
  try {
    await db.query(
      "SELECT * FROM users WHERE email = ?;",
      email,
      (err, result) => {
        if (err) {
          res.send({ err });
        }
        if (result.length > 0) {
          try {
            bcrypt.compare(req.body.pw, result[0].pw, (error, response) => {
              if (response) {
                res.send(result);
              } else {
                res.send({
                  message: "Mauvaise combinaison email / mot de passe !",
                });
              }
            });
          } catch (err) {
            console.log(err);
          }
        } else {
          res.send({ message: "Utilisateur non trouvée !" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
