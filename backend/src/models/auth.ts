import { z } from "zod";

export const signupSchema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
  })
  .strict();
export type SignupBody = z.infer<typeof signupSchema>;

export const signinSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(5),
  })
  .strict();
export type SigninBody = z.infer<typeof signinSchema>;

export const forgotPasswordSchema = z
  .object({ email: z.string().email() })
  .strict();
export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .strict();
export type ResetPasswordBody = z.infer<typeof resetPasswordSchema>;
