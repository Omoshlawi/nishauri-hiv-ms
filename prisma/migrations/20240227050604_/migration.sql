/*
  Warnings:

  - You are about to drop the `ExtraSubscriber` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `extraSubscribers` to the `ARTGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExtraSubscriber" DROP CONSTRAINT "ExtraSubscriber_groupId_fkey";

-- AlterTable
ALTER TABLE "ARTGroup" ADD COLUMN     "extraSubscribers" JSONB NOT NULL;

-- DropTable
DROP TABLE "ExtraSubscriber";
