/*
  Warnings:

  - A unique constraint covering the columns `[time,eventId]` on the table `ARTEventNotificationTime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ARTEventNotificationTime_time_eventId_key` ON `ARTEventNotificationTime`(`time`, `eventId`);
