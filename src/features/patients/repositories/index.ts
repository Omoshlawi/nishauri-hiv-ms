import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Patient } from "../entities";

export class PatientRepository implements Repository<Patient> {
  create(entity: Patient): Promise<Patient>;
  create(entity: Record<string, any>): Promise<Patient>;
  create(entity: unknown): Promise<Patient> {
    throw new Error("Method not implemented.");
  }
  async findOneById(id: string): Promise<Patient | undefined> {
    const patientProfile = await ServiceClient.callNishauriService({
      url: "profile",
      params: { user_id: id },
    });
    return patientProfile.data[0];
  }
  async findOneByCCCNumber(cccNumber: string): Promise<Patient | undefined> {
    const patientProfile = await ServiceClient.callNishauriService(
      {
        url: "search_ccc",
        params: { client_id: cccNumber },
      },
      "mohupi"
    );
    if (patientProfile.success)
      return {
        id: patientProfile.message.id,
        client_name: `${patientProfile.message.f_name ?? ""} ${
          patientProfile.message.m_name
        } ${patientProfile.message.l_name}`,
        clinic_number: patientProfile.message.clinic_number,
      };
    else throw { status: 404, errors: { detail: "Patient not found" } };
  }
  findAll(): Promise<Patient[]> {
    throw new Error("Method not implemented.");
  }
  findByCriteria(criteria: Record<string, any>): Promise<Patient[]> {
    throw new Error("Method not implemented.");
  }
  updateById(
    id: string,
    updates: Partial<Patient>
  ): Promise<Patient | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

export const patientRepo = new PatientRepository();
