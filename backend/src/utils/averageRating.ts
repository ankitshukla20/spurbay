import { Review } from "@prisma/client";

export const calculateAverageRating = (reviews: Review[]) => {
  if (reviews.length === 0) {
    return 0;
  }

  const init = 0;
  const totalRating = reviews.reduce(
    (accumulator, review) => accumulator + review.rating,
    init
  );
  return totalRating / reviews.length;
};
