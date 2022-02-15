const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");

router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
/* router.get("/logout", authCtrl.logout);
router.get("/deleteAccount/:id", authCtrl.deleteAccount); */

module.exports = router;
