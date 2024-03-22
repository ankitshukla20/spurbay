import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token as string;
    if (!token) {
      throw createHttpError(401, "Unauthorized Request");
    }

    jwt.verify(token, process.env.JWT_SECRET!, (error, payload) => {
      if (error) {
        throw createHttpError(401, "Unauthorized Request");
      }

      if (!payload) throw createHttpError(401, "Unauthorized Request");
      if (typeof payload === "string")
        throw createHttpError(401, "Unauthorized Request");

      next();
    });
  } catch (err) {
    next(err);
  }
};
