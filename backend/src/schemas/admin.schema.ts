import { z } from "zod";

export const registerSchema = z.object({
	username: z.string().min(3),
	emaiL: z.string().email(),
	password: z.string()
});

export const loginSchema = z.object({
	username: z.string().min(3),
	password: z.string()
});
