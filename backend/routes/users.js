const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/:id", auth, userCtrl.getOneUser);
router.put("/update/:id", auth, multer.single("image"), userCtrl.modifyUser);
router.delete("/delete/:id", auth, userCtrl.deleteUser);

module.exports = router;
