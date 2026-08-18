/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,clientToken]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Player_sessionId_name_clientToken_key";

-- CreateIndex
CREATE UNIQUE INDEX "Player_sessionId_clientToken_key" ON "Player"("sessionId", "clientToken");
