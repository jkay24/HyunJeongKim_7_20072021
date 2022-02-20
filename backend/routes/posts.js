const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer.single("image"), postsCtrl.createPost);
router.get("/", auth, postsCtrl.getAllPosts);
router.get("/:id", auth, postsCtrl.getOnePost);
router.put("/update/:id", auth, multer.single("image"), postsCtrl.modifyPost);
router.delete("/delete/:id", auth, postsCtrl.deletePost);
/* router.post("/:id/like", auth, postsCtrl.likeDislikePost); */

module.exports = router;
