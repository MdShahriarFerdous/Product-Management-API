const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

exports.authenticate = async (req, res, next) => {
	try {
		const tokenFromHeader = req.headers.authorization;
		const decoded = jwt.verify(tokenFromHeader, process.env.SECRET_KEY);
		req.headers.auth = decoded;
		next();
	} catch (error) {
		return res.status(401).json(error);
	}
};

exports.isAdmin = async (req, res, next) => {
	try {
		const user = req.headers.auth;
		const userId = user._id;
		const findUser = await User.findById(userId);
		if (findUser.role !== "admin") {
			return res.status(401).send("Unauthorized");
		} else {
			next();
		}
	} catch (error) {
		console.log(err);
	}
};
