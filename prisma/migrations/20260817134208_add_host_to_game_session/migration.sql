/*
  Warnings:

  - Made the column `hostId` on table `GameSession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GameSession" ALTER COLUMN "hostId" SET NOT NULL;
