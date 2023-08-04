const Order = require('../models/order');
const Cart = require('../models/Cart');
const User = require('../models/User');
var stripe = require('stripe')

module.exports.getOrders = async () => {
   const userId = req.params.id;
   try{
   const orders = await Order.find({userId})
                            .sort({date:-1});
   res.status(200)
      .json({message:"Fetched order successfully.",
        orders
      })
   }
  catch(error){
    if(!err.statusCode){
        err.statusCode= 500
      }
    next(err);
  }
};

module.exports.checkout = async () => {
	try{
    const userId = req.params.id;
    const {source} = req.body;

    let cart = await Cart.findOne({userId});
    let user = await User.findOne({_id: userId});
    const email = user.email;

    if(cart){
    	const charge = await stripe.charges.create({
            amount: cart.bill, 
            description: 'Buyer Product',
            currency: 'USD',
            receipt_email: email
    })
    	if(!charge){
    		throw Error("Payment failed");
    	}
    	if(charge){
    		const order = await Order.create({
    			userId,
    			items: cart.items,
    			bill: cart.bill
    		});
    		const data = await Cart.findByIdAndDelete({_id: cart.id});
    		res.status(201)
      .json({message:"Checkout successful.",
        order
      });
    	}
    } else {
      res.status(500).send("You do not have items in cart");
    }
   
  }
   catch(error){
    if(!err.statusCode){
        err.statusCode= 500;
      }
    next(err);
  }
};