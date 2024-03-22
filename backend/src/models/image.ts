import { z } from "zod";

export const imageShcema = z
  .object({
    url: z.string(),
    altText: z.string(),
    productId: z.string(),
  })
  .strict();
