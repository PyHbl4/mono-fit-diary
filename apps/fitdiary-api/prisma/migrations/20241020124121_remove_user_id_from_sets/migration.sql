/*
  Warnings:

  - You are about to drop the column `userId` on the `Sets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sets" DROP CONSTRAINT "Sets_userId_fkey";

-- AlterTable
ALTER TABLE "Sets" DROP COLUMN "userId";
