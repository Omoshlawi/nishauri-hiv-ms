import { CourierRepository } from "./courier";
import { ARTDrugOrderRepository } from "./orders";

export * from "./orders";

export const ordersRepo = new ARTDrugOrderRepository();
export const courierRepo = new CourierRepository();
