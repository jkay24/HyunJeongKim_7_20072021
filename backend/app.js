const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const db = require("./config/db");

//Cors
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
const userRoutes = require("./routes/user"); */

dotenv.config();

app.get("/", (req, res) => {
  db.query(
    "INSERT INTO users (prenom, nom, email, pw) VALUES ('janet', 'kim', 'janet.hyunjkim@gmail.com', 'password');",
    (err, res) => {
      if (err) {
        console.log(err);
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
/* app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes); */

module.exports = app;
