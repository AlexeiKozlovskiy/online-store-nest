-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "productsData" JSONB NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);
