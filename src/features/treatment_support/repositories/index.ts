import moment from "moment/moment";
import { Repository } from "../../../shared/types";
import { TreatmentSupport } from "../entities";
import { v4 as uuidv4 } from "uuid";

export class TreatentSupportRepository implements Repository<TreatmentSupport> {
  create(entity: TreatmentSupport): Promise<TreatmentSupport>;
  create(entity: Record<string, any>): Promise<TreatmentSupport>;
  create(entity: unknown): Promise<TreatmentSupport> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: string): Promise<TreatmentSupport | undefined> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<TreatmentSupport[]> {
    return [
      {
        id: uuidv4(),
        careGiver: {
          cccNumber: "1234500001",
          name: `Lawi Omosh`,
          phoneNumber: "+25476765645",
        },
        careReceiver: {
          cccNumber: "1234500003",
          name: `Jeff Odhis`,
          phoneNumber: "+25476765645",
        },
        createdAt: moment(Date.now()).toISOString() as any,
      },
      {
        id: uuidv4(),
        careGiver: {
          cccNumber: "1234500003",
          name: `Joseph Makoli`,
          phoneNumber: "+25476765645",
        },
        careReceiver: {
          cccNumber: "1234500002",
          name: `John Dore`,
          phoneNumber: "+25476765645",
        },
        createdAt: moment(Date.now()).toISOString() as any,
      },
    ];
  }
  findByCriteria(criteria: Record<string, any>): Promise<TreatmentSupport[]> {
    throw new Error("Method not implemented.");
  }
  updateById(
    id: string,
    updates: Partial<TreatmentSupport>
  ): Promise<TreatmentSupport | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

export const treatmentSurportRepo = new TreatentSupportRepository();
