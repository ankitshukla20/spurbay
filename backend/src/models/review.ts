import { z } from "zod";

export const reviewScheme = z
  .object({
    userId: z.string(),
    productId: z.string(),
    rating: z.number().int().min(1).max(5),
    comment: z.string(),
  })
  .strict();
export type Review = z.infer<typeof reviewScheme>;
