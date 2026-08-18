/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,name,clientToken]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientToken` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Player_sessionId_name_key";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "clientToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Player_sessionId_name_clientToken_key" ON "Player"("sessionId", "name", "clientToken");
