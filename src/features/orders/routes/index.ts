import { Router } from "express";
import { getOrder, getOrders, createOrder } from "../controlers";
// import {default as deliveryRouter} from "./"
const router = Router();
router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);
export default router;
