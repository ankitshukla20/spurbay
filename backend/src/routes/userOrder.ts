import { Router } from "express";
import { OrderBody, orderSchema } from "../models/order";
import createHttpError from "http-errors";
import { prisma } from "../utils/client";
import { updateStock } from "../utils/updateStock";

const router = Router();

/* ---- Get Orders of SignedIn User ---- */

router.get("/", async (req, res, next) => {
  try {
    const userId = req.headers.userId as string;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          select: { name: true, price: true, quantity: true, size: true },
        },
      },
    });

    res.json({ orders });
  } catch (err) {
    next(err);
  }
});

/* ---- Create New Order (COD) ---- */

router.post("/new", async (req, res, next) => {
  try {
    // Checks
    const validation = orderSchema.safeParse(req.body);
    if (!validation.success) {
      console.log(validation.error.errors);
      throw createHttpError(400, "Invalid Order Inputs");
    }

    // Creating product
    const userId = req.headers.userId as string;
    const {
      itemsPrice,
      taxAmount,
      shippingAmount,
      totalAmount,
      shippingAddress,
      shippingCity,
      shippingZipCode,
      shippingCountry,
      paymentMethod,
      paymentStatus,
      orderItems,
    } = req.body as OrderBody;

    const newOrder = await prisma.order.create({
      data: {
        userId,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        shippingAddress,
        shippingCity,
        shippingZipCode,
        shippingCountry,
        paymentMethod,
        paymentStatus,
        orderItems: { createMany: { data: orderItems } },
      },
      include: { orderItems: true },
    });

    await updateStock(orderItems);

    res.json({ message: "Order Created Successfully", newOrder });
  } catch (err) {
    next(err);
  }
});

/* ---- Get Order Details ---- */

router.get("/:orderId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          select: { name: true, price: true, quantity: true, size: true },
        },
        user: { select: { firstname: true, lastname: true, email: true } },
      },
    });

    if (!order) throw createHttpError(404, "Product Not Found");

    res.json({ order });
  } catch (err) {
    next(err);
  }
});

export default router;
