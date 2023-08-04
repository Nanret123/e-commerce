const { Router } = require("express");
const isAuth = require('../middleware/is-auth');
const { body } = require("express-validator");
const itemController;
const router = Router();

router.get("/items", itemController.getItems);
router.post("/items", isAuth,[
	body("title").trim().isLength({min: 5}),
	body("description").trim().isLength({min: 5})
	],itemController.postItems);
router.put("/items/:id", itemController.updateItem);
router.delete("/items/:id", itemController.deleteItem);

module.exports = router;