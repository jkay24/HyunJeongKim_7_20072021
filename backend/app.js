const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const { Sequelize } = require("sequelize");

dotenv.config();

//Cors
/* app.use(cors()); */
/* res.setHeader("Content-type", "text/html");
res.status("200").send("Ok"); */
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
app.get("/", async function (req, res) {
  const sequelize = new Sequelize("groupomania", "root", "Hellokitty1!", {
    host: "localhost",
    dialect: "mySQL",
  });
});

//Import routes
const userRoutes = require("./routes/users");
/* const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth"); */

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
app.use("/api/user", userRoutes);
/* app.use("/api/post", postRoutes);
app.use("/api/auth", authRoutes); */

module.exports = app;
