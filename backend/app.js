const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mysql = require("mysql");
const path = require("path");
const helmet = require("helmet");

//Import routes
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

dotenv.config();

//Connect to database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hellokitty1!",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

//Middleware

app.use(
  helmet({
    //Had to disable this so that images show up...
    crossOriginResourcePolicy: false,
  })
);
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

app.use(express.json());

//Routes to middlewares
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);

module.exports = app;
