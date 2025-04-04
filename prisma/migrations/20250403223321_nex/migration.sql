/*
  Warnings:

  - Made the column `rating` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `students` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "level" DROP DEFAULT,
ALTER COLUMN "duration" DROP DEFAULT,
ALTER COLUMN "lessons" DROP DEFAULT,
ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "students" SET NOT NULL,
ALTER COLUMN "category" DROP DEFAULT,
ALTER COLUMN "tags" DROP DEFAULT,
ALTER COLUMN "startDate" DROP DEFAULT,
ALTER COLUMN "endDate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "EnrolledCourse" ALTER COLUMN "completedLessons" DROP DEFAULT;
