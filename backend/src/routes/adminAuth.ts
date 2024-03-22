import { Router } from "express";
import { signupSchema, signinSchema } from "../models/auth";
import createHttpError from "http-errors";
import { prisma } from "../utils/client";
import { Admin, AdminSigninBody } from "../entities/Admin";
import {
  comparePasswords,
  generateHashedPassword,
  generateToken,
} from "../utils/authMethods";

const router = Router();

/* ---- Signup User  ---- */

router.post("/signup", async (req, res, next) => {
  try {
    // Checks
    const adminSignupData = req.body as Admin;
    const validation = signupSchema.safeParse(adminSignupData);
    if (!validation.success) {
      throw createHttpError(400, "Invalid Signup Input");
    }

    const adminExist = await prisma.admin.findUnique({
      where: { email: adminSignupData.email },
    });

    if (adminExist) {
      throw createHttpError(409, "Email Already Exists");
    }

    // Signup
    const { firstname, lastname, email, password } = adminSignupData;
    const hashedPassword = await generateHashedPassword(password);

    const admin = await prisma.admin.create({
      data: { firstname, lastname, email, password: hashedPassword },
    });

    console.log(admin);

    const token = generateToken(admin.id);
    res.cookie("token", token, { httpOnly: true, secure: true });

    res.json({ message: "Signup Successful" });
  } catch (err) {
    next(err);
  }
});

/* ---- Signin User  ---- */

router.post("/signin", async (req, res, next) => {
  try {
    // Checks
    const adminSigninData = req.body as AdminSigninBody;
    const validation = signinSchema.safeParse(adminSigninData);
    if (!validation.success) {
      throw createHttpError(400, "Invalid Signin Inputs");
    }

    const admin = await prisma.admin.findUnique({
      where: { email: adminSigninData.email },
    });

    if (!admin) {
      throw createHttpError(401, "Incorrect Credentials");
    }
    const isPasswordCorrect = await comparePasswords(
      adminSigninData.password,
      admin.password
    );
    if (!isPasswordCorrect) {
      throw createHttpError(401, "Incorrect Credentials");
    }

    // Login
    const token = generateToken(admin.id);
    res.cookie("token", token, { httpOnly: true, secure: true });

    res.json({ message: "Signin Successful" });
  } catch (err) {
    next(err);
  }
});

/* ---- Logout User  ---- */

router.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: true });

    res.json({ message: "Logged Out" });
  } catch (err) {
    next(err);
  }
});

export default router;
