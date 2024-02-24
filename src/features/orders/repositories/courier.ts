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
    // const uuid = uuidv4()
    return [
      {
        id: "400873d3-a914-4693-beb0-08a891940fdf",
        name: "Boda boda",
      },
      {
        id: "0283a827-391c-44de-a574-78398cf10312",
        name: "boat service",
      },
      {
        id: "c6c790bd-3dec-4166-ab08-00c7f96d11f7",
        name: "air service",
      },
      {
        id: "2766f822-12ef-4bba-b9f7-47398c38e4c7",
        name: "Glovo",
      },
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
