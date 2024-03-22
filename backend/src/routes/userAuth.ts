import { Router } from "express";
import { signinUserSchema, signupUserSchema } from "../models/user";
import createHttpError from "http-errors";
import { prisma } from "../utils/client";
import { User, UserSignupData } from "../entities/User";
import {
  comparePasswords,
  generateHashedPassword,
  generateUserToken,
} from "../utils/authMethods";

const router = Router();

/* ---- Signup User  ---- */

router.post("/signup", async (req, res, next) => {
  try {
    // Checks
    const userSignupData = req.body as User;
    const validation = signupUserSchema.safeParse(userSignupData);
    if (!validation.success) {
      throw createHttpError(400, "Invalid Signup Input");
    }

    const userExist = await prisma.user.findUnique({
      where: { email: userSignupData.email },
    });

    if (userExist) {
      throw createHttpError(409, "Email Already Exists");
    }

    // Signup
    const { firstname, lastname, email, password } = userSignupData;
    const hashedPassword = await generateHashedPassword(password);

    const user = await prisma.user.create({
      data: { firstname, lastname, email, password: hashedPassword },
    });

    const token = generateUserToken(user.id);
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
    const userSigninData = req.body as UserSignupData;
    const validation = signinUserSchema.safeParse(userSigninData);
    if (!validation.success) {
      throw createHttpError(400, "Invalid Signin Inputs");
    }

    const user = await prisma.user.findUnique({
      where: { email: userSigninData.email },
    });

    if (!user) {
      throw createHttpError(401, "Incorrect Credentials");
    }
    const isPasswordCorrect = await comparePasswords(
      userSigninData.password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw createHttpError(401, "Incorrect Credentials");
    }

    // Login
    const token = generateUserToken(user.id);
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
