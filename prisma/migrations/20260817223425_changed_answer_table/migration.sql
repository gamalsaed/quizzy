/*
  Warnings:

  - A unique constraint covering the columns `[playerId,questionId]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Answer_playerId_questionId_key" ON "Answer"("playerId", "questionId");
