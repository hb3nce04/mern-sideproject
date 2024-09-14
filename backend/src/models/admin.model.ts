import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true
		},
		password: {
			type: Number,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		lastLogin: {
			type: Date
		}
	},
	{
		timestamps: true // createdAt, updatedAt
	}
);

const Product = mongoose.model("Admin", adminSchema);

export default Product;
