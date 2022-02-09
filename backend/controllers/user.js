const db = require("../config/db");

//SIGNUP FUNCTION
exports.signup = (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const pw = req.body.pw;
  db.query(
    "INSERT INTO users (firstname, lastname, email, pw) VALUES (?,?,?,?)",
    [firstname, lastname, email, pw],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

//LOGIN FUNCTION
exports.login = (req, res) => {
  const email = req.body.email;
  const pw = req.body.pw;
  db.query(
    "SELECT * FROM users WHERE email == ? AND pw == ?",
    [email, pw],
    (err, res) => {
      if (err) {
        res.send(err);
      }
      if (result) {
        res.send(result);
      } else {
        res.send({ message: "Mauvaise combinaison email / mot de passe !" });
      }
    }
  );
};
