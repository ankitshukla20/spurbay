import { Router } from "express";
import {
  CreateCategoryBody,
  ProductIds,
  addProductsSchema,
  createCategorySchema,
} from "../models/category";
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

router.post("/sub/:categoryId", async (req, res, next) => {
  try {
    // Checks
    const validation = createCategorySchema.safeParse(req.body);
    if (!validation.success)
      throw createHttpError(400, "Invalid Category Inputs");

    const { categoryId } = req.params;
    const { name } = req.body as CreateCategoryBody;

    const subCategory = await prisma.subCategory.create({
      data: { name, categoryId },
    });

    res.json({ message: "Sub-Category Created Successfully", subCategory });
  } catch (err) {
    next(err);
  }
});

router.post("/sub/products/:subCategoryId", async (req, res, next) => {
  try {
    // Checks
    const validation = addProductsSchema.safeParse(req.body);
    if (!validation.success)
      throw createHttpError(400, "Invalid Category Inputs");

    // Add products into a sub-category
    const { subCategoryId } = req.params;
    const { productIds } = req.body as ProductIds;

    const subCategory = await prisma.subCategory.findUnique({
      where: { id: subCategoryId },
    });

    if (!subCategory) throw createHttpError(404, "Sub-Category Not Found");

    const productsToAdd = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (!productsToAdd)
      throw createHttpError(404, "No Products Found with Provided IDs");

    const updatedSubCategory = await prisma.subCategory.update({
      where: { id: subCategoryId },
      data: {
        products: {
          create: productsToAdd.map((product) => ({
            product: { connect: { id: product.id } },
          })),
        },
      },
    });

    res.json({
      message: "Products Added to the Subcategory Successfully",
      updatedSubCategory,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
