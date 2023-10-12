const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const stripe = require("stripe")("sk_test_51Lx90pE5GRwztLrE3uAiFA43m8fXkki8UrCf70IxmNYcML7QmwWsePDqYBYq2K3DwqUGmzkzvmoT4cUoEoKraV8H00Cgw1RYUE")

const { validationResult } = require("express-validator");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { title, description, price } = req.body;
    const { path } = req.file;

    const product = await Product.findByIdAndUpdate(id, {
      title,
      imagePath: path,
      description,
      price,
    });
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const {id} = req.params;
  try{
    const product = await Product.findByIdAndDelete(id);
    const products = await Product.find();
    res.status(200).json(products);
  }catch (err) {
    res.status(500).json(err);
  }
}; 

exports.createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.data = errors.array();
    return res.status(422).json({ error });
  }
  if (!req.file) {
    const error = new Error("No image provided");
    error.data = errors.array();
    return res.status(422).json({ error });
  }
  try {
    const { title, description, price } = req.body;
    const { path } = req.file;
    const product = new Product({
      title,
      description,
      price,
      imagePath: path,
      userId: req.user._id,
    });
    await product.save();
    const products = await Product.find();
    res.status(201).json(products);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.addToCart = async (req, res, next) => {
  const id = req.user.id;
  const { productId, quantity } = req.body;
  try {
    const user = await User.findById(id);
    const userCart = user.cart;
    const cartIndex = userCart.items.findIndex((item) => {
      return item.productId.toString() === productId.toString();
    });

    if (cartIndex >= 0) {
      userCart.items[cartIndex].quantity += quantity;
    } else {
      userCart.items.push({
        productId: productId,
        quantity: quantity,
      });
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getCart = async (req, res, next) => {
    const userId = User.findById(req.user.id);
  try{
     const user = await userId.populate("cart.items.productId")
                  .exec();

     let total = 0;

  const products = user.cart.items;
  products.forEach(product => {
    
    total += product.productId.price * product.quantity;
  })
 
  res.status(200).json({products, totalSum: total.toFixed(2)})
}catch(error){
  res.status(400).json({error})
}
 
}; 

exports.deleteCart = async (req, res, next) => {
   try{
        const user = await User.findById(req.user.id);
   const { id } = req.params;  
     const updatedCart = user.cart.items.filter(item => {
       return item._id.toString() !== id.toString()
     });
          user.cart.items = updatedCart;
      await user.save();
      console.log(user.cart.items);
      res.status(200).json(user.cart.items);
}catch(error){
    res.status(400).json(error);
   }
};

exports.postOrder = async (req, res, next) => {
   const userId = await User.findById(req.user.id); 
  try{
      

      const user = await userId.populate("cart.items.productId");
        const products = user.cart.items.map(item => {
      return {quantity: item.quantity, product: {...item.productId._doc}}
    });
    const order = new Order({
      user: {
        email: userId.email,
        userId: userId.id
      },
      products: products
    });
    console.log(order);
      await order.save();
      user.cart.items = [];
      await user.save();
      //   const session = await stripe.checkout.sessions.create({
      //   payment_method_types: ['card'],
      //   line_items: products.map(p => {
      //     return {
      //       name: p.productId.title,
      //       description: p.productId.description,
      //       amount: p.productId.price * 100,
      //       currency: 'usd',
      //       quantity: p.quantity
      //     };
      //   }),
      //   mode: 'payment',
      //   success_url:  `http://localhost:5173/orders`,
      //   cancel_url:    `http://localhost:5173/orders`
      // });


    
    res.status(200).json(order);
}catch(error){
  res.status(500).json(error);
}
};

exports.getOrders =async (req, res, next) => {
try{

 const order = await Order.find({"user.userId": req.user.id});
 console.log(order);
 res.status(200).json(order)
}catch(error){
  res.status(500).json(error);
}
};
