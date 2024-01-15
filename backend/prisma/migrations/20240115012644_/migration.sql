/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ShopCart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShopCart_userId_key" ON "ShopCart"("userId");
