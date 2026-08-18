/*
  Warnings:

  - A unique constraint covering the columns `[playerId,questionId,sessionId]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Answer_playerId_questionId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Answer_playerId_questionId_sessionId_key" ON "Answer"("playerId", "questionId", "sessionId");
