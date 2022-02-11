const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/auth");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
/* router.get("/logout", userCtrl.logout);
router.get("/deleteAccount/:id", userCtrl.deleteAccount); */

module.exports = router;
