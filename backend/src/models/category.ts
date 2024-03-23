import { z } from "zod";

export const createCategorySchema = z.object({ name: z.string() }).strict();
export type CreateCategoryBody = z.infer<typeof createCategorySchema>;
