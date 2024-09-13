import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Product from "../models/product.model";

export const getPrdoucts = async (req: Request, res: Response) => {
	await Product.find({})
		.then((result) => {
			res.status(StatusCodes.OK).json({ success: true, data: result });
		})
		.catch((error) => {
			console.log("error in fetching products: ", error.message);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: "Server Error"
			});
		});
};

export const createProduct = async (req: Request, res: Response) => {
	const product = req.body;

	if (!product.name || !product.price || !product.image) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ success: false, message: "Please provide all fields" });
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(StatusCodes.CREATED).json({
			success: true,
			data: newProduct
		});
	} catch (error: any) {
		console.error("Error in create product: ", error.message);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: true,
			message: "Server Error"
		});
	}
};

export const updateProduct = async (
	req: Request<{
		id: string;
	}>,
	res: Response
) => {
	const { id } = req.params;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: "Invalid Product Id"
		});
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, {
			new: true
		});
		res.status(StatusCodes.OK).json({
			success: true,
			data: updatedProduct
		});
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: "Server Error"
		});
	}
};

export const deleteProduct = async (
	req: Request<{
		id: string;
	}>,
	res: Response
) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: "Invalid Product Id"
		});
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(StatusCodes.OK).json({
			success: true,
			message: "Product deleted"
		});
	} catch (error: any) {
		console.log("error in deleting product: ", error.message);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: "Server Error"
		});
	}
};
