import express from "express";

import {
	createProduct,
	getPrdoucts,
	updateProduct,
	deleteProduct
} from "../controllers/product.controller";

const router = express.Router();

router.get("/", getPrdoucts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
