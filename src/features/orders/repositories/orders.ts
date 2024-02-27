import { ARTDrugOrder, Prisma } from "@prisma/client";
import { Repository } from "../../../shared/types";
import { ARTDrugOrderModel } from "../models";

export class ARTDrugOrderRepository implements Repository<ARTDrugOrder> {
  selectFields: Prisma.ARTDrugOrderSelect = {
    _count: true,
    id: true,
    appointment: true,
    courierService: true,
    type: true,
    event: {
      select: {
        id: true,
        _count: true,
        title: true,
        remarks: true,
        updatedAt: true,
        createdAt: true,
        remiderNortificationDates: true,
        feedBacks: {
          select: {
            id: true,
            confirmedAttendance: true,
            requestedHomeDelivery: true,
            note: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        distributionTime: true,
        distributionVenue: true,
        group: {
          select: {
            id: true,
            _count: true,
            title: true,
            description: true,
            enrollments: {
              select: {
                id: true,
                isAdmin: true,
                isCurrent: true,
                publicName: true,
                user: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            extraSubscribers: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    },
    deliveryAddress: true,
    deliveryMethod: true,
    deliveryPerson: true,
    orderedBy: true,
    patient: true,
    phoneNumber: true,
    deliveries: {
      select: {
        id: true,
        courierService: true,
        createdAt: true,
        deliveryAddress: true,
        deliveryPerson: true,
        initiatedBy: true,
        method: true,
        patient: true,
        services: true,
        updatedAt: true,
      },
    },
    createdAt: true,
    updatedAt: true,
  };

  create(entity: Partial<ARTDrugOrder>): Promise<ARTDrugOrder> {
    return ARTDrugOrderModel.create({
      data: entity as any,
      select: this.selectFields,
    });
  }
  findOneById(id: string): Promise<ARTDrugOrder | undefined> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<ARTDrugOrder[]> {
    return ARTDrugOrderModel.findMany({
      select: this.selectFields,
    });
  }
  findByCriteria(criteria: Record<string, any>): Promise<ARTDrugOrder[]> {
    throw new Error("Method not implemented.");
  }
  updateById(
    id: string,
    updates: Partial<ARTDrugOrder>
  ): Promise<ARTDrugOrder | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
