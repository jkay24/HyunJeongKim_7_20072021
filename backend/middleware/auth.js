const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

//Verify assigned token
module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res
      .status(401)
      .json({ error: error | "Requête non authentifiée !" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ error: error | "User ID non valable !" });
    req.email = decoded.email;
    next();
  });
};
