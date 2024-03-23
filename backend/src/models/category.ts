import { z } from "zod";

export const createCategorySchema = z.object({ name: z.string() }).strict();
export type CreateCategoryBody = z.infer<typeof createCategorySchema>;

export const addProductsSchema = z.object({ productIds: z.array(z.string()) });
export type ProductIds = z.infer<typeof addProductsSchema>;
