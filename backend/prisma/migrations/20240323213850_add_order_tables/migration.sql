-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('Card', 'Paypal', 'COD');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('NotPaid', 'Paid');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Processing', 'Shipped', 'Delivered');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "itemsPrice" INTEGER NOT NULL,
    "taxAmount" INTEGER NOT NULL,
    "shippingAmount" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "shppingAddress" TEXT NOT NULL,
    "shippingCity" TEXT NOT NULL,
    "shippingZipCode" TEXT NOT NULL,
    "shippingCountry" TEXT NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "userId" TEXT NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'Processing',
    "deliveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
