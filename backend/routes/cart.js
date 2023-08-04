const { Router } = require("express");
const isAuth = require('../middleware/is-auth');
const cartController;
const router = Router();

router.get("/cart/:id", isAuth ,cartController.getCartItems);
router.post("/cart/:id", cartController.addCartItem);
router.delete("/cart/:userId/:itemId", cartController.deleteItem);

module.exports = router;