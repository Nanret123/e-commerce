const fs = require('fs');
const path = require('path');
const { validationResult } = require("express-validator");
const Post = require("../models/Post.js");
const User = require("../models/User.js");

exports.getPosts = async (req, res, next) => {
	const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems; 
  try{
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
      res.status(200)
      .json({message:"Fetched posts successfully.",
        posts,
        totalItems
      })
  }
  catch(error){
    if(!err.statusCode){
        err.statusCode= 500
      }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
	const errors = validationResult(req);
  if(!errors.isEmpty()){
  	const error = new Error("Validation failed, entered data is incorrect");
  	error.statusCode = 422;
  	throw error;
  };
  if(!req.file){
  	const error = new Error("No image provided.");
  	error.statusCode = 422;
  	throw error;
  }
  const imageUrl = req.file.path; 
  const title = req.body.title;
  const description = req.body.description;
  const post = new Post({
  	title,
  	description,
  	imageUrl,
    creator: req.userId
  });
  try{
    await post.save();
    const user = await User.findById(req.userId);
    user.posts.push(post);
    await user.save();
    res.status(201)
        .json({
          message: "Post created successfully",
          post,
          creator: { _id: user._id, name: user.name}
        })
  }
  catch(err){
      if(!err.statusCode){
        err.statusCode = 500;
      }
      next(err);
    }
};

exports.getPost = async (req,res,next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId)
  try{
    if(!post){
        const error = new Error("Could not find post");
        error.statusCode= 404;
        throw error;
      }
    res.status(200).json({message: "Post fetched.", post})
  }
 catch(err) {
      if(!err.statusCode){
        err.statusCode= 500
      }
      next(err);
    }
};

exports.updatePost = async (req,res,next) => {
	const postId = req.params.postId;
	if(!errors.isEmpty()){
  	const error = new Error("Validation failed, entered data is incorrect");
  	error.statusCode = 422;
  	throw error;
  };
   const title = req.body.title;
  const description = req.body.description;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if(!imageUrl){
  	const error = new Error("No image provided.");
  	error.statusCode = 422;
  	throw error;
  }

  
  try{
    const post = await Post.findById(postId);
    if(!post){
      const error = new Error("Could not find post");
      error.statusCode= 404;
      throw error;
    }
    if(post.creator.toString() !== req.userId){
      const error = new Error("Not Authorized!");
      error.statusCode= 403;
      throw error;
    }
    if(imageUrl !== post.imageUrl){
        clearImage(post.imageUrl);
      };
      post.title = title;
      post.imageUrl = imageUrl;
      post.description = description;
      const result = await post.save();
      res.status(200).json({message: "Post updated!", post: result})
  }
  catch(err) {
    if(!err.statusCode){
        err.statusCode= 500
    }
      next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try{
    const post = await Post.findById(postId);
    if(!post){
      const error = new Error("Could not find post");
      error.statusCode= 404;
      throw error;
      }
    if(post.creator.toString() !== req.userId){
      const error = new Error("Not Authorized!");
      error.statusCode= 403;
      throw error;
    }
    clearImage(post.imageUrl);
    await Post.findByIdAndRemove(postId);

    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save()
    res.status(200).json({ message: 'Deleted post.' });
  }
  catch(err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};
 
const clearImage = filePath => {
	filePath = path.join(__dirname, "..", filePath);
	fs.unlink(filePath, err => console.log(err));
};