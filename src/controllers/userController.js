const User = require("../models/userModel");

exports.viewAllUsers = async (req, res) => {
	try {
		const allUsersData = await User.find();
		if (allUsersData) {
			res.status(200).json({
				status: "Authorized as admin",
				allUsersData,
			});
		}
	} catch (error) {
		res.json(error.message);
	}
};
