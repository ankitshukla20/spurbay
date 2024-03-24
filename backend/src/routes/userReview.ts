import { Router } from "express";
import { ReviewBody, reviewScheme } from "../models/review";
import createHttpError from "http-errors";
import { prisma } from "../utils/client";
import { Review } from "@prisma/client";
import { calculateAverageRating } from "../utils/averageRating";

const router = Router();

/* ---- Adding or Updating Review  ---- */

router.post("/", async (req, res, next) => {
  try {
    // Checks
    const validation = reviewScheme.safeParse(req.body);
    if (!validation.success)
      throw createHttpError(400, "Invalid Review Inputs");

    //   Extracting data from req object
    const { productId, rating, comment } = req.body as ReviewBody;
    const userId = req.headers.userId as string;

    // Finding product for which review is being written
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { ratings: true, numOfReviews: true, reviews: true },
    });
    if (!product) throw createHttpError(404, "Product Not Found");

    // Extracting review to update from reviews array
    const reviews = product.reviews;
    const reviewIndex = reviews.findIndex((r) => r.userId === userId);

    let review: Review;
    if (reviewIndex === -1) {
      // If no review by this user found

      review = await prisma.review.create({
        data: {
          rating,
          comment: comment ?? null,
          userId,
          productId,
        },
      });
    } else {
      // Else updating the prev review by this user

      review = await prisma.review.update({
        where: { id: reviews[reviewIndex].id },
        data: {
          rating,
          comment: comment ?? null,
        },
      });
    }

    // Updating product's ratings and number of reviews
    const updatedReviews = reviewIndex === -1 ? [...reviews, review] : reviews; // Add the new review if it's a new one
    const newAverageRating = calculateAverageRating(updatedReviews);
    const numOfReviews = updatedReviews.length;

    await prisma.product.update({
      where: { id: productId },
      data: { ratings: newAverageRating, numOfReviews },
    });

    res.json({ review });
  } catch (err) {
    next(err);
  }
});

export default router;
