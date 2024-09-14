import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const login = async (req: Request, res: Response) => {
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

export const register = async (req: Request, res: Response) => {
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
