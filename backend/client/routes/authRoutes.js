const router = require("express").Router();
const User = require("../models/User.js");
const {body} = require("express-validator");
const authController = require("../controllers/auth");

router.post("/register", 
    [body("email")
    	.isEmail()
    	.withMessage("Please enter a valid email")
    	.custom((value, { req }) => {
    		return User.findOne({email: value})
    		  .then(userDoc => {
    		  	if(userDoc){
    		  		 return Promise.reject('E-Mail address already exists!');
    		  	}
    		  })
    	})
    	.normalizeEmail(),
    body("password")
      .trim()
      .isLength({min: 6}),
    body("name")
       .trim()
       .not()
       .isEmpty()
    	]
	,authController.register);

router.post("/login", authController.login);

module.exports = router;
