/*
  Warnings:

  - You are about to drop the column `event` on the `ARTDrugOrder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ARTDrugDelivery" DROP CONSTRAINT "ARTDrugDelivery_orderId_fkey";

-- AlterTable
ALTER TABLE "ARTDrugDelivery" ALTER COLUMN "orderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ARTDrugOrder" DROP COLUMN "event",
ADD COLUMN     "eventId" UUID;

-- AddForeignKey
ALTER TABLE "ARTDrugOrder" ADD CONSTRAINT "ARTDrugOrder_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "ARTEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ARTDrugDelivery" ADD CONSTRAINT "ARTDrugDelivery_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "ARTDrugOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
