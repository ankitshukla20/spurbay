import { z } from "zod";

export const updateSchema = z
  .object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    email: z.string().email().optional(),
  })
  .strict();
export type UpdateBody = z.infer<typeof updateSchema>;

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(5),
    newPassword: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .strict();
export type UpdatePasswordBody = z.infer<typeof updatePasswordSchema>;
