import { ARTGroup, Prisma } from "@prisma/client";
import { Repository } from "../../../shared/types";
import { ARTGroupModel } from "../models";

export class ARTGroupRepository implements Repository<ARTGroup> {
  create(entity: Partial<ARTGroup>): Promise<ARTGroup> {
    return ARTGroupModel.create({
      data: { ...entity, title: entity.title! },
    });
  }
  findOneById(id: string): Promise<ARTGroup | undefined> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<ARTGroup[]> {
    throw new Error("Method not implemented.");
  }
  findByCriteria(criteria: Record<string, any>): Promise<ARTGroup[]> {
    throw new Error("Method not implemented.");
  }
  updateById(
    id: string,
    updates: Partial<ARTGroup>
  ): Promise<ARTGroup | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async exists(criteria: Prisma.ARTGroupWhereInput): Promise<boolean> {
    const group = await ARTGroupModel.findFirst({ where: criteria });
    return group !== null;
  }
}
