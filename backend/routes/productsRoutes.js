const router = require("express").Router();
const products = require("../controllers/products");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/is_auth");
const productsController = require("../controllers/products");


router.get("/products", productsController.getProducts);
router.get("/product/:id", productsController.getProduct);
router.put("/product/:id",productsController.updateProduct);
router.delete("/product/:id/delete",verifyToken,productsController.deleteProduct);
router.post("/newProduct",verifyToken,productsController.createProduct);
router.post("/add-to-cart",verifyToken,productsController.addToCart);
router.get("/get-cart",verifyToken,productsController.getCart);
router.get("/delete-cart/:id",verifyToken,productsController.deleteCart);
router.get("/checkout-cancel", verifyToken, productsController.getCart);
router.get("/checkout-success", verifyToken, productsController.postOrder);
router.get("/orders", verifyToken, productsController.getOrders);


module.exports = router;