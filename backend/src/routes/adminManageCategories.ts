import { Router } from "express";
import { CreateCategoryBody, createCategorySchema } from "../models/category";
import createHttpError from "http-errors";
import { prisma } from "../utils/client";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    // Checks
    const validation = createCategorySchema.safeParse(req.body);
    if (!validation.success)
      throw createHttpError(400, "Invalid Category Inputs");

    // Creating Category
    const { name } = req.body as CreateCategoryBody;
    const category = await prisma.category.create({ data: { name } });

    res.json({ message: "Category Created Successfully", category });
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  // Add Child Collection
});
router.post("/", async (req, res, next) => {
  // Add Product To Collection
});

export default router;
