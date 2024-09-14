import express, { Request, Response } from "express";

import productRoutes from "./product.route";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
	res.json({ success: true, message: "Health" });
});
router.use("/products", productRoutes);

export default router;
