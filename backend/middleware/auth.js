const { verify } = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

module.exports = (req, res, next) => {
  try {
    const JWToken = req.header("JWToken");
    if (!JWToken) {
      return res.status(403).json({ error: "User not logged in." });
    } else {
      const user = verify(JWToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: "An error has occurred " + error });
  }
};
