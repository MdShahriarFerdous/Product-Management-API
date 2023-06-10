require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { hashPassword } = require("../helpers/passHasing");

exports.generateToken = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;

		if (!name.trim()) {
			return res.json({ error: "Name is required" });
		}
		if (!email) {
			return res.json({ error: "Email is required" });
		}
		if (!password || password.length < 10) {
			return res.json({
				error: "Password must be at least 10 characters long",
			});
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.json({ error: "Email is taken" });
		}
		const UserDetails = await new User({
			//this userDetails is giving the create Data back
			name,
			email,
			password: await hashPassword(password),
			role,
		}).save();

		const token = jwt.sign(
			{ _id: UserDetails._id }, //because we are getting the insert data back
			process.env.SECRET_KEY,
			{ expiresIn: "1h" }
		);
		res.json({ token, UserDetails });
	} catch (error) {
		res.json(err.message);
	}
};
