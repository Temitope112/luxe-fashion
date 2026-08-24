/*
  Warnings:

  - You are about to drop the column `createdAt` on the `OrderItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentReference]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PENDING', 'PAID', 'FAILED');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "paymentReference" TEXT,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
ADD COLUMN     "shipping" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "subtotal" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "createdAt",
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "selectedColor" TEXT,
ADD COLUMN     "selectedSize" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentReference_key" ON "Order"("paymentReference");

-- CreateIndex
CREATE INDEX "Order_paymentStatus_idx" ON "Order"("paymentStatus");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
