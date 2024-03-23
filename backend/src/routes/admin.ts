import { Router } from "express";
import { prisma } from "../utils/client";
import { Product, UpdateProduct } from "../entities/Product";
import { productSchema, updateProductSchema } from "../models/product";
import createHttpError from "http-errors";

const router = Router();

/* ---- Get Admin Profile ---- */

router.get("/me", async (req, res, next) => {
  try {
    // Checks
    const adminId = req.headers.adminId;
    if (typeof adminId !== "string") {
      throw createHttpError(401, "Unauthorized");
    }

    // Get Admin
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { firstname: true, lastname: true, email: true },
    });

    res.json({ admin });
  } catch (err) {
    next(err);
  }
});

/* ---- Create New Product ---- */

router.post("/product", async (req, res, next) => {
  try {
    const productData = req.body as Product;

    const validation = productSchema.safeParse(productData);
    if (!validation.success) {
      throw createHttpError(400, "Invalid Product Inputs");
    }

    const product = await prisma.product.create({
      data: productData,
    });

    res.json({ product });
  } catch (err) {
    next(err);
  }
});

/* ---- Update Product ---- */

router.put("/product/:id", async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      throw createHttpError(404, "Couldn't Update. Product Not Found");
    }

    const updatedData = req.body as UpdateProduct;

    const validation = updateProductSchema.safeParse(updatedData);

    if (!validation.success) {
      throw createHttpError(400, "Couldn't Update. Invalid Product Inputs.");
    }

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

router.delete("/product/:id", async (req, res, next) => {
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
