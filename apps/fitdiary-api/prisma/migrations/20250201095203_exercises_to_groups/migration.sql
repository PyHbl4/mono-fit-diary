/*
  Warnings:

  - You are about to drop the `_ExerciseGroupsToExercises` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExerciseGroupsToExercises" DROP CONSTRAINT "_ExerciseGroupsToExercises_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseGroupsToExercises" DROP CONSTRAINT "_ExerciseGroupsToExercises_B_fkey";

-- AlterTable
ALTER TABLE "Exercises" ADD COLUMN     "exerciseGroupId" TEXT;

-- DropTable
DROP TABLE "_ExerciseGroupsToExercises";

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_exerciseGroupId_fkey" FOREIGN KEY ("exerciseGroupId") REFERENCES "ExerciseGroups"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
