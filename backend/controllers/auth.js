const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.data = errors.array();
    return res.status(422).json({ error });
  }

  const { name, email, password } = req.body;

  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPw });
    const result = await newUser.save();
    res.status(201).json({ message: "User created!", result });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);

  try {
    const user = await User.findOne({ email: email });
    !user && res.status(401).json("Wrong credentials");

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(401).json("Wrong password!");
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      "somesupersupersecret",
      { expiresIn: "3d" }
    );
    res.status(200).json({ token: token, user });
  } catch (err) {
  	  res.status(500).json(err);
  }
};
