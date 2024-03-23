import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const generateHashedPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePasswords = async (
  rawPassword: string,
  hashedPassword: string
) => {
  const check = await bcrypt.compare(rawPassword, hashedPassword);
  return check;
};

export const generateAdminToken = (id: string) => {
  const payload = { id };
  const token = jwt.sign(payload, process.env.ADMIN_JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};

export const generateUserToken = (id: string) => {
  const payload = { id };
  const token = jwt.sign(payload, process.env.USER_JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};

export const generateResetToken = () => {
  const resetToken = crypto.randomBytes(20).toString("hex");
  return resetToken;
};
