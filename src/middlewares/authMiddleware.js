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
		return res.status(401).json({status: error.message, failed : "Unauthorized"});
	}
};

exports.isAdmin = async (req, res, next) => {
	try {
		//when decoding,, two more information will include inside the decode
		/*we have created a "key", named "auth" for headers and set the decode value
to the ==> req.headers.auth. it is done in the authenticate function above.
so the decode or req.headers.auth is getting this object below:
obj = {
        "_id": "648410da741570e96e8fb2e1",
        "iat": 1686376666,
        "exp": 1686380266
    } 
from here we will take only _id to find the user. so the equation is like:
===>  req.headers.auth = decoded;
===>  const user = req.headers.auth;
===>  const userId = user._id; 
*/
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
