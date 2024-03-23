import { Router } from "express";
import { prisma } from "../utils/client";
import {
  CreateProductBody,
  UpdateProductBody,
  productSchema,
  updateProductSchema,
} from "../models/product";
import createHttpError from "http-errors";

const router = Router();

/* ---- Create New Product ---- */

router.post("/", async (req, res, next) => {
  try {
    // Checks
    const validation = productSchema.safeParse(req.body);
    if (!validation.success) {
      throw createHttpError(400, "Invalid Product Inputs");
    }

    // Creating product
    const productData = req.body as CreateProductBody;
    const product = await prisma.product.create({
      data: productData,
    });

    res.json({ product });
  } catch (err) {
    next(err);
  }
});

/* ---- Update Product ---- */

router.put("/:id", async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      throw createHttpError(404, "Couldn't Update. Product Not Found");
    }

    const validation = updateProductSchema.safeParse(req.body);
    if (!validation.success) {
      throw createHttpError(400, "Couldn't Update. Invalid Product Inputs.");
    }

    const updatedData = req.body as UpdateProductBody;
    const updatedProduct = await prisma.product.update({
      where: { id: req.params.id },
      data: updatedData,
    });

    res.json({ message: "Product Updated", updated_product: updatedProduct });
  } catch (err) {
    next(err);
  }
});

/* ---- Delete Product ---- */

router.delete("/:id", async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      throw createHttpError(404, "Couldn't Delete. Product Not Found");
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: req.params.id },
    });

    res.json({ message: "Product Deleted", deleted_product: deletedProduct });
  } catch (err) {
    next(err);
  }
});

export default router;
