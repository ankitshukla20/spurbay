import { Router } from "express";
import { signupUserSchema } from "../models/user";
import createHttpError from "http-errors";
import { prisma } from "../utils/client";
import { User } from "../entities/User";
import {
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
      throw createHttpError(409, "User Already Exists");
    }

    // Signup
    const { name, email, password } = userSignupData;
    const hashedPassword = await generateHashedPassword(password);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = generateUserToken(user.id);

    res.json({ message: "Signup Successful", token });
  } catch (err) {
    next(err);
  }
});

export default router;
