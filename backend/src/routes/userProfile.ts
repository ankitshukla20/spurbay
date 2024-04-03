import { Router } from "express";
import { prisma } from "../utils/client";
import createHttpError from "http-errors";
import {
  UpdateBody,
  UpdatePasswordBody,
  updatePasswordSchema,
  updateSchema,
} from "../models/profile";
import { comparePasswords, generateHashedPassword } from "../utils/authMethods";

const router = Router();

/* ---- Get User Profile ---- */

router.get("/", async (req, res, next) => {
  try {
    // Checks
    const userId = req.headers.userId as string;

    // Get User
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        createdAt: true,
      },
    });

    res.json({ ...user });
  } catch (err) {
    next(err);
  }
});

/* ---- Update User Profile ---- */

router.put("/update", async (req, res, next) => {
  try {
    // Checks
    const userId = req.headers.userId as string;

    const validation = updateSchema.safeParse(req.body);
    if (!validation.success)
      throw createHttpError(400, "Invalid Update User Inputs");

    // Update User
    const updatedUserData = req.body as UpdateBody;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedUserData,
      select: { firstname: true, lastname: true, email: true },
    });

    res.json({ message: "User Profile Updated", updatedUser });
  } catch (err) {
    next(err);
  }
});

/* ---- Update User Password ---- */

router.put("/password/update", async (req, res, next) => {
  try {
    // Checks
    const validation = updatePasswordSchema.safeParse(req.body);
    if (!validation.success)
      throw createHttpError(401, "Invalid Update Password Inputs");

    const userId = req.headers.userId as string;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (typeof user?.password !== "string")
      // check to shut typescript in comparePasswords
      throw createHttpError(502, "Database Error");

    // Update Password
    const { oldPassword, newPassword, confirmPassword } =
      req.body as UpdatePasswordBody;

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
