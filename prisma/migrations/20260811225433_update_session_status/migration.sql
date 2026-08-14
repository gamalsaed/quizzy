/*
  Warnings:

  - The values [QUESTION,RESULTS] on the enum `SessionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SessionStatus_new" AS ENUM ('LOBBY', 'RUNNING', 'FINISHED');
ALTER TABLE "public"."GameSession" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "GameSession" ALTER COLUMN "status" TYPE "SessionStatus_new" USING ("status"::text::"SessionStatus_new");
ALTER TYPE "SessionStatus" RENAME TO "SessionStatus_old";
ALTER TYPE "SessionStatus_new" RENAME TO "SessionStatus";
DROP TYPE "public"."SessionStatus_old";
ALTER TABLE "GameSession" ALTER COLUMN "status" SET DEFAULT 'LOBBY';
COMMIT;
