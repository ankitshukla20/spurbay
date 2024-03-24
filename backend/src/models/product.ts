import { z } from "zod";

export const productSchema = z
  .object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
    sizes: z.array(z.string()).optional(),
    stock: z.number().optional(),
  })
  .strict();
export type CreateProductBody = z.infer<typeof productSchema>;

export const updateProductSchema = z
  .object({
    name: z.string().optional(),
    price: z.number().optional(),
    description: z.string().optional(),
    stock: z.number().optional(),
  })
  .strict();
export type UpdateProductBody = z.infer<typeof updateProductSchema>;
