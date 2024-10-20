/*
  Warnings:

  - Added the required column `userId` to the `ExcerciseGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExcerciseGroup" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcerciseGroup" ADD CONSTRAINT "ExcerciseGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
