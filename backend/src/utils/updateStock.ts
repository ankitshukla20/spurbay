import createHttpError from "http-errors";
import { OrderItem } from "../models/order";
import { prisma } from "./client";

export const updateStock = async (orderItems: OrderItem[]) => {
  for (const item of orderItems) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });
    if (!product) throw createHttpError(404, `Product Not Found`);

    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }
};
