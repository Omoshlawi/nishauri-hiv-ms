/*
  Warnings:

  - You are about to drop the column `aRTDrugOrderId` on the `ARTEventFeedBack` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ARTEventFeedBack" DROP CONSTRAINT "ARTEventFeedBack_aRTDrugOrderId_fkey";

-- AlterTable
ALTER TABLE "ARTEventFeedBack" DROP COLUMN "aRTDrugOrderId",
ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "ARTGroup" ALTER COLUMN "description" DROP NOT NULL;
