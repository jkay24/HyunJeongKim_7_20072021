const db = require("../models");
const Users = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

//SIGNUP FUNCTION
exports.signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  //  Check if email already exists in the Users table
  await Users.findOne({ where: { email: email } }).then((exist) => {
    if (exist) {
      return res.status(409).json({
        message: " Un compte existe déjà avec l'adresse mail " + email,
      });
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
            return res.status(409).json({
              message: "Un compte existe déjà avec cette adresse mail.",
            });
          }
        })
        .catch((error) => {
          return res.status(500);
        });
    }
  });
};

//LOGIN FUNCTION
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (email == null || password == null) {
    return res.status(400).json({ message: "Connexion plantée." });
  }
  await Users.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            res.status(200).json({
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              profilePic: user.profilePic,
              admin: user.admin,
              token: jwt.sign(
                {
                  id: user.id,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                  expiresIn: "24h",
                }
              ),
            });
          } else {
            return res
              .status(403)
              .json({ message: "Mot de passe non valide." });
          }
        });
      } else {
        return res
          .status(404)
          .json({ message: "Aucun compte avec l'adresse mail " + email });
      }
    })
    .catch((error) => {
      return res.status(500).json({ message: error });
    });
};
