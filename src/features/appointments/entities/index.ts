import { Entity } from "../../../shared/types";

export interface Appointment extends Entity {
  id: string;
  cccNumber: string;
  appointment_type: string;
  appointment_date: string;
  appt_status: string;
  appointment: string;
  nextAppointmentDate: string;
}
