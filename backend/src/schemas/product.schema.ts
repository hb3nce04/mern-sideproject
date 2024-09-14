import { z } from "zod";

export const createSchema = z.object({
	name: z.string(),
	price: z.number(),
	image: z.string().url(),
	description: z.string()
});

export const updateSchema = z.object({
	name: z.string().optional(),
	price: z.number().optional(),
	image: z.string().url().optional(),
	description: z.string().optional()
});
