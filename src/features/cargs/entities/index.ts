import { Entity } from "../../../shared/types";

export interface TreatmentSupport extends Entity {
  careReceiver: Record<string, any>;
  careGiver: Record<string, any>;
}
