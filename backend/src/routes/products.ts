import { Router } from "express";
import { prisma } from "../utils/client";
import createHttpError from "http-errors";
import { getAllProducts, searchProducts } from "../utils/getProducts";

const router = Router();

/* ---- Get All Products  ---- */

router.get("/", async (req, res, next) => {
  try {
    let products;

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

export default router;
