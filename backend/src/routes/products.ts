import { Router } from "express";
import { prisma } from "../utils/client";
import createHttpError from "http-errors";
import { getAllProducts, searchProducts } from "../utils/getProducts";

const router = Router();

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  sizes: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

/* ---- Get All Products  ---- */

router.get("/", async (req, res, next) => {
  try {
    let products: Product[];

    const pageNumber = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.size as string) || 10;

    if (req.query.search && typeof req.query.search === "string") {
      const searchText = req.query.search;
      products = await searchProducts({ searchText, pageNumber, pageSize });
    } else {
      products = await getAllProducts({ pageNumber, pageSize });
    }

    const totalProductsCount = await prisma.product.count();

    res.json({ productsCount: totalProductsCount, products });
  } catch (err) {
    next(err);
  }
});

/* ---- Get One Products ---- */

router.get("/:id", async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      throw createHttpError(404, "Product Not Found");
    }

    res.json({ product });
  } catch (err) {
    next(err);
  }
});

/* ---- Get All Reviews For A Product ---- */

router.get("/reviews/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId as string;
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { reviews: true },
    });

    if (!product) throw createHttpError(404, "Product Not Found");

    res.json({ reviews: product.reviews });
  } catch (err) {
    next(err);
  }
});

export default router;
