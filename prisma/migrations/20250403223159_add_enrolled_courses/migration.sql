/*
  Warnings:

  - Added the required column `category` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructorId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lessons` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- First, ensure we have an admin user
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM "User" WHERE role = 'ADMIN') THEN
        INSERT INTO "User" (id, email, name, role, "createdAt", "updatedAt")
        VALUES (
            'admin_' || gen_random_uuid()::text,
            'admin@example.com',
            'System Admin',
            'ADMIN',
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
        );
    END IF;
END $$;

-- First, add new columns with default values
ALTER TABLE "Course" ADD COLUMN "image" TEXT;
ALTER TABLE "Course" ADD COLUMN "price" FLOAT DEFAULT 0;
ALTER TABLE "Course" ADD COLUMN "level" TEXT DEFAULT 'BEGINNER';
ALTER TABLE "Course" ADD COLUMN "duration" TEXT DEFAULT '0h';
ALTER TABLE "Course" ADD COLUMN "lessons" INTEGER DEFAULT 0;
ALTER TABLE "Course" ADD COLUMN "rating" FLOAT DEFAULT 0;
ALTER TABLE "Course" ADD COLUMN "students" INTEGER DEFAULT 0;
ALTER TABLE "Course" ADD COLUMN "category" TEXT DEFAULT 'General';
ALTER TABLE "Course" ADD COLUMN "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Course" ADD COLUMN "startDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Course" ADD COLUMN "endDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP + INTERVAL '30 days';
ALTER TABLE "Course" ADD COLUMN "instructorId" TEXT;

-- Update instructorId to point to an admin user
UPDATE "Course" SET "instructorId" = (SELECT id FROM "User" WHERE role = 'ADMIN' LIMIT 1);

-- Now make the columns required
ALTER TABLE "Course" ALTER COLUMN "price" SET NOT NULL;
ALTER TABLE "Course" ALTER COLUMN "level" SET NOT NULL;
ALTER TABLE "Course" ALTER COLUMN "duration" SET NOT NULL;
ALTER TABLE "Course" ALTER COLUMN "lessons" SET NOT NULL;
ALTER TABLE "Course" ALTER COLUMN "category" SET NOT NULL;
ALTER TABLE "Course" ALTER COLUMN "startDate" SET NOT NULL;
ALTER TABLE "Course" ALTER COLUMN "endDate" SET NOT NULL;
ALTER TABLE "Course" ALTER COLUMN "instructorId" SET NOT NULL;

-- Add foreign key constraint
ALTER TABLE "Course" ADD CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Create EnrolledCourse table
CREATE TABLE "EnrolledCourse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedLessons" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "progress" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'enrolled',
    "lastAccessed" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "isStarred" BOOLEAN NOT NULL DEFAULT false,
    "isRemoved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnrolledCourse_pkey" PRIMARY KEY ("id")
);

-- Add unique constraint
CREATE UNIQUE INDEX "EnrolledCourse_userId_courseId_key" ON "EnrolledCourse"("userId", "courseId");

-- Add foreign key constraints
ALTER TABLE "EnrolledCourse" ADD CONSTRAINT "EnrolledCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "EnrolledCourse" ADD CONSTRAINT "EnrolledCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
