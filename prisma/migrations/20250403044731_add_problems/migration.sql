/*
  Warnings:

  - You are about to drop the column `solution` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `template` on the `Problem` table. All the data in the column will be lost.
  - The `constraints` column on the `Problem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `TestCase` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hiddenTests` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialCode` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `samples` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Made the column `inputFormat` on table `Problem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `outputFormat` on table `Problem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "SubmissionStatus" ADD VALUE 'PENDING';

-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_problemId_fkey";

-- DropIndex
DROP INDEX "Submission_problemId_idx";

-- DropIndex
DROP INDEX "Submission_userId_idx";

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "solution",
DROP COLUMN "template",
ADD COLUMN     "hiddenTests" JSONB NOT NULL,
ADD COLUMN     "initialCode" TEXT NOT NULL,
ADD COLUMN     "samples" JSONB NOT NULL,
ALTER COLUMN "inputFormat" SET NOT NULL,
ALTER COLUMN "outputFormat" SET NOT NULL,
DROP COLUMN "constraints",
ADD COLUMN     "constraints" TEXT[];

-- DropTable
DROP TABLE "TestCase";
