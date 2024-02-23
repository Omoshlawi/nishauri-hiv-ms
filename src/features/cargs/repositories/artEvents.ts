import { ARTEvent, Prisma } from "@prisma/client";
import { Repository } from "../../../shared/types";
import { ARTEventModel } from "../models";

export class ARTEventRepository implements Repository<ARTEvent> {
  create(entity: ARTEvent): Promise<ARTEvent> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: string): Promise<ARTEvent | undefined> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<ARTEvent[]> {
    throw new Error("Method not implemented.");
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
