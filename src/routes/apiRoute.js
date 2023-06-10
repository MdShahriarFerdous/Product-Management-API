const express = require("express");
const router = express.Router();
const {
	getProducts,
	insertProductDetails,
} = require("../controllers/productController");

const { generateToken } = require("../controllers/authController");
const { viewAllUsers } = require("../controllers/userController");
const { authenticate, isAdmin } = require("../middlewares/authMiddleware");

//simple get products, need no admin check
// router.get("/products", getProducts);

//admin check get products, this route can only access by admin
router.get("/products", authenticate, isAdmin, getProducts);

//token generate
router.post("/register", generateToken);

//Insert product details when user is signed in
router.post("/products", authenticate, insertProductDetails);

//Authenticate route
router.get("/authentication", authenticate, (req, res) => {
	const user = req.headers.auth;
	res.json({ ok: true, message: "Authenticated!", user });
});
//this route can only access by admin
router.get("/user-check", authenticate, isAdmin, viewAllUsers);

module.exports = router;
