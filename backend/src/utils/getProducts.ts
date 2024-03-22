import { prisma } from "./client";
interface ProductsParams {
  pageNumber: number;
  pageSize: number;
}

interface SearchProductsParams extends ProductsParams {
  searchText: string;
}

export const searchProducts = async ({
  searchText,
  pageNumber,
  pageSize,
}: SearchProductsParams) => {
  const skipProducts = (pageNumber - 1) * pageSize;

  const products = await prisma.product.findMany({
    skip: skipProducts,
    take: pageSize,
    where: {
      OR: [
        { name: { contains: searchText, mode: "insensitive" } },
        { description: { contains: searchText, mode: "insensitive" } },
      ],
    },
  });

  return products;
};

export const getAllProducts = async ({
  pageNumber,
  pageSize,
}: ProductsParams) => {
  const skipProducts = (pageNumber - 1) * pageSize;

  const products = await prisma.product.findMany({
    skip: skipProducts,
    take: pageSize,
  });
  return products;
};
