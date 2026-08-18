/*
  Warnings:

  - A unique constraint covering the columns `[playerId,questionId,sessionId]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.
  - Made the column `sessionId` on table `Answer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "sessionId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Answer_playerId_questionId_sessionId_key" ON "Answer"("playerId", "questionId", "sessionId");
