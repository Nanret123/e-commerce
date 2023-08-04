const express = require("express");
const { body } = require("express-validator");

const User = require("../models/User.js");
const authController = require("../controllers/auth.js");
const isAuth = require('../middleware/is-auth');


const router = express.Router();

router.post("/register", [
    body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),

    body("password")
    .trim()
    .isLength({min: 5}),

    body("Name")
    .trim()
    .not()
    .isEmpty(),

	], authController.register
);

router.post("/login", authController.login);

router.get("/user", isAuth, authController.getUser);


module.exports = router;