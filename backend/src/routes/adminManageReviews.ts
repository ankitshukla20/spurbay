import { Router } from "express";
import createHttpError from "http-errors";
import { calculateAverageRating } from "../utils/averageRating";
import { prisma } from "../utils/client";

const router = Router();

/* ---- Deleting a Review  ---- */

router.delete("/", async (req, res, next) => {
  try {
    //   Extracting data from req object
    const reviewId = req.query.reviewId as string;
    const productId = req.query.productId as string;
    const userId = req.query.userId as string;
    if (!productId || !userId)
      throw createHttpError(400, "Invalid Delete Review Query Params");

    // Finding product of which this review is
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { ratings: true, numOfReviews: true, reviews: true },
    });
    if (!product) throw createHttpError(404, "Product Not Found");

    // Extracting review to delete
    const reviews = product.reviews;
    const reviewIndex = reviews.findIndex((r) => r.id === reviewId);

    // Delete Review
    await prisma.review.delete({ where: { id: reviews[reviewIndex].id } });

    // Updating product's ratings and number of reviews
    const updatedReviews = reviews.filter((review) => review.id !== reviewId);
    const newAverageRating = calculateAverageRating(updatedReviews);
    const numOfReviews = updatedReviews.length;

    await prisma.product.update({
      where: { id: productId },
      data: {
        ratings: newAverageRating,
        numOfReviews: numOfReviews,
      },
    });

    res.json({ message: "Review Deleted Successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
