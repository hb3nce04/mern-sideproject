import express from "express";

import { login, register, logout } from "../controllers/admin.controller";
import { validateData } from "../middlewares/validation.middleware";
import { loginSchema, registerSchema } from "../schemas/admin.schema";

const router = express.Router();

router.post("/login", validateData(loginSchema), login);
router.post("/register", validateData(registerSchema), register);

export default router;
