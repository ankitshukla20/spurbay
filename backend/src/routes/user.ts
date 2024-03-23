import { Router } from "express";
import { prisma } from "../utils/client";
import createHttpError from "http-errors";
import { updatePasswordSchema, updateUserSchema } from "../models/user";
import { UserUpdateBody, UserUpdatePasswordBody } from "../entities/User";
import { comparePasswords, generateHashedPassword } from "../utils/authMethods";
import { string } from "zod";

const router = Router();

/* ---- Get User Profile ---- */

router.get("/me", async (req, res, next) => {
  try {
    // Checks
    const userId = req.headers.userId;
    if (typeof userId !== "string") {
      throw createHttpError(401, "Unauthorized");
    }

    // Get User
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { firstname: true, lastname: true, email: true },
    });

    res.json({ user });
  } catch (err) {
    next(err);
  }
});

/* ---- Update User Profile ---- */

router.put("/me/update", async (req, res, next) => {
  try {
    // Checks
    const userId = req.headers.userId;
    if (typeof userId !== "string") throw createHttpError(401, "Unauthorized");

    const validation = updateUserSchema.safeParse(req.body);
    if (!validation.success)
      throw createHttpError(400, "Invalid Update User Inputs");

    // Update User
    const updatedUserData = req.body as UserUpdateBody;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedUserData,
      select: { firstname: true, lastname: true, email: true },
    });

    res.json({ message: "User Profile Updated", user_profile: updatedUser });
  } catch (err) {
    next(err);
  }
});

/* ---- Uodate User Password ---- */

router.put("/password/update", async (req, res, next) => {
  try {
    // Checks
    const validation = updatePasswordSchema.safeParse(req.body);
    if (!validation.success)
      throw createHttpError(401, "Invalid Update Password Inputs");

    const userId = req.headers.userId;
    if (typeof userId !== "string") {
      throw createHttpError(401, "Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (typeof user?.password !== "string")
      // check to shut typescript in comparePasswords
      throw createHttpError(502, "Database Error");

    // Update Password
    const { oldPassword, newPassword, confirmPassword } =
      req.body as UserUpdatePasswordBody;

    const isOldPasswordCorrect = await comparePasswords(
      oldPassword,
      user.password
    );

    if (!isOldPasswordCorrect)
      throw createHttpError(409, "Incorrect Old Password");

    if (newPassword !== confirmPassword)
      throw createHttpError(409, "Password Doesn't Match");

    const hashedPassword = await generateHashedPassword(newPassword);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password Updated" });
  } catch (err) {
    next(err);
  }
});

export default router;
