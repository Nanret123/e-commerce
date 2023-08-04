const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const User = require("../models/user.js");
const jwt = require('jsonwebtoken');

exports.register =  async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
  	const error = new Error("Validation failed, entered data is incorrect");
  	error.statusCode = 422;
  	throw error;
  };
  const {name,email, password}= req.body;

  try{
   let userEmail = await User.findOne({ email });
     if (user) {
      const error = new Error('A user with this email already exists.');
      error.statusCode = 401;
      throw error;
    }
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
        email,
        password: hashedPw,
        name
      });
    const result = await user.save();
    res.status(201).json({ message: "User Created!", user: result})
  }
  catch(err) {
      if(!err.statusCode){
        err.statusCode= 500
      }
      next(err);
    }
};

exports.login = async (req, res, next) => {
   const {email, password} = req.body;
  let loadedUser;
  try{
    let user = await User.findOne({ email });
     if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({
      email: loadedUser.email,
      userId: loadedUser._id.toString()
      },'somesupersecretsecret', 
      { expiresIn: '1h' }
    );
     res.status(200).json({token, userId: loadedUser._id.toString()})
  }
  catch(err) {
      if(!err.statusCode){
        err.statusCode= 500
      }
      next(err);
    }
};

exports.getUser = async (req, res, next) => {
  try{
    const user =await User.findById(req.userId)
                  .select(-password);
    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(user); 
  }
   catch(err) {
      if(!err.statusCode){
        err.statusCode= 500
      }
      next(err);
    }
};
