import { ARTDrugOrder, Prisma } from "@prisma/client";
import { Repository } from "../../../shared/types";

export class ARTDrugOrderRepository implements Repository<ARTDrugOrder> {
  create(entity: ARTDrugOrder): Promise<ARTDrugOrder>;
  create(entity: Record<string, any>): Promise<ARTDrugOrder>;
  create(entity: unknown): Promise<ARTDrugOrder> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: string): Promise<ARTDrugOrder | undefined> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<ARTDrugOrder[]> {
    throw new Error("Method not implemented.");
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
