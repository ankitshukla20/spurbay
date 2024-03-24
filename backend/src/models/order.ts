import { z } from "zod";

export const orderItemSchema = z
  .object({
    name: z.string(),
    size: z.string().optional(),
    price: z.number(),
    quantity: z.number(),
    image: z.string(),
    productId: z.string(),
  })
  .strict();
export type OrderItem = z.infer<typeof orderItemSchema>;

export const orderSchema = z
  .object({
    userId: z.string(),

    itemsPrice: z.number(),
    taxAmount: z.number(),
    shippingAmount: z.number(),
    totalAmount: z.number(),

    shippingAddress: z.string(),
    shippingCity: z.string(),
    shippingZipCode: z.string(),
    shippingCountry: z.string(),

    paymentMethod: z.enum(["Card", "Paypal", "COD"]),
    paymentStatus: z.enum(["NotPaid", "Paid"]),
    orderItems: z.array(orderItemSchema),
  })
  .strict();
export type OrderBody = z.infer<typeof orderSchema>;

export const updateOrderStatus = z.object({
  status: z.enum(["Processing", "Shipped", "Delivered"]),
});
export type UpdateOrderStatusBody = z.infer<typeof updateOrderStatus>;
