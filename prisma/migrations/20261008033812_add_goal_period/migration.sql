-- CreateEnum
CREATE TYPE "GoalPeriod" AS ENUM ('YEARLY', 'MONTHLY');

-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "period" "GoalPeriod" NOT NULL DEFAULT 'YEARLY';
