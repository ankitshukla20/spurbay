import { z } from "zod";

export const reviewScheme = z
  .object({
    productId: z.string(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().optional(),
  })
  .strict();
export type ReviewBody = z.infer<typeof reviewScheme>;
