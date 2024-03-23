import { z } from "zod";

export const updateAdminSchema = z
  .object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    email: z.string().email().optional(),
  })
  .strict();

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(5),
    newPassword: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .strict();
