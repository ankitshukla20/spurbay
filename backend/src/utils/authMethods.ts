import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const generateHashedPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const generateUserToken = (id: string) => {
  const payload = { userId: id };
  const token = jwt.sign(payload, process.env.USER_JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};
