/*
  Warnings:

  - You are about to drop the column `enrolledAt` on the `EnrolledCourse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "rating" DROP DEFAULT,
ALTER COLUMN "students" DROP DEFAULT;

-- AlterTable
ALTER TABLE "EnrolledCourse" DROP COLUMN "enrolledAt",
ALTER COLUMN "progress" DROP DEFAULT,
ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;
