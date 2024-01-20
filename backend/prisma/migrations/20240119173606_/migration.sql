/*
  Warnings:

  - Added the required column `authors` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "book" ADD COLUMN     "authors" TEXT NOT NULL,
ALTER COLUMN "catagory" DROP NOT NULL;
