import { Router } from "express";
import { prisma } from "../utils/client";
import createHttpError from "http-errors";

const router = Router();

interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  createdAt: Date;
}

router.get("/", async (req, res, next) => {
  try {
    let users: User[];
    const pageNumber = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.size as string) || 15;
    const skipUsers = (pageNumber - 1) * pageSize;

    users = await prisma.user.findMany({
      skip: skipUsers,
      take: pageSize,
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        createdAt: true,
      },
    });

    const totalUsersCount = await prisma.user.count();

    res.json({ usersCount: totalUsersCount, users });
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.userId },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        createdAt: true,
      },
    });

    if (!user) throw createHttpError(404, "User Not Found");

    res.json({ user });
  } catch (err) {
    next(err);
  }
});

export default router;
