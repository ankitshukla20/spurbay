import { Router } from "express";
import {
  forgotPasswordSchema,
  signinSchema,
  signupSchema,
} from "../models/auth";
import createHttpError from "http-errors";
import { prisma } from "../utils/client";
import { User, UserForgotPasswordBody, UserSigninBody } from "../entities/User";
import {
  comparePasswords,
  generateHashedPassword,
  generateResetToken,
  generateToken,
} from "../utils/authMethods";
import { emailTemplate } from "../utils/emailTemplate";
import { sendEmail } from "../utils/email";

const router = Router();

/* ---- Signup User  ---- */

router.post("/signup", async (req, res, next) => {
  try {
    // Checks
    const userSignupData = req.body as User;
    const validation = signupSchema.safeParse(userSignupData);
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

    const token = generateToken(user.id);
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
    const userSigninData = req.body as UserSigninBody;
    const validation = signinSchema.safeParse(userSigninData);
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
    const token = generateToken(user.id);
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

/* ---- Send Mail To Reset Password  ---- */

router.post("/password/forgot", async (req, res, next) => {
  try {
    // Checks
    const { email } = req.body as UserForgotPasswordBody;
    const validation = forgotPasswordSchema.safeParse({ email });
    if (!validation.success) {
      throw createHttpError(400, "Invalid Forgot Password Inputs");
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw createHttpError(404, "User Not Found");

    // Generate reset token
    const resetToken = generateResetToken(user.id);

    // Save reset token and expiry in the database
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPwToken: resetToken,
        resetPwTokenExpiry: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
      },
    });

    // Send mail
    const resetURL = `http://localhost:3000/api/v1/password/reset/${resetToken}`;
    const username = updatedUser.firstname;

    const message = emailTemplate(username, resetURL);

    await sendEmail({
      to: updatedUser.email,
      subject: "Spurbay Password Recovery",
      message,
    });

    res.json({ message: `Email sent to ${updatedUser.email}`, updatedUser });
  } catch (err) {
    await prisma.user.update({
      where: { email: req.body.email as string },
      data: {
        resetPwToken: null,
        resetPwTokenExpiry: null,
      },
    });

    next(err);
  }
});

export default router;
