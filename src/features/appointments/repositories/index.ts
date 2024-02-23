import { Repository } from "../../../shared/types";
import { Appointment } from "../entities";
import moment from "moment/moment";
export class AppointmentRepository implements Repository<Appointment> {
  create(entity: Appointment): Promise<Appointment>;
  create(entity: Record<string, any>): Promise<Appointment>;
  create(entity: unknown): Promise<Appointment> {
    throw new Error("Method not implemented.");
  }
  async findOneById(id: string): Promise<Appointment | undefined> {
    return {
      id: id,
      appointmentDate: "",
      appointmentType: "Clinical Review",
      cccNumber: "",
      dateAttended: "",
      nextAppointmentDate: "",
    } as Appointment;
  }
  async findAll(): Promise<Appointment[]> {
    const data = this._generateAppointments();
    return data.filter(({ cccNumber: cc }) => cc === "1234500001");
  }
  findByCriteria(criteria: Record<string, any>): Promise<Appointment[]> {
    throw new Error("Method not implemented.");
  }
  updateById(
    id: string,
    updates: Partial<Appointment>
  ): Promise<Appointment | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  private _generateRandomNumberInRange(min: number, max: number) {
    if (min >= max) {
      throw new Error("Invalid range: Minimum must be less than maximum.");
    }

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  private _generateAppointments(): Appointment[] {
    const data: Appointment[] = [];
    try {
      const appointmentType = [
        "Re-Fill",
        "Clinical Review",
        "PCR",
        "Lab Investigation",
      ];

      for (let index = 0; index < 500; index++) {
        const aptTyp = appointmentType[this._generateRandomNumberInRange(0, 3)];
        const apt = new Date(
          `${new Date().getFullYear()}-${this._generateRandomNumberInRange(
            1,
            4
          )}-${this._generateRandomNumberInRange(1, 30)}`
        ).toISOString();
        data.push({
          id: `207235${index}`,
          cccNumber: [
            "1234500001",
            "1234500002",
            "1234500003",
            "1234500004",
            "1234500005",
          ][this._generateRandomNumberInRange(0, 5)],
          appointmentType: aptTyp as any,
          appointmentDate: apt,
          dateAttended: undefined,
          nextAppointmentDate: moment(apt)
            .add([30, 90, 120][this._generateRandomNumberInRange(0, 3)], "days")
            .toISOString(),
        });
      }
    } catch (err: any) {
      console.error(err.message);
    }
    return data;
  }
}

export const appointmentRepo = new AppointmentRepository();
