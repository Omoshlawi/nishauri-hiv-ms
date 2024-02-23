import { Repository } from "../../../shared/types";
import { Courier } from "../entities";
import { v4 as uuidv4 } from "uuid";

export class CourierRepository implements Repository<Courier> {
  create(entity: Courier): Promise<Courier>;
  create(entity: Record<string, any>): Promise<Courier>;
  create(entity: unknown): Promise<Courier> {
    throw new Error("Method not implemented.");
  }
  async findOneById(id: string): Promise<Courier | undefined> {
    return (await this.findAll()).find((courier) => courier.id === id);
  }
  async findAll(): Promise<Courier[]> {
    return [
      { id: uuidv4(), name: "Boda boda" },
      { id: uuidv4(), name: "boat service" },
      { id: uuidv4(), name: "air service" },
      { id: uuidv4(), name: "Glovo" },
    ] as Courier[];
  }
  findByCriteria(criteria: Record<string, any>): Promise<Courier[]> {
    throw new Error("Method not implemented.");
  }
  updateById(
    id: string,
    updates: Partial<Courier>
  ): Promise<Courier | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
