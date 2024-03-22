import { z } from "zod";

export const signupSchema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
  })
  .strict();

export const signinSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(5),
  })
  .strict();

export const forgotPasswordSchema = z
  .object({ email: z.string().email() })
  .strict();
