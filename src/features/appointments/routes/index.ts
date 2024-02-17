import { Router } from "express";
import { getAppointment, getAppointments } from "../controlers";

const router = Router();
router.get("/", getAppointments);
router.get("/:id", getAppointment);
export default router;
