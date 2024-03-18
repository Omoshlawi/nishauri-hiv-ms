import { Entity } from "../../../shared/types";

export interface Patient extends Entity {
  clinic_number: string;
  client_name: string;
  moh_upi?: string;
  client_age?: number;
  gender?: string;
  phone_no?: string;
  facility_name?: string;
}
