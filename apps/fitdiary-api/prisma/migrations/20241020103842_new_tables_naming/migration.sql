/*
  Warnings:

  - You are about to drop the `ExcerciseGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExcerciseGroupToExercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExcerciseGroup" DROP CONSTRAINT "ExcerciseGroup_userId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sets" DROP CONSTRAINT "Sets_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Sets" DROP CONSTRAINT "Sets_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sets" DROP CONSTRAINT "Sets_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "WeightData" DROP CONSTRAINT "WeightData_userId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ExcerciseGroupToExercise" DROP CONSTRAINT "_ExcerciseGroupToExercise_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExcerciseGroupToExercise" DROP CONSTRAINT "_ExcerciseGroupToExercise_B_fkey";

-- DropTable
DROP TABLE "ExcerciseGroup";

-- DropTable
DROP TABLE "Exercise";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Workout";

-- DropTable
DROP TABLE "_ExcerciseGroupToExercise";

-- CreateTable
CREATE TABLE "Users" (
    "uuid" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "scopes" TEXT[],
    "name" TEXT NOT NULL,
    "sessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Workouts" (
    "uuid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER,
    "calories" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workouts_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Exercises" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercises_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "ExerciseGroups" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExerciseGroups_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_ExerciseGroupsToExercises" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_login_key" ON "Users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseGroupsToExercises_AB_unique" ON "_ExerciseGroupsToExercises"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseGroupsToExercises_B_index" ON "_ExerciseGroupsToExercises"("B");

-- AddForeignKey
ALTER TABLE "Workouts" ADD CONSTRAINT "Workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sets" ADD CONSTRAINT "Sets_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workouts"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sets" ADD CONSTRAINT "Sets_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sets" ADD CONSTRAINT "Sets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightData" ADD CONSTRAINT "WeightData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseGroups" ADD CONSTRAINT "ExerciseGroups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseGroupsToExercises" ADD CONSTRAINT "_ExerciseGroupsToExercises_A_fkey" FOREIGN KEY ("A") REFERENCES "ExerciseGroups"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseGroupsToExercises" ADD CONSTRAINT "_ExerciseGroupsToExercises_B_fkey" FOREIGN KEY ("B") REFERENCES "Exercises"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
