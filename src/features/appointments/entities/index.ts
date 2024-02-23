import { Entity } from "../../../shared/types";

export interface Appointment extends Entity {
  id: string;
  cccNumber: string;
  appointmentType: "Re-Fill" | "Clinical Review" | "PCR" | "Lab Investigation";
  appointmentDate: string;
  dateAttended?: string;
  nextAppointmentDate: string;
}
