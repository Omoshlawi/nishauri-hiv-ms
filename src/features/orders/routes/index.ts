import { Router } from "express";
import {
  getOrder,
  getOrders,
  createOrder,
  getCourierServices,
} from "../controlers";
// import {default as deliveryRouter} from "./"
const router = Router();
router.get("/courier-services", getCourierServices);
router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);
export default router;
