import { z } from "zod";

export const productSchema = z
  .object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
    stock: z.number().optional(),
  })
  .strict();

export const updateProductSchema = z
  .object({
    name: z.string().optional(),
    price: z.number().optional(),
    description: z.string().optional(),
    stock: z.number().optional(),
  })
  .strict();
