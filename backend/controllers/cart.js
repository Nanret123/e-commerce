const Cart = require("../models/cart.js");
const Item = require("../models/item.js");


module.exports.getCartItems = async (req, res, next) => {
	const userId = req.params.id;
	try{
    let cart = await Cart.findOne({userId});
    if(cart && cart.items.length > 0 ){
    	res.status(200).json({message: "Fetched cart successfully", cart})
    }
	}
	catch(error){
    if(!err.statusCode){
        err.statusCode= 500
      }
    next(err);
  }

};

module.exports.addCartItem = async (req, res, next) => {
  const userId = req.params.id;
  const {productId, quantity } = req.body;

  try{
  	let cart = await Cart.findOne({userId});
  	let item = await Item.findOne({_id: productId});
  	if(!item){
        const error = new Error("Could not find item");
        error.statusCode= 404;
        throw error;
      
  	}
  	const price = item.price;
  	const name = item.name; 
  }

  if(cart){
  	let itemIndex = cart.items.findIndex(p => p.productId == productId);

    if(itemIndex > -1){

    	let productItem = cart.items[itemIndex];
    	  productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
    }else{
    	 cart.items.push({productId, name, quantity, price});
    }
    cart.bill += quantity * price;
    cart = await cart.save();
    res.status(201).json({message: "Added item successfully", cart})
  
  }else{
  	const newCart = await Cart.create({
  		userId,
  		items:[{productId, name, quantity, price}],
  		bill: quantity*price;
  	});
  	res.status(201).json({message: "Created cart successfully", newCart})
  }
  catch(error){
    if(!err.statusCode){
        err.statusCode= 500
      }
    next(err);
  }
};

module.exports.deleteItem = async (req, res, next) => {
  const userId = req.params.id;
  const productId = req.params.itemId;
  try{
  	let cart = await Cart.findOne({userId});
  	let itemIndex = cart.items.findIndex(p => p.productId == productId);

    if(itemIndex > -1){
    	let productItem = cart.items[itemIndex];
      cart.bill -= productItem.quantity*productItem.price;
      cart.items.splice(itemIndex,1);
    }
    cart = await cart.save();
    res.status(200).json({message: "Deleted Item successfully", newCart})
  }
  catch(error){
    if(!err.statusCode){
        err.statusCode= 500
      }
    next(err);
  }

};