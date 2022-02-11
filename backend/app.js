const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

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

const authRoutes = require("./routes/auth");
/* const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
 */

//Middlewares
app.use(
  helmet({
    //Had to disable this so that images show up...
    crossOriginResourcePolicy: false,
  })
);
app.use(express.json());
/* app.use("/images", express.static(path.join(__dirname, "images"))); */
app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
  })
);

//Routes
app.use("/api/auth", authRoutes);
/* app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
 */

module.exports = app;
