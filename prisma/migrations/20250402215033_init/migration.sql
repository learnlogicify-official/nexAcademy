/*
  Warnings:

  - You are about to drop the column `hiddenProblemId` on the `TestCase` table. All the data in the column will be lost.
  - You are about to drop the column `sampleProblemId` on the `TestCase` table. All the data in the column will be lost.
  - Added the required column `problemId` to the `TestCase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_hiddenProblemId_fkey";

-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_sampleProblemId_fkey";

-- DropIndex
DROP INDEX "TestCase_hiddenProblemId_idx";

-- DropIndex
DROP INDEX "TestCase_sampleProblemId_idx";

-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "hiddenProblemId",
DROP COLUMN "sampleProblemId",
ADD COLUMN     "problemId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "TestCase_problemId_idx" ON "TestCase"("problemId");

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
