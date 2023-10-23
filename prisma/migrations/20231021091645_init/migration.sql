/*
  Warnings:

  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Products";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "collection" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "favorite" BOOLEAN,
    "category" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
