/*
  Warnings:

  - You are about to drop the column `shopcartId` on the `CartItem` table. All the data in the column will be lost.
  - Added the required column `shopCartId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_shopcartId_fkey";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "shopcartId",
ADD COLUMN     "shopCartId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_shopCartId_fkey" FOREIGN KEY ("shopCartId") REFERENCES "ShopCart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
