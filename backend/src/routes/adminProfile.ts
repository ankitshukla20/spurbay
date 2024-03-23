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
    // Checks
    const adminId = req.headers.adminId;
    if (typeof adminId !== "string") {
      throw createHttpError(401, "Unauthorized");
    }

    // Get admin
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { firstname: true, lastname: true, email: true },
    });

    res.json({ admin });
  } catch (err) {
    next(err);
  }
});

/* ---- Update Admin Profile ---- */

router.put("/update", async (req, res, next) => {
  try {
    // Checks
    const adminId = req.headers.adminId;
    if (typeof adminId !== "string") throw createHttpError(401, "Unauthorized");

    const validation = updateSchema.safeParse(req.body);
    if (!validation.success)
      throw createHttpError(400, "Invalid Update Admin Inputs");

    // Update Admin
    const updatedAdminData = req.body as UpdateBody;
    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: updatedAdminData,
      select: { firstname: true, lastname: true, email: true },
    });

    res.json({ message: "Admin Profile Updated", admin: updatedAdmin });
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

    const adminId = req.headers.adminId;
    if (typeof adminId !== "string") {
      throw createHttpError(401, "Unauthorized");
    }
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
