import { Router } from "express";
import { prisma } from "../utils/client";
import createHttpError from "http-errors";
import { UpdateOrderStatusBody, updateOrderStatus } from "../models/order";

const router = Router();

/* ---- Get All Orders ---- */

router.get("/", async (req, res, next) => {
  try {
    const pageNumber = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.size as string) || 15;
    const skipOrders = (pageNumber - 1) * pageSize;

    const orders = await prisma.order.findMany({
      skip: skipOrders,
      take: pageSize,
      include: {
        orderItems: {
          select: { name: true, price: true, quantity: true, size: true },
        },
      },
    });
    const ordersCount = await prisma.order.count();

    res.json({ ordersCount, orders });
  } catch (err) {
    next(err);
  }
});

/* ---- Update Order ---- */

router.put("/:orderId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId as string;

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw createHttpError(404, "Order Not Found");

    const validation = updateOrderStatus.safeParse(req.body);
    if (!validation.success)
      throw createHttpError(400, "Invalid Order Status Inputs");

    const { status } = req.body as UpdateOrderStatusBody;
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: status },
      select: { orderStatus: true },
    });

    res.json({
      message: "Order Status Updated",
      status: updatedOrder.orderStatus,
    });
  } catch (err) {
    next(err);
  }
});

/* ---- Delete Order ---- */

router.delete("/:orderId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId as string;

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw createHttpError(404, "Order Not Found");

    await prisma.orderItem.deleteMany({
      where: { orderId },
    });

    await prisma.order.delete({ where: { id: orderId } });

    res.json({
      message: "Order Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
