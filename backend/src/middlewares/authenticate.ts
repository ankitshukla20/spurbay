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

    jwt.verify(token, process.env.ADMIN_JWT_SECRET!, (error, payload) => {
      if (error) {
        throw createHttpError(401, "Unauthorized Request");
      }

      if (!payload) throw createHttpError(401, "Unauthorized Request");
      if (typeof payload === "string")
        throw createHttpError(401, "Unauthorized Request");

      req.headers.adminId = payload.id;
      next();
    });
  } catch (err) {
    next(err);
  }
};

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token as string;
    if (!token) {
      throw createHttpError(401, "Unauthorized Request");
    }

    jwt.verify(token, process.env.USER_JWT_SECRET!, (error, payload) => {
      if (error) {
        throw createHttpError(401, "Unauthorized Request");
      }

      if (!payload) throw createHttpError(401, "Unauthorized Request");
      if (typeof payload === "string")
        throw createHttpError(401, "Unauthorized Request");

      req.headers.userId = payload.id;
      next();
    });
  } catch (err) {
    next(err);
  }
};
