/*
  Warnings:

  - The values [G] on the enum `Stage` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Stage_new" AS ENUM ('G1', 'G2', 'G3', 'R16', 'QF', 'SF', 'F');
ALTER TABLE "Match" ALTER COLUMN "stage" DROP DEFAULT;
ALTER TABLE "Match" ALTER COLUMN "stage" TYPE "Stage_new" USING ("stage"::text::"Stage_new");
ALTER TYPE "Stage" RENAME TO "Stage_old";
ALTER TYPE "Stage_new" RENAME TO "Stage";
DROP TYPE "Stage_old";
ALTER TABLE "Match" ALTER COLUMN "stage" SET DEFAULT 'G1';
COMMIT;

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "stage" SET DEFAULT 'G1';
