-- CreateTable
CREATE TABLE "ARTEventFeedBack" (
    "id" UUID NOT NULL,
    "eventId" UUID,
    "confirmedAttendance" BOOLEAN NOT NULL,
    "requestedHomeDelivery" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "aRTDrugOrderId" UUID,

    CONSTRAINT "ARTEventFeedBack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ARTEventFeedBack" ADD CONSTRAINT "ARTEventFeedBack_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "ARTEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ARTEventFeedBack" ADD CONSTRAINT "ARTEventFeedBack_aRTDrugOrderId_fkey" FOREIGN KEY ("aRTDrugOrderId") REFERENCES "ARTDrugOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
