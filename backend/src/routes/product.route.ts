import express from "express";

import {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct
} from "../controllers/product.controller";
import {
	validateData,
	validateParamObjectId
} from "../middlewares/validation.middleware";
import { createSchema, updateSchema } from "../schemas/product.schema";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", validateParamObjectId, getProduct);
router.post("/", validateData(createSchema), createProduct);
router.put(
	"/:id",
	validateParamObjectId,
	validateData(updateSchema),
	updateProduct
);
router.delete("/:id", validateParamObjectId, deleteProduct);

export default router;
