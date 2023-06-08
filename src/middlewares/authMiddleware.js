const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticate = async (req, res, next) => {
	try {
		const tokenFromHeader = req.headers.authorization;
		const decoded = jwt.verify(tokenFromHeader, process.env.SECRET_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json(error);
	}
};
