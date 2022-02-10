const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const MaskData = require("maskdata");

//SIGNUP FUNCTION
exports.signup = (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const pw = req.body.pw;
  bcrypt.hash(pw, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (firstname, lastname, email, pw) VALUES (?,?,?,?)",
      [firstname, lastname, email, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
};

//LOGIN FUNCTION
exports.login = (req, res) => {
  const email = req.body.email;
  const pw = req.body.pw;
  db.query(
    "SELECT * FROM users WHERE email = ?;",
    [email],
    async (err, result) => {
      if (err) {
        res.send({ err });
      }
      if (result.length > 0) {
        bcrypt.compare(pw, result[0].pw),
          (error, response) => {
            if (response) {
              res.send(result);
            } else {
              res.send({
                message: "Mauvaise combinaison email / mot de passe !",
              });
            }
          };
      } else {
        res.send({ message: "Utilisateur non trouvée" });
      }
    }
  );
};
