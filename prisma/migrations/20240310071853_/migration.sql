-- CreateTable
CREATE TABLE `ARTDrugOrder` (
    `id` VARCHAR(191) NOT NULL,
    `patient` JSON NOT NULL,
    `appointment` JSON NULL,
    `eventId` VARCHAR(191) NULL,
    `deliveryAddress` JSON NOT NULL,
    `deliveryMethod` ENUM('in_parcel', 'in_person') NOT NULL,
    `courierService` JSON NULL,
    `deliveryPerson` JSON NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `type` ENUM('self', 'other') NOT NULL,
    `orderedBy` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ARTDrugDelivery` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NULL,
    `patient` JSON NOT NULL,
    `method` ENUM('self', 'courier', 'patient_preference') NOT NULL,
    `courierService` JSON NULL,
    `deliveryPerson` JSON NULL,
    `deliveryAddress` JSON NULL,
    `eventId` VARCHAR(191) NULL,
    `initiatedBy` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ARTDrugDeliveryExtraservice` (
    `id` VARCHAR(191) NOT NULL,
    `deliveryId` VARCHAR(191) NOT NULL,
    `service` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ARTEvent` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `distributionTime` DATETIME(3) NOT NULL,
    `distributionVenue` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `remarks` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ARTEventNotificationTime` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `time` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ARTEventFeedBack` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NULL,
    `confirmedAttendance` BOOLEAN NOT NULL,
    `requestedHomeDelivery` BOOLEAN NOT NULL,
    `note` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ARTGroup` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `extraSubscribers` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ARTGroupUserEnrollment` (
    `id` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `user` JSON NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `publicName` VARCHAR(191) NULL,
    `isCurrent` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ARTDrugOrder` ADD CONSTRAINT `ARTDrugOrder_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `ARTEvent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ARTDrugDelivery` ADD CONSTRAINT `ARTDrugDelivery_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `ARTDrugOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ARTDrugDelivery` ADD CONSTRAINT `ARTDrugDelivery_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `ARTEvent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ARTDrugDeliveryExtraservice` ADD CONSTRAINT `ARTDrugDeliveryExtraservice_deliveryId_fkey` FOREIGN KEY (`deliveryId`) REFERENCES `ARTDrugDelivery`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ARTEvent` ADD CONSTRAINT `ARTEvent_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `ARTGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ARTEventNotificationTime` ADD CONSTRAINT `ARTEventNotificationTime_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `ARTEvent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ARTEventFeedBack` ADD CONSTRAINT `ARTEventFeedBack_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `ARTEvent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ARTGroupUserEnrollment` ADD CONSTRAINT `ARTGroupUserEnrollment_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `ARTGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
