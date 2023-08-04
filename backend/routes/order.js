const { Router } = require("express");
const isAuth = require('../middleware/is-auth');
const orderController;
const router = Router();

router.get("/order/:id", isAuth, cartController.getOrders);
router.post("/order/:id", cartController.checkout);

module.exports = router;