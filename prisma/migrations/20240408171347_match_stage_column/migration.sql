-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('G', 'R16', 'QF', 'SF', 'F');

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "stage" "Stage" NOT NULL DEFAULT 'G';
