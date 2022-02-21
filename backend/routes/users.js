const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer-config");

router.get("/:id", auth, userCtrl.getOneUser);
router.get("/image/:id", auth, userCtrl.getProfilPicture);
router.put("/update/:id", auth, upload.single("image"), userCtrl.modifyUser);
router.delete("/delete/:id", auth, userCtrl.deleteUser);

module.exports = router;
