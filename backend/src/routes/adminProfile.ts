import { Router } from "express";
import { prisma } from "../utils/client";
import createHttpError from "http-errors";
import {
  updateSchema,
  updatePasswordSchema,
  UpdateBody,
  UpdatePasswordBody,
} from "../models/profile";
import { comparePasswords, generateHashedPassword } from "../utils/authMethods";

const router = Router();

/* ---- Get Admin Profile ---- */

router.get("/", async (req, res, next) => {
  try {
    const adminId = req.headers.adminId as string;

    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { id: true, firstname: true, lastname: true, email: true },
    });

    res.json({ ...admin });
  } catch (err) {
    next(err);
  }
});

/* ---- Update Admin Profile ---- */

router.put("/update", async (req, res, next) => {
  try {
    // Checks
    const validation = updateSchema.safeParse(req.body);
    if (!validation.success)
      throw createHttpError(400, "Invalid Update Admin Inputs");

    // Update Admin
    const adminId = req.headers.adminId as string;
    const updatedAdminData = req.body as UpdateBody;

    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: updatedAdminData,
      select: { firstname: true, lastname: true, email: true },
    });

    res.json({ message: "Admin Profile Updated", updatedAdmin });
  } catch (err) {
    next(err);
  }
});

/* ---- Update Admin Password ---- */

router.put("/password/update", async (req, res, next) => {
  try {
    // Checks
    const validation = updatePasswordSchema.safeParse(req.body);
    if (!validation.success)
      throw createHttpError(401, "Invalid Update Password Inputs");

    const adminId = req.headers.adminId as string;

    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { password: true },
    });

    if (typeof admin?.password !== "string")
      // check to shut typescript in comparePasswords
      throw createHttpError(502, "Database Error");

    // Update password
    const { oldPassword, newPassword, confirmPassword } =
      req.body as UpdatePasswordBody;

    const isOldPasswordCorrect = await comparePasswords(
      oldPassword,
      admin.password
    );

    if (!isOldPasswordCorrect)
      throw createHttpError(409, "Incorrect Old Password");

    if (newPassword !== confirmPassword)
      throw createHttpError(409, "Password Doesn't Match");

    const hashedPassword = await generateHashedPassword(newPassword);
    await prisma.admin.update({
      where: { id: adminId },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password Updated" });
  } catch (err) {
    next(err);
  }
});
export default router;
