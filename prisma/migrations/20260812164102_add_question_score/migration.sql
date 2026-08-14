/*
  Warnings:

  - You are about to drop the column `time` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "time",
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "timeLimitSec" INTEGER NOT NULL DEFAULT 20;
