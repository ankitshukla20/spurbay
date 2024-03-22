import bcrypt from "bcrypt";
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

export const generateToken = (id: string) => {
  const payload = { id };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};

export const generateResetToken = (id: string) => {
  const resetToken = jwt.sign({ userId: id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return resetToken;
};
