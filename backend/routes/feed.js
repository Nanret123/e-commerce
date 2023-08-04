const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed.js");
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get("/posts", feedController.getPosts);

router.post("/post",isAuth,[
	body("title").trim().isLength({min: 5}),
	body("description").trim().isLength({min: 5})
	], feedController.createPost);

router.get("/post/:postId", feedController.getPost);

router.put("/post/:postId", isAuth,[
    body("title").trim().isLength({min: 5}),
	body("description").trim().isLength({min: 5})
	],feedController.updatePost);

router.delete("/post/:postId", feedController.deletePost);

module.exports = router;