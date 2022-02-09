const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const db = require("./config/db");
const cors = require("cors");

dotenv.config();

//Cors
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Import routes
/* const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth"); */

//DB connection is working

app.post("/signup", (req, res) => {
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
});

app.post("/login", (req, res) => {
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
});

//Middlewares
app.use(
  helmet({
    //Had to disable this so that images show up...
    crossOriginResourcePolicy: false,
  })
);
app.use(express.json());
/* app.use("/images", express.static(path.join(__dirname, "images"))); */

//Routes
/* app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes); */

module.exports = app;
