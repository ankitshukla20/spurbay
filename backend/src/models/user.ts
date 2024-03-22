import { z } from "zod";

export const signupUserSchema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
  })
  .strict();
