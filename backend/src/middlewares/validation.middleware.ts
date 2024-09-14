import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

export function validateData(schema: z.ZodObject<any, any>) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				res.status(StatusCodes.BAD_REQUEST).json({
					success: false,
					message: "Validation failed"
				});
			} else {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					success: false,
					message: "Internal Server Error"
				});
			}
		}
	};
}

export const validateParamObjectId = (
	req: Request<{ id: string }>,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			success: false,
			message: "Invalid Id"
		});
	}
	next();
};
