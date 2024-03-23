import { Router } from "express";
import {
  signupSchema,
  signinSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../models/auth";
import createHttpError from "http-errors";
import { prisma } from "../utils/client";
import {
  AdminSignupBody,
  AdminForgotPasswordBody,
  AdminResetPasswordBody,
  AdminSigninBody,
} from "../entities/Admin";
import {
  comparePasswords,
  generateHashedPassword,
  generateResetToken,
  generateAdminToken,
} from "../utils/authMethods";
import { emailTemplate } from "../utils/emailTemplate";
import { sendEmail } from "../utils/email";

const router = Router();

/* ---- Signup User  ---- */

router.post("/signup", async (req, res, next) => {
  try {
    // Checks
    const adminSignupData = req.body as AdminSignupBody;
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

    const token = generateAdminToken(admin.id);
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
    const token = generateAdminToken(admin.id);
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
    const { email } = req.body as AdminForgotPasswordBody;
    const validation = forgotPasswordSchema.safeParse({ email });
    if (!validation.success) {
      throw createHttpError(400, "Invalid Forgot Password Inputs");
    }

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) throw createHttpError(404, "Admin Not Found");

    // Generate reset token
    const resetToken = generateResetToken();

    // Save reset token and expiry in the database
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        resetPwToken: resetToken,
        resetPwTokenExpiry: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes from now
      },
    });

    // Send mail
    const resetURL = `http://localhost:3000/api/auth/admin/password/reset/${resetToken}`;
    const username = admin.firstname;

    const message = emailTemplate(username, resetURL);

    await sendEmail({
      to: admin.email,
      subject: "Spurbay Admin Password Recovery",
      message,
    });

    res.json({ message: `Email sent to ${admin.email}` });
  } catch (err) {
    await prisma.admin.update({
      where: { email: req.body.email as string },
      data: {
        resetPwToken: null,
        resetPwTokenExpiry: null,
      },
    });

    next(err);
  }
});

/* ---- Reset Password  ---- */

router.put("/password/reset/:token", async (req, res, next) => {
  try {
    // Checks for token and finding user
    const resetToken = req.params.token;

    const admin = await prisma.admin.findFirst({
      where: { resetPwToken: resetToken },
    });

    if (
      !admin ||
      !admin.resetPwTokenExpiry ||
      admin.resetPwTokenExpiry < new Date()
    ) {
      throw createHttpError(400, "Invalid or Expired Token");
    }

    // Checks for body
    const validation = resetPasswordSchema.safeParse(req.body);
    if (!validation.success)
      throw createHttpError(400, "Invalid Reset Password Inputs");

    // Reset Password
    const { password, confirmPassword } = req.body as AdminResetPasswordBody;
    if (password !== confirmPassword)
      throw createHttpError(400, "Password Doesn't Match");

    const hashedPassword = await generateHashedPassword(password);
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        password: hashedPassword,
        resetPwToken: null,
        resetPwTokenExpiry: null,
      },
    });

    res.json({ message: "Password Reset Successful" });
  } catch (err) {
    next(err);
  }
});

export default router;
