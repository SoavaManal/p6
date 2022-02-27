const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const likeControle = require("../controlles/likes");

router.post("/:id/like", auth, likeControle.creatLikes);

module.exports = router;
