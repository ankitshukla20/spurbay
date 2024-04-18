import { z } from "zod";

export const newProductSchema = z
  .object({
    name: z.string(),
    category: z.string(),
    description: z.string(),
    stock: z.number(),
    sizes: z.string(),
    price: z.number(),
  })
  .strict();

export type AddProductForm = z.infer<typeof newProductSchema>;
