/*
  Warnings:

  - You are about to drop the column `Date` on the `SessionChat` table. All the data in the column will be lost.
  - Added the required column `TimeStamp` to the `SessionChat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionChat" DROP COLUMN "Date",
ADD COLUMN     "TimeStamp" TIMESTAMP(0) NOT NULL;
