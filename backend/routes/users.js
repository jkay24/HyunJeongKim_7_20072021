const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/:id", auth, userCtrl.getOneUser);
router.get("/image/:id", auth, userCtrl.getProfilePic);
router.put("/:id", auth, multer.single("profilePic"), userCtrl.modifyUser);

module.exports = router;
