-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isGoogle" BOOLEAN,
ADD COLUMN     "picture" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
