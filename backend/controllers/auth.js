const db = require("../models");
const Users = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

//SIGNUP FUNCTION
exports.signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  //INPUT VALUE VALIDATION
  //Test for first and last names
  const regExNames = /^[a-zA-Z\s]{2,20}$/;
  if (!regExNames.test(firstname)) {
    return res.status(400).json({
      message:
        "Veuillez saisir un prénom valide entre 2 à 20 lettres, sans chiffre ni symbole.",
    });
  }
  if (!regExNames.test(lastname)) {
    return res.status(400).json({
      message:
        "Veuillez saisir un nom valide entre 2 à 20 lettres, sans chiffre ni symbole.",
    });
  }
  //Test for email address
  const regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!regExEmail.test(email)) {
    return res.status(400).json({
      message: "Veuillez saisir une adresse mail valide.",
    });
  }
  //Test for password
  const regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
  if (!regExPassword.test(password)) {
    return res.status(400).json({
      error:
        "Veuillez saisir un mot de passe avec au moins 6 caractères, comprenant une lettre maj, une min et un chiffre.",
    });
  }

  // AFTER INPUT VALIDATION, CHECK if email already exists in the Users table
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
    return res.status(400).json({ error: "Login failed." });
  }
  await Users.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            res.status(200).json({
              id: user.id,
              token: jwt.sign(
                {
                  id: user.id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  profilePic: user.profilePic,
                  admin: user.admin,
                },
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
