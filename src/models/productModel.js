const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxLength: 32,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			maxLength: 200,
		},
		createdAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
