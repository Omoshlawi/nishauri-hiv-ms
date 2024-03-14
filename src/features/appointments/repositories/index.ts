import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Appointment } from "../entities";
import moment from "moment/moment";
export class AppointmentRepository implements Repository<Appointment> {
  create(entity: Appointment): Promise<Appointment>;
  create(entity: Record<string, any>): Promise<Appointment>;
  create(entity: unknown): Promise<Appointment> {
    throw new Error("Method not implemented.");
  }
  async findOneById(
    id: string,
    user_id?: string
  ): Promise<Appointment | undefined> {
    return (await this.findAll(user_id)).find((apt) => (apt.id = id));
  }
  async findAll(user_id?: string): Promise<Appointment[]> {
    const response = await ServiceClient.callNishauriService({
      method: "GET",
      url: "current_appt",
      params: { user_id },
    });
    return await response.data;
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
}

export const appointmentRepo = new AppointmentRepository();
