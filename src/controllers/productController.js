const Product = require("../models/productModel");

exports.getProducts = async (req, res) => {
	try {
		const query = {};
		const projection = { _id: 0, name: 1, price: 1 };
		const productsData = await Product.find(query, projection);
		if (!productsData) {
			return res.status(404).json({ status: "Not Found!" });
		} else {
			if (productsData.length === 0) {
				return res.json({ message: "please Create Data first" });
			} else {
				res.status(200).json({
					status: "Successfully Founded",
					productsData,
				});
			}
		}
	} catch (error) {
		res.json(err.message);
	}
};

// Create or insert product details
exports.insertProductDetails = async (req, res) => {
	try {
		const createData = req.body;
		const insertProductDetails = await Product.create(createData);
		if (!insertProductDetails) {
			return res.status(400).json({ Status: "Not Created!" });
		} else {
			res.status(201).json({
				status: "Successfully Created!",
				insertProductDetails,
			});
		}
	} catch (error) {
		res.json(error.message);
	}
};
