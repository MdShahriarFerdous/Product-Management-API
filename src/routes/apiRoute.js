const express = require("express");
const router = express.Router();
const {
	getProducts,
	insertProductDetails,
} = require("../controllers/productController");

const { generateToken } = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");

router.get("/products", getProducts);
router.post("/products", insertProductDetails);
router.post("/register", generateToken);
router.get("/authentication", authenticate, (req, res) => {
	const user = req.user;
	res.json({ ok: true, message: "Authenticated!", user });
});

module.exports = router;