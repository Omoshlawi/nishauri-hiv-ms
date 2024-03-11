/*
  Warnings:

  - You are about to drop the column `extraSubscribers` on the `ARTGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ARTGroup` DROP COLUMN `extraSubscribers`;

-- CreateTable
CREATE TABLE `ARTGroupExtraSubscriber` (
    `id` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cccNumber` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ARTGroupExtraSubscriber_groupId_cccNumber_key`(`groupId`, `cccNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ARTGroupExtraSubscriber` ADD CONSTRAINT `ARTGroupExtraSubscriber_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `ARTGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
