import { ARTEvent, Prisma } from "@prisma/client";
import { Repository } from "../../../shared/types";
import { ARTEventModel } from "../models";

export class ARTEventRepository implements Repository<ARTEvent> {
  selectFields: Prisma.ARTEventSelect = {
    id: true,
    title: true,
    remarks: true,
    _count: true,
    createdAt: true,
    deliveries: {
      select: {
        id: true,
        courierService: true,
        createdAt: true,
        deliveryAddress: true,
        deliveryPerson: true,
        initiatedBy: true,
        method: true,
        order: true,
        patient: true,
        services: true,
        updatedAt: true,
      },
    },
    distributionTime: true,
    distributionVenue: true,
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
    remiderNortificationDates: true,
    group: true,
    orders: true,
  };

  create(entity: Partial<ARTEvent>): Promise<ARTEvent> {
    return ARTEventModel.create({
      data: {
        ...entity,
        distributionTime: entity.distributionTime!,
        distributionVenue: entity.distributionVenue!,
        title: entity.title!,
        groupId: entity.groupId!,
      },
      select: this.selectFields,
    });
  }
  findOneById(id: string): Promise<ARTEvent | undefined> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<ARTEvent[]> {
    return ARTEventModel.findMany();
  }
  findByCriteria(criteria: Record<string, any>): Promise<ARTEvent[]> {
    throw new Error("Method not implemented.");
  }
  updateById(
    id: string,
    updates: Partial<ARTEvent>
  ): Promise<ARTEvent | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async exists(criteria: Prisma.ARTEventWhereInput): Promise<boolean> {
    const event = await ARTEventModel.findFirst({ where: criteria });
    return event !== null;
  }
}
