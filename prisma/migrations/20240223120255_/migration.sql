-- CreateEnum
CREATE TYPE "OrderDeliveryMethod" AS ENUM ('in_parcel', 'in_person');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('self', 'other');

-- CreateEnum
CREATE TYPE "DeliveryMethod" AS ENUM ('self', 'courier', 'patient_preference');

-- CreateTable
CREATE TABLE "ARTDrugOrder" (
    "id" UUID NOT NULL,
    "patient" JSONB NOT NULL,
    "appointment" JSONB,
    "event" JSONB,
    "deliveryAddress" JSONB NOT NULL,
    "deliveryMethod" "OrderDeliveryMethod" NOT NULL,
    "courierService" JSONB,
    "deliveryPerson" JSONB,
    "phoneNumber" TEXT NOT NULL,
    "type" "OrderType" NOT NULL,
    "orderedBy" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ARTDrugOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ARTDrugDelivery" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "patient" JSONB NOT NULL,
    "services" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "method" "DeliveryMethod" NOT NULL,
    "courierService" JSONB,
    "deliveryPerson" JSONB,
    "deliveryAddress" JSONB,
    "eventId" UUID,
    "initiatedBy" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ARTDrugDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ARTEvent" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "distributionTime" TIMESTAMP(3) NOT NULL,
    "distributionVenue" TEXT NOT NULL,
    "remiderNortificationDates" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
    "groupId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "remarks" TEXT NOT NULL,

    CONSTRAINT "ARTEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ARTGroup" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ARTGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ARTGroupUserEnrollment" (
    "id" UUID NOT NULL,
    "groupId" UUID NOT NULL,
    "user" JSONB NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "publicName" TEXT NOT NULL,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ARTGroupUserEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtraSubscriber" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cccNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "groupId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExtraSubscriber_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ARTDrugDelivery" ADD CONSTRAINT "ARTDrugDelivery_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "ARTDrugOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ARTDrugDelivery" ADD CONSTRAINT "ARTDrugDelivery_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "ARTEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ARTEvent" ADD CONSTRAINT "ARTEvent_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "ARTGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ARTGroupUserEnrollment" ADD CONSTRAINT "ARTGroupUserEnrollment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "ARTGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraSubscriber" ADD CONSTRAINT "ExtraSubscriber_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "ARTGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
