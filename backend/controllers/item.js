const Item = require("../models/item.js");
const { validationResult } = require("express-validator");

exports.getItems = async (req, res, next) {
	 try{
    const totalItems = await Item.find().sort({date:-1}).limit(1);
      res.status(200)
      .json({message:"Fetched posts successfully.",
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

exports.postItem = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
  	const error = new Error("Validation failed, entered data is incorrect");
  	error.statusCode = 422;
  	throw error;
  };
  const {title, description } = req.body;
  try{
   const newItem = new Item({
  	title,
  	description,
  	creator: req.userId
  });
   await newItem.save();
    const user = await User.findById(req.userId);
    res.status(201)
      .json({message:"Created successfully.",
        totalItems,
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

exports.updateItem = async (req, res, next) => {
  const itemId = req.params.id;
	if(!errors.isEmpty()){
  	const error = new Error("Validation failed, entered data is incorrect");
  	error.statusCode = 422;
  	throw error;
  };
  const {title, description} = req.body;
  try{
  	 if(item.creator.toString() !== req.userId){
      const error = new Error("Not Authorized!");
      error.statusCode= 403;
      throw error;
    }

  	const updatedItem = await Item.findByIdAndUpdate({_id: itemId}, 
  	{
  		$set: {
        title, 
        description
  		}, 
  		
  	}, {new : true}
  	);
  	 res.status(200).json({message: "Post updated!", updatedItem })
  }
   catch(err) {
    if(!err.statusCode){
        err.statusCode= 500
    }
      next(err);
  }

};

exports.deleteItem = async (req, res, next) => {
  const itemId = req.params.itemId;
  try{
  	 const item = await Item.findById(itemId);
  	if(item.creator.toString() !== req.userId){
      const error = new Error("Not Authorized!");
      error.statusCode= 403;
      throw error;
    }
  	Item.findByIdAndDelete({_id: itemId});
  	 res.status(200).json(message: "Item has been deleted...");
  };
   catch(err) {
    if(!err.statusCode){
        err.statusCode= 500
    }
      next(err);
  }
  
};